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
import LanguageContext from "../global_context/LanguageContext";
import PointerCaster from "./type_casting/PointerCaster";
import ImmutableDataView from "../heap/ImmutableDataView";
import {build_qualifier} from "./type_qualifier/TypeQualifier";

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
    public readonly pointers: Array<QualifiedPointer>;
    /**
     * Whether the given type is a function or function pointer
     */
    public readonly is_function: boolean;

    /**
     * Initialises a new TypeInformation instance with the given declaration specification and relevant pointers
     * @param declaration_specification The declaration specification
     * @param pointers The set of pointers used for the type information
     * @param is_function Whether the given type is a function
     */
    public constructor(declaration_specification: DeclarationSpecification, pointers: Array<QualifiedPointer>,
                       is_function: boolean) {
        this.declaration_specifier = declaration_specification;
        this.pointers = pointers;
        this.is_function = is_function;
    }

    /**
     * Gets the data size of the given type
     */
    public get data_size(): number {
        // Return pointer size if it is a pointer
        if (this.pointers.length > 0) {
            return LanguageContext.pointer_size;
        }
        // Return size of the data
        return this.declaration_specifier.specifier.data_size;
    }

    /**
     * Determines whether the given type is represented as a pointer or not
     */
    public get is_pointer(): boolean {
        return this.pointers.length > 0;
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
        return src.declaration_specifier.specifier.caster.cast_to(src, data_view);
    }

    /**
     * References the type by adding a non-qualified pointer
     */
    public ref() {
        this.pointers.unshift(new QualifiedPointer(build_qualifier([])));
    }

    /**
     * Dereferences the type by one
     */
    public deref() {
        if (this.is_pointer) {
            this.pointers.pop();
        } else {
            throw new CannotDereferenceLiteralError(`Literal of type '${this.to_string()}' cannot be dereferenced`);
        }
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