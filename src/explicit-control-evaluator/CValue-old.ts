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
enum ValueType {
    UNINITIALISED,
    COMBINED_POINTER,
    ENVIRONMENT_POINTER,
    HEAP_POINTER,
    ARRAY_POINTER,
    INT64,
    ARRAY
}

const valueTypes = new Array<ValueType>();
valueTypes.push(ValueType.COMBINED_POINTER, ValueType.ENVIRONMENT_POINTER, ValueType.HEAP_POINTER,
    ValueType.ARRAY_POINTER, ValueType.INT64, ValueType.ARRAY);

/**
 * Gets a ValueType from a given integer representation
 * @param value The integer representing the ValueType
 */
function getValueType(value: number) {
    return valueTypes[value];
}

/**
 * Gets the integer used to represent a ValueType
 * @param value The ValueType to get
 */
function getValueNumber(value: ValueType) {
    return valueTypes.lastIndexOf(value);
}

/**
 * Initialises a new CValueOld adapter from existing data sources
 * @param data The data to create a CValueOld from
 */
function wrap_value_buffer(data: ArrayBuffer): CValueOld {
    const type_data: ValueType = CValueOld.get_datatype(data);
    switch (type_data) {
        case ValueType.COMBINED_POINTER:
            return new CombinedPointer(data);
        case ValueType.ENVIRONMENT_POINTER:
            return new EnvironmentPointer(data);
        case ValueType.ARRAY_POINTER:
            return new ArrayPointer(data);
        case ValueType.ARRAY:
            return new ArrayValue(data);
        case ValueType.INT64:
            return new Int32Value(data);
    }
    throw new IncompatibleDataTypeException("Type of data specified is not recognised");
}

/**
 * Clones the data from an old array byffer to a new one
 * @param buffer The old buffer to clone
 */
function clone_array_buffer(buffer: ArrayBuffer): ArrayBuffer {
    const clone = new ArrayBuffer(buffer.byteLength);
    new Uint8Array(clone).set(new Uint8Array(buffer));
    return clone;
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
abstract class CValueOld {
    private static readonly type_info_size: number = 1;
    private data: ArrayBuffer;
    private readonly type_data: DataView;

    /**
     * A data-view of the modifiable data within the C value
     * @protected
     */
    protected readonly modifiable_data: DataView;

    /**
     * Initialises a new CValueOld from existing data
     * @param data The data encompassed by the C value
     * @protected
     * Assumptions:
     * <li>Data can be represented as a CombinedPointer</li>
     */
    protected constructor(data: ArrayBuffer) {
        this.data = data;
        this.type_data = new DataView(this.data, 0, CValueOld.type_info_size);
        this.modifiable_data = new DataView(this.data, CValueOld.type_info_size);
    }

    /**
     * Allocates and initialises the data required for a CValueOld
     * @param size The size of the data to create
     * @param type The type of the data to create
     */
    public static new_cvalue(size: number, type: ValueType): ArrayBuffer {
        const data = new ArrayBuffer(size + CValueOld.type_info_size);
        const type_dataview = new DataView(data, 0, CValueOld.type_info_size);
        type_dataview.setInt8(0, getValueNumber(type));
        return data;
    }

    /**
     * Gets the array buffer associated with the given value
     */
    public get buffer() {
        return this.data;
    }

    /**
     * Gets the type of the value
     */
    public get type(): ValueType {
        return getValueType(this.type_data.getInt8(0));
    }

    /**
     * Gets the fixed size of a CValueOld
     */
    public static get size(): number {
        return this.type_info_size;
    }

    /**
     * Gets the data type of the given ArrayBuffer
     * @param data The data to get the type of
     * Assumptions:
     * <li>Data is a formatted CValueOld</li>
     */
    public static get_datatype(data: ArrayBuffer): ValueType {
        return getValueNumber(new DataView(data).getInt8(0))
    }

    /**
     * Gets the size of the value including all meta-data
     */
    public get size(): number {
        return this.data.byteLength;
    }
}

/**
 * Represents interface to a generic pointer
 */
abstract class Pointer<T extends CValueOld | ExplicitControlEvaluator> extends CValueOld {
    /**
     * Gets the value using a specified pointer source
     * @param data_required The data required to get the value
     */
    public abstract get_value(data_required: T)/*: CValueOld*/;

    /**
     * Sets the value located at the pointer
     * @param data_required The data required for the pointer
     * @param value The value to set to
     */
    public abstract set_value(data_required: T, value: CValueOld);

    /**
     * Dereferences the value of the pointer to retrieve a new pointer
     * @param reference_data The data used to create the first reference
     */
    public dereference(reference_data: T): Pointer<any> {
        const value: CValueOld = this.get_value(reference_data);
        if (!(value instanceof Pointer<any>)) {
            throw new IncompatibleDataTypeException(`Cannot dereference value of type '${value.type.toString()}'`)
        }
        return value;
    }
}

/**
 * Represents a pointer that is a combination of two other pointers, the first an evaluator-based pointer and the
 * other, a data-based pointer
 */
class CombinedPointer extends Pointer<ExplicitControlEvaluator> {
    private static readonly parent_size: number = 2; // Allows the parent pointer to take up a maximum of 64-bits
    private parent_pointer: Pointer<ExplicitControlEvaluator>;
    private child_pointer: Pointer<CValueOld>;

    /**
     * Initialises a new CombinedPointer reading from existing data
     * @param data The data to initialise the combined pointer from
     * Assumptions:
     * <li>Data can be represented as a CombinedPointer</li>
     */
    constructor(data: ArrayBuffer) {
        super(data);
        let offset = 0;
        // Get the size of the parent
        const size_data = new DataView(this.modifiable_data.buffer, offset, CombinedPointer.parent_size);
        offset += CombinedPointer.parent_size;
        const size = size_data.getUint16(0);
        // Get the data views
        const parent_pointer = new DataView(this.modifiable_data.buffer, offset, size);
        offset += size;
        const child_pointer = new DataView(this.modifiable_data.buffer, offset, size);
        // Creates the pointer value from the existing data views
        this.parent_pointer = wrap_value_buffer(parent_pointer.buffer) as Pointer<ExplicitControlEvaluator>;
        this.child_pointer = wrap_value_buffer(child_pointer.buffer) as Pointer<CValueOld>;
    }

    /**
     * Allocates and initialises the data required for a Combined Pointer
     * @param parent_pointer The parent pointer
     * @param child_pointer The child pointer
     */
    public new_combined_pointer(parent_pointer: Pointer<ExplicitControlEvaluator>, child_pointer: Pointer<CValueOld>):
        ArrayBuffer {
        const size = CValueOld.size + parent_pointer.size + child_pointer.size;
        const combined_pointer = new CombinedPointer(CValueOld.new_cvalue(size, ValueType.COMBINED_POINTER));
        combined_pointer.parent_pointer = wrap_value_buffer(clone_array_buffer(parent_pointer.buffer)) as
            Pointer<ExplicitControlEvaluator>;
        combined_pointer.child_pointer = wrap_value_buffer(clone_array_buffer(child_pointer.buffer)) as
            Pointer<CValueOld>;
        return combined_pointer.buffer;
    }

    /**
     * Gets the referenced value by first dereferencing the first value and then dereferencing the result of that value
     * @param evaluator The evaluator used for dereferencing
     */
    public get_value(evaluator: ExplicitControlEvaluator): CValueOld {
        const dereferenced_data: CValueOld = this.parent_pointer.get_value(evaluator);
        return this.child_pointer.get_value(dereferenced_data);
    }

    /**
     * Sets the value of a referenced pointer to the given data
     * @param evaluator The evaluator used to dereference the first value
     * @param value The value to set
     */
    public set_value(evaluator: ExplicitControlEvaluator, value: CValueOld) {
        const dereferenced_data: CValueOld = this.parent_pointer.get_value(evaluator);
        this.child_pointer.set_value(dereferenced_data, value);
    }
}
/**
 * Represents an interface to a pointer pointing to an object in the heap
 */
class HeapPointer extends Pointer<ExplicitControlEvaluator> {
    private static readonly pointer_value: number = 4; // Allows 32-bit pointers (Note: Same value)
    private _heap_position: DataView;

    constructor(data: ArrayBuffer) {
        super(data);
        this._heap_position = this.modifiable_data;
    }

    /**
     * Gets the position in the heap that the pointer points to
     */
    public get position(): number {
        return this._heap_position.getUint32(0);
    }

    /**
     * Sets the position in the heap that it points to
     * @param position
     */
    public set position(position: number) {
        this._heap_position.setUint32(0, position);
    }

    /**
     * Gets the value in the heap associated with the HeapPointer
     * @param evaluator The explicit-control evaluator used to get the value
     */
    public get_value(evaluator: ExplicitControlEvaluator) {
        // return evaluator.heap.get_value(this.position);
    }

    /**
     * Sets the value in the heap that the pointer points to
     * @param evaluator The evaluator instance
     * @param value The value to set
     */
    public set_value(evaluator: ExplicitControlEvaluator, value: CValueOld) {
        // evaluator.heap.set_value(this.position, value);
    }
}

/**
 * Represents an interface to a pointer pointing to an environment variable
 */
class EnvironmentPointer extends Pointer<ExplicitControlEvaluator> {
    private static readonly frame_size: number = 2; // Allows 16-bits worth of frames
    private static readonly position_size: number = 4; // Allows 32-bits worth of variables per frame
    private _env_depth: DataView;
    private _value_index: DataView;
    private _data: CValueOld;

    /**
     * Initialises a new EnvironmentPointer reading from existing data
     * @param data The data to initialise the environment pointer from
     * Assumptions:
     * <li>Data can be represented as a EnvironmentPointer</li>
     */
    constructor(data: ArrayBuffer) {
        super(data);
        let offset = 0;
        this._env_depth = new DataView(this.modifiable_data.buffer, offset, EnvironmentPointer.frame_size);
        offset += EnvironmentPointer.frame_size;
        this._value_index = new DataView(this.modifiable_data.buffer, offset, EnvironmentPointer.position_size);
    }

    /**
     * Allocates and initialises the data required for a EnvironmentPointer
     * @param position
     */
    public static new_environment_pointer(position: EnvironmentPosition): ArrayBuffer {
        const size = EnvironmentPointer.fixed_size - CValueOld.size;
        const new_value = new EnvironmentPointer(CValueOld.new_cvalue(size, ValueType.INT64));
        new_value.env_depth = position.env_depth;
        new_value.value_index = position.value_index;
        return new_value.buffer;
    }

    /**
     * Gets the size of an environment pointer
     */
    public static get fixed_size() {
        return CValueOld.size + this.frame_size + this.position_size;
    }

    /**
     * Gets the value that the environment pointer points to
     * @param evaluator The evaluator containing the environment
     */
    public get_value(evaluator: ExplicitControlEvaluator) {
        // return evaluator.environment.get_symbol(new EnvironmentPosition(this.env_depth, this.value_index));
    }

    /**
     * Sets the value of the environment that the pointer points to
     * @param evaluator The evaluator containing the environment
     * @param value The value to set the environment variable to
     */
    public set_value(evaluator: ExplicitControlEvaluator, value: CValueOld) {
        // evaluator.environment.set_symbol(new EnvironmentPosition(this.env_depth, this.value_index), value);
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
class ArrayPointer extends Pointer<ArrayValue> {
    private static index_size: number = 4; // Specifies the largest index is 32-bits
    /**
     * The index represented by the array pointer
     * @private
     */
    private _index: DataView;

    /**
     * Initialises a new ArrayPointer reading from existing data
     * @param data The data to initialise the array pointer from
     * Assumptions:
     * <li>Data can be represented as an ArrayPointer</li>
     */
    constructor(data: ArrayBuffer) {
        super(data);
    }

    /**
     * Allocates and initialises the data required for an ArrayPointer
     * @param index The index that the array pointer points to
     */
    public static new_array_pointer(index: number): ArrayBuffer {
        const size = this.fixed_size - CValueOld.size;
        const new_value = new ArrayPointer(CValueOld.new_cvalue(size, ValueType.ARRAY_POINTER))
        new_value.index = index;
        return new_value.buffer;
    }

    /**
     * Gets the size of an environment pointer
     */
    public static get fixed_size() {
        return CValueOld.size + this.index_size;
    }

    /**
     * Gets the value from an array
     * @param array The array to get the value of
     */
    public get_value(array: ArrayValue): CValueOld {
        return undefined;
    }

    public set_value(data_required: ArrayValue, value: CValueOld) {

    }

    private get index() {
        return this._index.getInt32(0);
    }

    private set index(index: number) {
        this._index.setInt32(0, index);
    }
}

/**
 * Represents the interface for array data
 */
class ArrayValue extends CValueOld {
    private static readonly max_data_size: number = 4; // Allows data of arrays to be of maximum 2^32 bytes
    private _data_size: DataView;
    private _data: DataView;

    /**
     * Initialises a new ArrayValue reading from existing data
     * @param data The data to initialise the array value from
     * Assumptions:
     * <li>Data can be represented as an ArrayValue</li>
     */
    constructor(data: ArrayBuffer) {
        super(data);
        this._data_size = new DataView(this.modifiable_data.buffer, 0, ArrayValue.max_data_size);
        this._data = new DataView(this.modifiable_data.buffer, ArrayValue.max_data_size);
    }

    /**
     * Allocates and initialises the data required for an ArrayValue
     * @param data_size The size of the data to store
     * @param size The total size of the array
     */
    public static new_array(data_size: number, size: number): ArrayBuffer {
        const total_size = ArrayValue.max_data_size + data_size * size;
        const new_value = new ArrayValue(CValueOld.new_cvalue(total_size, ValueType.ARRAY_POINTER));
        new_value.data_size = data_size;
        return new_value.buffer;
    }

    /**
     * Gets a value from the array
     * @param index The index to get from the array
     */
    public get(index: number): CValueOld {
        // Check for out of bounds
        if (index < 0 || index >= this.count()) {
            throw new IndexOutOfBoundsException(`Index ${index} is out of bounds for array of size ${this.count()}`);
        }
        // Data view
        const data_view = new DataView(this._data.buffer, this.data_size * index, this.data_size);
        return wrap_value_buffer(data_view.buffer);
    }

    /**
     * Sets the value at a given index
     * @param index The index containing the value to set
     * @param value The value to set of the array
     */
    public set(index: number, value: CValueOld) {
        // Check for out of bounds
        if (index < 0 || index >= this.count()) {
            throw new IndexOutOfBoundsException(`Index ${index} is out of bounds for array of size ${this.count()}`);
        }
        // Check for size constraint
        if (value.size != this.data_size) {
            throw new IncompatibleDataTypeException(`Cannot set value of size ${value.size} into the array`);
        }
        // Set data at index
        const data_view = new DataView(this._data.buffer, this.data_size * index, this.data_size);
        copy_array_buffer(value.buffer, data_view.buffer);
    }

    /**
     * Gets the number of items within an array
     */
    public count(): number {
        return this._data.byteLength / this.data_size;
    }

    private set data_size(data_size: number) {
        this._data_size.setUint32(0, data_size);
    }

    private get data_size() {
        return this._data_size.getUint32(0);
    }
}

/**
 * Represents the interface for a value that has not been initialised yet
 */
class UninitialisedValue extends CValueOld {
    private static readonly total_size: number = 0;

    /**
     * Constructs a new uninitialised value based upon the given type
     * @param data
     */
    constructor(data: ArrayBuffer) {
        super(data);
    }

    /**
     * Allocates and initialises the data required for an UninitialisedValue
     */
    public static new_unitialised_value(): ArrayBuffer {
        return CValueOld.new_cvalue(UninitialisedValue.size, ValueType.UNINITIALISED);
    }
}

/**
 * Represents a standard integer (32-bits)
 */
class Int32Value extends CValueOld {
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
        super(data);
        this.value_data = this.modifiable_data;
    }

    /**
     * Creates the data used for a signed integer
     * @param value The value to set
     */
    public static new_int32(value: number): ArrayBuffer {
        const new_value = new Int32Value(CValueOld.new_cvalue(Int32Value.size, ValueType.INT64));
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
}

/**
 * Thrown when a given index cannot be accessed
 */
class IndexOutOfBoundsException extends Error {
    /**
     * Constructs a new IndexOutOfBoundsException instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "IndexOutOfBoundsException";
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