/**
 * BitArray
 *
 * Allows bitwise manipulation of an array buffer
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import {bytes_to_string} from "./RestrictedHeap";

/**
 * Represents a type of data view that allows for individual bit manipulation
 */
export default class BitArray {
    private _buffer: DataView;

    /**
     * Wraps the given buffer in the BitArrayView
     * @param data_view The data view that the bit array is based upon
     */
    constructor(data_view: DataView) {
        this._buffer = data_view;
    }
    /**
     * Gets the ArrayBuffer associated with the given view
     */
    public get buffer(): ArrayBuffer {
        return this._buffer.buffer;
    }

    /**
     * The offset (in bytes) of this view from the start of its ArrayBuffer or SharedArrayBuffer.
     */
    public get byte_offset(): number {
        return this._buffer.byteOffset;
    }

    /**
     * The length (in bytes) of the bit array
     */
    public get byte_length(): number {
        return this._buffer.byteLength;
    }

    /**
     * Prints the BitArray by printing all the bytes in a list format
     */
    public print() {
        let string = "";
        const buffer_to_print = this._buffer.buffer;
        for (let i = 0; i < this._buffer.byteLength; i++) {
            string += bytes_to_string(new DataView(buffer_to_print, this._buffer.byteOffset + i, 1));
        }
        console.log(string);
    }

    /**
     * Gets whether the bit at the given offset is set
     * @param bit_offset The offset for the bit to get
     */
    public is_set(bit_offset: number): boolean {
        // Get location information
        const byte_to_get = bit_offset / 8;
        const bit_to_get = bit_offset % 8;

        // Test if bit is set
        let mask = 1 << (7 - bit_to_get);
        return (this._buffer.getUint8(byte_to_get) & mask) != 0;
    }

    /**
     * Sets the bit at the given offset
     * @param bit_offset The offset of the bit to set
     */
    public set_bit(bit_offset: number) {
        // Get information required
        const byte_to_set = bit_offset / 8;
        const bit_to_set = bit_offset % 8;

        // Set bit
        let number = this._buffer.getUint8(byte_to_set);
        number |= 1 << (7 - bit_to_set);
        this._buffer.setUint8(byte_to_set, number);
    }

    /**
     * Clears the bit at the given offset
     * @param bit_offset The offset of the bit to set
     */
    public clear_bit(bit_offset: number) {
        // Get information required
        const byte_to_set = Math.floor(bit_offset / 8);
        const bit_to_set = bit_offset % 8;

        // Set bit
        let number = this._buffer.getUint8(byte_to_set);
        number &= ~(1 << (7 - bit_to_set));
        this._buffer.setUint8(byte_to_set, number);
    }
}