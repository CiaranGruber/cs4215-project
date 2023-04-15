/**
 * BigInt64
 *
 * Represents a BigInt64 for use by the evaluator within C Memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../heap/HeapDataView";

/**
 * Represents a BigInt32 for use by the evaluator within C Memory
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>8 bytes - The number stored</li>
 * </ul>
 */
export default class BigInt64 {
    public static readonly byte_length = 8;
    private readonly overwrite_protection: boolean;
    private readonly little_endian: boolean;
    private readonly data: DataView;

    /**
     * Initialises a new C BigInt64 viewer without the ability to overwrite protected values and in big-endian format
     * @param view The view of the heap with the BigInt64
     */
    public constructor(view: DataView);

    /**
     * Initialises a new C BigInt64 viewer with the ability to overwrite protected values and in big-endian format
     * @param view The view of the heap with the BigInt64
     * @param overwrite_protection Whether to overwrite protection
     */
    public constructor(view: HeapDataView, overwrite_protection: boolean);

    /**
     * Initialises a new C BigInt64 viewer with the ability to overwrite protected values
     * @param view The view of the heap with the BigInt64
     * @param overwrite_protection Whether to overwrite protection (Not used for non-HeapDataView instances)
     * @param little_endian Whether to use little-endian format for data
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
    public get value(): bigint {
        if (this.data instanceof HeapDataView) {
            return this.data.get_value(0, BigInt64.byte_length).getBigInt64(0, this.little_endian);
        }
        return this.data.getBigInt64(0, this.little_endian);
    }

    /**
     * Sets the value associated with the view
     * @param new_value The new value to set
     */
    public set value(new_value: bigint) {
        if (!(this.data instanceof HeapDataView)) {
            this.data.setBigInt64(0, new_value, this.little_endian);
            return;
        }
        // Get value
        const value = new ArrayBuffer(BigInt64.byte_length);
        new DataView(value).setBigInt64(0, new_value, this.little_endian);
        // Set the value in the heap
        this.data.set_value(value, 0, this.overwrite_protection);
    }

    /**
     * Creates a buffer with the associated value
     * @param value The value to create a buffer for
     */
    public static create_buffer(value: bigint): ArrayBuffer {
        const value_buffer = new ArrayBuffer(BigInt64.byte_length);
        new BigInt64(new DataView(value_buffer)).value = value;
        return value_buffer;
    }
}