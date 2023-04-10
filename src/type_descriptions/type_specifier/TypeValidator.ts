/**
 * TypeValidator
 *
 * Validates a set of type specifiers and returns a single type specifier instance as is required
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import TypeSpecifier, {
    BuiltInTypeSpecifier,
    BuiltInTypeSpecifierEnum,
    InvalidSpecifierError,
    TypeSpecifierType
} from "./TypeSpecifier";
import {BuiltInTypeMatcher} from "./built_in_types/BuiltInTypeMatcher";
import {BuiltInTypeSpecifierType} from "./built_in_types/BuiltInTypeSpecifierType";

/**
 * Allows validation of the given types and also gets the related type specifier
 */
export default abstract class TypeValidator {
    /**
     * Validates and gets the single type specifier representing the given type based upon an array of type specifiers
     * @param specifiers The array of specifiers used to specify the type
     */
    public static get_type(specifiers: Array<TypeSpecifier>): TypeSpecifier {
        // Case for when there is no specifiers (default to 'int')
        if (specifiers.length === 0) {
            const multiset = BuiltInTypeMatcher.get_type_multiset([
                new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.INT)
            ]);
            return new BuiltInTypeSpecifier(multiset);
        }

        // Case for only a single specifier shown
        if (specifiers.length === 1) {
            const specifier = specifiers[0];
            if (specifier.type !== TypeSpecifierType.BUILT_IN_ENUM) {
                return specifiers[0];
            }
        }

        // Ensure all specifiers are built-in types
        specifiers.forEach((value) => {
            if (value.type !== TypeSpecifierType.BUILT_IN_ENUM) {
                throw new InvalidSpecifierError("There can only be one type specifier in cases where a type" +
                    "specifier is not a built-in");
            }
        });

        // Return the appropriate multiset
        return new BuiltInTypeSpecifier(BuiltInTypeMatcher.get_type_multiset(specifiers as Array<BuiltInTypeSpecifierEnum>));
    }
}