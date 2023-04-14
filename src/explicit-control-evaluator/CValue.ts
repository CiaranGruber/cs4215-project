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
import PointerDataView from "./views/PointerDataView";
import CMemory from "../heap/CMemory";
import {InvalidTypeError} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeMatcher";
import {TypeSpecifierType} from "../type_descriptions/type_specifier/TypeSpecifier";

/**
 * Represents a value from C memory which may or may not be held in memory in actuality
 */
export default class CValue {
    private _is_l_value: boolean;
    private _type_information: TypeInformation;
    private data: ArrayBuffer;

    public constructor(is_l_value: boolean, type_information: TypeInformation, data: ArrayBuffer) {
        this._is_l_value = is_l_value;
        this._type_information = type_information;
        this.data = data;
    }

    /**
     * Gets the type information for the CValue
     */
    public get type_information(): TypeInformation {
        return this._type_information;
    }

    /**
     * Whether the CValue is an lValue or not
     */
    public get is_l_value(): boolean {
        return this._is_l_value;
    }

    private set is_l_value(new_value: boolean) {
        this._is_l_value = new_value;
    }

    /**
     * References the CValue, changing it from an lvalue to a prValue
     */
    public ref(): void {
        if (!this.type_information.is_function) {
            if (!this.is_l_value) {
                throw new CannotReferencePrValueError("An lvalue is required to reference");
            }
            this.type_information.ref();
        }
        this.is_l_value = false;
    }

    /**
     * Dereferences the CValue and turns it into an lvalue and dereferences if it already is one
     */
    public deref(memory: CMemory): void {
        // Functions should allow dereferencing but do nothing
        if (!this.type_information.is_function) {
            this.type_information.deref();
            // Don't dereference unless it is already an lvalue
            if (this.is_l_value) {
                const pointer = new PointerDataView(new DataView(this.data));
                memory.get_data_view(pointer.address, this.type_information.data_size);
            }
        }
        this.is_l_value = true;
    }

    /**
     * Gets the value that the CValue points to
     */
    public get_value(memory: CMemory): ImmutableDataView {
        if (this.type_information.declaration_specifier.specifier.type === TypeSpecifierType.BUILT_IN_MULTISET) {

        }
        if (this.is_l_value) {
            const pointer = new PointerDataView(new DataView(this.data));
            return memory.get_data_view(pointer.address, this.type_information.data_size);
        }
        return new ImmutableDataView(this.data);
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
                "the original")
        }
        // Gets the data view to set the value
        let data_view: DataView;
        if (this.is_l_value) {
            const heap_view = memory.get_heap_view(new PointerDataView(new DataView(this.data)).address,
                this.type_information.data_size);
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

    private get data_size(): number {
        return this.data.byteLength;
    }

    /**
     * Attempts to cast to the given type if possible
     * @param type The type to cast to
     */
    public cast_to(type: TypeInformation) {
        this.data = type.cast_data(this._type_information, new ImmutableDataView(this.data));
        // Value is no longer an l_value
        this.is_l_value = false;
        this._type_information = type;
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