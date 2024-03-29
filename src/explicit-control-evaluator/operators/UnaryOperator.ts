import CValue from "../CValue";
import {UnknownDefinitionError} from "../ExplicitControlListener";
import CMemory from "../../heap/CMemory";

/**
 * Represents a unary operator in C including postfix operators
 */
export enum UnaryOperator {
    NOT,
    REF,
    DEREF,
    PLUS,
    NEGATE,
    BIT_NOT,
    POST_PLUS_PLUS,
    POST_MINUS_MINUS
}

function complex_unary_operation(value: CValue, operator: UnaryOperator, memory: CMemory): CValue {
    // Todo: Perform correct type-checking of values similar to binary operators
    let buffer: ArrayBuffer;
    switch (operator) {
        case UnaryOperator.NEGATE:
            throw new UnknownDefinitionError("Negation of values not yet supported");
        case UnaryOperator.BIT_NOT:
            buffer = value.get_value(memory).referenced_buffer;
            new Uint8Array(buffer).set(new Uint8Array(buffer).map((value) => ~value));
            return new CValue(false, value.type_information, buffer);
        case UnaryOperator.NOT:
            buffer = value.get_value(memory).referenced_buffer;
            // Determine current state
            let is_true = false;
            new Uint8Array(buffer).forEach((value) => {
                if (value !== 0) {
                    is_true = true;
                }
            });
            // Flip state
            buffer = new ArrayBuffer(buffer.byteLength);
            if (!is_true) {
                new DataView(buffer).setUint8(buffer.byteLength - 1, 1);
            }
            // Push to stash
            return new CValue(false, value.type_information, buffer);
    }
    throw new UnknownDefinitionError("Unknown Unary Operator");
}

/**
 * Performs a unary operation of a given value using the specified operator
 * @param value The value to perform the operation on
 * @param operator The operator to use
 * @param memory The C memory that is used within the program
 */
export default function perform_unary_operation(value: CValue, operator: UnaryOperator, memory: CMemory): CValue {
    switch (operator) {
        case UnaryOperator.REF:
            return value.ref();
        case UnaryOperator.DEREF:
            return value.deref(memory);
        default:
            return complex_unary_operation(value, operator, memory);
    }
}