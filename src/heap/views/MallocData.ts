import CMemoryTag, {CMemoryTagValue} from "./CMemoryTag";
import HeapDataView from "../HeapDataView";
import {SegmentationFaultError} from "../RestrictedHeap";

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
    private static readonly size_length = 4;
    private static readonly size_offset = 0;
    private static readonly tag_offset = MallocData.size_offset + MallocData.size_length;
    private data: HeapDataView;

    private constructor(data: HeapDataView) {
        this.data = data;
    }

    /**
     * Gets the tag associated with the given MallocData
     */
    public get tag(): CMemoryTagValue {
        return CMemoryTag.from_existing(new HeapDataView(this.data, MallocData.tag_offset, CMemoryTag.byte_length)).tag;
    }

    /**
     * Gets the number of bytes used to represent a MallocData
     */
    public static get byte_length(): number {
        return CMemoryTag.byte_length + this.size_length;
    }

    /**
     * Gets the pointer to the next available space
     */
    public get size(): number {
        return this.data.get_value(MallocData.size_offset, MallocData.size_length).getInt32(0);
    }

    /**
     * Sets the size used by the malloc data
     * @param size The size available
     */
    private set size(size: number) {
        // Get value
        const value = new ArrayBuffer(MallocData.size_length);
        new DataView(value).setInt32(0, size);
        // Set the value in the heap
        this.data.set_value(value, MallocData.size_offset, true);
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
        CMemoryTag.allocate_value(new HeapDataView(view, this.tag_offset, CMemoryTag.byte_length), tag);
        // Set size
        malloc_data.size = size;
        // Protect values
        malloc_data.data.protect(0, MallocData.byte_length);
        // Return result
        return malloc_data;
    }

    /**
     * Determines whether a set of data is a MallocVar instance
     * @param view The data view
     */
    public static is_instance(view: HeapDataView): boolean {
        if (view.byte_length < MallocData.byte_length) {
            return false;
        }
        // Check if header is protected
        const header_is_protected = view.is_protected(0, MallocData.byte_length);
        if (!header_is_protected) {
            return false;
        }
        // Ensure tags are one of the valid options
        const malloc_data = MallocData.from_existing(view);
        return malloc_data.tag === CMemoryTagValue.MALLOC_EMPTY || malloc_data.tag === CMemoryTagValue.MALLOC_VAR;
    }

    public static from_existing(view: HeapDataView): MallocData {
        return new MallocData(view);
    }
}