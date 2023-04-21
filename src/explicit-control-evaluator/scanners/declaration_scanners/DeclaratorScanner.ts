import CVisitor from "../../../parser/antlr_gen/CVisitor";
import VariableDeclaration from "../../VariableDeclaration";
import DeclarationSpecification from "../../../type_descriptions/DeclarationSpecification";
import QualifiedPointer from "../../../type_descriptions/QualifiedPointer";
import {DeclaratorContext, DirectDeclaratorContext} from "../../../parser/antlr_gen/CParser";
import {UnknownDefinitionError} from "../../ExplicitControlListener";
import scan_pointers from "./PointerScanner";
import TypeInformation from "../../../type_descriptions/TypeInformation";

/**
 * Scans a declarator to create a variable declaration
 * @param ctx The context to search
 * @param specification The specification in which to find the variable
 */
export default function scan_declarator(ctx: DeclaratorContext, specification: DeclarationSpecification): VariableDeclaration {
    return ctx.accept(new DeclaratorScanner(specification));
}


class DeclaratorScanner extends CVisitor<VariableDeclaration> {
    private readonly specification: DeclarationSpecification;
    private is_function: boolean;
    private readonly pointers: Array<QualifiedPointer>;
    private readonly function_pointers: Array<QualifiedPointer>;

    public constructor(specification: DeclarationSpecification) {
        super();
        this.specification = specification;
        this.is_function = false;
        this.pointers = [];
        this.function_pointers = [];
    }

    // @ts-ignore
    visitDeclarator(ctx: DeclaratorContext): VariableDeclaration {
        if (ctx.pointer()) {
            if (this.is_function) {
                this.function_pointers.push(...scan_pointers(ctx.pointer()));
            } else {
                this.pointers.push(...scan_pointers(ctx.pointer()));
            }
        }
        return ctx.directDeclarator().accept(this);
    }

    private make_type_information(): TypeInformation {
        if (this.is_function) {
            const return_type = new TypeInformation(this.specification, this.pointers);
            const function_specifier = DeclarationSpecification.function_specifier(return_type);
            return new TypeInformation(function_specifier, this.function_pointers);
        } else {
            return new TypeInformation(this.specification, this.pointers);
        }
    }

    // @ts-ignore
    visitDirectDeclarator(ctx: DirectDeclaratorContext): VariableDeclaration {
        if (ctx.Identifier() && !ctx.DigitSequence()) { // Final identifier
            return new VariableDeclaration(ctx.Identifier().symbol.text, this.make_type_information());
        } else if (ctx.declarator()) { // Declarator in brackets
            return ctx.declarator().accept(this);
        } else if (ctx.LeftBracket()) {
            throw new UnknownDefinitionError("Arrays of any type not supported");
        } else if (ctx.vcSpecificModifier()) {
            throw new UnknownDefinitionError("Visual C extensions not supported");
        } else if (ctx.Identifier()) {
            throw new UnknownDefinitionError("Bit fields not supported")
        } else if (ctx.identifierList()) {
            throw new UnknownDefinitionError("Identifier lists not supporter")
        } else if (ctx.parameterTypeList() || ctx.LeftParen()) { // Function definition (Could be a pointer)
            if (this.is_function) {
                throw new UnknownDefinitionError("A function cannot return another function");
            }
            this.is_function = true;
            return ctx.directDeclarator().accept(this);
        }
    }
}