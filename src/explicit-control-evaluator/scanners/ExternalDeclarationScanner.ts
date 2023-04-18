import CVisitor from "../../parser/antlr_gen/CVisitor";
import VariableDeclaration from "../VariableDeclaration";
import {DeclarationContext, ExternalDeclarationContext, TranslationUnitContext} from "../../parser/antlr_gen/CParser";
import {UnknownDefinitionError} from "../ExplicitControlListener";
import scan_declaration_specification from "./type_scanners/DeclarationSpecificationScanner";
import scan_for_declarations from "./InitDeclaratorListScanner";

/**
 * Scans a given translation unit for the external declarations within the program
 * @param ctx The translation unit context
 */
export default function scan_for_external_declarations(ctx: TranslationUnitContext) {
    return ctx.accept(new TranslationUnitScanner());
}

class TranslationUnitScanner extends CVisitor<Array<VariableDeclaration>> {
    private readonly declarations: Array<VariableDeclaration>;

    public constructor() {
        super();
        this.declarations = [];
    }

    // @ts-ignore
    visitTranslationUnit(ctx: TranslationUnitContext) {
        ctx.externalDeclaration_list().forEach((value) => value.accept(this));
        return this.declarations;
    }

    // @ts-ignore
    visitExternalDeclaration(ctx: ExternalDeclarationContext) {
        if (ctx.functionDefinition()) {
            // Todo: Scan function definition
        } else if (ctx.declaration()) {
            ctx.declaration().accept(this);
        } else if (ctx.Semi()) {
            throw new UnknownDefinitionError("Unknown definition in External Declaration");
        }
        return this.declarations;
    }

    // @ts-ignore
    visitDeclaration(ctx: DeclarationContext) {
        if (ctx.staticAssertDeclaration()) {
            throw new UnknownDefinitionError("Static assert declarations not supported");
        }
        const specification = scan_declaration_specification(ctx.declarationSpecifiers());
        const declarations = scan_for_declarations(specification, ctx.initDeclaratorList());
        this.declarations.push(...declarations);
        return this.declarations;
    }
}