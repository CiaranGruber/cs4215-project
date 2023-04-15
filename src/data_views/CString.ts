/**
 * CString
 *
 * Represents a String for use by the evaluator within C Memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../heap/HeapDataView";

/**
 * Represents a String for use by the evaluator within C Memory
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>x bytes - The string stored</li>
 * </ul>
 */
export default class CString {
    private readonly overwrite_protection: boolean;
    private readonly data: DataView;

    /**
     * Initialises a new C String viewer without the ability to overwrite protected values
     * @param view The view of the heap with the string
     */
    public constructor(view: DataView);

    /**
     * Initialises a new C String viewer with the ability to overwrite protected values
     * @param view The view of the heap with the string
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
     * Gets the string associated with the given String instance
     */
    public get value(): string {
        let string = "";
        for (let i = 0; i < this.data.byteLength; i++) {
            const char_val = this.data.getUint8(i);
            // Stop reading if it has accessed null-byte
            if (char_val === 0) {
                break;
            }
            // Add to string
            string += String.fromCharCode(char_val);
        }
        return string;
    }

    /**
     * Sets the string associated with the given String instance
     * @param string The string to copy
     */
    public set value(string: string) {
        string += String.fromCharCode(0);
        const length_to_copy = Math.min(this.data.byteLength, string.length);
        // Copy string into ArrayBuffer
        const value_view = new DataView(new ArrayBuffer(length_to_copy));
        for (let i = 0; i < length_to_copy; i++) {
            value_view.setUint8(i, string.charCodeAt(i));
            if (string.charCodeAt(i) === 0) {
                break;
            }
        }
        // Set value in the heap
        if (this.data instanceof HeapDataView) {
            this.data.set_value(value_view.buffer, 0, this.overwrite_protection);
        } else {
            new Uint8Array(value_view.buffer).forEach((value, index) => {
                this.data.setUint8(index, value);
            });
        }
    }

    /**
     * Determines whether the string is equivalent to the value in the heap
     * @param other The value to compare to
     */
    public is(other: string) {
        // Check length
        if (other.length > this.data.byteLength) {
            return false;
        }
        // Add null byte
        other += String.fromCharCode(0);
        // Compare characters
        for (let i = 0; i < this.data.byteLength; i++) {
            const char_code = this.data.getUint8(i);
            const other_char_code = other.charCodeAt(i);
            // Check if it has reached the end of string or the characters are not the same
            if (char_code === 0 && other_char_code === 0) {
                return true;
            } else if (char_code !== other_char_code) {
                return false;
            }
        }
        // In the case that the null byte for other is not reached
        return true;
    }

    /**
     * Gets the required length for the specified string up to the first null-byte
     * @param string The string to get the length for
     */
    public static size_required(string: string) {
        let i;
        for (i = 0; i < string.length; i++) {
            if (string.charCodeAt(i) === 0) {
                return i;
            }
        }
        return i + 1;
    }

    /**
     * Creates a buffer with the associated value
     * @param string The string to create a buffer for
     */
    public static create_buffer(string: string): ArrayBuffer {
        const value_buffer = new ArrayBuffer(CString.size_required(string));
        new CString(new DataView(value_buffer)).value = string;
        return value_buffer;
    }
}