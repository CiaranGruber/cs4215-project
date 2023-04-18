/**
 * BuiltInTypeMatcher
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import {BuiltInTypeSpecifierType} from "./BuiltInTypeSpecifierType";
import {BuiltInTypeSpecifierEnum} from "../TypeSpecifier";
import BuiltInMultisetManager from "./BuiltInMultisetManager";
import BuiltInTypeMultiset from "./BuiltInTypeMultiset";

/**
 * Matches a type with a set of string specifiers
 */
export abstract class BuiltInTypeMatcher {
    /**
     * Gets the type multiset associated with a set of type specifiers
     * @param type_specifiers An array of the built-in type specifiers
     */
    public static get_type_multiset(type_specifiers: Array<BuiltInTypeSpecifierEnum>): BuiltInTypeMultiset {
        const variation_count = new Map<BuiltInTypeSpecifierType, number>;
        let has_been_signed = false;
        let is_signed = true;
        // Add the type specifiers to the list
        type_specifiers.forEach((value) => {
            const specifier: BuiltInTypeSpecifierType = value.type_name; // Does not return valid type
            if (!(specifier in BuiltInTypeSpecifierType)) { // Given type name is not a specifier
                throw new InvalidTypeError("Type does not exist");
            } else if (specifier === BuiltInTypeSpecifierType.SIGNED || specifier === BuiltInTypeSpecifierType.UNSIGNED) {
                // Ensure the signed value has not been manually set to something else
                if (has_been_signed && is_signed !== (specifier === BuiltInTypeSpecifierType.SIGNED)) {
                    throw new MismatchedSignError("Type can not be both signed and unsigned");
                }
                is_signed = specifier === BuiltInTypeSpecifierType.SIGNED;
                has_been_signed = true;
            }
            // Add to count
            const curr_count = variation_count.has(specifier) ? variation_count.get(specifier) : 0;
            variation_count.set(specifier, curr_count + 1);
        });

        // Attempts to find which multiset the map of specifiers matches to
        let valid_multiset: BuiltInTypeMultiset;
        BuiltInMultisetManager.multiset_array.forEach((value) => {
            if (valid_multiset) {
                return;
            }
            if (value.is_type(variation_count)) {
                valid_multiset = value;
            }
        });
        // Throw error if not found
        if (!valid_multiset) {
            throw new InvalidTypeError("Type does not match any valid types");
        }
        // Return the valid multiset
        return valid_multiset;
    }
}

/**
 * Thrown when a given type name does not exist
 */
export class InvalidTypeError extends Error {
    /**
     * Constructs a new InvalidTypeError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "InvalidTypeError";
    }
}

/**
 * Thrown when a sign has already been set to something else
 */
export class MismatchedSignError extends Error {
    /**
     * Constructs a new MismatchedSignError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "MismatchedSignError";
    }
}