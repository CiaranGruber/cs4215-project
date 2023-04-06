/**
 * HeapDataView
 *
 * The basic data view used for managing data within the heap
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import RestrictedHeap, {bytes_to_string, SegmentationFaultError} from "./RestrictedHeap";
import ImmutableDataView from "./ImmutableDataView";

/**
 * Represents a data view of the heap which can be used to abstract out data from its location in the heap
 */
export default class HeapDataView {
    private heap: RestrictedHeap;
    public readonly byte_offset: number;
    public readonly byte_length: number;

    constructor(existing_view: RestrictedHeap);

    constructor(existing_view: RestrictedHeap, byte_offset: number);

    constructor(existing_view: RestrictedHeap, byte_offset: number, byte_length: number);

    constructor(existing_view: HeapDataView);

    constructor(existing_view: HeapDataView, byte_offset: number);

    constructor(existing_view: HeapDataView, byte_offset: number, byte_length: number);

    constructor(heap: RestrictedHeap | HeapDataView, byte_offset?: number, byte_length?: number) {
        // Set default values
        if (byte_offset === undefined) {
            byte_offset = 0;
        }
        if (byte_length === undefined) {
            byte_length = (heap instanceof RestrictedHeap ? heap.size : heap.byte_length) - byte_offset;
        }
        // Set values
        if (heap instanceof RestrictedHeap) {
            this.heap = heap;
            this.byte_offset = byte_offset;
        } else {
            this.heap = heap.heap;
            this.byte_offset = heap.byte_offset + byte_offset;
            // Ensure it is a subset of the previous one
            if (heap.byte_offset + byte_offset + byte_length > heap.byte_offset + heap.byte_length) {
                throw new RangeError("HeapDataView must be a subset of the existing one");
            }
        }
        this.byte_length = byte_length;
    }

    /**
     * Gets a string showing the data in the heap view
     */
    public to_string(): string {
        const line_length = 8;
        let string = `${this.byte_offset}:`
        for (let i = 0; i < this.byte_length; i++) {
            // End line or add spacer
            if (i > 0 && i % line_length == 0) {
                string += `\n${this.byte_offset + i}: `;
            } else {
                string += " ";
            }
            // Add byte data
            string += this.is_protected(i) ? "P" : "-";
            string += bytes_to_string(this.get_value(i, 1));
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
        if (offset + length > this.byte_length) {
            throw new SegmentationFaultError("Data cannot be retrieved past the heap value");
        }
        return this.heap.get_value(this.byte_offset + offset, length);
    }

    /**
     * Sets a value within the dataview with an offset of 0
     * @param value The value to set
     */
    public set_value(value: ArrayBuffer): void;

    /**
     * Sets a value within the dataview relative to the given offset
     * @param offset The byte offset to start setting the value
     * @param value The value to set
     */
    public set_value(value: ArrayBuffer, offset: number): void;

    /**
     * Sets a value within the dataview relative to the given offset potentially overwriting protected values
     * @param offset The byte offset to start setting the value
     * @param value The value to set
     * @param overwrite_protection Whether to overwrite a value even if it is protected
     */
    public set_value(value: ArrayBuffer, offset: number, overwrite_protection: boolean): void;

    public set_value(value: ArrayBuffer, offset?: number, overwrite_protection?: boolean): void {
        // Set default value of offset
        if (offset === undefined) {
            offset = 0;
        }
        // Check for range error
        if (offset + value.byteLength > this.byte_length || offset < 0) {
            throw new RangeError(`The attempted operation goes outside of the HeapDataView bounds`);
        }

        // Get the current state of protection (assume if there is one protected value, all are protected)
        const protection_state = !this.heap.is_not_protected(this.byte_offset + offset, value.byteLength);
        if (overwrite_protection) {
            this.heap.set_protected(this.byte_offset + offset, false, value.byteLength);
        }
        // Set the value in the heap
        this.heap.set_value(this.byte_offset + offset, value);
        // Restore original protection (being conservative)
        if (overwrite_protection) {
            this.heap.set_protected(this.byte_offset + offset, protection_state, value.byteLength);
        }
    }

    /**
     * Protects a byte given by the offset
     * @param offset The offset of the byte to protect
     */
    public protect(offset: number);

    /**
     * Protects a given set of bytes of a specific offset and length
     * @param offset The offset of the starting byte to protect
     * @param length The number of bytes to protect
     */
    public protect(offset: number, length: number);

    public protect(offset: number, length?: number) {
        // Set default length value
        if (length === undefined) {
            length = 1;
        }
        // Check for range error
        if (offset + length > this.byte_length || offset < 0) {
            throw new RangeError(`The attempted operation goes outside of the HeapDataView bounds`);
        }

        this.heap.set_protected(this.byte_offset + offset, true, length);
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
        // Set default length value
        if (length === undefined) {
            length = 1;
        }
        // Check for range error
        if (offset + length > this.byte_length || offset < 0) {
            throw new RangeError(`The attempted operation goes outside of the HeapDataView bounds`);
        }

        return this.heap.is_protected(this.byte_offset + offset, length);
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
        // Set default length value
        if (length === undefined) {
            length = 1;
        }
        // Check for range error
        if (offset + length > this.byte_length || offset < 0) {
            throw new RangeError(`The attempted operation goes outside of the HeapDataView bounds`);
        }

        return this.heap.is_not_protected(this.byte_offset + offset, length);
    }
}