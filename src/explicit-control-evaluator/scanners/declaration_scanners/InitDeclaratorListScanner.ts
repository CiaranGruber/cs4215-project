import CVisitor from "../../../parser/antlr_gen/CVisitor";
import VariableDeclaration from "../../VariableDeclaration";
import DeclarationSpecification from "../../../type_descriptions/DeclarationSpecification";
import {InitDeclaratorContext, InitDeclaratorListContext} from "../../../parser/antlr_gen/CParser";
import {UnknownDefinitionError} from "../../ExplicitControlListener";
import scan_declarator from "./DeclaratorScanner";

/**
 * Scans for potentially initialised declarations
 * @param declaration_specification The specification for the declaration
 * @param context The context for the scanner
 */
export default function scan_for_init_declarations(declaration_specification: DeclarationSpecification,
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

    public constructor(specification: DeclarationSpecification) {
        super();
        this.specification = specification;
    }

    // @ts-ignore
    visitInitDeclarator(ctx: InitDeclaratorContext): VariableDeclaration {
        const declaration = scan_declarator(ctx.declarator(), this.specification);
        // Ensure it is not assigning to a function
        if (ctx.Assign() && declaration.type_information.is_function) {
            throw new UnknownDefinitionError("Cannot initialise a function like a variable");
        }
        return declaration;
    }
}