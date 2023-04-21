/**
 * CValue
 *
 * Represents a value in C
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import TypeInformation from "../type_descriptions/TypeInformation";
import ImmutableDataView from "../heap/ImmutableDataView";
import CMemory from "../heap/CMemory";
import {InvalidTypeError} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeMatcher";
import Pointer from "../data_views/Pointer";
import {FunctionTypeSpecifier, TypeSpecifierType} from "../type_descriptions/type_specifier/TypeSpecifier";
import FunctionManager from "../functions/FunctionManager";

/**
 * Represents a value from C memory which may or may not be held in memory
 */
export default class CValue {
    public readonly is_l_value: boolean;
    public readonly type_information: TypeInformation;
    private readonly _data: ArrayBuffer;

    public constructor(is_l_value: boolean, type_information: TypeInformation, data: ArrayBuffer) {
        this.is_l_value = is_l_value;
        this.type_information = type_information;
        this._data = data;
    }

    /**
     * Gets the exact data that the C value holds
     * Note: CValue.get_value() should be used when the goal is to get the value that the CValue references
     */
    public get data(): ArrayBuffer {
        return this._data.slice(0);
    }

    /**
     * Calls the given value as if it is a function and will also cast the value
     * @param args The arguments to the function
     * @param memory The memory associated with the C
     * @param function_manager The function manager used to get the relevant function
     * @param cast_instr A function used to create a cast instruction with the type being the specified type
     */
    public call(args: Array<CValue>, memory: CMemory, function_manager: FunctionManager,
                cast_instr: (cast_type: TypeInformation) => void) {
        const specifier = this.type_information.declaration_specifier.specifier;
        if (specifier.type === TypeSpecifierType.FUNCTION && this.type_information.pointers.length < 2) {
            const function_specifier = specifier as FunctionTypeSpecifier;
            cast_instr(function_specifier.return_type); // Instruction pushed first so it is run last
            if (this.type_information.pointers.length === 0) {
                function_specifier.call_function(this.get_value(memory), args, memory, function_manager);
            } else {
                // Run even if it is a pointer to a function
                function_specifier.call_function(this.deref(memory).get_value(memory), args, memory, function_manager);
            }
        } else {
            throw new InvalidTypeError("Cannot call a non-function value")
        }
    }

    /**
     * References the CValue, changing it from an lvalue to a prValue
     */
    public ref(): CValue {
        if (!this.type_information.is_function) {
            if (!this.is_l_value) {
                throw new CannotReferencePrValueError("An lvalue is required to reference");
            }
            const clone_type = this.type_information.ref();
            return new CValue(false, clone_type, this._data);
        }
        return new CValue(false, this.type_information, this._data);
    }

    /**
     * Dereferences the CValue and turns it into an lvalue and dereferences if it already is one
     */
    public deref(memory: CMemory): CValue {
        // Functions should allow dereferencing but will do nothing
        if (!this.type_information.is_function) {
            const clone_type = this.type_information.deref();
            // Don't dereference unless it is already a lvalue
            if (this.is_l_value) {
                const pointer = new Pointer(new DataView(this._data));
                const new_data = memory.get_data_view(pointer.value, this.type_information.data_size).referenced_buffer;
                return new CValue(true, clone_type, new_data);
            }
        }
        return new CValue(true, this.type_information, this._data);
    }

    /**
     * Gets the value that the CValue points to
     */
    public get_value(memory: CMemory): ImmutableDataView {
        if (this.is_l_value) {
            const pointer = new Pointer(new ImmutableDataView(this._data));
            return memory.get_data_view(pointer.value, this.type_information.data_size);
        }
        return new ImmutableDataView(this._data);
    }

    /**
     * Gets the CValue that the CValue points to
     */
    public get_c_value(memory: CMemory): CValue {
        if (this.is_l_value) {
            const pointer = new Pointer(new ImmutableDataView(this._data));
            const data_view = memory.get_data_view(pointer.value, this.type_information.data_size);
            return new CValue(false, this.type_information, data_view.referenced_buffer);
        }
        return this;
    }

    /**
     * Sets the value of the CValue to the specified value which must be of the same data size
     * @param memory The memory of the value for the case that it is setting an lvalue
     * @param value The value to set
     */
    public set_value(memory: CMemory, value: ArrayBuffer) {
        // Check value matches data
        if (value.byteLength !== this.type_information.data_size) {
            throw new InvalidTypeError("The value passed into CValue must be of the same size at least compared to " +
                "the original");
        }
        // Gets the data view to set the value
        let data_view: DataView;
        if (this.is_l_value) {
            const pointer = new Pointer(new DataView(this._data));
            const heap_view = memory.get_heap_view(pointer.value, this.type_information.data_size);
            data_view = this.type_information.declaration_specifier.qualifier.convert_assign_view(heap_view);
        } else {
            data_view = this.type_information.declaration_specifier.qualifier.convert_assign_view(new DataView(value));
        }
        // Set value in data view
        const value_view = new Uint8Array(value);
        value_view.forEach((value, index) => {
            data_view.setUint8(index, value);
        });
    }

    /**
     * Attempts to cast to the given type if possible
     * @param memory The memory used if the value is an lValue
     * @param type The type to cast to
     */
    public cast_to(memory: CMemory, type: TypeInformation): CValue {
        const cast_data = type.cast_data(this.type_information, this.get_value(memory));
        // Value is no longer an l_value
        return new CValue(false, type, cast_data);
    }
}

/**
 * Thrown when a given value cannot be referenced
 */
export class CannotReferencePrValueError extends Error {
    /**
     * Constructs a new CannotReferencePrValueError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "CannotReferencePrValueError";
    }
}