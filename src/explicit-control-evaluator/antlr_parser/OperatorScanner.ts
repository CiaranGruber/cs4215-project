import CVisitor from "../../parser/antlr_gen/CVisitor";
import {AssignmentOperatorContext} from "../../parser/antlr_gen/CParser";

export enum AssignmentOperator {
    ASSIGN,
    MULTIPLY_ASSIGN,
    DIVIDE_ASSIGN,
    MODULO_ASSIGN,
    PLUS_ASSIGN,
    MINUS_ASSIGN,
    LEFT_SHIFT_ASSIGN,
    RIGHT_SHIFT_ASSIGN,
    BIT_AND_ASSIGN,
    BIT_XOR_ASSIGN,
    BIT_OR_ASSIGN
}

export enum BinopOperator {
    MULTIPLY,
    DIVIDE,
    MODULO,
    PLUS,
    MINUS,
    LEFT_SHIFT,
    RIGHT_SHIFT,
    BIT_AND,
    BIT_XOR,
    BIT_OR
}

const assign_to_binop = new Map<AssignmentOperator, BinopOperator>([
    [AssignmentOperator.MULTIPLY_ASSIGN, BinopOperator.MULTIPLY],
    [AssignmentOperator.DIVIDE_ASSIGN, BinopOperator.DIVIDE],
    [AssignmentOperator.MODULO_ASSIGN, BinopOperator.MODULO],
    [AssignmentOperator.PLUS_ASSIGN, BinopOperator.PLUS],
    [AssignmentOperator.MINUS_ASSIGN, BinopOperator.MINUS],
    [AssignmentOperator.LEFT_SHIFT_ASSIGN, BinopOperator.LEFT_SHIFT],
    [AssignmentOperator.RIGHT_SHIFT_ASSIGN, BinopOperator.RIGHT_SHIFT],
    [AssignmentOperator.BIT_AND_ASSIGN, BinopOperator.BIT_AND],
    [AssignmentOperator.BIT_XOR_ASSIGN, BinopOperator.BIT_XOR],
    [AssignmentOperator.BIT_OR_ASSIGN, BinopOperator.BIT_OR]
]);

export function convert_assign_to_binop(operator: AssignmentOperator): BinopOperator {
    if (operator === AssignmentOperator.ASSIGN) {
        return undefined;
    }
    return assign_to_binop.get(operator);
}

export function get_assign_operator(ctx: AssignmentOperatorContext): AssignmentOperator {
    return ctx.accept(new AssignmentOperatorVisitor());
}

class AssignmentOperatorVisitor extends CVisitor<AssignmentOperator> {
    // @ts-ignore
    visitAssignmentOperator(ctx: AssignmentOperatorContext) {
        if (ctx.Assign() !== null) {
            return AssignmentOperator.ASSIGN;
        } else if (ctx.StarAssign() !== null) {
            return AssignmentOperator.MULTIPLY_ASSIGN;
        } else if (ctx.DivAssign() !== null) {
            return AssignmentOperator.DIVIDE_ASSIGN;
        } else if (ctx.ModAssign() !== null) {
            return AssignmentOperator.MODULO_ASSIGN;
        } else if (ctx.PlusAssign() !== null) {
            return AssignmentOperator.PLUS_ASSIGN;
        } else if (ctx.MinusAssign() !== null) {
            return AssignmentOperator.MINUS_ASSIGN;
        } else if (ctx.LeftShiftAssign() !== null) {
            return AssignmentOperator.LEFT_SHIFT_ASSIGN;
        } else if (ctx.RightShiftAssign() !== null) {
            return AssignmentOperator.RIGHT_SHIFT_ASSIGN;
        } else if (ctx.AndAssign() !== null) {
            return AssignmentOperator.BIT_AND_ASSIGN;
        } else if (ctx.XorAssign() !== null) {
            return AssignmentOperator.BIT_XOR_ASSIGN;
        }
        return AssignmentOperator.BIT_OR_ASSIGN;
    }
}