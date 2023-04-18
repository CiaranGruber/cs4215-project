import CVisitor from "../../../parser/antlr_gen/CVisitor";
import {TypeQualifierType} from "../../../type_descriptions/type_qualifier/TypeQualifier";
import {TypeQualifierContext} from "../../../parser/antlr_gen/CParser";
import {UnknownDefinitionError} from "../../ExplicitControlListener";

/**
 * Scans for the type qualifier and returns the type
 * @param ctx The context for the type qualifiers
 */
export function scan_type_qualifier(ctx: TypeQualifierContext): TypeQualifierType {
    return ctx.accept(new TypeQualifierScanner());
}


class TypeQualifierScanner extends CVisitor<TypeQualifierType> {
    // @ts-ignore
    visitTypeQualifier(ctx: TypeQualifierContext) {
        if (ctx.Const()) {
            return TypeQualifierType.CONST;
        } else if (ctx.Restrict()) {
            throw new UnknownDefinitionError("Restrict qualifier is not supported");
        } else if (ctx.Volatile()) {
            throw new UnknownDefinitionError("Volatile qualifier is not supported");
        }
        throw new UnknownDefinitionError("_Atomic qualifier is not supported");
    }
}