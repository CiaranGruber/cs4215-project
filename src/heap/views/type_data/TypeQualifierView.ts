/**
 * TypeQualifierView
 *
 * Represents type qualifier information
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import {SegmentationFaultError} from "../../RestrictedHeap";
import BitArray from "../../BitArray";
import TypeQualifier, {
    build_qualifier,
    TypeQualifierType
} from "../../../type_descriptions/type_qualifier/TypeQualifier";

/**
 * Represents a set of type information
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>1 bit - If const has been applied</li>
 *     <li>1 bit - If volatile has been applied</li>
 *     <li>1 bit - If restrict has been applied</li>
 *     <li>1 bit - If _Atomic has been applied</li>
 *     <li>4 bits - Empty bits</li>
 * </ul>
 */
export default class TypeQualifierView {
    private static readonly const_offset = 0;
    private static readonly volatile_offset = 1;
    private static readonly restrict_offset = 2;
    private static readonly _Atomic_offset = 3;
    private data: HeapDataView;

    private constructor(data: HeapDataView) {
        this.data = data;
    }

    /**
     * Gets the number of bytes used to represent a MallocData
     */
    public static get byte_length(): number {
        return 1;
    }

    /**
     * Initialises a new type qualifier based upon the value
     */
    public get type_qualifier(): TypeQualifier {
        // Build qualifier list
        const qualifiers = new Array<TypeQualifierType>();
        if (this.is_const) qualifiers.push(TypeQualifierType.CONST);
        if (this.is_atomic) qualifiers.push(TypeQualifierType.ATOMIC);
        if (this.is_restrict) qualifiers.push(TypeQualifierType.RESTRICT);
        if (this.is_volatile) qualifiers.push(TypeQualifierType.VOLATILE);
        // Build and return qualifier
        return build_qualifier(qualifiers);
    }

    private get is_const(): boolean {
        return this.data.get_value(0, 1).get_bit_state(TypeQualifierView.const_offset);
    }

    private set is_const(const_state: boolean) {
        // Get value
        const value = new DataView(new ArrayBuffer(1));
        value.setUint8(0, this.data.get_value(0, 1).getUint8(0));
        new BitArray(value).update_bit(TypeQualifierView.const_offset, const_state);
        // Set the value in the heap
        this.data.set_value(value.buffer, 0, true);
    }

    private get is_volatile(): boolean {
        return this.data.get_value(0, 1).get_bit_state(TypeQualifierView.volatile_offset);
    }

    private set is_volatile(const_state: boolean) {
        // Get value
        const value = new DataView(new ArrayBuffer(1));
        value.setUint8(0, this.data.get_value(0, 1).getUint8(0));
        new BitArray(value).update_bit(TypeQualifierView.volatile_offset, const_state);
        // Set the value in the heap
        this.data.set_value(value.buffer, 0, true);
    }

    private get is_restrict(): boolean {
        return this.data.get_value(0, 1).get_bit_state(TypeQualifierView.restrict_offset);
    }

    private set is_restrict(const_state: boolean) {
        // Get value
        const value = new DataView(new ArrayBuffer(1));
        value.setUint8(0, this.data.get_value(0, 1).getUint8(0));
        new BitArray(value).update_bit(TypeQualifierView.restrict_offset, const_state);
        // Set the value in the heap
        this.data.set_value(value.buffer, 0, true);
    }

    private get is_atomic(): boolean {
        return this.data.get_value(0, 1).get_bit_state(TypeQualifierView._Atomic_offset);
    }

    private set is_atomic(const_state: boolean) {
        // Get value
        const value = new DataView(new ArrayBuffer(1));
        value.setUint8(0, this.data.get_value(0, 1).getUint8(0));
        new BitArray(value).update_bit(TypeQualifierView._Atomic_offset, const_state);
        // Set the value in the heap
        this.data.set_value(value.buffer, 0, true);
    }

    /**
     * Allocates a type qualifier in the given heap view
     * @param view The view used to change the heap values
     * @param type_qualifier The type qualifier to allocated
     */
    public static allocate_value(view: HeapDataView, type_qualifier: TypeQualifier): TypeQualifierView {
        const type_info_view = new TypeQualifierView(view);
        // Ensure the data is not already protected
        if (!view.is_not_protected(0, TypeQualifierView.byte_length)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set values
        type_info_view.is_const = type_qualifier.is_const();
        type_info_view.is_volatile = type_qualifier.is_volatile();
        type_info_view.is_restrict = type_qualifier.is_restrict();
        type_info_view.is_atomic = type_qualifier.is_atomic();
        // Protect type qualifier
        view.protect(0, TypeQualifierView.byte_length);
        return type_info_view;
    }

    /**
     * Initialises a new TypeQualifierView view from an existing value
     * @param view The view for the TypeQualifierView to build from
     */
    public static from_existing(view: HeapDataView): TypeQualifierView {
        return new TypeQualifierView(view);
    }
}