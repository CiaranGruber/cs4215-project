/**
 * CMemory
 *
 * A representation of the memory used for the C evaluator
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import RestrictedHeap, {SegmentationFaultError} from "./RestrictedHeap";
import HeapDataView from "./HeapDataView";
import EmptyMalloc from "./views/base/EmptyMalloc";
import MallocVar from "./views/base/MallocVar";
import Stack from "./views/runtime_stack/Stack";
import MemoryHandler, {MemoryCaller, UnknownCallerError} from "./MemoryHandler";
import ImmutableDataView from "./ImmutableDataView";

/**
 * The object used to represent the memory in C
 */
export default class CMemory implements MemoryHandler {
    private readonly base_heap: RestrictedHeap;
    private stack_free: number;
    private end_dynamic_mem: number;
    private malloc_free: number;

    /**
     * Constructs a new instance of the C heap with the given size
     * @param size The size of the heap
     */
    constructor(size: number) {
        this.base_heap = new RestrictedHeap(size);
        this.malloc_free = size - 1;
        this.end_dynamic_mem = size - 1;
        // Allocate empty value
        EmptyMalloc.allocate_value(this.get_view_before(this.malloc_free, EmptyMalloc.byte_length),
            -1, -1);
        // Allocate stack
        Stack.allocate_value(new HeapDataView(this.base_heap, 0, Stack.fixed_byte_length), this);
        this.stack_free = Stack.fixed_byte_length;
    }

    /**
     * Gets the CMemory instance as a string
     */
    public to_string(): string {
        // Basic print below - Can be improved to show information such as empty malloc space, etc
        return this.base_heap.to_string();
    }

    /**
     * Gets the size of the C heap
     */
    public get size() {
        return this.base_heap.size;
    }

    /**
     * Gets the amount of memory available for use between the heap and the stack
     */
    private get middle_memory_available() {
        return this.end_dynamic_mem - this.stack_free - CMemory.min_malloc_size + 1;
    }

    /**
     * Gets the amount of memory free between the heap and the stack (including empty malloc pointers)
     */
    public get middle_memory_free() {
        return this.end_dynamic_mem - this.stack_free + 1;
    }

    private get stack_view(): HeapDataView {
        return new HeapDataView(this.base_heap, 0, this.stack_free);
    }

    /**
     * Gets the C stack
     */
    public get stack(): Stack {
        return Stack.from_existing(this.stack_view, this);
    }

    /**
     * Allocates a value on the stack of the given size
     * @param size The size to allocate
     */
    public allocate_on_stack(size: number): HeapDataView {
        // Ensure there is heap memory available with space for a heap pointer
        if (size > this.middle_memory_available) {
            throw new OutOfMemoryError("Heap memory exhausted");
        }
        // Allocate memory for stack value
        const old_free = this.stack_free;
        this.stack_free += size;
        // Return explicit_control_evaluator view of the allocated memory
        return new HeapDataView(this.base_heap, old_free, size);
    }

    /**
     * Deallocates the given memory from the stack to be utilised by other processes
     * @param size The size of the explicit_control_evaluator to deallocate
     */
    public deallocate_from_stack(size: number) {
        this.stack_free -= size;
        this.deallocate(this.stack_free, size);
    }

    /**
     * Gets the view located before and including the specified address
     * @param address The end address to get
     * @param length The length of bytes to get
     * @private
     */
    private get_view_before(address: number, length: number): HeapDataView {
        const offset = address - length + 1;
        return new HeapDataView(this.base_heap, offset, length);
    }

    /**
     * Gets an immutable explicit_control_evaluator view of the heap at the given offset and length
     * @param byte_offset The byte offset to get the view for
     * @param byte_length The byte length to get the view for
     */
    public get_data_view(byte_offset: number, byte_length: number): ImmutableDataView {
        return this.base_heap.get_value(byte_offset, byte_length);
    }

    /**
     * Gets a view of the heap at the given offset and length
     * @param byte_offset The byte offset to get the view for
     * @param byte_length The byte length to get the view for
     */
    public get_heap_view(byte_offset: number, byte_length: number): HeapDataView {
        return new HeapDataView(this.base_heap, byte_offset, byte_length);
    }

    /**
     * Gets the minimum size that malloc variables and empty variables must occupy
     */
    public static get min_malloc_size() {
        return Math.max(EmptyMalloc.byte_length, MallocVar.fixed_byte_length);
    }

    /**
     * Allocates a new set of memory into the heap
     * @param size The size of the explicit_control_evaluator required
     */
    public malloc(size: number): HeapDataView {
        // Ensure variable can be freed
        const space_required = Math.max(size + MallocVar.fixed_byte_length, CMemory.min_malloc_size);

        // Find an empty malloc with an appropriate size
        let start_address = this.malloc_free;
        let empty_malloc = EmptyMalloc.from_existing(this.get_view_before(start_address, EmptyMalloc.byte_length));
        let prev_empty_data: EmptyMalloc;
        // Determine whether an empty malloc has been found
        while (empty_malloc.size < space_required && empty_malloc.next !== -1) {
            prev_empty_data = empty_malloc;
            start_address = empty_malloc.next;
            empty_malloc = EmptyMalloc.from_existing(this.get_view_before(start_address, EmptyMalloc.byte_length));
        }

        // Get the space available for use
        const space_available = empty_malloc.size === -1 ? this.middle_memory_available : empty_malloc.size;

        // Case if there is no memory left
        if (space_available < space_required) {
            throw new OutOfMemoryError("Heap memory exhausted");
        }

        // Determine whether the memory should be split or utilised fully
        const split_memory = empty_malloc.size === -1 || space_available >= space_required + CMemory.min_malloc_size;
        // Get the memory to use when creating the variable
        const memory_to_consume = split_memory ? space_required : space_available;

        // Get address for next available pointer
        const next_pointer = split_memory ? start_address - memory_to_consume : empty_malloc.next;
        // Check for whether the malloc caused the middle memory space to change
        if (next_pointer < this.end_dynamic_mem) {
            this.end_dynamic_mem = next_pointer;
        }

        // Deallocate original empty malloc variable
        this.deallocate(start_address - EmptyMalloc.byte_length + 1, EmptyMalloc.byte_length);

        // Allocate empty memory if split
        if (split_memory) {
            const size_to_store = this.end_dynamic_mem === next_pointer ? -1 : space_available - memory_to_consume;
            EmptyMalloc.allocate_value(this.get_view_before(next_pointer, EmptyMalloc.byte_length),
                size_to_store, empty_malloc.next);
        }

        // Change pointers to be accurate
        if (prev_empty_data !== undefined) {
            prev_empty_data.next = next_pointer;
        } else {
            this.malloc_free = next_pointer;
        }

        // Allocate malloc variable
        const data_view = this.get_view_before(start_address, memory_to_consume);
        const malloc_var = MallocVar.allocate_value(data_view, memory_to_consume - MallocVar.fixed_byte_length);
        return malloc_var.data_view;
    }

    /**
     * Frees a given address that was allocated within the heap
     * Note: To reduce fragmentation, an additional Pointer.byte_length bytes could be stored in MallocData to the
     * previous (consecutive) memory allocation. This would allow complete defragmentation when all memory is freed,
     * however it does double the fixed_byte_length of Mallocced values
     * @param address The address to free
     */
    public free(address: number) {
        // Get the header offset
        const header_end = address - 1; // Address should be the first value
        const header_view = this.get_view_before(header_end, MallocVar.fixed_byte_length);
        // Check for invalid address
        if (header_view.byte_offset < 0 || address > this.size) {
            throw new SegmentationFaultError("Attempted to free memory outside of the memory")
        }
        // Attempt to ensure it is looking at a malloc variable
        if (header_end <= this.end_dynamic_mem || !MallocVar.is_instance(header_view)) {
            throw new NotAHeapObjectError(`The address ${address} does not refer to an object in the heap`)
        }

        // Get malloc size
        const malloc_var = MallocVar.from_existing(header_view);
        let new_space_available = malloc_var.data_size + MallocVar.fixed_byte_length;
        const new_empty_address = header_view.byte_offset + new_space_available - 1; // The address to store the new empty malloc

        // Deallocate memory
        this.deallocate(header_view.byte_offset, new_space_available);

        let next_pointer = this.malloc_free;
        // Attempt to merge with next empty section if possible to reduce defragmentation
        if (next_pointer === header_view.byte_offset - 1) {
            // Check if next section is an empty value
            let next_view = this.get_view_before(next_pointer, EmptyMalloc.byte_length);
            const empty_var = EmptyMalloc.from_existing(next_view);
            // Change pointer values
            next_pointer = empty_var.next;
            new_space_available = empty_var.size === -1 ? -1 : new_space_available + empty_var.size;
            // Deallocate next empty var
            this.deallocate(next_view.byte_offset, next_view.byte_length);
        }

        // Change dynamic memory location
        if (new_space_available === -1) {
            this.end_dynamic_mem = new_empty_address;
        }

        // Change pointers of original malloc free (if it is still relevant)
        this.malloc_free = new_empty_address;

        // Create empty variable
        EmptyMalloc.allocate_value(this.get_view_before(new_empty_address, EmptyMalloc.byte_length), new_space_available,
            next_pointer);
    }

    /**
     * Reduces fragmentation of the allocated memory by combining any consecutive empty malloc pointers and arranges
     * the next pointers such that they are more likely to be combined in the future
     */
    public defragment() {
        // Get list of array pointers
        const empty_pointers: Array<number> = []
        let start_address = this.malloc_free;
        let empty_malloc = EmptyMalloc.from_existing(this.get_view_before(start_address, EmptyMalloc.byte_length));
        empty_pointers.push(start_address);
        while (empty_malloc.next !== -1) {
            start_address = empty_malloc.next;
            empty_pointers.push(start_address);
            empty_malloc = EmptyMalloc.from_existing(this.get_view_before(start_address, EmptyMalloc.byte_length));
        }

        // Order list by end of heap first
        empty_pointers.sort((a, b) => b - a);
        this.malloc_free = empty_pointers[0]; // Point malloc_free to first value

        // Combine empty pointers if they are consecutive
        let next_pointer = empty_pointers[0];
        empty_malloc = EmptyMalloc.from_existing(this.get_view_before(next_pointer, EmptyMalloc.byte_length));
        const size = empty_malloc.size;
        let new_space_available = size === -1 ? EmptyMalloc.byte_length : size;
        for (let i = 1; i < empty_pointers.length; i++) {
            if (next_pointer - new_space_available === empty_pointers[i]) {
                // Combine with existing values
                empty_malloc = EmptyMalloc.from_existing(this.get_view_before(empty_pointers[i], EmptyMalloc.byte_length));
                const size = empty_malloc.size;
                new_space_available += size === -1 ? EmptyMalloc.byte_length : size;
            } else { // Allocate existing pointer and start again
                // Allocate running malloc
                this.deallocate(next_pointer - new_space_available + 1, new_space_available);
                EmptyMalloc.allocate_value(this.get_view_before(next_pointer, EmptyMalloc.byte_length),
                    new_space_available, empty_pointers[i]);

                // Start new pointer section
                next_pointer = empty_pointers[i];
                empty_malloc = EmptyMalloc.from_existing(this.get_view_before(next_pointer, EmptyMalloc.byte_length));
                const size = empty_malloc.size;
                new_space_available = size === -1 ? EmptyMalloc.byte_length : size;
            }
        }
        // Allocate final malloc
        this.deallocate(next_pointer - new_space_available + 1, new_space_available);
        EmptyMalloc.allocate_value(this.get_view_before(next_pointer, EmptyMalloc.byte_length), -1,
            -1);

        // Set end_dynamic_mem to the last allocated empty malloc
        this.end_dynamic_mem = next_pointer;
    }

    /**
     * Deallocates the given memory by simply removing the protection attribute - Note could overwrite with 0s
     * @param address The address to start deallocating from
     * @param byte_length The length of bytes to deallocate
     * @private
     */
    private deallocate(address: number, byte_length: number) {
        this.base_heap.set_protected(address, false, byte_length);
    }

    reduce_memory(memory_reduction: number, caller: MemoryCaller): HeapDataView {
        if (caller !== MemoryCaller.STACK) {
            throw new UnknownCallerError("The only viable memory caller for the CMemory is the Stack");
        }

        // Adjust memory
        this.deallocate_from_stack(memory_reduction);
        return this.stack_view;
    }

    request_memory(additional_memory_required: number, caller: MemoryCaller): HeapDataView {
        if (caller !== MemoryCaller.STACK) {
            throw new UnknownCallerError("The only viable memory caller for the CMemory is the Stack");
        }

        // Adjust memory
        this.allocate_on_stack(additional_memory_required);
        return this.stack_view;
    }
}

/**
 * Thrown when a non-heap object is attempted to be freed
 */
export class NotAHeapObjectError extends Error {
    /**
     * Constructs a new OutOfMemoryError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "OutOfMemoryError";
    }
}

/**
 * Thrown when the heap runs out of available memory when attempting to allocate a new value
 */
export class OutOfMemoryError extends Error {
    /**
     * Constructs a new OutOfMemoryError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "OutOfMemoryError";
    }
}