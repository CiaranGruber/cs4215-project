/**
 * RestrictedHeap
 *
 * A representation of a basic heap with the ability to restrict access by default
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import BitArray from "./BitArray";
import ImmutableDataView from "./ImmutableDataView";

/**
 * Converts a given set of bytes to a string
 * @param bytes The bytes to set
 */
export function bytes_to_string(bytes: DataView): string {
    const bit_view = new BitArray(bytes);
    let string = "";
    for (let i = 0; i < bit_view.byte_length; i++) {
        // Add spacer between each byte
        if (i !== 0) {
            string += " ";
        }
        // Add bits to string
        for (let j = 0; j < 8; j++) {
            string += bit_view.is_set(i * 8 + j) ? "1" : "0";
        }
    }
    return string;
}

/**
 * Copies the data from a source array buffer to the destination array buffer
 * @param src The source array buffer
 * @param dest The destination array buffer
 */
function copy_array_buffer(src: ArrayBuffer, dest: DataView) {
    new Uint8Array(dest.buffer, dest.byteOffset, dest.byteLength).set(new Uint8Array(src));
}

/**
 * Represents a heap that allows edit restrictions
 */
export default class RestrictedHeap {
    /**
     * The metadata used to classify each byte as either protected or not protected
     * @private
     */
    private protection_array: BitArray;
    /**
     * The actual data used for the heap
     * @private
     */
    private readonly data: ArrayBuffer;

    /**
     * Constructs a restricted heap with the given size and address
     * @param size The size of the heap in bytes
     */
    constructor(size: number);

    /**
     * Constructs a restricted heap with the given size and address
     * @param size The size of the heap in bytes
     * @param starts_protected Whether the bytes will start off by being protected or not
     */
    constructor(size: number, starts_protected: boolean);

    constructor(size: number, starts_protected?: boolean) {
        // Set default value for starting protection
        if (starts_protected === undefined) {
            starts_protected = false;
        }
        // Create initial restricted heap
        if (starts_protected) {
            const editBuffer = new DataView(new ArrayBuffer(Math.ceil(size / 8.0)));
            for (let i = 0; i < editBuffer.byteLength; i++) {
                editBuffer.setUint8(i, ~0);
            }
            this.protection_array = new BitArray(editBuffer);
        } else {
            this.protection_array = new BitArray(new DataView(new ArrayBuffer(Math.ceil(size / 8.0))));
        }
        // Create main data heap
        this.data = new ArrayBuffer(size);
    }

    /**
     * Gets the size of the restricted heap
     */
    public get size(): number {
        return this.data.byteLength;
    }

    /**
     * Converts the given heap to a string
     */
    public to_string(): string {
        const line_length = 8;
        let string = `${0}:`
        for (let i = 0; i < this.size; i++) {
            // End line or add spacer
            if (i > 0 && i % line_length == 0) {
                string += `\n${i}: `;
            } else {
                string += " ";
            }
            // Add byte data
            string += this.protection_array.is_set(i) ? "P" : "-";
            string += bytes_to_string(new ImmutableDataView(new DataView(this.data, i, 1)));
        }
        // Print final line
        return string;
    }

    /**
     * Gets the value at the given offset
     * @param offset The offset to get the value of
     * @param length The length of value to retrieve
     */
    public get_value(offset: number, length: number): ImmutableDataView {
        if (offset + length > this.data.byteLength) {
            throw new SegmentationFaultError("Data cannot be retrieved past the heap value");
        }
        return new ImmutableDataView(new DataView(this.data, offset, length));
    }

    /**
     * Sets the byte at the given offset
     * @param offset The offset of the byte to set
     * @param value The buffer to set the given offset to
     */
    public set_value(offset: number, value: ArrayBuffer) {
        // Ensure all bytes are not protected and within bounds
        if (offset < 0) {
            throw new SegmentationFaultError("Attempted to set bytes outside of available memory");
        }
        for (let i = offset; i < offset + value.byteLength; i++) {
            if (i >= this.data.byteLength) {
                throw new SegmentationFaultError("Attempted to set bytes outside of available memory");
            } else if (this.protection_array.is_set(i)) {
                throw new SegmentationFaultError(`Byte at offset ${i} cannot be edited`);
            }
        }

        // Copy value into heap
        copy_array_buffer(value, new DataView(this.data, offset, value.byteLength));
    }

    /**
     * Sets the edit possibility for the byte at the given offset
     * @param offset The offset of the byte to set
     * @param is_protected Whether the byte should be allowed to be edited
     */
    public set_protected(offset: number, is_protected: boolean): void;

    /**
     * Sets the edit possibility for the byte at the given offset
     * @param offset The offset of the byte to set
     * @param is_protected Whether the byte should be allowed to be edited
     * @param length The number of bytes to set the edit value of
     */
    public set_protected(offset: number, is_protected: boolean, length: number): void;

    public set_protected(offset: number, is_protected: boolean, length?: number): void {
        // Set default length value
        if (length === undefined) {
            length = 1;
        }
        // Check for segmentation fault
        if (offset + length > this.data.byteLength) {
            throw new SegmentationFaultError("Attempted to set the edit value of bytes outside of the available memory");
        }
        // Set edit state for each byte
        for (let i = 0; i < length; i++) {
            if (is_protected) {
                this.protection_array.set_bit(offset + i);
            } else {
                this.protection_array.clear_bit(offset + i);
            }
        }
    }

    /**
     * Determines if a given byte is protected
     * @param offset The offset of the byte
     */
    public is_protected(offset: number): boolean;

    /**
     * Determines if the set of bytes are fully protected or not
     * @param offset The offset to begin checking
     * @param length The number of bytes to check
     */
    public is_protected(offset: number, length: number): boolean;

    public is_protected(offset: number, length?: number): boolean {
        if (length === undefined) {
            length = 1;
        }
        // Check for segmentation fault
        if (offset + length > this.size) {
            throw new SegmentationFaultError("Attempted to check the edit status of values outside of the heap");
        }
        // Check if any bytes are not protected
        for (let i = offset; i < offset + length; i++) {
            if (!this.protection_array.is_set(i)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Determines if a given byte is not protected
     * @param offset The offset of the byte
     */
    public is_not_protected(offset: number): boolean;

    /**
     * Determines if the set of bytes are completely open for editing
     * @param offset The offset to begin checking
     * @param length The number of bytes to check
     */
    public is_not_protected(offset: number, length: number): boolean;

    public is_not_protected(offset: number, length?: number): boolean {
        if (length === undefined) {
            length = 1;
        }
        // Check for segmentation fault
        if (offset + length > this.size) {
            throw new SegmentationFaultError("Attempted to check the edit status of values outside of the heap");
        }
        // Check if any bytes are protected
        for (let i = offset; i < offset + length; i++) {
            if (this.protection_array.is_set(i)) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Thrown when an interface attempts to access more memory than is possible to access
 */
export class SegmentationFaultError extends Error {
    /**
     * Constructs a new SegmentationFaultError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "SegmentationFaultError";
    }
}