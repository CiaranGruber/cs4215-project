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

/**
 * Contains the information about a given type
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
     * Initialises a new TypeInformation instance with the given declaration specification and relevant pointers
     * @param declaration_specification The declaration specification
     * @param pointers The set of pointers used for the type information
     */
    public constructor(declaration_specification: DeclarationSpecification, pointers: Array<QualifiedPointer>) {
        this.declaration_specifier = declaration_specification;
        this.pointers = pointers;
    }

    /**
     * Determines whether the given type is represented as a pointer or not
     */
    public get is_pointer(): boolean {
        return this.pointers.length > 0;
    }

    /**
     * Dereferences the type assuming it is a pointer
     */
    public deref() {
        if (this.is_pointer) {
            this.pointers.pop();
        } else {
            throw new CannotDereferenceLiteralError("Literals cannot be dereferenced");
        }
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