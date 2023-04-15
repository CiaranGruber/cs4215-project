/**
 * StashValue
 *
 * Represents a value stored within the stash in C memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import TypeInformation from "../../../type_descriptions/TypeInformation";
import TypeInfoView from "../type_data/TypeInfoView";
import {SegmentationFaultError} from "../../RestrictedHeap";
import CValue from "../../../explicit-control-evaluator/CValue";
import UInt16 from "../../../data_views/UInt16";
import UInt32 from "../../../data_views/UInt32";
import Int32 from "../../../data_views/Int32";
import Bool from "../../../data_views/Bool";

/**
 * Represents a value stored within the stash in C memory
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>1 byte - Whether the value is an lValue or a prValue</li>
 *     <li>2 bytes - The size of the type information</li>
 *     <li>4 bytes - The size of the data</li>
 *     <li>4 bytes - The offset of the previous stash value</li>
 *     <li>TypeInfoView.byte_length - The type of the StashValue represented</li>
 *     <li>x bytes - The value stored in the StashValue</li>
 * </ul>
 */
export default class StashValue {
    private static readonly is_l_value_offset = 0;
    private static readonly is_l_value_length = Bool.byte_length;
    private static readonly type_info_size_offset = StashValue.is_l_value_offset + StashValue.is_l_value_length;
    private static readonly type_info_size_length = UInt16.byte_length;
    private static readonly data_size_offset = StashValue.type_info_size_offset + StashValue.type_info_size_length;
    private static readonly data_size_length = UInt32.byte_length;
    private static readonly prev_offset_offset = StashValue.data_size_offset + StashValue.data_size_length;
    private static readonly prev_offset_length = Int32.byte_length;
    private static readonly type_info_offset = StashValue.prev_offset_offset + StashValue.prev_offset_length;
    private get data_offset() { return StashValue.type_info_offset + this.type_info_size }
    private data: HeapDataView;

    private constructor(data: HeapDataView) {
        this.data = data;
    }

    /**
     * Gets the fixed size of a StashValue in memory
     */
    public static get fixed_byte_length(): number {
        return this.is_l_value_length + this.type_info_size_length + this.data_size_length + this.prev_offset_length;
    }

    /**
     * Gets the total byte length occupied by the StashValue
     */
    public get byte_length(): number {
        return StashValue.fixed_byte_length + this.type_info_size + this.data_size;
    }

    private get is_l_value_view(): Bool {
        return new Bool(this.data.subset(StashValue.is_l_value_offset, StashValue.is_l_value_length),
            true);
    }

    private get is_l_value(): boolean {
        return this.is_l_value_view.value;
    }

    private set is_l_value(new_state: boolean) {
        this.is_l_value_view.value = new_state;
    }

    private get type_info_view() {
        return this.data.subset(StashValue.type_info_offset, this.type_info_size);
    }

    /**
     * Gets the type information used to represent the stash value
     */
    public get type_info(): TypeInformation {
        return TypeInfoView.from_existing(this.type_info_view).type_information;
    }

    /**
     * Gets whether the stash value is a function or not (not including function pointers)
     */
    public get is_function(): boolean {
        return TypeInfoView.from_existing(this.type_info_view).type_information.is_function;
    }

    private get type_info_size_view(): UInt16 {
        return new UInt16(this.data.subset(StashValue.type_info_size_offset, StashValue.type_info_size_length),
            true);
    }

    private get type_info_size(): number {
        return this.type_info_size_view.value;
    }

    private set type_info_size(new_size: number) {
        this.type_info_size_view.value = new_size;
    }

    private get data_size_view(): UInt32 {
        return new UInt32(this.data.subset(StashValue.data_size_offset, StashValue.data_size_length),
            true);
    }

    private get data_size(): number {
        return this.data_size_view.value;
    }

    private set data_size(new_size: number) {
        this.data_size_view.value = new_size;
    }

    private get prev_offset_view(): Int32 {
        return new Int32(this.data.subset(StashValue.prev_offset_offset, StashValue.prev_offset_length),
            true);
    }

    /**
     * Gets the previous offset mentioned by the stash value
     */
    public get prev_offset(): number {
        return this.prev_offset_view.value;
    }

    private set prev_offset(new_size: number) {
        this.prev_offset_view.value = new_size;
    }

    /**
     * Gets the data view associated with the given stash value
     */
    private get data_view(): HeapDataView {
        return this.data.subset(this.data_offset, this.data_size);
    }

    /**
     * Gets the value associated with the stash value
     */
    public get value(): CValue {
        const value_copy: ArrayBuffer = this.data_view.get_value(0, this.data_size).referenced_buffer;
        return new CValue(this.is_l_value, this.type_info, value_copy);
    }

    /**
     * Allocates a Stash Value in the given heap view
     * @param view The view used to change the heap values
     * @param variable The stash value to allocate for
     * @param prev_stash_value The offset of the previous stash value
     */
    public static allocate_value(view: HeapDataView, variable: CValue, prev_stash_value: number): StashValue {
        const heap_variable = new StashValue(view);
        // Get relevant sizes
        const type_info_size = TypeInfoView.size_required(variable.type_information);
        const data_size = variable.type_information.data_size;
        const total_size = StashValue.fixed_byte_length + type_info_size + data_size;
        // Ensure the StashValue is not already protected
        if (!view.is_not_protected(0, total_size)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set size info
        heap_variable.is_l_value = variable.is_l_value;
        heap_variable.data_size = data_size;
        heap_variable.type_info_size = type_info_size;
        heap_variable.prev_offset = prev_stash_value;
        heap_variable.data_view.set_value(variable.data);
        // Set information
        TypeInfoView.allocate_value(heap_variable.type_info_view, variable.type_information);
        // Protect information about the stash value
        view.protect(StashValue.is_l_value_offset, total_size - data_size);
        return heap_variable;
    }

    /**
     * Gets the size of the stash value from the header
     * @param header_view Gets the size of the value from the given header view
     */
    public static get_size(header_view: HeapDataView) {
        return StashValue.from_existing(header_view).byte_length;
    }

    /**
     * Gets the size required to store a stash value with the given information
     * @param value The value to get the required size for
     */
    public static size_required(value: CValue) {
        const type_info_size = TypeInfoView.size_required(value.type_information)
        const data_size = value.type_information.data_size;
        return StashValue.fixed_byte_length + type_info_size + data_size;
    }

    /**
     * Initialises a new StashValue view from an existing value
     * @param view The view for the StashValue to build from
     */
    public static from_existing(view: HeapDataView): StashValue {
        return new StashValue(view);
    }
}