/**
 * Stash
 *
 * Represents the stash for the C explicit-control antlr_parser containing values in working memory
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
import BitArray from "../../BitArray";

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

    /**
     * Gets a string representing the information about the environment
     */
    public pretty_string(): string {
        if (this.curr_value_offset === -1) {
            return "No values present"
        }
        const previous_offset: Array<string> = [];
        const types: Array<string> = [];
        const offsets: Array<string> = [];
        const value_type: Array<string> = [];
        const lengths: Array<string> = [];
        const data: Array<string> = [];
        // Get variable information
        let value_count = 0;
        let offset = this.curr_value_offset;
        while (offset !== -1) {
            value_count++;
            const value_header_view = this.data.subset(offset, StashValue.fixed_byte_length);
            const value_size = StashValue.get_size(value_header_view);
            const value_view = this.data.subset(offset, value_size);
            // Get the complete stash value
            const stash_value = StashValue.from_existing(value_view);
            const c_value = stash_value.value;
            const value_offset = stash_value.prev_offset === -1 ? -1 : this.data.byte_offset + stash_value.prev_offset;
            previous_offset.push(value_offset.toString());
            types.push(stash_value.type_info.to_string());
            offsets.push((this.data.byte_offset + offset).toString());
            lengths.push(value_size.toString());
            value_type.push(c_value.is_l_value ? "lValue" : "prValue");
            const data_bits = new BitArray(c_value.data).to_string();
            data.push(data_bits);
            offset = stash_value.prev_offset;
        }
        const headings = ["Type", "Offset", "Length", "Prev. value offset", "Value Type", "Data"]
        const heading_sizes = [];
        headings.forEach((header) => heading_sizes.push(header.length + 2));
        // Get maximum sizes
        for (let i = 0; i < value_count; i++) {
            const columns = [types[i], offsets[i], lengths[i], previous_offset[i], value_type[i], data[i]];
            columns.forEach((value, index) => heading_sizes[index] = Math.max(heading_sizes[index], value.length + 2));
        }
        // Print stash details
        let string = "";
        string += `Offset: ${this.data.byte_offset}\n`
        string += `Length: ${this.data.byte_length}\n`
        // Print header
        string += "|";
        headings.forEach((header, index) => {
            const pad_left = Math.floor((heading_sizes[index] - header.length) / 2);
            string += " ".repeat(pad_left);
            string += header;
            string += " ".repeat(heading_sizes[index] - pad_left - header.length);
            string += "|"
        });
        string += "\n|"
        headings.forEach((header, index) => string += "-".repeat(heading_sizes[index]) + "|");
        // Print variables
        for (let i = 0; i < value_count; i++) {
            string += "\n|";
            const columns = [types[i], offsets[i], lengths[i], previous_offset[i], value_type[i], data[i]];
            columns.forEach((value, index) => {
                string += " ";
                string += value;
                string += " ".repeat(heading_sizes[index] - value.length - 1);
                string += "|"
            });
        }
        return string;
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