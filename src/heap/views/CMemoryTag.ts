import HeapDataView from "../HeapDataView";
import CMemory from "../CMemory";
import {SegmentationFaultError} from "../RestrictedHeap";

export enum CMemoryTagValue {
    MALLOC_VAR,
    MALLOC_EMPTY
}

/**
 * Represents a tag within memory
 *
 * Data Format:
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>1 byte - tag</li>
 * </ul>
 */
export default class CMemoryTag {
    private tag_data: HeapDataView;

    private constructor(tag: HeapDataView) {
        this.tag_data = tag;
    }

    /**
     * The length of data used to represent a memory tag
     */
    public static get byte_length() {
        return 1;
    }

    /**
     * Gets the tag associated with the given CMemoryTag
     */
    public get tag(): CMemoryTagValue {
        return this.tag_data.get_value(0, CMemoryTag.byte_length).getUint8(0);
    }

    /**
     * Sets the tag associated with the given CMemoryTag
     * @param value The value to set the tag to
     * @private
     */
    private set tag(value: CMemoryTagValue) {
        const value_buffer = new ArrayBuffer(1);
        new DataView(value_buffer).setUint8(0, value);
        this.tag_data.set_value(value_buffer, 0, true);
    }

    /**
     * Allocates a new CMemoryTag instance
     * @param view The view to allocate the memory tag into
     * @param tag The tag to set the memory tag to
     */
    public static allocate_value(view: HeapDataView, tag: CMemoryTagValue): CMemoryTag {
        const memory_tag = new CMemoryTag(view);
        // Ensure it is not already protected
        if (!view.is_not_protected(0, CMemoryTag.byte_length)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set value
        memory_tag.tag = tag;
        // Protect data
        view.protect(0, CMemoryTag.byte_length);
        return memory_tag;
    }

    /**
     * Wraps the given view as a CMemoryTag instance
     * @param view The view to wrap
     */
    public static from_existing(view: HeapDataView): CMemoryTag {
        return new CMemoryTag(view);
    }
}