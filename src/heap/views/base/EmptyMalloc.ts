/**
 * EmptyMalloc
 *
 * Represents a set of data in the C Heap acting as an empty malloc value
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import {CMemoryTagValue} from "./CMemoryTag";
import {SegmentationFaultError} from "../../RestrictedHeap";
import MallocData from "./MallocData";
import Pointer from "../../../data_views/Pointer";


/**
 * Represents the data associated with empty malloc information
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>Pointer.byte_length - next free address</li>
 *     <li>MallocData.byte_length - internal data</li>
 * </ul>
 */
export default class EmptyMalloc {
    private static readonly next_offset = 0;
    private static get base_offset() { return EmptyMalloc.next_offset + Pointer.byte_length }
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
        return Pointer.byte_length + MallocData.byte_length;
    }

    private get malloc_data(): MallocData {
        return MallocData.from_existing(this.data.subset(EmptyMalloc.base_offset, MallocData.byte_length));
    }

    /**
     * Gets the size of the empty space
     */
    public get size(): number {
        return this.malloc_data.size;
    }

    private get next_view(): Pointer {
        return new Pointer(this.data.subset(EmptyMalloc.next_offset, EmptyMalloc.byte_length),
            true);
    }

    /**
     * Gets the pointer to the next available space
     */
    public get next(): number {
        return this.next_view.value;
    }

    /**
     * Sets the address pointing to the next available space
     * @param next The next address available
     */
    public set next(next: number) {
        this.next_view.value = next;
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
        MallocData.allocate_value(empty_malloc.data.subset(EmptyMalloc.base_offset, MallocData.byte_length),
            CMemoryTagValue.MALLOC_EMPTY, size_available);
        // Set next address
        empty_malloc.next = next_address;
        // Protect view
        empty_malloc.data.protect(0, EmptyMalloc.byte_length);
        return empty_malloc;
    }

    /**
     * Initialises a new view for the EmptyMalloc values from an existing value
     * @param view The view for the EmptyMalloc to build from
     */
    public static from_existing(view: HeapDataView): EmptyMalloc {
        return new EmptyMalloc(view);
    }
}