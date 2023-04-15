/**
 * UInt16
 *
 * Represents a UInt16 for use by the evaluator within C Memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../heap/HeapDataView";

/**
 * Allows viewing of UInt16 explicit_control_evaluator views including for the C Heap
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>4 bytes - The number stored</li>
 * </ul>
 */
export default class UInt16 {
    public static readonly byte_length = 2;
    private readonly overwrite_protection: boolean;
    private readonly little_endian: boolean;
    private readonly data: DataView;

    /**
     * Initialises a new C UInt16 viewer without the ability to overwrite protected values and in big-endian format
     * @param view The explicit_control_evaluator view with the UInt16
     */
    public constructor(view: DataView);

    /**
     * Initialises a new C UInt16 viewer with the ability to overwrite protected values and in big-endian format
     * @param view The view of the heap with the UInt16
     * @param overwrite_protection Whether to overwrite protection
     */
    public constructor(view: HeapDataView, overwrite_protection: boolean);

    /**
     * Initialises a new C UInt16 viewer with the ability to overwrite protected values
     * @param view The explicit_control_evaluator view with the UInt16
     * @param overwrite_protection Whether to overwrite protection (Not used for non-HeapDataView instances)
     * @param little_endian Whether to use little-endian format for explicit_control_evaluator
     */
    public constructor(view: DataView, overwrite_protection: boolean, little_endian: boolean);

    public constructor(view: DataView, overwrite_protection?: boolean, little_endian?: boolean) {
        // Set default values
        if (overwrite_protection === undefined) {
            overwrite_protection = false;
        }
        if (little_endian === undefined) {
            this.little_endian = false;
        }
        // Set internal values
        this.overwrite_protection = overwrite_protection;
        this.data = view;
    }

    /**
     * Gets the value associated with the view
     */
    public get value(): number {
        if (this.data instanceof HeapDataView) {
            return this.data.get_value(0, UInt16.byte_length).getUint16(0, this.little_endian);
        }
        return this.data.getUint16(0, this.little_endian);
    }

    /**
     * Sets the value associated with the view
     * @param new_value The new value to set
     */
    public set value(new_value: number) {
        if (!(this.data instanceof HeapDataView)) {
            this.data.setUint16(0, new_value, this.little_endian);
            return;
        }
        // Get value
        const value = new ArrayBuffer(UInt16.byte_length);
        new DataView(value).setUint16(0, new_value, this.little_endian);
        // Set the value in the heap
        this.data.set_value(value, 0, this.overwrite_protection);
    }

    /**
     * Creates a buffer with the associated value
     * @param value The value to create a buffer for
     */
    public static create_buffer(value: number): ArrayBuffer {
        const value_buffer = new ArrayBuffer(UInt16.byte_length);
        new UInt16(new DataView(value_buffer)).value = value;
        return value_buffer;
    }
}