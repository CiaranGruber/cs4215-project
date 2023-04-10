/**
 * BuiltInTypeMultiset
 *
 * Represents a multiset of the available built-in types as according to the C specification
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import {BuiltInTypeSpecifierType} from "./BuiltInTypeSpecifierType";
import TypeSpecifier, {BuiltInTypeSpecifier, TypeSpecifierType} from "../TypeSpecifier";

/**
 * A multiset used to match types to a number of acceptable variations
 */
export default class BuiltInTypeMultiset {
    private type_size: number;
    private variations: Array<Map<BuiltInTypeSpecifierType, number>>;

    /**
     * Constructs a new type multiset
     * @param type_size The size of the type
     */
    constructor(type_size: number) {
        this.type_size = type_size;
        this.variations = new Array<Map<BuiltInTypeSpecifierType, number>>();
    }

    /**
     * Adds the given variation to the type multiset
     * @param variation_map A map of the type specifier to the number of times it comes up in the variation
     */
    public add_variation_set(variation_map: Map<BuiltInTypeSpecifierType, number>) {
        this.variations.push(variation_map);
    }

    /**
     * Casts the value in the DataView to a new type specified by the type specifier
     * @param type The type to cast the value to
     * @param data_view The view of the array buffer used to cast
     */
    public static cast_to(type: TypeSpecifier, data_view: DataView): ArrayBuffer {
        switch (type.type) {
            case TypeSpecifierType.BUILT_IN_MULTISET:
                const cast_to = (type as BuiltInTypeSpecifier).type_multiset;
                // If casting size is smaller, ignore the left-hand side
                if (data_view.byteLength > cast_to.type_size) {
                    const end_offset = data_view.byteOffset + data_view.byteLength;
                    const start_offset = end_offset - cast_to.type_size;
                    return data_view.buffer.slice(start_offset, end_offset);
                }
                // If the cast size is larger, pad left
                const new_buffer = new ArrayBuffer(cast_to.type_size);
                const start_offset = new_buffer.byteLength - data_view.byteLength;
                // Copy to new buffer
                new Uint8Array(new_buffer, start_offset).set(new Uint8Array(data_view.buffer,
                    data_view.byteOffset));
                return new_buffer;
        }
        throw new InvalidCastError("Failed to cast to the required type");
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