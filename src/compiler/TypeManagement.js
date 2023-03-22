/**
 * Type ECEnvironment
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */
var BasicTypeSpecifier;
(function (BasicTypeSpecifier) {
    BasicTypeSpecifier["VOID"] = "void";
    BasicTypeSpecifier["CHAR"] = "char";
    BasicTypeSpecifier["SHORT"] = "short";
    BasicTypeSpecifier["INT"] = "int";
    BasicTypeSpecifier["LONG"] = "long";
    BasicTypeSpecifier["FLOAT"] = "float";
    BasicTypeSpecifier["DOUBLE"] = "double";
    BasicTypeSpecifier["SIGNED"] = "signed";
    BasicTypeSpecifier["UNSIGNED"] = "unsigned";
})(BasicTypeSpecifier || (BasicTypeSpecifier = {}));
function getBasicTypeSpecifier(value) {
    switch (value) {
        case BasicTypeSpecifier.VOID:
            return BasicTypeSpecifier.VOID;
        case BasicTypeSpecifier.INT:
            return BasicTypeSpecifier.INT;
        case BasicTypeSpecifier.CHAR:
            return BasicTypeSpecifier.CHAR;
        case BasicTypeSpecifier.SIGNED:
            return BasicTypeSpecifier.SIGNED;
        case BasicTypeSpecifier.UNSIGNED:
            return BasicTypeSpecifier.UNSIGNED;
    }
}
/**
 * Gets the BasicTypeSpecifier from the given value
 * Retrieved from: https://stackoverflow.com/a/54297863
 * @param myEnum The enum to get the value for
 * @param enumValue The value to retrieve for
 */
function getEnumKeyByEnumValue(myEnum, enumValue) {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}
export class BasicTypeMultiset {
    constructor(type_size) {
        this.type_size = type_size;
        this.variations = new Array();
    }
    add_variation_set(variation_map) {
        this.variations.push(variation_map);
    }
    is_type(type_specifiers_map) {
        this.variations.forEach((map_val, index, array) => {
            // Check number of specifiers is the same
            let matches = true;
            // Check number for each value
            map_val.forEach((value, key, map) => {
                // End early if key does not exist
                if (!matches || !type_specifiers_map.has(key)) {
                    matches = false;
                    return;
                }
                // Check value
                if (type_specifiers_map.get(key) !== value) {
                    matches = false;
                }
            });
            // Return true if it matches
            if (matches) {
                return true;
            }
        });
        return false;
    }
}
export class TypeMatcher {
    static make_type_multiset(type_size, values) {
        let multiset = new BasicTypeMultiset(type_size);
        values.forEach((value, index, array) => multiset.add_variation_set(value));
        return multiset;
    }
    static getTypeMultiset(type_specifiers) {
        const variation_count = new Map;
        let has_been_signed = false;
        let is_signed = true;
        // Add the type specifiers to the list
        type_specifiers.forEach((value, index, array) => {
            const specifier = getBasicTypeSpecifier(value); // Does not return valid type
            if (specifier === null) { // Given type name is not a specifier
                throw new InvalidTypeException("Type does not exist");
            }
            else if (specifier === BasicTypeSpecifier.SIGNED || specifier === BasicTypeSpecifier.UNSIGNED) {
                // Ensure the signed value has not been manually set to something else
                if (has_been_signed && is_signed !== (specifier === BasicTypeSpecifier.SIGNED)) {
                    throw new MismatchedSignException("Type can not be both signed and unsigned");
                }
                is_signed = specifier === BasicTypeSpecifier.SIGNED;
                has_been_signed = true;
            }
            // Add to count
            const curr_count = variation_count.has(specifier) ? variation_count.get(specifier) : 0;
            variation_count.set(specifier, curr_count + 1);
        });
        this.basic_type_multisets.forEach((value, index, array) => {
            if (value.is_type(variation_count)) {
                return value;
            }
        });
        throw new InvalidTypeException("Type does not match any valid types");
    }
}
TypeMatcher.basic_type_multisets = [TypeMatcher.make_type_multiset(0, [new Map([[BasicTypeSpecifier.VOID, 1]])]),
    TypeMatcher.make_type_multiset(4, [new Map([
            [BasicTypeSpecifier.SIGNED, 1],
            [BasicTypeSpecifier.INT, 1]
        ]), new Map([[BasicTypeSpecifier.INT, 1]])])];
/**
 * Thrown when a given type name does not exist
 */
export class InvalidTypeException extends Error {
    /**
     * Constructs a new TypeNameDoesNotException instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "InvalidTypeException";
    }
}
/**
 * Thrown when a sign has already been set to something else
 */
export class MismatchedSignException extends Error {
    /**
     * Constructs a new MismatchedSignException instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "MismatchedSignException";
    }
}
//# sourceMappingURL=TypeManagement.js.map