import CVisitor from "../../parser/antlr_gen/CVisitor";
import VariableDeclaration from "../VariableDeclaration";
import {
    ExternalDeclarationContext,
    FunctionDefinitionContext,
    TranslationUnitContext
} from "../../parser/antlr_gen/CParser";
import {UnknownDefinitionError} from "../ExplicitControlListener";
import scan_declaration_specification from "./type_scanners/DeclarationSpecificationScanner";
import DeclarationSpecification from "../../type_descriptions/DeclarationSpecification";
import scan_declarator from "./declaration_scanners/DeclaratorScanner";
import scan_declaration from "./declaration_scanners/DeclarationScanner";

/**
 * Scans a given translation unit for the external declarations within the program
 * @param ctx The translation unit context
 */
export default function scan_for_external_declarations(ctx: TranslationUnitContext): Array<VariableDeclaration> {
    return ctx.accept(new TranslationUnitScanner());
}

class TranslationUnitScanner extends CVisitor<Array<VariableDeclaration>> {
    // @ts-ignore
    visitTranslationUnit(ctx: TranslationUnitContext): Array<VariableDeclaration> {
        const declarations: Array<VariableDeclaration> = [];
        ctx.externalDeclaration_list().forEach((value) => declarations.push(...value.accept(this)));
        return declarations;
    }

    // @ts-ignore
    visitExternalDeclaration(ctx: ExternalDeclarationContext): Array<VariableDeclaration> {
        const declarations: Array<VariableDeclaration> = [];
        if (ctx.functionDefinition()) {
            declarations.push(ctx.functionDefinition().accept(new FunctionDefinitionScanner()));
        } else if (ctx.declaration()) {
            declarations.push(...scan_declaration(ctx.declaration()));
        } else if (ctx.Semi()) {
            throw new UnknownDefinitionError("Unknown definition in External Declaration");
        }
        return declarations;
    }
}

class FunctionDefinitionScanner extends CVisitor<VariableDeclaration> {
    // @ts-ignore
    visitFunctionDefinition(ctx: FunctionDefinitionContext): VariableDeclaration {
        // Get specifiers
        let specification: DeclarationSpecification;
        if (ctx.declarationSpecifiers()) {
            specification = scan_declaration_specification(ctx.declarationSpecifiers());
        } else {
            console.log("Warning: Function definition type defaults to 'int' without specifiers");
            specification = DeclarationSpecification.default();
        }
        // Get declarator
        return scan_declarator(ctx.declarator(), specification);
    }
}