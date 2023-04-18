import {TypeQualifierContext, TypeSpecifierContext} from "../../../parser/antlr_gen/CParser";
import DeclarationSpecifier, {
    TypeQualDeclarationSpecifier,
    TypeSpecDeclarationSpecifier
} from "../../../type_descriptions/DeclarationSpecifier";
import CVisitor from "../../../parser/antlr_gen/CVisitor";
import {BuiltInTypeSpecifierEnum} from "../../../type_descriptions/type_specifier/TypeSpecifier";
import {
    BuiltInTypeSpecifierType
} from "../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import {UnknownDefinitionError} from "../../ExplicitControlListener";
import {scan_type_qualifier} from "./TypeQualifierScanner";

/**
 * Scans for a given declaration specifier
 * @param ctx The context for either the type specifier or type qualifier
 */
export default function scan_for_declaration_specifier(ctx: TypeSpecifierContext | TypeQualifierContext): DeclarationSpecifier {
    return ctx.accept(new DeclarationSpecifierScanner());
}

class DeclarationSpecifierScanner extends CVisitor<DeclarationSpecifier> {
    /**
     * Visits the type specifier and returns the appropriate declaration specifier
     * @param ctx The context for the type specifier
     */
    // @ts-ignore
    visitTypeSpecifier(ctx: TypeSpecifierContext) {
        // Gets the appropriate type specifier
        if (ctx.Void()) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.VOID));
        } else if (ctx.Char()) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.CHAR));
        } else if (ctx.Short()) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.SHORT));
        } else if (ctx.Int()) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.INT));
        } else if (ctx.Long()) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.LONG));
        } else if (ctx.Float()) {
            // Todo: Add float
        } else if (ctx.Double()) {
            // Todo: Add double
        } else if (ctx.Signed()) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.SIGNED));
        } else if (ctx.Unsigned()) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.UNSIGNED));
        } else if (ctx.Bool()) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType._BOOL));
        }
        throw new UnknownDefinitionError(`The type specifier '${ctx.getText()}' is not recognised`);
    }

    /**
     * Visits the type qualifier and returns the appropriate declaration specifier
     * @param ctx The context for the type specifier
     */
    // @ts-ignore
    visitTypeQualifier(ctx: TypeQualifierContext) {
        return new TypeQualDeclarationSpecifier(scan_type_qualifier(ctx));
    }
}