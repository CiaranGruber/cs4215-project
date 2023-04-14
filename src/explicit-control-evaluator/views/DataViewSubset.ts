/**
 * DataViewSubset
 *
 * An subset of an existing data view
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import BitArray from "../../heap/BitArray";

/**
 * Wraps a given DataView class to remove access to the ability to set data
 */
export default class DataViewSubset implements DataView {
    [Symbol.toStringTag]: string;
    private readonly data_view: DataView;
    private byte_offset;
    private byte_length;

    /**
     * Constructs a new DataViewSubset instance based upon an existing DataView or ArrayBuffer
     * @param data_view The data view that the DataViewSubset is based upon
     */
    constructor(data_view: DataView | ArrayBuffer);

    /**
     * Constructs a new DataViewSubset instance based upon an existing DataView or ArrayBuffer
     * @param data_view The data view that the DataViewSubset is based upon
     * @param byte_offset The offset to start creating the subset from
     */
    constructor(data_view: DataView | ArrayBuffer, byte_offset: number);

    /**
     * Constructs a new DataViewSubset instance based upon an existing DataView or ArrayBuffer
     * @param data_view The data view that the DataViewSubset is based upon
     * @param byte_offset The offset to start creating the subset from
     * @param byte_length The length of bytes to include in the subset
     */
    constructor(data_view: DataView | ArrayBuffer, byte_offset: number, byte_length: number);

    constructor(data_view: DataView | ArrayBuffer, byte_offset?: number, byte_length?: number) {
        // Set default values
        if (byte_offset === undefined) {
            byte_offset = 0;
        }
        if (byte_length === undefined) {
            byte_length = data_view.byteLength - byte_offset;
        }
        // Ensure it is a subset of the current view
        if (byte_offset < 0 || byte_length < 0 || byte_offset >= data_view.byteLength || byte_offset + byte_length > data_view.byteLength) {
            throw new RangeError("DataViewSubset must be a subset of an existing DataView");
        }
        // Set values
        if (data_view instanceof DataView) {
            this.data_view = data_view;
        } else {
            this.data_view = new DataView(data_view);
        }
        this.byte_offset = byte_offset;
        this.byte_length = byte_length;
    }

    /**
     * Gets a slice of the buffer that the ImmutableDataView refers to
     */
    public get buffer(): ArrayBuffer {
        return this.data_view.buffer;
    }

    /**
     * Gets a slice of the specific section of buffer that the ImmutableDataView refers to
     */
    public get referenced_buffer(): ArrayBuffer {
        return this.data_view.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
    }

    public get byteLength() {
        return this.byte_length;
    }

    public get byteOffset() {
        return this.data_view.byteOffset + this.byte_offset;
    }

    private validate_subset(byte_offset: number, byte_length: number) {
        if (byte_offset < 0 || byte_length < 0 || byte_offset >= this.byteLength ||
            byte_offset + byte_length > this.byteLength) {
            throw new RangeError("Offset and byte length must be within the bounds of the DataViewSubset");
        }
    }

    getBigInt64(byteOffset: number, littleEndian?: boolean): bigint {
        this.validate_subset(byteOffset, 8);
        return this.data_view.getBigInt64(this.byte_offset + byteOffset, littleEndian);
    }

    getBigUint64(byteOffset: number, littleEndian?: boolean): bigint {
        this.validate_subset(byteOffset, 8);
        return this.data_view.getBigUint64(this.byte_offset + byteOffset, littleEndian);
    }

    getFloat32(byteOffset: number, littleEndian?: boolean): number {
        this.validate_subset(byteOffset, 4);
        return this.data_view.getFloat32(this.byte_offset + byteOffset, littleEndian);
    }

    getFloat64(byteOffset: number, littleEndian?: boolean): number {
        this.validate_subset(byteOffset, 8);
        return this.data_view.getFloat64(this.byte_offset + byteOffset, littleEndian);
    }

    getInt16(byteOffset: number, littleEndian?: boolean): number {
        this.validate_subset(byteOffset, 2);
        return this.data_view.getInt16(this.byte_offset + byteOffset, littleEndian);
    }

    getInt32(byteOffset: number, littleEndian?: boolean): number {
        this.validate_subset(byteOffset, 4);
        return this.data_view.getInt32(this.byte_offset + byteOffset, littleEndian);
    }

    getInt8(byteOffset: number): number {
        this.validate_subset(byteOffset, 1);
        return this.data_view.getInt8(this.byte_offset + byteOffset);
    }

    getUint16(byteOffset: number, littleEndian?: boolean): number {
        this.validate_subset(byteOffset, 2);
        return this.data_view.getUint16(this.byte_offset + byteOffset, littleEndian);
    }

    getUint32(byteOffset: number, littleEndian?: boolean): number {
        this.validate_subset(byteOffset, 4);
        return this.data_view.getUint32(this.byte_offset + byteOffset, littleEndian);
    }

    getUint8(byteOffset: number): number {
        this.validate_subset(byteOffset, 1);
        return this.data_view.getUint8(this.byte_offset + byteOffset);
    }

    get_bit_state(bit_offset: number): boolean {
        return new BitArray(this).is_set(bit_offset);
    }

    setBigInt64(byteOffset: number, value: bigint, littleEndian?: boolean): void {
        this.validate_subset(byteOffset, 8);
        this.data_view.setBigInt64(this.byte_offset + byteOffset, value, littleEndian);
    }

    setBigUint64(byteOffset: number, value: bigint, littleEndian?: boolean): void {
        this.validate_subset(byteOffset, 8);
        this.data_view.setBigInt64(this.byte_offset + byteOffset, value, littleEndian);
    }

    setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.validate_subset(byteOffset, 4);
        this.data_view.setFloat32(this.byte_offset + byteOffset, value, littleEndian);
    }

    setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.validate_subset(byteOffset, 8);
        this.data_view.setFloat64(this.byte_offset + byteOffset, value, littleEndian);
    }

    setInt16(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.validate_subset(byteOffset, 2);
        this.data_view.setInt16(this.byte_offset + byteOffset, value, littleEndian);
    }

    setInt32(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.validate_subset(byteOffset, 4);
        this.data_view.setInt32(this.byte_offset + byteOffset, value, littleEndian);
    }

    setInt8(byteOffset: number, value: number): void {
        this.validate_subset(byteOffset, 1);
        this.data_view.setInt8(this.byte_offset + byteOffset, value);
    }

    setUint16(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.validate_subset(byteOffset, 2);
        this.data_view.setUint16(this.byte_offset + byteOffset, value, littleEndian);
    }

    setUint32(byteOffset: number, value: number, littleEndian?: boolean): void {
        this.validate_subset(byteOffset, 4);
        this.data_view.setUint32(this.byte_offset + byteOffset, value, littleEndian);
    }

    setUint8(byteOffset: number, value: number): void {
        this.validate_subset(byteOffset, 1);
        this.data_view.setUint8(this.byte_offset + byteOffset, value);
    }

    /**
     * Gets a subset of the current DataViewSubset starting with the given offset
     * @param byte_offset The offset relative to the current HeapDataView in bytes
     */
    public subset(byte_offset: number): DataViewSubset;

    /**
     * Gets a subset of the current DataViewSubset with the given offset and length
     * @param byte_offset The offset relative to the current HeapDataView in bytes
     * @param byte_length The number of bytes of data to include in the subset
     */
    public subset(byte_offset: number, byte_length: number): DataViewSubset;

    public subset(byte_offset: number, byte_length?: number): DataViewSubset {
        // Set default value
        if (byte_length === undefined) {
            byte_length = this.byte_length - byte_offset;
        }
        // Ensure it is a subset of the current view
        if (byte_offset < 0 || byte_length < 0 || byte_offset >= this.byte_length || byte_offset + byte_length > this.byte_length) {
            throw new RangeError("DataViewSubset must be a subset of the existing one");
        }
        return new DataViewSubset(this.data_view, this.byte_offset + byte_offset, byte_length);
    }
}