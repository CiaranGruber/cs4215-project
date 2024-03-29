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
import FunctionManager from "../../functions/FunctionManager";
import CValue from "../../explicit-control-evaluator/CValue";
import CMemory from "../../heap/CMemory";
import FunctionPointer from "../../data_views/FunctionPointer";
import FunctionCaster from "../type_casting/FunctionCaster";
import TypeInformation from "../TypeInformation";
import {SpecifierDescription} from "./SpecifierDescription";

/**
 * Determines the type of type specifier. May include built-in types or user-defined types such as structs or unions
 */
export enum TypeSpecifierType {
    BUILT_IN_ENUM,
    BUILT_IN_MULTISET,
    FUNCTION
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
     * Gets the size of the data associated with the type specifier
     */
    public abstract get data_size(): number;

    /**
     * Gets the object used to cast values to the given type
     */
    public abstract get caster(): GenericTypeCaster;

    /**
     * Determines whether the specifier can be described with the given description
     * @param description The description to test against
     */
    public abstract is_described_as(description: SpecifierDescription): boolean;

    /**
     * Determines whether the other TypeSpecifier is deep equivalent
     * @param other The other type specifier to compare
     */
    public equals(other: TypeSpecifier): boolean {
        return this.type === other.type;
    }

    /**
     * Gets the specifier as a string
     */
    public abstract to_string(): string;
}

export class FunctionTypeSpecifier extends TypeSpecifier {
    public readonly return_type: TypeInformation;

    public constructor(return_type: TypeInformation) {
        super(TypeSpecifierType.FUNCTION);
        this.return_type = return_type;
    }

    public get caster() {
        return new FunctionCaster();
    }

    public get data_size() {
        return FunctionPointer.byte_length;
    }

    is_described_as(description: SpecifierDescription): boolean {
        const descriptions = [SpecifierDescription.IS_ARITHMETIC, SpecifierDescription.IS_INTEGER];
        return descriptions.includes(description);
    }

    /**
     * Calls the function given with the specified key
     * @param key_buffer The buffer for the key to be used
     * @param args The arguments to be passed into the function
     * @param memory The C memory
     * @param function_manager The function manager used to get the relevant function
     */
    public call_function(key_buffer: DataView, args: Array<CValue>, memory: CMemory,
                         function_manager: FunctionManager) {
        const key = new FunctionPointer(key_buffer).value;
        function_manager.get_function(key).run(memory, args);
    }

    public equals(other: TypeSpecifier): boolean {
        if (!super.equals(other)) {
            return false;
        }
        return this.return_type.equals((other as FunctionTypeSpecifier).return_type);
    }

    to_string(): string {
        let string = "() => ";
        string += this.return_type.to_string();
        return string;
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

    public get caster() {
        return this.type_multiset.caster;
    }

    public get data_size(): number {
        return this.type_multiset.data_size;
    }

    public is_described_as(description: SpecifierDescription): boolean {
        return this.type_multiset.is_described_as(description);
    }

    public equals(other: TypeSpecifier): boolean {
        if (!super.equals(other)) {
            return false;
        }
        return this.type_multiset === (other as BuiltInTypeSpecifier).type_multiset;
    }

    public to_string(): string {
        return this.type_multiset.to_string();
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

    public is_described_as(description: SpecifierDescription): boolean {
        return false;
    }

    public equals(other: TypeSpecifier): boolean {
        if (!super.equals(other)) {
            return false;
        }
        return this.type_name === (other as BuiltInTypeSpecifierEnum).type_name;
    }

    public to_string(): string {
        return "(Built in type)";
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