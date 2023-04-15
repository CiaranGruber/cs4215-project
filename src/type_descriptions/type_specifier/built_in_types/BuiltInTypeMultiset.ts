/**
 * BuiltInTypeMultiset
 *
 * Represents a multiset of the available built-in types as according to the C specification
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import {BuiltInTypeSpecifierType} from "./BuiltInTypeSpecifierType";
import {BuiltInMultisetDescription} from "./BuiltInMultisetDescription";
import GenericTypeCaster from "../../type_casting/GenericTypeCaster";

/**
 * A multiset used to match types to a number of acceptable variations
 */
export default class BuiltInTypeMultiset {
    private variations: Array<Map<BuiltInTypeSpecifierType, number>>;
    private descriptors: Set<BuiltInMultisetDescription>;
    public readonly caster: GenericTypeCaster;
    private readonly type_size: number;

    /**
     * Constructs a new type multiset
     * @param type_size The size of the type
     * @param caster The type caster to use to cast objects to this type
     */
    constructor(type_size: number, caster: GenericTypeCaster) {
        this.descriptors = new Set<BuiltInMultisetDescription>();
        this.variations = [];
        this.type_size = type_size;
        this.caster = caster;
    }

    /**
     * Adds the given variation to the type multiset
     * @param variation_map A map of the type specifier to the number of times it comes up in the variation
     */
    public add_variation_set(variation_map: Map<BuiltInTypeSpecifierType, number>) {
        this.variations.push(variation_map);
    }

    /**
     * Adds the given descriptor to the multiset
     * @param descriptor The descriptor used to describe the multiset
     */
    public add_descriptor(descriptor: BuiltInMultisetDescription) {
        this.descriptors.add(descriptor);
    }

    /**
     * Gets whether the multiset is described using the given descriptor
     * @param descriptor The descriptor to test for
     */
    public is_described_as(descriptor: BuiltInMultisetDescription) {
        return this.descriptors.has(descriptor);
    }

    /**
     * Gets the size of the explicit_control_evaluator associated with the type
     */
    public get data_size() {
        return this.type_size;
    }

    /**
     * Determines if the given set of type specifiers matches with the type multiset
     * @param type_specifiers_map A map of the type specifiers to the number of specifiers
     */
    public is_type(type_specifiers_map: Map<BuiltInTypeSpecifierType, number>): boolean {
        let found_val: boolean = false;
        this.variations.forEach((map_val) => {
            // Break loop if present
            if (found_val) {
                return;
            }
            // Check number of specifiers is the same
            let matches: boolean = true;
            // Check number for each value
            map_val.forEach((value, key) => {
                // End early if key does not exist
                if (!matches || !type_specifiers_map.has(key)) {
                    matches = false;
                    return;
                }
                // Check value
                if (type_specifiers_map.get(key) !== value) {
                    matches = false;
                }
            })
            // Return true if it matches
            if (matches) {
                found_val = true;
            }
        });

        return found_val;
    }
}

/**
 * Thrown when a cast cannot be completed due to mismatching types
 */
export class InvalidCastError extends Error {
    /**
     * Constructs a new InvalidCastError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "InvalidCastError";
    }
}