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
 * Represents a type of explicit_control_evaluator view that allows for individual bit manipulation
 */
export default class BitArray {
    private _buffer: DataView;

    /**
     * Wraps the given buffer in a BitArray
     * @param buffer The buffer that the bit array is based upon
     */
    constructor(buffer: ArrayBuffer);

    /**
     * Wraps the given view in the BitArray
     * @param data_view The view that the bit array is based upon
     */
    constructor(data_view: DataView);

    constructor(view: ArrayBuffer | DataView) {
        if (view instanceof ArrayBuffer) {
            this._buffer = new DataView(view);
        } else {
            this._buffer = view;
        }
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
     * Gets the BitArray in string format by showing all the bytes in a list format
     */
    public to_string(): string {
        let string = "";
        const buffer_to_print = this._buffer.buffer;
        for (let i = 0; i < this._buffer.byteLength; i++) {
            string += bytes_to_string(new DataView(buffer_to_print, this._buffer.byteOffset + i, 1));
        }
        return string;
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
     * Updates the state of a bit to match the boolean value
     * @param bit_offset The offset of the bit to update
     * @param bit_state The new state to update the bit to
     */
    public update_bit(bit_offset: number, bit_state: boolean) {
        bit_state ? this.set_bit(bit_offset) : this.clear_bit(bit_offset);
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