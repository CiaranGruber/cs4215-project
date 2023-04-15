/**
 * Int8
 *
 * Represents an Int8 for use by the evaluator within C Memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../heap/HeapDataView";

/**
 * Allows viewing of Int8 explicit_control_evaluator views including for the C Heap
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>1 byte - The number stored</li>
 * </ul>
 */
export default class Int8 {
    public static readonly byte_length = 1;
    private readonly overwrite_protection: boolean;
    private readonly data: DataView;

    /**
     * Initialises a new C Int8 viewer without the ability to overwrite protected values
     * @param view The view of the heap with the Int8
     */
    public constructor(view: DataView);

    /**
     * Initialises a new C Int8 viewer with the ability to overwrite protected values
     * @param view The view of the heap with the Int8
     * @param overwrite_protection Whether to overwrite protection
     */
    public constructor(view: HeapDataView, overwrite_protection: boolean);

    public constructor(view: DataView, overwrite_protection?: boolean) {
        // Set default values
        if (overwrite_protection === undefined) {
            overwrite_protection = false;
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
            return this.data.get_value(0, Int8.byte_length).getInt8(0);
        }
        return this.data.getInt8(0);
    }

    /**
     * Sets the value associated with the view
     * @param new_value The new value to set
     */
    public set value(new_value: number) {
        if (!(this.data instanceof HeapDataView)) {
            this.data.setInt8(0, new_value);
            return;
        }
        // Get value
        const value = new ArrayBuffer(Int8.byte_length);
        new DataView(value).setInt8(0, new_value);
        // Set the value in the heap
        this.data.set_value(value, 0, this.overwrite_protection);
    }

    /**
     * Creates a buffer with the associated value
     * @param value The value to create a buffer for
     */
    public static create_buffer(value: number): ArrayBuffer {
        const value_buffer = new ArrayBuffer(Int8.byte_length);
        new Int8(new DataView(value_buffer)).value = value;
        return value_buffer;
    }
}