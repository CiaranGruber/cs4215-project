/**
 * TypeSpecifier
 *
 * Specifies the main type of a given value
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import {BuiltInTypeSpecifierType} from "./built_in_types/BuiltInTypeSpecifierType";
import BuiltInTypeMultiset from "./built_in_types/BuiltInTypeMultiset";

/**
 * Determines the type of type specifier. May include built-in types or user-defined types such as structs or unions
 */
export enum TypeSpecifierType {
    BUILT_IN_ENUM,
    BUILT_IN_MULTISET
}

/**
 * Represents a type specifier
 */
export default abstract class TypeSpecifier {
    /**
     * The type of the type specifier
     */
    public readonly type: TypeSpecifierType;

    /**
     * Initialises a TypeSpecifier with the given type
     * @param type The type of the type specifier
     * @protected
     */
    protected constructor(type: TypeSpecifierType) {
        this.type = type;
    }
}

/**
 * Represents a type specifier that is one of the built-in types
 */
export class BuiltInTypeSpecifier extends TypeSpecifier {
    public readonly type_multiset: BuiltInTypeMultiset;

    public constructor(type_multiset: BuiltInTypeMultiset) {
        super(TypeSpecifierType.BUILT_IN_MULTISET);
        this.type_multiset = type_multiset;
    }
}

/**
 * Represents a type specifier that is one of the built-in types
 */
export class BuiltInTypeSpecifierEnum extends TypeSpecifier {
    public readonly type_name: BuiltInTypeSpecifierType;

    public constructor(type: BuiltInTypeSpecifierType) {
        super(TypeSpecifierType.BUILT_IN_ENUM);
        this.type_name = type;
    }
}

/**
 * Thrown when the given type specifier is not recognised
 */
export class InvalidSpecifierError extends Error {
    /**
     * Constructs a new InvalidSpecifierError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "InvalidSpecifierError";
    }
}