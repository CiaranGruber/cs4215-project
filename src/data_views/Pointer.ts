/**
 * Pointer
 *
 * Represents a Pointer for use by the antlr_parser within C Memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../heap/HeapDataView";
import GlobalContext from "../global_context/GlobalContext";

/**
 * Allows viewing of Pointer data views including for the C Heap
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>4 bytes - The number stored</li>
 * </ul>
 */
export default class Pointer {
    public static get byte_length() { return GlobalContext.pointer_size }
    private readonly overwrite_protection: boolean;
    private readonly little_endian: boolean;
    private readonly data: DataView;

    /**
     * Initialises a new C Pointer viewer without the ability to overwrite protected values and in big-endian format
     * @param view The data view with the Pointer
     */
    public constructor(view: DataView);

    /**
     * Initialises a new C Pointer viewer with the ability to overwrite protected values and in big-endian format
     * @param view The view of the heap with the Pointer
     * @param overwrite_protection Whether to overwrite protection
     */
    public constructor(view: HeapDataView, overwrite_protection: boolean);

    /**
     * Initialises a new C Pointer viewer with the ability to overwrite protected values
     * @param view The data view with the Pointer
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
    public get value(): number {
        if (this.data instanceof HeapDataView) {
            return this.data.get_value(0, Pointer.byte_length).getInt32(0, this.little_endian);
        }
        return this.data.getInt32(0, this.little_endian);
    }

    /**
     * Sets the value associated with the view
     * @param new_value The new value to set
     */
    public set value(new_value: number) {
        if (!(this.data instanceof HeapDataView)) {
            this.data.setInt32(0, new_value, this.little_endian);
            return;
        }
        // Get value
        const value = new ArrayBuffer(Pointer.byte_length);
        new DataView(value).setInt32(0, new_value, this.little_endian);
        // Set the value in the heap
        this.data.set_value(value, 0, this.overwrite_protection);
    }

    /**
     * Creates a buffer with the associated value
     * @param value The value to create a buffer for
     */
    public static create_buffer(value: number): ArrayBuffer {
        const value_buffer = new ArrayBuffer(Pointer.byte_length);
        new Pointer(new DataView(value_buffer)).value = value;
        return value_buffer;
    }
}