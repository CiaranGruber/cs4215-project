/**
 * VariableMem
 *
 * Represents an environment variable within a C environment
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import TypeInformation from "../../../type_descriptions/TypeInformation";
import TypeInfoView from "../type_data/TypeInfoView";
import {SegmentationFaultError} from "../../RestrictedHeap";
import CString from "../../../data_views/CString";
import VariableDeclaration from "../../../explicit-control-evaluator/VariableDeclaration";
import UInt8 from "../../../data_views/UInt8";
import UInt16 from "../../../data_views/UInt16";
import UInt32 from "../../../data_views/UInt32";
import Bool from "../../../data_views/Bool";
import CValue from "../../../explicit-control-evaluator/CValue";
import Pointer from "../../../data_views/Pointer";

/**
 * Represents an environment variable
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>1 byte - Whether the variable has been declared</li>
 *     <li>2 bytes - The size of the type information</li>
 *     <li>1 byte - The size of the name</li>
 *     <li>4 bytes - The size of the data</li>
 *     <li>TypeInformation.byte_length - The type information of the variable</li>
 *     <li>x × CString.byte_length - Character array representing the name of the variable</li>
 *     <li>x bytes - The bytes for the variable data</li>
 * </ul>
 */
export default class VariableMem {
    private static readonly is_declared_offset = 0;
    private static readonly is_declared_length = Bool.byte_length;
    private static readonly type_info_size_offset = VariableMem.is_declared_offset + VariableMem.is_declared_length;
    private static readonly type_info_size_length = UInt16.byte_length;
    private static readonly name_size_offset = VariableMem.type_info_size_offset + VariableMem.type_info_size_length;
    private static readonly name_size_length = UInt8.byte_length;
    private static readonly data_size_offset = VariableMem.name_size_offset + VariableMem.name_size_length;
    private static readonly data_size_length = UInt32.byte_length;
    private static get type_info_offset() { return VariableMem.fixed_byte_length; }
    private get name_offset() { return VariableMem.type_info_offset + this.type_info_size }
    private get data_offset() { return this.name_offset + this.name_size }
    private data: HeapDataView;

    private constructor(data: HeapDataView) {
        this.data = data;
    }

    /**
     * Gets the fixed size of a VariableMem in the heap
     */
    public static get fixed_byte_length(): number {
        return this.is_declared_length + this.type_info_size_length + this.name_size_length + this.data_size_length;
    }

    /**
     * Gets the total byte length occupied by the variable
     */
    public get byte_length(): number {
        return VariableMem.fixed_byte_length + this.type_info_size + this.name_size + this.data_size;
    }

    private get is_declared_view(): Bool {
        return new Bool(this.data.subset(VariableMem.is_declared_offset, VariableMem.is_declared_length),
            true);
    }

    /**
     * Whether the given type is a function or not
     */
    public get is_declared(): boolean {
        return this.is_declared_view.value;
    }

    /**
     * Classifies the variable as declared
     */
    public declare() {
        this.is_declared_view.value = true;
    }

    private get type_info_view(): HeapDataView {
        return this.data.subset(VariableMem.type_info_offset, this.type_info_size);
    }

    /**
     * Gets the type information used to represent the variable
     */
    public get type_info(): TypeInformation {
        return TypeInfoView.from_existing(this.type_info_view).type_information;
    }

    /**
     * Gets the value for the VariableMem
     */
    public get value(): CValue {
        const value = new ArrayBuffer(Pointer.byte_length);
        new Pointer(new DataView(value)).value = this.data_view.byte_offset;
        return new CValue(true, this.type_info, value);
    }

    private get type_info_size_view(): UInt16 {
        return new UInt16(this.data.subset(VariableMem.type_info_size_offset, VariableMem.type_info_size_length),
            true);
    }

    private get type_info_size(): number {
        return this.type_info_size_view.value;
    }

    private set type_info_size(new_size: number) {
        this.type_info_size_view.value = new_size;
    }

    private get name_view(): CString {
        return new CString(this.data.subset(this.name_offset, this.name_size));
    }

    /**
     * Gets the name of the variable
     */
    public get name(): string {
        return this.name_view.value;
    }

    private set name(name: string) {
        this.name_view.value = name;
    }

    /**
     * Checks efficiently if the variable matches the given name
     * @param name The name to check
     */
    public is_name(name: string): boolean {
        // Check characters
        return this.name_view.is(name);
    }

    private get name_size_view(): UInt8 {
        return new UInt8(this.data.subset(VariableMem.name_size_offset, VariableMem.name_size_length),
            true);
    }

    private get name_size(): number {
        return this.name_size_view.value;
    }

    private set name_size(new_size: number) {
        this.name_size_view.value = new_size;
    }

    private get data_size_view(): UInt16 {
        return new UInt16(this.data.subset(VariableMem.data_size_offset, VariableMem.data_size_length),
            true);
    }

    private get data_size(): number {
        return this.data_size_view.value;
    }

    private set data_size(new_size: number) {
        this.data_size_view.value = new_size;
    }

    /**
     * Gets the data view associated with the given variable
     */
    public get data_view(): HeapDataView {
        return this.data.subset(this.data_offset, this.data_size);
    }

    /**
     * Allocates a variable in the given heap view
     * @param view The view used to change the heap values
     * @param variable The variable to allocate for
     */
    public static allocate_value(view: HeapDataView, variable: VariableDeclaration): VariableMem {
        const heap_variable = new VariableMem(view);
        // Get relevant sizes
        const name_size = CString.size_required(variable.name);
        const type_info_size = TypeInfoView.size_required(variable.type_information);
        const data_size = variable.type_information.data_size;
        const total_size = VariableMem.fixed_byte_length + type_info_size + name_size + data_size;
        // Ensure the data is not already protected
        if (!view.is_not_protected(0, total_size)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set as not declared
        heap_variable.is_declared_view.value = false;
        // Set size info
        heap_variable.data_size = data_size;
        heap_variable.type_info_size = type_info_size;
        heap_variable.name_size = name_size;
        // Set information
        TypeInfoView.allocate_value(heap_variable.type_info_view, variable.type_information);
        heap_variable.name = variable.name;
        // Protect information about the heap_variable
        view.protect(VariableMem.is_declared_offset, total_size - data_size);
        return heap_variable;
    }

    /**
     * Gets the size of the variable from the variable header
     * @param header_view Gets the data size from the given header view
     */
    public static get_size(header_view: HeapDataView) {
        return VariableMem.from_existing(header_view).byte_length;
    }

    /**
     * Gets the size required to store a variable with the given information
     * @param variable The variable to get the required size for
     */
    public static size_required(variable: VariableDeclaration) {
        const type_info_size = TypeInfoView.size_required(variable.type_information)
        const data_size = variable.type_information.data_size;
        const name_size = CString.size_required(variable.name);
        return VariableMem.fixed_byte_length + type_info_size + name_size + data_size;
    }

    /**
     * Initialises a new VariableMem view from an existing value
     * @param view The view for the VariableMem to build from
     */
    public static from_existing(view: HeapDataView): VariableMem {
        return new VariableMem(view);
    }
}