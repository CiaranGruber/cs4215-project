/**
 * MallocVar
 *
 * Represents a variable in the C Heap that acts as a mallocced variable
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import {CMemoryTagValue} from "./CMemoryTag";
import MallocData from "./MallocData";
import {SegmentationFaultError} from "../../RestrictedHeap";

/**
 * Represents the explicit_control_evaluator associated with allocated heap memory
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>MallocData.byte_length - internal explicit_control_evaluator</li>
 *     <li>x bytes - explicit_control_evaluator</li>
 * </ul>
 */
export default class MallocVar {
    private static readonly base_offset = 0;
    private static readonly data_offset = MallocVar.base_offset + MallocData.byte_length;
    private view: HeapDataView;

    /**
     * Gets the fixed size of a MallocVar value
     */
    public static get fixed_byte_length(): number {
        return MallocData.byte_length;
    }

    private constructor(data: HeapDataView) {
        this.view = data;
    }

    /**
     * Gets the tag associated with an MallocVar value
     */
    public static get tag(): CMemoryTagValue {
        return CMemoryTagValue.MALLOC_VAR;
    }

    /**
     * Gets the pointer to the next available space
     */
    public get data_size(): number {
        return this.malloc_data.size - MallocVar.fixed_byte_length;
    }

    private get malloc_data(): MallocData {
        return MallocData.from_existing(this.view.subset(MallocVar.base_offset, MallocData.byte_length));
    }

    /**
     * Gets the HeapDataView instance specifically for the malloc explicit_control_evaluator
     */
    public get data_view(): HeapDataView {
        return this.view.subset(MallocVar.data_offset, this.data_size);
    }

    /**
     * Allocates a malloc variable in the given heap view
     * @param view The view used to change the heap values
     * @param data_size The size required for the malloc view
     */
    public static allocate_value(view: HeapDataView, data_size: number): MallocVar {
        const malloc_var = new MallocVar(view);
        // Ensure the explicit_control_evaluator is not already protected
        if (!view.is_not_protected(0, MallocVar.fixed_byte_length)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set base info
        MallocData.allocate_value(view.subset(MallocVar.base_offset, MallocData.byte_length),
            CMemoryTagValue.MALLOC_VAR, data_size + MallocVar.fixed_byte_length);
        // Protect info
        malloc_var.view.protect(MallocVar.base_offset, MallocVar.fixed_byte_length);
        return malloc_var;
    }

    /**
     * Determines whether a set of explicit_control_evaluator is a MallocVar instance
     * <p>Note:</p>
     * <p style="padding: 0px 10px 5px">
     *     The following function does basic checks to ensure the address points to a MallocVar object, however it can
     *     be fooled.
     * </p>
     * <p style="padding: 0px 10px 5px">
     *     Theoretically, as there is no bit ensuring it is reading a tag (rather than some other protected attribute),
     *     it cannot ensure that it is not incorrectly reading a non-tag (E.g. Start of size attribute may be match with
     *     a malloc tag).
     * </p>
     * <p style="padding: 0px 10px 5px">
     *     This could be solved by increasing the size of metadata within the heap to allow an indicator if a byte is
     *     associated with a tag
     * @param view The explicit_control_evaluator view
     */
    public static is_instance(view: HeapDataView): boolean {
        if (view.byte_length < MallocVar.fixed_byte_length) {
            return false;
        }
        // Check if header is protected
        const header_is_protected = view.is_protected(0, MallocVar.fixed_byte_length);
        if (!header_is_protected) {
            return false;
        }
        // Ensure the tag is accurate
        return MallocVar.from_existing(view).malloc_data.tag === MallocVar.tag;
    }

    /**
     * Initialises a new MallocVar view from an existing value
     * @param view The view for the MallocVar to build from
     */
    public static from_existing(view: HeapDataView): MallocVar {
        return new MallocVar(view);
    }
}