/**
 * Int8
 *
 * Represents a Int8 for use by the evaluator within C Memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";

/**
 * Represents a Int8 for use by the evaluator within C Memory
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>1 byte - The number stored</li>
 * </ul>
 */
export default class Int8 {
    public static readonly byte_length = 1;
    private readonly overwrite_protection: boolean;
    private readonly data: HeapDataView;

    /**
     * Initialises a new C Int8 viewer without the ability to overwrite protected values and in big-endian format
     * @param view The view of the heap with the Int8
     */
    public constructor(view: HeapDataView);

    /**
     * Initialises a new C Int8 viewer with the ability to overwrite protected values and in big-endian format
     * @param view The view of the heap with the Int8
     * @param overwrite_protection Whether to overwrite protection
     */
    public constructor(view: HeapDataView, overwrite_protection: boolean);

    public constructor(view: HeapDataView, overwrite_protection?: boolean) {
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
        return this.data.get_value(0, Int8.byte_length).getInt8(0);
    }

    /**
     * Sets the value associated with the view
     * @param new_value The new value to set
     */
    public set value(new_value: number) {
        // Get value
        const value = new ArrayBuffer(Int8.byte_length);
        new DataView(value).setInt8(0, new_value);
        // Set the value in the heap
        this.data.set_value(value, 0, this.overwrite_protection);
    }
}