import {DeclarationContext} from "../../../parser/antlr_gen/CParser";
import VariableDeclaration from "../../VariableDeclaration";
import CVisitor from "../../../parser/antlr_gen/CVisitor";
import {UnknownDefinitionError} from "../../ExplicitControlListener";
import scan_declaration_specification from "../type_scanners/DeclarationSpecificationScanner";
import scan_for_init_declarations from "./InitDeclaratorListScanner";

/**
 * Scans a given translation unit for the external declarations within the program
 * @param ctx The translation unit context
 */
export default function scan_declaration(ctx: DeclarationContext): Array<VariableDeclaration> {
    return ctx.accept(new DeclarationScanner());
}

class DeclarationScanner extends CVisitor<Array<VariableDeclaration>> {
    // @ts-ignore
    visitDeclaration(ctx: DeclarationContext): Array<VariableDeclaration> {
        if (ctx.staticAssertDeclaration()) {
            throw new UnknownDefinitionError("Static assert declarations not supported");
        }
        const specification = scan_declaration_specification(ctx.declarationSpecifiers());
        return scan_for_init_declarations(specification, ctx.initDeclaratorList());
    }
}