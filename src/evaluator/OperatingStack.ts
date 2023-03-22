/**
 * Operating Stack.
 *
 * Used by the C evaluator to store values for later use
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

/**
 * Represents the various OperatingStack types
 */
export enum OSType {
    /**
     * A literal value that cannot be referenced or dereferenced
     */
    LIT,
    /**
     * A pointer type
     */
    PTR
}

/**
 * A value in the OperatingStack
 */
export class OSVal {
    private address: number;
    private type: OSType;

    /**
     * Initialises a new OperatingStack value with the specified values
     * @param address The address for the OperatingStack value
     * @param type The type of the OperatingStack value
     */
    constructor(address: number, type: OSType) {
        this.address = address;
        this.type = type;
    }

    /**
     * Gets the main address specified by the OperatingStack value
     */
    public get main_address(): number {
        switch (this.type) {
            case OSType.LIT:
                return this.address;
            case OSType.PTR:
                // return heap.to_JS_value(this.second_addr);
        }
    }

    /**
     * Dereferences the OperatingStack value
     */
    public deref() {
        // this.address = heap_get_value(this.second_addr)
    }

    /**
     * Turns the OperatingStack value into a reference
     */
    public ref() {
        // this.address = heap_allocate_reference(this.address)
    }
}

/**
 * Represents the operating stack for the evaluator
 */
export default class OperatingStack {
    private stack: Array<OSVal>

    /**
     * Constructs a new operating stack
     */
    constructor() {
        this.stack = new Array<OSVal>();
    }

    /**
     * Pushes a value onto the operating stack with the given address and type
     * @param address The address for the value
     * @param type The type for the value
     */
    public push(address: number, type: OSType) {
        this.stack.push(new OSVal(address, type));
    }

    /**
     * Pops an OperatingStack value off of the stack
     */
    public pop(): OSVal {
        return this.stack.pop();
    }
}