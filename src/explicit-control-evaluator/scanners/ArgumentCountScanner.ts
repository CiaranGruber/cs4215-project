import {ArgumentExpressionListContext} from "../../parser/antlr_gen/CParser";
import CVisitor from "../../parser/antlr_gen/CVisitor";

/**
 * Scans for the number of arguments within an argument expression list
 * @param ctx The argument expression list context
 */
export default function scan_for_argument_count(ctx: ArgumentExpressionListContext): number {
    return ctx.accept(new ArgumentCountScanner());
}

class ArgumentCountScanner extends CVisitor<number> {
    // @ts-ignore
    visitArgumentExpressionList(ctx: ArgumentExpressionListContext) {
        return ctx.assignmentExpression_list().length;
    }
}