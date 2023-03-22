/**
 *
 */
export class HeapValueAdapter {

}

/**
 * Represents a heap integer instruction
 */
export class HeapIntegerAdapter {
    private value: number;

    constructor(value: number, valueAdapter: HeapValueAdapter) {
        this.value = value;
    }
}

/**
 * Represents the heap used for C
 */
export default class Heap {
    public get_value(address: number): HeapValueAdapter {
        return null;
    }
}