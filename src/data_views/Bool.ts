/**
 * Bool
 *
 * Represents a Bool for use by the antlr_parser within C Memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../heap/HeapDataView";

/**
 * Allows viewing of Bool data views including for the C Heap
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>1 bytes - The Boolean value</li>
 * </ul>
 */
export default class Bool {
    public static readonly byte_length = 1;
    private readonly overwrite_protection: boolean;
    private readonly data: DataView;

    /**
     * Initialises a new C Bool viewer without the ability to overwrite protected values
     * @param view The view of the heap with the Bool
     */
    public constructor(view: DataView);

    /**
     * Initialises a new C Bool viewer with the ability to overwrite protected values
     * @param view The view of the heap with the Bool
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
    public get value(): boolean {
        if (this.data instanceof HeapDataView) {
            return this.data.get_value(0, Bool.byte_length).getUint8(0) !== 0;
        }
        return this.data.getUint8(0) !== 0;
    }

    /**
     * Sets the value associated with the view
     * @param new_value The new value to set
     */
    public set value(new_value: boolean) {
        if (!(this.data instanceof HeapDataView)) {
            this.data.setUint8(0, new_value ? 1 : 0);
            return;
        }
        // Get value
        const value = new ArrayBuffer(Bool.byte_length);
        new DataView(value).setUint8(0, new_value ? 1 : 0);
        // Set the value in the heap
        this.data.set_value(value, 0, this.overwrite_protection);
    }

    /**
     * Creates a buffer with the associated value
     * @param value The value to create a buffer for
     */
    public static create_buffer(value: boolean): ArrayBuffer {
        const value_buffer = new ArrayBuffer(Bool.byte_length);
        new Bool(new DataView(value_buffer)).value = value;
        return value_buffer;
    }
}