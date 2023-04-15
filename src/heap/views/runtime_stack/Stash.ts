/**
 * Stash
 *
 * Represents the stash for the C explicit-control evaluator containing values in working memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import MemoryHandler, {MemoryCaller} from "../../MemoryHandler";
import {SegmentationFaultError} from "../../RestrictedHeap";
import StashValue from "./StashValue";
import CValue from "../../../explicit-control-evaluator/CValue";
import Int32 from "../../../data_views/Int32";

/**
 * Represents a view of the C stack memory
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>UInt32.byte_length - The offset of the current stash value in the stack</li>
 *     <li>x × StashValue.byte_length - The values stored within the stash</li>
 * </ul>
 */
export default class Stash {
    private static readonly curr_value_offset_offset = 0;
    private static readonly curr_value_offset_length = Int32.byte_length;
    private memory_handler: MemoryHandler;
    private data: HeapDataView;

    private constructor(data: HeapDataView, memory_handler: MemoryHandler) {
        this.data = data;
        this.memory_handler = memory_handler;
    }

    /**
     * Gets the fixed size of a Stash in memory
     */
    public static get fixed_byte_length() {
        return this.curr_value_offset_length;
    }

    /**
     * Gets the length of the Stash instance in bytes
     */
    public get byte_length() {
        return this.end_offset;
    }

    public get is_empty() {
        return this.curr_value_offset === -1;
    }

    private get end_offset(): number {
        if (this.is_empty) {
            return Stash.fixed_byte_length;
        }
        const curr_offset = this.curr_value_offset;
        const stash_size = StashValue.get_size(this.data.subset(curr_offset, StashValue.fixed_byte_length));
        return curr_offset + stash_size;
    }

    private get curr_value_view(): Int32 {
        return new Int32(this.data.subset(Stash.curr_value_offset_offset, Stash.curr_value_offset_length),
            true);
    }

    private get curr_value_offset(): number {
        return this.curr_value_view.value;
    }

    private set curr_value_offset(new_offset: number) {
        this.curr_value_view.value = new_offset;
    }

    /**
     * Allocates a new stash in the given heap view
     * @param view The view used to change the heap values
     * @param memory_handler The handler used by the stash to request for more memory
     */
    public static allocate_value(view: HeapDataView, memory_handler: MemoryHandler): Stash {
        const stash = new Stash(view, memory_handler);
        // Ensure the data is not already protected
        if (!view.is_not_protected(0, Stash.fixed_byte_length)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set curr_value_offset to default
        stash.curr_value_offset = -1;
        // Protect the stash
        view.protect(0, Stash.fixed_byte_length);
        return stash;
    }

    /**
     * Initialises a new Stash view from an existing value
     * @param view The view for the Stack to build from
     * @param memory_handler The handler used by the stash to request for more memory when necessary
     */
    public static from_existing(view: HeapDataView, memory_handler: MemoryHandler): Stash {
        return new Stash(view, memory_handler);
    }

    /**
     * Pushes the given value onto the stash
     * @param value The value to push
     */
    public push(value: CValue) {
        // Request additional memory
        const size = StashValue.size_required(value);
        this.data = this.memory_handler.request_memory(size, MemoryCaller.STASH);
        // Allocate stash value by putting it at the end of the memory
        const value_view = this.data.subset(this.end_offset, size);
        StashValue.allocate_value(value_view, value, this.curr_value_offset);
        this.curr_value_offset = this.end_offset;
    }

    /**
     * Pops a value from the stash
     */
    public pop(): CValue {
        // Get stash value
        const start_offset = this.curr_value_offset;
        if (start_offset === -1) {
            throw new EmptyStashError("Cannot pop from an empty stash");
        }
        const end_offset = this.end_offset;
        const value_view = this.data.subset(start_offset, end_offset - start_offset);
        const stash_value = StashValue.from_existing(value_view);
        // Pop value from stash
        this.curr_value_offset = stash_value.prev_offset;
        const value = stash_value.value;
        this.memory_handler.reduce_memory(stash_value.byte_length, MemoryCaller.STASH);
        return value;
    }

    /**
     * Peeks a value from the stash without popping it
     */
    public peek(): CValue {
        // Get stash value
        const start_offset = this.curr_value_offset;
        if (start_offset === -1) {
            throw new EmptyStashError("Cannot peek from an empty stash");
        }
        const end_offset = this.end_offset;
        const value_view = this.data.subset(start_offset, end_offset - start_offset);
        const stash_value = StashValue.from_existing(value_view);
        // Peek value from stash
        return stash_value.value;
    }
}

/**
 * Thrown when attempting to pop from an empty stash
 */
export class EmptyStashError extends Error {
    /**
     * Constructs a new EmptyStashError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "EmptyStashError";
    }
}