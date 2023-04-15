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
import GenericTypeCaster from "../type_casting/GenericTypeCaster";

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

    /**
     * Gets the size of the explicit_control_evaluator associated with the type specifier
     */
    public abstract get data_size(): number;

    /**
     * Gets the object used to cast values to the given type
     */
    public abstract get caster(): GenericTypeCaster;
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

    public get caster() {
        return this.type_multiset.caster;
    }

    public get data_size(): number {
        return this.type_multiset.data_size;
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

    public get data_size(): number {
        throw new UnknownSizeError("The size for a BuiltInTypeSpecifierEnum cannot be determined");
    }

    public get caster(): GenericTypeCaster {
        throw new InvalidSpecifierError("Casting to the BuiltInTypeSpecifierEnum is not allowed");
    }
}

/**
 * Thrown when the size of a type specifier cannot be determined
 */
export class UnknownSizeError extends Error {
    /**
     * Constructs a new UnknownSizeError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "UnknownSizeError";
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