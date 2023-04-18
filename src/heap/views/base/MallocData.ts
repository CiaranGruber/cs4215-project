import CMemoryTag, {CMemoryTagValue} from "./CMemoryTag";
import HeapDataView from "../../HeapDataView";
import {SegmentationFaultError} from "../../RestrictedHeap";
import Int32 from "../../../data_views/Int32";

/**
 * Represents the data associated with all malloc-related data
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>4 bytes - size of data</li>
 *     <li>CMemoryTag.byte_length - tag</li>
 * </ul>
 */
export default class MallocData {
    private static readonly size_offset = 0;
    private static readonly size_length = Int32.byte_length;
    private static readonly tag_offset = MallocData.size_offset + MallocData.size_length;
    private data: HeapDataView;

    private constructor(data: HeapDataView) {
        this.data = data;
    }

    /**
     * Gets the number of bytes used to represent a MallocData
     */
    public static get byte_length(): number {
        return CMemoryTag.byte_length + this.size_length;
    }

    /**
     * Gets the tag associated with the given MallocData
     */
    public get tag(): CMemoryTagValue {
        return CMemoryTag.from_existing(this.data.subset(MallocData.tag_offset, CMemoryTag.byte_length)).tag;
    }

    public get size_view(): Int32 {
        return new Int32(this.data.subset(MallocData.size_offset, MallocData.size_length), true)
    }

    /**
     * Gets the pointer to the next available space
     */
    public get size(): number {
        return this.size_view.value;
    }

    /**
     * Sets the size used by the malloc data
     * @param size The size available
     */
    private set size(size: number) {
        this.size_view.value = size;
    }

    /**
     * Allocates a new MallocData instance within the associated HeapDataView
     * @param view The view to allocate the MallocData instance within
     * @param tag The tag to set for the MallocData
     * @param size The size of the given data instance
     */
    public static allocate_value(view: HeapDataView, tag: CMemoryTagValue, size: number): MallocData {
        const malloc_data = new MallocData(view);
        // Ensure the data is not already protected
        if (!view.is_not_protected(0, MallocData.byte_length)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set tag
        CMemoryTag.allocate_value(view.subset(this.tag_offset, CMemoryTag.byte_length), tag);
        // Set size
        malloc_data.size = size;
        // Protect values
        malloc_data.data.protect(0, MallocData.byte_length);
        // Return result
        return malloc_data;
    }

    public static from_existing(view: HeapDataView): MallocData {
        return new MallocData(view);
    }
}