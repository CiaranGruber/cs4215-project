/**
 * Represents the heap used for the explicit-control evaluator in C
 * Assumes unlimited memory for the heap
 */
export default class Heap {
    private heap: Map<number, ArrayBuffer>;
    private count: number; // Allows a maximum of 2^64 allocations within a program

    /**
     * Initialises a new Heap instance
     */
    constructor() {
        this.heap = new Map<number, ArrayBuffer>();
        this.count = 0;
    }

    /**
     * Allocates a value within the heap
     * @param value The value to allocate
     */
    public allocate_value(value: ArrayBuffer) {
        this.heap.set(this.count, value);
        return this.count++;
    }

    /**
     * Gets the value at the specified address
     * @param address The address to get the value of
     */
    public get_value(address: number): ArrayBuffer {
        return this.heap[address];
    }

    /**
     * Set the value at the given address
     * @param address The address to set
     * @param value The value to set the address to
     */
    public set_value(address: number, value: ArrayBuffer) {
        this.heap[address] = value;
    }
}