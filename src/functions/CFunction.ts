/**
 * CFunction
 *
 * The function object used to run a function with the C antlr_parser
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import CValue from "../explicit-control-evaluator/CValue";
import CMemory from "../heap/CMemory";

/**
 * The function object used to run a function with the C antlr_parser
 */
export default abstract class CFunction {
    /**
     * Runs the given function using the required parameters
     * @param memory The C Memory which the function may modify
     * @param args The arguments for the function
     */
    public abstract run(memory: CMemory, args: Array<CValue>): CValue;
}

/**
 * Thrown when the number of arguments passed into a function are not enough
 */
export class InvalidArgumentCountError extends Error {
    /**
     * Constructs a new InvalidArgumentCountError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "InvalidArgumentCountError";
    }
}