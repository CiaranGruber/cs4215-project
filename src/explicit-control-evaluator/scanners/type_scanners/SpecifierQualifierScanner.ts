import {SpecifierQualifierListContext} from "../../../parser/antlr_gen/CParser";
import DeclarationSpecifier from "../../../type_descriptions/DeclarationSpecifier";
import CVisitor from "../../../parser/antlr_gen/CVisitor";
import DeclarationSpecification from "../../../type_descriptions/DeclarationSpecification";
import scan_for_declaration_specifier from "./TypeSpecifierScanner";

/**
 * Scans for a specifier/qualifier combination
 * @param ctx
 */
export default function scan_spec_qual_list(ctx: SpecifierQualifierListContext): DeclarationSpecification {
    const specifiers = ctx.accept(new SpecifierQualifierScanner());
    return DeclarationSpecification.from_specifiers(specifiers);
}

class SpecifierQualifierScanner extends CVisitor<Array<DeclarationSpecifier>> {
    // @ts-ignore
    visitSpecifierQualifierList(ctx: SpecifierQualifierListContext) {
        const specifier_array: Array<DeclarationSpecifier> = [];
        // Add the declaration specifier
        if (ctx.typeSpecifier()) {
            specifier_array.push(scan_for_declaration_specifier(ctx.typeSpecifier()));
        } else if (ctx.typeQualifier()) {
            specifier_array.push(scan_for_declaration_specifier(ctx.typeQualifier()));
        }
        // Add any other specifiers
        if (ctx.specifierQualifierList()) {
            specifier_array.push(...ctx.specifierQualifierList().accept(this));
        }
        return specifier_array;
    }
}