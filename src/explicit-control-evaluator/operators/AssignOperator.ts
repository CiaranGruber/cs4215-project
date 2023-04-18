import {BinaryOperator} from "./BinaryOperator";

/**
 * Represents the potential assignment operators in a C program
 */
export enum AssignmentOperator {
    ASSIGN,
    MULTIPLY_ASSIGN,
    DIVIDE_ASSIGN,
    MODULO_ASSIGN,
    PLUS_ASSIGN,
    SUBTRACT_ASSIGN,
    LEFT_SHIFT_ASSIGN,
    RIGHT_SHIFT_ASSIGN,
    BIT_AND_ASSIGN,
    BIT_XOR_ASSIGN,
    BIT_OR_ASSIGN
}

const assign_to_binop = new Map<AssignmentOperator, BinaryOperator>([
    [AssignmentOperator.MULTIPLY_ASSIGN, BinaryOperator.MULTIPLY],
    [AssignmentOperator.DIVIDE_ASSIGN, BinaryOperator.DIVIDE],
    [AssignmentOperator.MODULO_ASSIGN, BinaryOperator.MODULO],
    [AssignmentOperator.PLUS_ASSIGN, BinaryOperator.PLUS],
    [AssignmentOperator.SUBTRACT_ASSIGN, BinaryOperator.SUBTRACT],
    [AssignmentOperator.LEFT_SHIFT_ASSIGN, BinaryOperator.LEFT_SHIFT],
    [AssignmentOperator.RIGHT_SHIFT_ASSIGN, BinaryOperator.RIGHT_SHIFT],
    [AssignmentOperator.BIT_AND_ASSIGN, BinaryOperator.BIT_AND],
    [AssignmentOperator.BIT_XOR_ASSIGN, BinaryOperator.BIT_XOR],
    [AssignmentOperator.BIT_OR_ASSIGN, BinaryOperator.BIT_OR]
]);

/**
 * Converts an assign operator to a binary operator (removing the assign instruction)
 * @param operator The assign operator to change
 */
export function convert_assign_to_binop(operator: AssignmentOperator): BinaryOperator {
    if (operator === AssignmentOperator.ASSIGN) {
        return undefined;
    }
    return assign_to_binop.get(operator);
}