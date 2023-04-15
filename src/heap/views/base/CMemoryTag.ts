/**
 * CMemoryTag
 *
 * Represents a tag for a value as well as the specific
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import {SegmentationFaultError} from "../../RestrictedHeap";
import UInt8 from "../../../data_views/UInt8";

export enum CMemoryTagValue {
    MALLOC_VAR,
    MALLOC_EMPTY,
    REFERENCE_TYPE,
    BUILT_IN_TYPE,
    STRUCT_TYPE,
    ENUM_TYPE,
    EMPTY_ENVIRONMENT,
    CALL_FRAME,
    BLOCK_FRAME
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
    private static readonly tag_offset = 0;
    private static readonly tag_length = UInt8.byte_length;
    private tag_data: HeapDataView;
    /**
     * The length of explicit_control_evaluator used to represent a memory tag
     */
    public static readonly byte_length = UInt8.byte_length;

    private constructor(tag: HeapDataView) {
        this.tag_data = tag;
    }

    private get tag_view(): UInt8 {
        return new UInt8(this.tag_data.subset(CMemoryTag.tag_offset, CMemoryTag.tag_length), true);
    }

    /**
     * Gets the tag associated with the given CMemoryTag
     */
    public get tag(): CMemoryTagValue {
        return this.tag_view.value;
    }

    /**
     * Sets the tag associated with the given CMemoryTag
     * @param value The value to set the tag to
     * @private
     */
    private set tag(value: CMemoryTagValue) {
        this.tag_view.value = value;
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
        // Protect explicit_control_evaluator
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