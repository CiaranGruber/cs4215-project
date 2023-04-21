/**
 * TypeQualifier
 *
 * Represents a complete type qualifier within C
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import ImmutableDataView from "../../heap/ImmutableDataView";

/**
 * The available types of type qualifiers
 */
export enum TypeQualifierType {
    CONST,
    RESTRICT,
    VOLATILE,
    _ATOMIC
}

/**
 * A type qualifier which may or may not be decorated
 */
export default class TypeQualifier {
    constructor() {
    }

    /**
     * Modifies the data view to match the requirements of the type qualifier
     */
    public convert_assign_view(assign_data: DataView): DataView {
        return assign_data;
    }

    /**
     * Whether the type qualifier allows dereferencing
     */
    public can_deref(): boolean {
        return true;
    }

    /**
     * Whether the type qualifier is described as constant
     */
    public is_const(): boolean {
        return false;
    }

    /**
     * Whether the type qualifier is described as volatile
     */
    public is_volatile(): boolean {
        return false;
    }

    /**
     * Whether the type qualifier is described as restrict
     */
    public is_restrict(): boolean {
        return false;
    }

    /**
     * Whether the type qualifier is described as atomic
     */
    public is_atomic(): boolean {
        return false;
    }

    /**
     * Determines whether the type qualifier is equal to another
     * @param other The other type qualifier to check
     */
    public equals(other: TypeQualifier): boolean {
        return this.is_const() === other.is_const() && this.is_atomic() === other.is_atomic() &&
            this.is_restrict() === other.is_restrict() && this.is_volatile() === other.is_volatile();
    }

    /**
     * Converts the type qualifier to a string
     */
    public to_string(): string {
        let string = "";
        if (this.is_const()) string += "const "
        if (this.is_volatile()) string += "volatile "
        if (this.is_restrict()) string += "restrict "
        if (this.is_atomic()) string += "_Atomic "
        return string.slice(0, string.length - 1);
    }
}

/**
 * Builds the required type qualifier depending on the specifiers given
 * @param qualifiers The array of qualifiers present
 */
export function build_qualifier(qualifiers: Array<TypeQualifierType>) {
    let base_qualifier: TypeQualifier = new TypeQualifier();
    // Decorate qualifier
    qualifiers.forEach((value) => {
        switch (value) {
            case TypeQualifierType.CONST:
                if (!base_qualifier.is_const()) {
                    base_qualifier = new ConstQualifier(base_qualifier);
                }
                break;
            default:
                throw new InvalidQualifierError("The given qualifier is not recognised");
        }
    });

    return base_qualifier;
}

/**
 * Thrown when the given type qualifier is not recognised
 */
export class InvalidQualifierError extends Error {
    /**
     * Constructs a new InvalidQualifierError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "InvalidQualifierError";
    }
}

/**
 * Decorates a given type qualifier
 */
class QualifierDecorator extends TypeQualifier {
    private readonly internal_qualifier: TypeQualifier;

    public constructor(internal_qualifier: TypeQualifier) {
        super();
        this.internal_qualifier = internal_qualifier;
    }

    public convert_assign_view(assign_data: DataView): DataView {
        return this.internal_qualifier.convert_assign_view(assign_data);
    }

    public can_deref(): boolean {
        return this.internal_qualifier.can_deref();
    }

    public is_const(): boolean {
        return this.internal_qualifier.is_const();
    }

    public is_volatile(): boolean {
        return this.internal_qualifier.is_volatile();
    }

    public is_restrict(): boolean {
        return this.internal_qualifier.is_restrict();
    }

    public is_atomic(): boolean {
        return this.internal_qualifier.is_atomic();
    }
}

class ConstQualifier extends QualifierDecorator {
    public constructor(internal_qualifier: TypeQualifier) {
        super(internal_qualifier);
    }

    public convert_assign_view(assign_data: DataView): DataView {
        // Prevents the data in the DataView from being edited
        const base_view = super.convert_assign_view(assign_data);
        return new ImmutableDataView(base_view);
    }

    public is_const(): boolean {
        return true;
    }
}