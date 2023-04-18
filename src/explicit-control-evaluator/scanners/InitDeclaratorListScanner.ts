import CVisitor from "../../parser/antlr_gen/CVisitor";
import VariableDeclaration from "../VariableDeclaration";
import DeclarationSpecification from "../../type_descriptions/DeclarationSpecification";
import {
    DeclaratorContext,
    DirectDeclaratorContext,
    InitDeclaratorContext,
    InitDeclaratorListContext
} from "../../parser/antlr_gen/CParser";
import QualifiedPointer from "../../type_descriptions/QualifiedPointer";
import {UnknownDefinitionError} from "../ExplicitControlListener";
import TypeInformation from "../../type_descriptions/TypeInformation";
import {scan_pointers} from "./type_scanners/PointerScanner";

export default function scan_for_declarations(declaration_specification: DeclarationSpecification,
                                      context: InitDeclaratorListContext): Array<VariableDeclaration> {
    return context.accept(new InitDeclaratorListScanner(declaration_specification));
}

class InitDeclaratorListScanner extends CVisitor<Array<VariableDeclaration>> {
    private readonly specification: DeclarationSpecification;

    public constructor(specification: DeclarationSpecification) {
        super();
        this.specification = specification;
    }

    // @ts-ignore
    visitInitDeclaratorList(ctx: InitDeclaratorListContext) {
        const declarations: Array<VariableDeclaration> = [];
        ctx.initDeclarator_list().forEach((value) => {
            const scanner = new InitDeclaratorScanner(this.specification);
            declarations.push(value.accept(scanner));
        });
        return declarations;
    }
}

class InitDeclaratorScanner extends CVisitor<VariableDeclaration> {
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
    visitInitDeclarator(ctx: InitDeclaratorContext): VariableDeclaration {
        const declaration = ctx.declarator().accept(this);
        // Ensure it is not assigning to a function
        if (ctx.Assign() && declaration.type_information.is_function) {
            throw new UnknownDefinitionError("Cannot initialise a function like a variable");
        }
        return declaration;
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
            return new VariableDeclaration(this.make_type_information(), ctx.Identifier().symbol.text);
        }
        if (ctx.declarator()) { // Declarator in brackets
            return ctx.declarator().accept(this);
        }
        if (ctx.parameterTypeList()) { // Function definition (Could be a pointer)
            if (this.is_function) {
                throw new UnknownDefinitionError("A function cannot return another function");
            }
            this.is_function = true;
            return ctx.directDeclarator().accept(this);
        }
    }
}