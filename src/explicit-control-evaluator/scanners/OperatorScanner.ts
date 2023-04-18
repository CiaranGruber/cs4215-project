import CVisitor from "../../parser/antlr_gen/CVisitor";
import {AssignmentOperatorContext, UnaryOperatorContext} from "../../parser/antlr_gen/CParser";
import {UnaryOperator} from "../operators/UnaryOperator";
import {AssignmentOperator} from "../operators/AssignOperator";

export function get_assign_operator(ctx: AssignmentOperatorContext): AssignmentOperator {
    return ctx.accept(new AssignmentOperatorVisitor());
}

export function get_unary_operator(ctx: UnaryOperatorContext): UnaryOperator {
    return ctx.accept(new UnaryOperatorVisitor());
}

class AssignmentOperatorVisitor extends CVisitor<AssignmentOperator> {
    // @ts-ignore
    visitAssignmentOperator(ctx: AssignmentOperatorContext) {
        if (ctx.Assign()) {
            return AssignmentOperator.ASSIGN;
        } else if (ctx.StarAssign()) {
            return AssignmentOperator.MULTIPLY_ASSIGN;
        } else if (ctx.DivAssign()) {
            return AssignmentOperator.DIVIDE_ASSIGN;
        } else if (ctx.ModAssign()) {
            return AssignmentOperator.MODULO_ASSIGN;
        } else if (ctx.PlusAssign()) {
            return AssignmentOperator.PLUS_ASSIGN;
        } else if (ctx.MinusAssign()) {
            return AssignmentOperator.SUBTRACT_ASSIGN;
        } else if (ctx.LeftShiftAssign()) {
            return AssignmentOperator.LEFT_SHIFT_ASSIGN;
        } else if (ctx.RightShiftAssign()) {
            return AssignmentOperator.RIGHT_SHIFT_ASSIGN;
        } else if (ctx.AndAssign()) {
            return AssignmentOperator.BIT_AND_ASSIGN;
        } else if (ctx.XorAssign()) {
            return AssignmentOperator.BIT_XOR_ASSIGN;
        }
        return AssignmentOperator.BIT_OR_ASSIGN;
    }
}

class UnaryOperatorVisitor extends CVisitor<UnaryOperator> {
    // @ts-ignore
    visitUnaryOperator(ctx: UnaryOperatorContext) {
        if (ctx.And()) {
            return UnaryOperator.REF;
        } else if (ctx.Star()) {
            return UnaryOperator.DEREF;
        } else if (ctx.Plus()) {
            return UnaryOperator.PLUS;
        } else if (ctx.Minus()) {
            return UnaryOperator.NEGATE;
        } else if (ctx.Tilde()) {
            return UnaryOperator.BIT_NOT;
        }
        return UnaryOperator.NOT;
    }
}