import HeapDataView from "./HeapDataView";

/**
 * Represents the available callers who may request more memory
 */
export enum MemoryCaller {
    STACK,
    BLOCK_FRAME,
    CALL_FRAME,
    STASH
}

/**
 * Represents an interface for allowing memory to be requested by an instance if required
 */
export default interface MemoryHandler {
    /**
     * Used to request for more memory when the existing memory is not enough
     * @param additional_memory_required The amount of additional memory required to be allocated
     * @param caller The caller requesting for the additional memory
     * @returns The adjusted HeapDataView for the caller to use
     */
    request_memory(additional_memory_required: number, caller: MemoryCaller): HeapDataView;

    /**
     * <p>Used when memory can be reduced by a certain amount</p>
     * <p>Semantic Note:</p>
     * <p>The memory returned may not be of a reduced size as expected, however deallocated memory must lose any
     * protection-based attributes</p>
     * @param memory_reduction The amount of memory to reduce by
     * @param caller The caller requesting for memory to be deallocated
     * @returns The adjusted HeapDataView for the caller to use
     */
    reduce_memory(memory_reduction: number, caller: MemoryCaller): HeapDataView;
}

/**
 * Thrown when the caller to reduce/increase memory is unknown
 */
export class UnknownCallerError extends Error {
    /**
     * Constructs a new UnknownCallerError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "UnknownCallerError";
    }
}