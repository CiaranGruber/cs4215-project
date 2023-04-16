import CVisitor from "../../parser/antlr_gen/CVisitor";
import DeclarationSpecifier, {
    TypeQualDeclarationSpecifier,
    TypeSpecDeclarationSpecifier
} from "../../type_descriptions/DeclarationSpecifier";
import {
    DeclarationSpecifierContext,
    DeclarationSpecifiersContext,
    TypeQualifierContext,
    TypeSpecifierContext
} from "../../parser/antlr_gen/CParser";
import {BuiltInTypeSpecifierEnum} from "../../type_descriptions/type_specifier/TypeSpecifier";
import {BuiltInTypeSpecifierType} from "../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import {TypeQualifierType} from "../../type_descriptions/type_qualifier/TypeQualifier";
import {UnknownDefinitionError} from "./ExplicitControlListener";
import DeclarationSpecification from "../../type_descriptions/DeclarationSpecification";

export default class DeclarationSpecificationVisitor extends CVisitor<DeclarationSpecification> {
    /**
     * Visits the declaration specifiers and returns the relevant type information
     * @param ctx The context for the declaration specifiers
     */
    // @ts-ignore
    visitDeclarationSpecifiers(ctx: DeclarationSpecifiersContext) {
        if (ctx.declarationSpecifier_list() !== null) { // Standard declaration list
            // Get declaration specifier information
            let specifiers = new Array<DeclarationSpecifier>();
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
        if (ctx.typeSpecifier() !== null) { // Get the type specifier
            return ctx.typeSpecifier().accept(new TypeSpecifierVisitor());
        } else if (ctx.typeQualifier() !== null) {
            return ctx.typeQualifier().accept(new TypeQualifierVisitor())
            // Todo: Type qualifier
        }
        throw new UnknownDefinitionError("Unknown type definition");
    }
}

class TypeSpecifierVisitor extends CVisitor<DeclarationSpecifier> {
    /**
     * Visits the type specifier and returns the appropriate declaration specifier
     * @param ctx The context for the type specifier
     */
    // @ts-ignore
    visitTypeSpecifier(ctx: TypeSpecifierContext) {
        // Gets the appropriate type specifier
        if (ctx.Void() !== null) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.VOID));
        } else if (ctx.Char() !== null) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.CHAR));
        } else if (ctx.Short() !== null) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.SHORT));
        } else if (ctx.Int() !== null) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.INT));
        } else if (ctx.Long() !== null) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.LONG));
        } else if (ctx.Float() !== null) {
            // Todo: Add float
        } else if (ctx.Double() !== null) {
            // Todo: Add double
        } else if (ctx.Signed() !== null) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.SIGNED));
        } else if (ctx.Unsigned() !== null) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.UNSIGNED));
        } else if (ctx.Bool() !== null) {
            return new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType._BOOL));
        }
        throw new UnknownDefinitionError(`The type specifier '${ctx.getText()}' is not recognised`);
    }
}

class TypeQualifierVisitor extends CVisitor<DeclarationSpecifier> {
    /**
     * Visits the type qualifier and returns the appropriate declaration specifier
     * @param ctx The context for the type specifier
     */
    // @ts-ignore
    visitTypeQualifier(ctx: TypeQualifierContext) {
        if (ctx.Const() !== null) {
            return new TypeQualDeclarationSpecifier(TypeQualifierType.CONST);
        }
        // Gets the appropriate type specifier
        throw new UnknownDefinitionError(`The type qualifier '${ctx.getText()}' is not recognised`);
    }
}