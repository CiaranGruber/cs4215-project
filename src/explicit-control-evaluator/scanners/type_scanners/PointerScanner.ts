import CVisitor from "../../../parser/antlr_gen/CVisitor";
import QualifiedPointer from "../../../type_descriptions/QualifiedPointer";
import {PointerContext, TypeQualifierListContext} from "../../../parser/antlr_gen/CParser";
import TypeQualifier, {
    build_qualifier,
    TypeQualifierType
} from "../../../type_descriptions/type_qualifier/TypeQualifier";
import {scan_type_qualifier} from "./TypeQualifierScanner";

/**
 * Scans the pointer context to collect into a list of qualified pointers
 * @param ctx The pointer context to search from
 */
export function scan_pointers(ctx: PointerContext): Array<QualifiedPointer> {
    return ctx.accept(new PointerScanner());
}


class PointerScanner extends CVisitor<Array<QualifiedPointer>> {
    // @ts-ignore
    visitPointer(ctx: PointerContext) {
        // Get the current pointer
        const type_qualifier = ctx.typeQualifierList() ? ctx.typeQualifierList().accept(new TypeQualifierListScanner())
            : build_qualifier([]);
        const pointers = [new QualifiedPointer(type_qualifier)];

        // Add any additional pointers
        if (ctx.pointer()) {
            pointers.push(...ctx.pointer().accept(this));
        }

        // Return qualified pointer array
        return pointers;
    }
}

class TypeQualifierListScanner extends CVisitor<TypeQualifier> {
    // @ts-ignore
    visitTypeQualifierList(ctx: TypeQualifierListContext) {
        const qualifiers: Array<TypeQualifierType> = [];
        ctx.typeQualifier_list().forEach((value) => {
            qualifiers.push(scan_type_qualifier(value));
        });
        return build_qualifier(qualifiers);
    }
}