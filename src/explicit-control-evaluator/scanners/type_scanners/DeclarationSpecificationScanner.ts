import CVisitor from "../../../parser/antlr_gen/CVisitor";
import DeclarationSpecifier from "../../../type_descriptions/DeclarationSpecifier";
import {DeclarationSpecifierContext, DeclarationSpecifiersContext} from "../../../parser/antlr_gen/CParser";
import {UnknownDefinitionError} from "../../ExplicitControlListener";
import DeclarationSpecification from "../../../type_descriptions/DeclarationSpecification";
import scan_for_declaration_specifier from "./TypeSpecifierScanner";

/**
 * Scans a declaration specifier list to
 * @param ctx
 */
export default function scan_declaration_specification(ctx: DeclarationSpecifiersContext) {
    return ctx.accept(new DeclarationSpecificationScanner());
}

class DeclarationSpecificationScanner extends CVisitor<DeclarationSpecification> {
    /**
     * Visits the declaration specifiers and returns the relevant type information
     * @param ctx The context for the declaration specifiers
     */
    // @ts-ignore
    visitDeclarationSpecifiers(ctx: DeclarationSpecifiersContext) {
        if (ctx.declarationSpecifier_list()) { // Standard declaration list
            // Get declaration specifier information
            let specifiers: Array<DeclarationSpecifier> = [];
            ctx.declarationSpecifier_list().forEach((value) => {
                const declaration_specifier_visitor = new DeclarationSpecifierVisitor();
                specifiers.push(value.accept(declaration_specifier_visitor));
            });
            return DeclarationSpecification.from_specifiers(specifiers);
        }
        throw new UnknownDefinitionError("Unknown declaration type");
    }
}

class DeclarationSpecifierVisitor extends CVisitor<DeclarationSpecifier> {
    /**
     * Visits the declaration specifiers and returns the declaration specifier
     * @param ctx The context for the declaration specifiers
     */
    // @ts-ignore
    visitDeclarationSpecifier(ctx: DeclarationSpecifierContext) {
        if (ctx.typeSpecifier()) { // Get the type specifier
            return scan_for_declaration_specifier(ctx.typeSpecifier());
        } else if (ctx.typeQualifier()) {
            return scan_for_declaration_specifier(ctx.typeQualifier());
        }
        throw new UnknownDefinitionError("Unknown type definition");
    }
}