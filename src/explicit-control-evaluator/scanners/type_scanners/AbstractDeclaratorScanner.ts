import {AbstractDeclaratorContext, DirectAbstractDeclaratorContext} from "../../../parser/antlr_gen/CParser";
import CVisitor from "../../../parser/antlr_gen/CVisitor";
import TypeInformation from "../../../type_descriptions/TypeInformation";
import DeclarationSpecification from "../../../type_descriptions/DeclarationSpecification";
import QualifiedPointer from "../../../type_descriptions/QualifiedPointer";
import {scan_pointers} from "./PointerScanner";
import {UnknownDefinitionError} from "../../ExplicitControlListener";

/**
 * Scans for an abstract declarator to get the specified type
 * @param ctx The abstract declarator context
 * @param specification The declaration specification of the type to determine
 */
export function scan_abstract_declaration(ctx: AbstractDeclaratorContext, specification: DeclarationSpecification) {
    return ctx.accept(new AbstractDeclaratorScanner(specification));
}

class AbstractDeclaratorScanner extends CVisitor<TypeInformation> {
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
    visitAbstractDeclarator(ctx: AbstractDeclaratorContext): TypeInformation {
        if (ctx.pointer()) {
            if (this.is_function) {
                this.function_pointers.push(...scan_pointers(ctx.pointer()));
            } else {
                this.pointers.push(...scan_pointers(ctx.pointer()));
            }
        }
        if (!ctx.directAbstractDeclarator()) {
            return this.make_type_information();
        }
        return ctx.directAbstractDeclarator().accept(this);
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
    visitDirectAbstractDeclarator(ctx: DirectAbstractDeclaratorContext): TypeInformation {
        if (ctx.abstractDeclarator()) { // Declarator in brackets
            return ctx.abstractDeclarator().accept(this);
        } else if (ctx.parameterTypeList()) { // Function prototype
            if (this.is_function) {
                throw new UnknownDefinitionError("A function cannot return another function");
            }
            this.is_function = true;
        } else if (ctx.Star()) { // Variable size array
            throw new UnknownDefinitionError("Variable size arrays (for abstract declarators) not supported");
        } else if (!ctx.Static()) { // Static abstract declarator
            throw new UnknownDefinitionError("Static abstract declarators not supported");
        } else { // Array of specified size
            throw new UnknownDefinitionError("Arrays not supported");
        }
        // Make type information if finished processing
        if (!ctx.directAbstractDeclarator()) {
            return this.make_type_information();
        }
        // Keep processing
        return ctx.directAbstractDeclarator().accept(this);
    }
}