/**
 * TypeInformation
 *
 * Contains the information about a given type including the relevant pointers
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import QualifiedPointer from "./QualifiedPointer";
import DeclarationSpecification from "./DeclarationSpecification";
import GlobalContext from "../global_context/GlobalContext";
import PointerCaster from "./type_casting/PointerCaster";
import ImmutableDataView from "../heap/ImmutableDataView";
import {build_qualifier} from "./type_qualifier/TypeQualifier";
import {TypeSpecifierType} from "./type_specifier/TypeSpecifier";
import {SpecifierDescription} from "./type_specifier/SpecifierDescription";

/**
 * Contains the information about a given type
 * Todo: Allow declaration of arrays
 */
export default class TypeInformation {
    /**
     * The declaration specifier for the type
     */
    public readonly declaration_specifier: DeclarationSpecification;
    /**
     * The fully qualified pointers
     */
    private readonly _pointers: Array<QualifiedPointer>;

    public constructor(declaration_specification: DeclarationSpecification, pointers: Array<QualifiedPointer>) {
        this.declaration_specifier = declaration_specification;
        this._pointers = pointers;
    }

    /**
     * Gets the pointers associated with the given TypeInformation
     */
    public get pointers(): Array<QualifiedPointer> {
        return this._pointers.slice(0);
    }

    /**
     * Clones the TypeInformation instance
     */
    public clone(): TypeInformation {
        return new TypeInformation(this.declaration_specifier, this._pointers.slice(0));
    }

    /**
     * Determines whether the given type is a function or not
     */
    public get is_function(): boolean {
        return this.declaration_specifier.specifier.type === TypeSpecifierType.FUNCTION && !this.is_pointer;
    }

    /**
     * Gets the data size of the given type
     */
    public get data_size(): number {
        // Return pointer size if it is a pointer
        if (this._pointers.length > 0) {
            return GlobalContext.pointer_size;
        }
        // Return size of the data
        return this.declaration_specifier.specifier.data_size;
    }

    /**
     * Determines whether the given type is represented as a pointer or not
     */
    public get is_pointer(): boolean {
        return this._pointers.length > 0;
    }

    /**
     * Gets the default value associated with the given type
     */
    public default_value(): ArrayBuffer {
        // Return pointer cast
        if (this.is_pointer) {
            return new PointerCaster().default_value();
        }
        // Cast value accordingly
        return this.declaration_specifier.specifier.caster.default_value();
    }

    /**
     * Casts the given data to the current type
     * @param src The source type information
     * @param data_view The data that is to be cast
     */
    public cast_data(src: TypeInformation, data_view: ImmutableDataView): ArrayBuffer {
        // Return pointer cast
        if (this.is_pointer) {
            return new PointerCaster().cast_to(src, data_view);
        }
        // Cast value accordingly
        return this.declaration_specifier.specifier.caster.cast_to(src, data_view);
    }

    /**
     * References the type by adding a non-qualified pointer
     */
    public ref(): TypeInformation {
        const pointers = this.pointers;
        pointers.unshift(new QualifiedPointer(build_qualifier([])));
        return new TypeInformation(this.declaration_specifier, pointers);
    }

    /**
     * Dereferences the type by one
     */
    public deref(): TypeInformation {
        if (this.is_pointer) {
            const pointers = this.pointers;
            pointers.pop();
            return new TypeInformation(this.declaration_specifier, pointers);
        }
        throw new CannotDereferenceLiteralError(`Literal of type '${this.to_string()}' cannot be dereferenced`);
    }

    /**
     * Determines if the given type can be described using the descriptor
     * @param descriptor The descriptor to test
     */
    public is_described_as(descriptor: SpecifierDescription): boolean {
        if (this.is_pointer) {
            const pointer_descriptions = [SpecifierDescription.IS_POINTER,
                SpecifierDescription.IS_ARITHMETIC];
            return pointer_descriptions.includes(descriptor);
        }
        return this.declaration_specifier.specifier.is_described_as(descriptor);
    }

    public to_string() {
        // Todo: Improve type information
        return "type";
    }
}

/**
 * Thrown when attempting to dereference a literal type
 */
export class CannotDereferenceLiteralError extends Error {
    /**
     * Constructs a new CannotDereferenceLiteralError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "CannotDereferenceLiteralError";
    }
}