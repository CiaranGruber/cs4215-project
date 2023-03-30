/**
 * Contains a set of adapters used to read the value types represented in the program
 *
 * Created for the CS4215 term project
 *
 * By Ciaran Gruber
 */
import ExplicitControlEvaluator from "./ExplicitControlEvaluator";
import {EnvironmentPosition} from "./ECEnvironment";

/**
 * Represents a value type
 */
enum PointerType {
    COMBINED_POINTER,
    ENVIRONMENT_POINTER,
    HEAP_POINTER,
    ARRAY_POINTER
}

const pointerTypes = new Array<PointerType>();
pointerTypes.push(PointerType.COMBINED_POINTER, PointerType.ENVIRONMENT_POINTER, PointerType.HEAP_POINTER,
    PointerType.ARRAY_POINTER);

/**
 * Gets a ValueType from a given integer representation
 * @param value The integer representing the ValueType
 */
function getPointerType(value: number) {
    return pointerTypes[value];
}

/**
 * Gets the integer used to represent a ValueType
 * @param value The ValueType to get
 */
function getPointerNumber(value: PointerType) {
    return pointerTypes.lastIndexOf(value);
}

/**
 * Initialises a new CValueOld adapter from existing data sources
 * @param data The data to create a Pointer from
 * @param data_size The size of the data for the pointer
 */
export function wrap_pointer_buffer(data: ArrayBuffer, data_size: number): Pointer<any> {
    const type_data: PointerType = Pointer.get_type(data);
    switch (type_data) {
        case PointerType.COMBINED_POINTER:
            return new CombinedPointer(data, data_size);
        case PointerType.ENVIRONMENT_POINTER:
            return new EnvironmentPointer(data, data_size);
        case PointerType.HEAP_POINTER:
            return new HeapPointer(data, data_size);
        case PointerType.ARRAY_POINTER:
            return new ArrayPointer(data, data_size);
    }
    throw new IncompatibleDataTypeException("Type of pointer specified is not recognised");
}

/**
 * Copies the data from a source array buffer to the destination array buffer
 * @param src The source array buffer
 * @param dest The destination array buffer
 */
function copy_array_buffer(src: ArrayBuffer, dest: ArrayBuffer) {
    new Uint8Array(dest).set(new Uint8Array(src));
}

/**
 * Represents a value within C which is represented as a number of bytes
 */
export abstract class CValue {
    private data: DataView;

    /**
     * A data-view of the modifiable data within the C value
     * @protected
     */
    private readonly _modifiable_data: DataView;

    /**
     * Initialises a new CValueOld from existing data
     * @param data The data encompassed by the C value
     * @param size The size of the data to be interfaced
     * @protected
     * Assumptions:
     * <li>Data to interface is >= the required size</li>
     */
    protected constructor(data: ArrayBuffer) {
        // If data is larger than size required, read from right side
        this.data = new DataView(data, data.byteLength);

        this._modifiable_data = new DataView(this.data.buffer, 0);
    }

    /**
     * Allocates and initialises the data required for a CValueOld
     * @param size The size of the data to create
     */
    public static new_cvalue(size: number): ArrayBuffer {
        return new ArrayBuffer(size);
    }

    /**
     * Gets the array buffer associated with the given value
     */
    public get buffer(): ArrayBuffer {
        return this.data.buffer;
    }

    /**
     * Gets the total fixed size associated with the HeapPointer
     */
    public static get total_fixed_size() {
        return this.specific_size;
    }

    /**
     * Gets the specific size that the HeapPointer contributes
     */
    public static get specific_size() {
        return 0;
    }

    /**
     * Allows instance-level access to total_fixed_size
     */
    public get total_fixed_size() {
        return CValue.total_fixed_size;
    }

    /**
     * Allows instance-level access to specific_size
     */
    public get specific_size() {
        return CValue.specific_size;
    }

    /**
     * Gets the modifiable data of the value
     * @protected
     */
    protected get modifiable_data(): DataView {
        return this._modifiable_data;
    }
}

/**
 * Represents interface to a generic pointer
 */
export abstract class Pointer<T extends ArrayBuffer | ExplicitControlEvaluator> extends CValue {
    private static readonly pointer_type_size: number = 1;
    private readonly _pointer_type: DataView;
    private readonly _modifiable_data2: DataView;
    private readonly _data_size: number;

    /**
     * Initialises a new Pointer interface
     * @param data The data containing the pointer
     * @param data_size The size of the data used by the pointer
     * @protected
     */
    protected constructor(data: ArrayBuffer, data_size: number) {
        super(data);
        this._data_size = data_size;
        this._pointer_type = new DataView(this.modifiable_data.buffer, 0, Pointer.pointer_type_size);
        this._modifiable_data2 = new DataView(this.modifiable_data.buffer, Pointer.pointer_type_size);
    }

    /**
     * Allocates and initialises the data required for a CValueOld
     * @param size The size of the data to create
     * @param type The type to set the pointer value to
     */
    public static new_pointer_value(size: number, type: PointerType): ArrayBuffer {
        const value: ArrayBuffer = CValue.new_cvalue(size);
        const pointer_view: DataView = new DataView(value, CValue.total_fixed_size, this.pointer_type_size);
        pointer_view.setUint8(0, getPointerNumber(type));
        return new ArrayBuffer(size);
    }

    /**
     * Gets the value using a specified pointer source
     * @param data_required The data required to get the value
     */
    public abstract get_value(data_required: T): ArrayBuffer;

    /**
     * Sets the value located at the pointer
     * @param data_required The data required for the pointer
     * @param value The value to set to
     */
    public abstract set_value(data_required: T, value: ArrayBuffer);

    /**
     * Dereferences the value of the pointer to retrieve a new pointer
     * @param reference_data The data used to create the first reference
     * @param data_size The size of the data for the reference pointer
     */
    public dereference(reference_data: T, data_size: number): Pointer<any> {
        return wrap_pointer_buffer(this.get_value(reference_data), data_size);
    }

    /**
     * Gets the total fixed size associated with the HeapPointer
     */
    public static get total_fixed_size() {
        return this.specific_size + super.total_fixed_size;
    }

    /**
     * Gets the specific size that the HeapPointer contributes
     */
    public static get specific_size() {
        return this.pointer_type_size;
    }

    /**
     * Allows instance-level access to total_fixed_size
     */
    public get total_fixed_size() {
        return Pointer.total_fixed_size;
    }

    /**
     * Allows instance-level access to specific_size
     */
    public get specific_size() {
        return Pointer.specific_size;
    }

    /**
     * Gets the size of the data represented by the value
     */
    public get data_size(): number {
        return this._data_size;
    }

    /**
     * Gets the modifiable data of the value
     * @protected
     */
    protected get modifiable_data(): DataView {
        return this._modifiable_data2;
    }

    /**
     * Gets the type according to the type data specified
     * @param data The data to get the type of
     * Assumptions:
     * <li>First byte in data is the type data</li>
     */
    public static get_type(data: ArrayBuffer): PointerType {
        return getPointerType(new DataView(data).getInt8(0));
    }
}

/**
 * Represents a pointer that is a combination of two other pointers, the first an evaluator-based pointer and the
 * other, a data-based pointer
 */
class CombinedPointer extends Pointer<ExplicitControlEvaluator> {
    private static readonly parent_size: number = 1; // Allows the parent pointer to take up a maximum of 256 bytes
    private parent_pointer: Pointer<ExplicitControlEvaluator>;
    private child_pointer: Pointer<ArrayBuffer>;
    private _parent_pointer_buffer: DataView;
    private _child_pointer_buffer: DataView;

    /**
     * Initialises a new CombinedPointer reading from existing data
     * @param data The data to initialise the combined pointer from
     * @param data_size The data size used for the child pointer
     * Assumptions:
     * <li>Data can be represented as a CombinedPointer</li>
     */
    constructor(data: ArrayBuffer, data_size: number) {
        super(data, data_size);
        let offset = 0;
        // Get the size of the parent
        const size_data = new DataView(this.modifiable_data.buffer, offset, CombinedPointer.parent_size);
        offset += CombinedPointer.parent_size;
        const size = size_data.getUint16(0);
        // Get the data views
        this._parent_pointer_buffer = new DataView(this.modifiable_data.buffer, offset, size);
        offset += size;
        this._child_pointer_buffer = new DataView(this.modifiable_data.buffer, offset);
        const child_buffer_size = this._child_pointer_buffer.byteLength;
        // Creates the pointer value from the existing data views
        this.parent_pointer = wrap_pointer_buffer(this._parent_pointer_buffer.buffer, child_buffer_size) as
            Pointer<ExplicitControlEvaluator>;
        this.child_pointer = wrap_pointer_buffer(this._child_pointer_buffer.buffer, data_size) as Pointer<ArrayBuffer>;
    }

    /**
     * Allocates and initialises the data required for a Combined Pointer
     * @param parent_pointer The parent pointer
     * @param child_pointer The child pointer
     */
    public static new_combined_pointer(parent_pointer: Pointer<ExplicitControlEvaluator>, child_pointer: Pointer<ArrayBuffer>):
        ArrayBuffer {
        const size = CombinedPointer.specific_size + parent_pointer.specific_size + child_pointer.specific_size;
        const combined_pointer = new CombinedPointer(new ArrayBuffer(size), 0);
        copy_array_buffer(parent_pointer.buffer, combined_pointer._parent_pointer_buffer.buffer);
        copy_array_buffer(child_pointer.buffer, combined_pointer._child_pointer_buffer.buffer);
        return combined_pointer.buffer;
    }

    /**
     * Gets the referenced value by first dereferencing the first value and then dereferencing the result of that value
     * @param evaluator The evaluator used for dereferencing
     */
    public get_value(evaluator: ExplicitControlEvaluator): ArrayBuffer {
        const dereferenced_data = this.parent_pointer.get_value(evaluator);
        return this.child_pointer.get_value(dereferenced_data);
    }

    /**
     * Sets the value of a referenced pointer to the given data
     * @param evaluator The evaluator used to dereference the first value
     * @param value The value to set
     */
    public set_value(evaluator: ExplicitControlEvaluator, value: ArrayBuffer) {
        const dereferenced_data = this.parent_pointer.get_value(evaluator);
        this.child_pointer.set_value(dereferenced_data, value);
    }

    /**
     * Gets the total fixed size associated with the CombinedPointer
     */
    public static get total_fixed_size() {
        return this.specific_size + super.total_fixed_size;
    }

    /**
     * Gets the specific size that the CombinedPointer contributes
     */
    public static get specific_size() {
        return this.parent_size;
    }

    /**
     * Allows instance-level access to total_fixed_size
     */
    public get total_fixed_size() {
        return CombinedPointer.total_fixed_size;
    }

    /**
     * Allows instance-level access to specific_size
     */
    public get specific_size() {
        return CombinedPointer.specific_size;
    }
}

/**
 * Represents an interface to a pointer pointing to an object in the heap
 */
class HeapPointer extends Pointer<ExplicitControlEvaluator> {
    private static readonly pointer_size: number = 4; // Allows 32-bit pointers (Note: Same value)
    private _heap_position: DataView;

    constructor(data: ArrayBuffer, data_size: number) {
        // Only read bytes from the left if data is larger than the required size
        if (data.byteLength > HeapPointer.total_fixed_size) {
            data = new DataView(data, 0, HeapPointer.total_fixed_size).buffer;
        } else if (data.byteLength < HeapPointer.total_fixed_size) {
            throw new SegmentationFaultError("Attempted to read data outside of allocated memory for an HeapPointer");
        }
        super(data, data_size);
        this._heap_position = this.modifiable_data;
    }

    /**
     * Allocates and initialises the data required for a HeapPointer
     * @param position The position to create for the heap pointer
     */
    public static new_heap_pointer(position: number): ArrayBuffer {
        const buffer: ArrayBuffer = Pointer.new_pointer_value(HeapPointer.specific_size, PointerType.HEAP_POINTER);
        const new_value = new HeapPointer(buffer, 0);
        new_value.position = position;
        return new_value.buffer;
    }

    /**
     * Gets the value in the heap associated with the HeapPointer
     * @param evaluator The explicit-control evaluator used to get the value
     */
    public get_value(evaluator: ExplicitControlEvaluator): ArrayBuffer {
        return evaluator.heap.get_value(this.position);
    }

    /**
     * Sets the value in the heap that the pointer points to
     * @param evaluator The evaluator instance
     * @param value The value to set
     */
    public set_value(evaluator: ExplicitControlEvaluator, value: ArrayBuffer) {
        evaluator.heap.set_value(this.position, value);
    }

    /**
     * Gets the position within the heap that the pointer points to
     */
    public get position(): number {
        return this._heap_position.getUint32(0);
    }

    /**
     * Sets the position in the heap that it points to
     * @param position The position in the heap
     */
    public set position(position: number) {
        this._heap_position.setUint32(0, position);
    }

    /**
     * Gets the total fixed size associated with the HeapPointer
     */
    public static get total_fixed_size() {
        return this.specific_size + super.total_fixed_size;
    }

    /**
     * Gets the specific size that the HeapPointer contributes
     */
    public static get specific_size() {
        return this.pointer_size;
    }

    /**
     * Allows instance-level access to total_fixed_size
     */
    public get total_fixed_size() {
        return HeapPointer.total_fixed_size;
    }

    /**
     * Allows instance-level access to specific_size
     */
    public get specific_size() {
        return HeapPointer.specific_size;
    }
}

/**
 * Represents an interface to a pointer pointing to an environment variable
 */
export class EnvironmentPointer extends Pointer<ExplicitControlEvaluator> {
    private static readonly frame_size: number = 2; // Allows 2^16 frames
    private static readonly position_size: number = 4; // Allows 2^32 variables per frame
    private _env_depth: DataView;
    private _value_index: DataView;

    /**
     * Initialises a new EnvironmentPointer reading from existing data
     * @param data The data to initialise the environment pointer from
     * @param data_size The data size used for the
     * Assumptions:
     * <li>Data can be represented as a EnvironmentPointer</li>
     */
    constructor(data: ArrayBuffer, data_size: number) {
        // Only read bytes from the left if data is larger than the required size
        if (data.byteLength > EnvironmentPointer.total_fixed_size) {
            data = new DataView(data, 0, EnvironmentPointer.total_fixed_size).buffer;
        } else if (data.byteLength < EnvironmentPointer.total_fixed_size) {
            throw new SegmentationFaultError("Attempted to read data outside of allocated memory for an" +
                "EnvironmentPointer");
        }
        super(data, data_size);
        let offset = 0;
        this._env_depth = new DataView(this.modifiable_data.buffer, offset, EnvironmentPointer.frame_size);
        offset += EnvironmentPointer.frame_size;
        this._value_index = new DataView(this.modifiable_data.buffer, offset, EnvironmentPointer.position_size);
    }

    /**
     * Allocates and initialises the data required for a EnvironmentPointer
     * @param position The position to create for the environment pointer
     */
    public static new_environment_pointer(position: EnvironmentPosition): ArrayBuffer {
        const new_value = new EnvironmentPointer(Pointer.new_pointer_value(EnvironmentPointer.specific_size,
            PointerType.ENVIRONMENT_POINTER), 0);
        new_value.env_depth = position.env_depth;
        new_value.value_index = position.value_index;
        return new_value.buffer;
    }

    /**
     * Gets the total fixed size associated with the HeapPointer
     */
    public static get total_fixed_size() {
        return this.specific_size + super.total_fixed_size;
    }

    /**
     * Gets the specific size that the HeapPointer contributes
     */
    public static get specific_size() {
        return this.frame_size + this.position_size;
    }

    /**
     * Allows instance-level access to total_fixed_size
     */
    public get total_fixed_size() {
        return EnvironmentPointer.total_fixed_size;
    }

    /**
     * Allows instance-level access to specific_size
     */
    public get specific_size() {
        return EnvironmentPointer.specific_size;
    }

    /**
     * Gets the value that the environment pointer points to
     * @param evaluator The evaluator containing the environment
     */
    public get_value(evaluator: ExplicitControlEvaluator): ArrayBuffer {
        return evaluator.environment.get_symbol(new EnvironmentPosition(this.env_depth, this.value_index));
    }

    /**
     * Sets the value of the environment that the pointer points to
     * @param evaluator The evaluator containing the environment
     * @param value The value to set the environment variable to
     */
    public set_value(evaluator: ExplicitControlEvaluator, value: ArrayBuffer) {
        evaluator.environment.set_symbol(new EnvironmentPosition(this.env_depth, this.value_index), value);
    }

    private get env_depth(): number {
        return this._env_depth.getUint16(0);
    }

    private set env_depth(depth: number) {
        this._env_depth.setUint16(0, depth);
    }

    private get value_index(): number {
        return this._value_index.getUint32(0);
    }

    private set value_index(depth: number) {
        this._value_index.setUint32(0, depth);
    }
}

/**
 * Represents the interface for a pointer pointing to a location within an array
 */
class ArrayPointer extends Pointer<ArrayBuffer> {
    private static index_size: number = 4; // Specifies the largest index is 32-bits

    /**
     * The index represented by the array pointer
     * @private
     */
    private _index: DataView;

    /**
     * Initialises a new ArrayPointer reading from existing data
     * @param data The data to initialise the array pointer from
     * @param data_size The size of the data
     * Assumptions:
     * <li>Data can be represented as an ArrayPointer</li>
     */
    constructor(data: ArrayBuffer, data_size: number) {
        // Only read bytes from the right if data is larger than the required size
        if (data.byteLength > ArrayPointer.total_fixed_size) {
            data = new DataView(data, 0, ArrayPointer.total_fixed_size).buffer;
        } else if (data.byteLength < ArrayPointer.total_fixed_size) {
            throw new SegmentationFaultError("Attempted to read data outside of allocated memory for an ArrayPointer");
        }
        super(data, data_size);
    }

    /**
     * Allocates and initialises the data required for an ArrayPointer
     * @param index The index that the array pointer points to
     */
    public static new_array_pointer(index: number): ArrayBuffer {
        const size = this.total_fixed_size;
        const new_value = new ArrayPointer(Pointer.new_pointer_value(size, PointerType.ARRAY_POINTER), 0);
        new_value.index = index;
        return new_value.buffer;
    }

    /**
     * Gets the total fixed size associated with the HeapPointer
     */
    public static get total_fixed_size() {
        return this.specific_size + super.total_fixed_size;
    }

    /**
     * Gets the specific size that the HeapPointer contributes
     */
    public static get specific_size() {
        return this.index_size;
    }

    /**
     * Allows instance-level access to total_fixed_size
     */
    public get total_fixed_size() {
        return ArrayPointer.total_fixed_size;
    }

    /**
     * Allows instance-level access to specific_size
     */
    public get specific_size() {
        return ArrayPointer.specific_size;
    }

    /**
     * Gets the value from an array
     * @param array The array to get the value of
     */
    public get_value(array: ArrayBuffer): ArrayBuffer {
        // Check if memory outside buffer is accessed
        if ((this.index + 1) * this.data_size > array.byteLength) {
            throw new SegmentationFaultError("Cannot access data from outside the bounds of an array")
        }
        // Return buffer for specific index
        return new DataView(array, this.index * this.data_size, this.data_size).buffer;
    }

    /**
     * Sets a value within an array
     * @param array The array to set
     * @param value The value to set within the array
     */
    public set_value(array: ArrayBuffer, value: ArrayBuffer) {
        if (value.byteLength !== this.data_size) {
            throw new Error("Program error - Value buffer should be the same size as the data size");
        }
        // Check if memory outside buffer is accessed
        if ((this.index + 1) * this.data_size > array.byteLength) {
            throw new SegmentationFaultError("Cannot access data from outside the bounds of an array")
        }
        // Set value within buffer
        const data_buffer = new DataView(array, this.index * this.data_size, this.data_size).buffer;
        copy_array_buffer(value, data_buffer);
    }

    private get index() {
        return this._index.getInt32(0);
    }

    private set index(index: number) {
        this._index.setInt32(0, index);
    }
}

/**
 * Represents the interface for a value that has not been initialised yet
 */
export class UninitialisedValue extends CValue {
    private static readonly total_size: number = 0;

    /**
     * Constructs a new uninitialised value based upon the given type
     * @param data
     */
    constructor(data: ArrayBuffer) {
        if (data.byteLength > UninitialisedValue.total_fixed_size) {
            throw new SegmentationFaultError("Cannot read data for an uninitialised value");
        }
        super(data);
    }

    /**
     * Allocates and initialises the data required for an UninitialisedValue
     */
    public static new_unitialised_value(): ArrayBuffer {
        return CValue.new_cvalue(UninitialisedValue.specific_size);
    }

    /**
     * Gets the total fixed size associated with the HeapPointer
     */
    public static get total_fixed_size() {
        return this.specific_size + super.total_fixed_size;
    }

    /**
     * Gets the specific size that the HeapPointer contributes
     */
    public static get specific_size() {
        return UninitialisedValue.total_size;
    }

    /**
     * Allows instance-level access to total_fixed_size
     */
    public get total_fixed_size() {
        return ArrayPointer.total_fixed_size;
    }

    /**
     * Allows instance-level access to specific_size
     */
    public get specific_size() {
        return ArrayPointer.specific_size;
    }
}

/**
 * Represents a standard integer (32-bits)
 */
export class Int32Value extends CValue {
    /**
     * The size represented by the signed integer value
     */
    public static readonly size: number = 4;
    private value_data: DataView;

    /**
     * Initialises a new Int32Value instance based upon existing data
     * @param data The data used for the integer value
     */
    constructor(data: ArrayBuffer) {
        // Only read bytes from the right if data is larger than the required size
        if (data.byteLength > Int32Value.total_fixed_size) {
            data = new DataView(data, data.byteLength - Int32Value.total_fixed_size).buffer;
        } else if (data.byteLength < Int32Value.total_fixed_size) {
            throw new SegmentationFaultError("Attempted to read data outside of allocated memory for an Int32Value");
        }
        super(data);
        this.value_data = this.modifiable_data;
    }

    /**
     * Creates the data used for a signed integer
     * @param value The value to set
     */
    public static new_int32(value: number): ArrayBuffer {
        const new_value = new Int32Value(CValue.new_cvalue(Int32Value.size));
        new_value.value = value;
        return new_value.buffer;
    }

    /**
     * Sets the integer value of the data
     * @param value The value to set
     */
    public set value(value: number) {
        this.value_data.setInt32(0, value);
    }

    /**
     * Gets the value from the data
     */
    public get value() {
        return this.value_data.getInt32(0);
    }

    /**
     * Gets the total fixed size associated with the HeapPointer
     */
    public static get total_fixed_size() {
        return this.specific_size + super.total_fixed_size;
    }

    /**
     * Gets the specific size that the HeapPointer contributes
     */
    public static get specific_size() {
        return Int32Value.size;
    }

    /**
     * Allows instance-level access to total_fixed_size
     */
    public get total_fixed_size() {
        return ArrayPointer.total_fixed_size;
    }

    /**
     * Allows instance-level access to specific_size
     */
    public get specific_size() {
        return ArrayPointer.specific_size;
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

/**
 * Thrown when a value is of an incompatible data type than the one expected
 */
class IncompatibleDataTypeException extends Error {
    /**
     * Constructs a new IncompatibleDataTypeException instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "IncompatibleDataTypeException";
    }
}