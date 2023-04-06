/**
 * EmptyMalloc
 *
 * Represents a set of data in the C Heap acting as an empty malloc value
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../HeapDataView";
import CMemoryTag, {CMemoryTagValue} from "./CMemoryTag";
import {SegmentationFaultError} from "../RestrictedHeap";
import MallocData from "./MallocData";


/**
 * Represents the data associated with empty malloc information
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>4 bytes - next free address</li>
 *     <li>MallocData.byte_length - internal data</li>
 * </ul>
 */
export default class EmptyMalloc {
    private static readonly next_length = 4;
    private static readonly next_offset = 0;
    private static readonly base_offset = EmptyMalloc.next_offset + EmptyMalloc.next_length;
    private data: HeapDataView;

    private constructor(data: HeapDataView) {
        this.data = data;
    }

    /**
     * Gets the tag associated with an EmptyMalloc value
     */
    public static get tag(): CMemoryTagValue {
        return CMemoryTagValue.MALLOC_EMPTY;
    }

    /**
     * The size required to store an empty malloc value
     */
    public static get byte_length() {
        return MallocData.byte_length + this.next_length;
    }

    private get malloc_data(): MallocData {
        return MallocData.from_existing(new HeapDataView(this.data, EmptyMalloc.base_offset, MallocData.byte_length));
    }

    /**
     * Gets the size of the empty space
     */
    public get size(): number {
        return this.malloc_data.size;
    }

    /**
     * Gets the pointer to the next available space
     */
    public get next(): number {
        return this.data.get_value(EmptyMalloc.next_offset, EmptyMalloc.next_length).getInt32(0);
    }

    /**
     * Sets the address pointing to the next available space
     * @param next The next address available
     */
    public set next(next: number) {
        // Get value
        const value = new ArrayBuffer(EmptyMalloc.next_length);
        new DataView(value).setInt32(0, next);
        // Set the value in the heap
        this.data.set_value(value, EmptyMalloc.next_offset, true);
    }

    /**
     * Allocates an empty malloc value in the given heap view
     * @param view The view used to change the heap values
     * @param size_available The size available to store
     * @param next_address The next address for the malloc to store
     */
    public static allocate_value(view: HeapDataView, size_available: number, next_address: number): EmptyMalloc {
        const empty_malloc = new EmptyMalloc(view);
        // Ensure the data is not already protected
        if (!view.is_not_protected(0, EmptyMalloc.byte_length)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set base information
        MallocData.allocate_value(new HeapDataView(empty_malloc.data, EmptyMalloc.base_offset, MallocData.byte_length),
            CMemoryTagValue.MALLOC_EMPTY, size_available);
        // Set next address
        empty_malloc.next = next_address;
        // Protect view
        empty_malloc.data.protect(0, EmptyMalloc.byte_length);
        return empty_malloc;
    }

    /**
     * Determines whether a set of data is a MallocVar instance
     * @param view The data view
     */
    public static is_instance(view: HeapDataView): boolean {
        if (view.byte_length < EmptyMalloc.byte_length) {
            return false;
        }
        // Check if header is protected
        const header_is_protected = view.is_protected(0, EmptyMalloc.byte_length);
        if (!header_is_protected) {
            return false;
        }
        // Ensure the tag is accurate
        return EmptyMalloc.from_existing(view).malloc_data.tag === EmptyMalloc.tag;
    }

    /**
     * Initialises a new view for the EmptyMalloc values from an existing value
     * @param view The view for the EmptyMalloc to build from
     */
    public static from_existing(view: HeapDataView): EmptyMalloc {
        return new EmptyMalloc(view);
    }
}