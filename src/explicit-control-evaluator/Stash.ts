/**
 * Operating Stack.
 *
 * Used by the C evaluator to store values for later use
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

import Heap from "./Heap";
import ExplicitControlEvaluator from "./ExplicitControlEvaluator";
import {Pointer, wrap_pointer_buffer} from "./CValue";

/**
 * A value in the stash
 */
export class SVal {
    private _value: ArrayBuffer;
    private pointer_depth: number;
    private data_size: number;

    /**
     * Initialises a new Stash literal
     * @param value The value to put in the stash
     */
    constructor(value: ArrayBuffer);

    /**
     * Initialises a new Stash pointer with the specified values
     * @param value The pointer buffer to put in the stash
     * @param pointer_depth The pointer depth to record (how many times to allow dereferencing)
     * @param data_size The size of the data that is dereferenced
     */
    constructor(value: ArrayBuffer, pointer_depth: number, data_size: number);

    /**
     * Initialises a new Stash value with the specified values
     * @param value The value to store in the stash
     * @param pointer_depth The current pointer depth of the value with -1 specifying literals
     * @param data_size The size of the data used for dereferencing if it is required
     */
    constructor(value: ArrayBuffer, pointer_depth?: number, data_size?: number) {
        this._value = value;
        this.pointer_depth = pointer_depth;
        this.data_size = data_size;
    }

    /**
     * Gets the main address for the stash value
     * The explicit control evaluator used if the value is a pointer
     */
    public value(evaluator: ExplicitControlEvaluator): ArrayBuffer {
        if (this.pointer_depth === -1) { // Value is a literal
            return this._value;
        }
        // Return value that the pointer points to
        const pointer = wrap_pointer_buffer(this._value, this.data_size) as Pointer<ExplicitControlEvaluator>
        return pointer.get_value(evaluator);
    }

    /**
     * Gets a stash value used to represent the dereferenced version of the current one
     */
    public deref(evaluator: ExplicitControlEvaluator): SVal {
        if (this.pointer_depth <= 0) {
            throw new Error("Cannot dereference a literal");
        }
        const pointer = wrap_pointer_buffer(this._value, this.data_size) as Pointer<ExplicitControlEvaluator>
        const deref = pointer.dereference(evaluator, this.data_size);
        return new SVal(deref.buffer, this.pointer_depth - 1, this.data_size);
    }

    /**
     * Gets a stash value used to represent the referenced version of the current one
     */
    public ref(heap: Heap): SVal {
        if (this.pointer_depth === -1) {
            throw new Error("Cannot get the reference for a literal");
        }
        const address = 0 // Invalid operation: heap.allocate_value(this.address);
        throw new Error("Not implemented");
        // return new SVal(address, this.pointer_depth + 1);
    }
}

/**
 * Represents the operating stack for the evaluator
 */
export default class Stash {
    private stack: Array<SVal>

    /**
     * Constructs a new operating stack
     */
    constructor() {
        this.stack = new Array<SVal>();
    }

    /**
     * Pushes a new literal onto the stash
     * @param value The value to put in the stash
     */
    public push(value: ArrayBuffer);

    /**
     * Pushes a pointer onto the Stash with the specified values
     * @param value The pointer buffer to put in the stash
     * @param pointer_depth The pointer depth to record (how many times to allow dereferencing)
     * @param data_size The size of the data that is dereferenced
     */
    public push(value: ArrayBuffer, pointer_depth: number, data_size: number);

    public push(value: ArrayBuffer, pointer_depth?: number, data_size?: number) {
        this.stack.push(new SVal(value, pointer_depth, data_size));
    }

    /**
     * Pushes the SVal to the Stash directly
     * @param value The value to push
     * @private
     */
    private push_SVal(value: SVal) {
        this.stack.push(value);
    }

    /**
     * Pops an OperatingStack value off of the stack
     */
    public pop(): SVal {
        return this.stack.pop();
    }

    /**
     * Peeks the value at the top of the array buffer without actually removing it
     */
    public peek(): SVal {
        const value: SVal = this.pop();
        this.push_SVal(value);
        return value;
    }
}