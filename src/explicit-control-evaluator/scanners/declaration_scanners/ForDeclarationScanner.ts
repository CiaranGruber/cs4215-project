import {ForDeclarationContext} from "../../../parser/antlr_gen/CParser";
import VariableDeclaration from "../../VariableDeclaration";
import CVisitor from "../../../parser/antlr_gen/CVisitor";
import scan_declaration_specification from "../type_scanners/DeclarationSpecificationScanner";
import scan_for_init_declarations from "./InitDeclaratorListScanner";

/**
 * Scans the for declaration to get the specific variable declarations
 * @param ctx The for declaration context
 */
export default function scan_for_declaration(ctx: ForDeclarationContext): Array<VariableDeclaration> {
    return ctx.accept(new ForDeclarationScanner());
}

class ForDeclarationScanner extends CVisitor<Array<VariableDeclaration>> {
    // @ts-ignore
    visitForDeclaration(ctx: ForDeclarationContext) {
        const specification = scan_declaration_specification(ctx.declarationSpecifiers());
        return scan_for_init_declarations(specification, ctx.initDeclaratorList());
    }
}