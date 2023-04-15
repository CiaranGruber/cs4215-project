/**
 * ImmutableDataView
 *
 * An immutable version of the explicit_control_evaluator view that does not allow for editing of its values
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import BitArray from "./BitArray";

/**
 * Wraps a given DataView class to remove access to the ability to set explicit_control_evaluator
 */
export default class ImmutableDataView implements DataView {
    [Symbol.toStringTag]: string;
    private readonly data_view: DataView;

    /**
     * Constructs a new ImmutableDataView instance based upon an existing DataView
     * @param data_view The explicit_control_evaluator view that the ImmutableDataView is based upon
     */
    constructor(data_view: DataView);

    /**
     * Wraps a given buffer with an ImmutableDataView instance
     * @param buffer The buffer to wrap
     */
    constructor(buffer: ArrayBuffer);

    constructor(value: DataView | ArrayBuffer) {
        if (value instanceof ArrayBuffer) {
            this.data_view = new DataView(value);
        } else {
            this.data_view = value;
        }
    }

    /**
     * Gets a slice of the buffer that the ImmutableDataView refers to
     */
    public get buffer(): ArrayBuffer {
        return this.data_view.buffer.slice(0);
    }

    /**
     * Gets a slice of the specific section of buffer that the ImmutableDataView refers to
     */
    public get referenced_buffer(): ArrayBuffer {
        return this.data_view.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
    }

    public get byteLength() {
        return this.data_view.byteLength;
    }

    public get byteOffset() {
        return this.data_view.byteOffset;
    }

    getBigInt64(byteOffset: number, littleEndian?: boolean): bigint {
        return this.data_view.getBigInt64(byteOffset, littleEndian);
    }

    getBigUint64(byteOffset: number, littleEndian?: boolean): bigint {
        return this.data_view.getBigUint64(byteOffset, littleEndian);
    }

    getFloat32(byteOffset: number, littleEndian?: boolean): number {
        return this.data_view.getFloat32(byteOffset, littleEndian);
    }

    getFloat64(byteOffset: number, littleEndian?: boolean): number {
        return this.data_view.getFloat64(byteOffset, littleEndian);
    }

    getInt16(byteOffset: number, littleEndian?: boolean): number {
        return this.data_view.getInt16(byteOffset, littleEndian);
    }

    getInt32(byteOffset: number, littleEndian?: boolean): number {
        return this.data_view.getInt32(byteOffset, littleEndian);
    }

    getInt8(byteOffset: number): number {
        return this.data_view.getInt8(byteOffset);
    }

    getUint16(byteOffset: number, littleEndian?: boolean): number {
        return this.data_view.getUint16(byteOffset, littleEndian);
    }

    getUint32(byteOffset: number, littleEndian?: boolean): number {
        return this.data_view.getUint32(byteOffset, littleEndian);
    }

    getUint8(byteOffset: number): number {
        return this.data_view.getUint8(byteOffset);
    }

    get_bit_state(bit_offset: number): boolean {
        return new BitArray(this).is_set(bit_offset);
    }

    /**
     * Will throw an error if it is used as the explicit_control_evaluator within the buffer cannot be changed
     * @param byteOffset The offset, in byte, from the start of the view where to store the explicit_control_evaluator.
     * @param value The value to set.
     * @param littleEndian Optional Indicates whether the 32-bit int is stored in
     * <a href="https://developer.mozilla.org/en-US/docs/Glossary/Endianness">little- or big-endian</a> format.
     * If false or undefined, a big-endian value is written.
     * @throws CannotSetValueError
     */
    setBigInt64(byteOffset: number, value: bigint, littleEndian?: boolean): void {
        throw new CannotSetValueError("setBigInt64 has been disabled to prevent explicit_control_evaluator change");
    }

    /**
     * Will throw an error if it is used as the explicit_control_evaluator within the buffer cannot be changed
     * @param byteOffset The offset, in byte, from the start of the view where to store the explicit_control_evaluator.
     * @param value The value to set.
     * @param littleEndian Optional Indicates whether the 32-bit int is stored in
     * <a href="https://developer.mozilla.org/en-US/docs/Glossary/Endianness">little- or big-endian</a> format.
     * If false or undefined, a big-endian value is written.
     * @throws CannotSetValueError
     */
    setBigUint64(byteOffset: number, value: bigint, littleEndian?: boolean): void {
        throw new CannotSetValueError("setBigUint64 has been disabled to prevent explicit_control_evaluator change");
    }

    /**
     * Will throw an error if it is used as the explicit_control_evaluator within the buffer cannot be changed
     * @param byteOffset The offset, in byte, from the start of the view where to store the explicit_control_evaluator.
     * @param value The value to set.
     * @param littleEndian Optional Indicates whether the 32-bit int is stored in
     * <a href="https://developer.mozilla.org/en-US/docs/Glossary/Endianness">little- or big-endian</a> format.
     * If false or undefined, a big-endian value is written.
     * @throws CannotSetValueError
     */
    setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void {
        throw new CannotSetValueError("setFloat32 has been disabled to prevent explicit_control_evaluator change");
    }

    /**
     * Will throw an error if it is used as the explicit_control_evaluator within the buffer cannot be changed
     * @param byteOffset The offset, in byte, from the start of the view where to store the explicit_control_evaluator.
     * @param value The value to set.
     * @param littleEndian Optional Indicates whether the 32-bit int is stored in
     * <a href="https://developer.mozilla.org/en-US/docs/Glossary/Endianness">little- or big-endian</a> format.
     * If false or undefined, a big-endian value is written.
     * @throws CannotSetValueError
     */
    setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void {
        throw new CannotSetValueError("setFloat64 has been disabled to prevent explicit_control_evaluator change");
    }

    /**
     * Will throw an error if it is used as the explicit_control_evaluator within the buffer cannot be changed
     * @param byteOffset The offset, in byte, from the start of the view where to store the explicit_control_evaluator.
     * @param value The value to set.
     * @param littleEndian Optional Indicates whether the 32-bit int is stored in
     * <a href="https://developer.mozilla.org/en-US/docs/Glossary/Endianness">little- or big-endian</a> format.
     * If false or undefined, a big-endian value is written.
     * @throws CannotSetValueError
     */
    setInt16(byteOffset: number, value: number, littleEndian?: boolean): void {
        throw new CannotSetValueError("setInt16 has been disabled to prevent explicit_control_evaluator change");
    }

    /**
     * Will throw an error if it is used as the explicit_control_evaluator within the buffer cannot be changed
     * @param byteOffset The offset, in byte, from the start of the view where to store the explicit_control_evaluator.
     * @param value The value to set.
     * @param littleEndian Optional Indicates whether the 32-bit int is stored in
     * <a href="https://developer.mozilla.org/en-US/docs/Glossary/Endianness">little- or big-endian</a> format.
     * If false or undefined, a big-endian value is written.
     * @throws CannotSetValueError
     */
    setInt32(byteOffset: number, value: number, littleEndian?: boolean): void {
        throw new CannotSetValueError("setInt32 has been disabled to prevent explicit_control_evaluator change");
    }

    /**
     * Will throw an error if it is used as the explicit_control_evaluator within the buffer cannot be changed
     * @param byteOffset The offset, in byte, from the start of the view where to store the explicit_control_evaluator.
     * @param value The value to set.
     * @throws CannotSetValueError
     */
    setInt8(byteOffset: number, value: number): void {
        throw new CannotSetValueError("setInt8 has been disabled to prevent explicit_control_evaluator change");
    }

    /**
     * Will throw an error if it is used as the explicit_control_evaluator within the buffer cannot be changed
     * @param byteOffset The offset, in byte, from the start of the view where to store the explicit_control_evaluator.
     * @param value The value to set.
     * @param littleEndian Optional Indicates whether the 32-bit int is stored in
     * <a href="https://developer.mozilla.org/en-US/docs/Glossary/Endianness">little- or big-endian</a> format.
     * If false or undefined, a big-endian value is written.
     * @throws CannotSetValueError
     */
    setUint16(byteOffset: number, value: number, littleEndian?: boolean): void {
        throw new CannotSetValueError("setUint16 has been disabled to prevent explicit_control_evaluator change");
    }

    /**
     * Will throw an error if it is used as the explicit_control_evaluator within the buffer cannot be changed
     * @param byteOffset The offset, in byte, from the start of the view where to store the explicit_control_evaluator.
     * @param value The value to set.
     * @param littleEndian Optional Indicates whether the 32-bit int is stored in
     * <a href="https://developer.mozilla.org/en-US/docs/Glossary/Endianness">little- or big-endian</a> format.
     * If false or undefined, a big-endian value is written.
     * @throws CannotSetValueError
     */
    setUint32(byteOffset: number, value: number, littleEndian?: boolean): void {
        throw new CannotSetValueError("setUint32 has been disabled to prevent explicit_control_evaluator change");
    }

    /**
     * Will throw an error if it is used as the explicit_control_evaluator within the buffer cannot be changed
     * @param byteOffset The offset, in byte, from the start of the view where to store the explicit_control_evaluator.
     * @param value The value to set.
     * @throws CannotSetValueError
     */
    setUint8(byteOffset: number, value: number): void {
        throw new CannotSetValueError("setUint8 has been disabled to prevent explicit_control_evaluator change");
    }
}

/**
 * Thrown when the explicit_control_evaluator view attempts to set the given array buffer
 */
export class CannotSetValueError extends Error {
    /**
     * Constructs a new SegmentationFaultError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "SegmentationFaultError";
    }
}