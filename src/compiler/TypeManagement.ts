/**
 * Type Management
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

/**
 * Represents the possible set of type specifiers for basic types
 */
enum BasicTypeSpecifier {
    VOID = "void",
    CHAR = "char",
    SHORT = "short",
    INT = "int",
    LONG = "long",
    FLOAT = "float",
    DOUBLE = "double",
    SIGNED = "signed",
    UNSIGNED = "unsigned"
}

/**
 * Gets the basic type specifier according to the string value
 * @param value The value to get
 */
function getBasicTypeSpecifier(value: string): BasicTypeSpecifier {
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
function getEnumKeyByEnumValue<T extends {[index: string]: string}>(myEnum: T, enumValue: string): keyof T | null {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}

/**
 * A multiset used to match types to a number of acceptable variations
 */
export class BasicTypeMultiset {
    private type_size: number;
    private variations: Array<Map<BasicTypeSpecifier, number>>;

    /**
     * Constructs a new type multiset
     * @param type_size The size of the type
     */
    constructor(type_size: number) {
        this.type_size = type_size;
        this.variations = new Array<Map<BasicTypeSpecifier, number>>();
    }

    /**
     * Adds the given variation to the type multiset
     * @param variation_map
     */
    public add_variation_set(variation_map: Map<BasicTypeSpecifier, number>) {
        this.variations.push(variation_map);
    }

    /**
     * Determines if the given set of type specifiers matches with the type multiset
     * @param type_specifiers_map A map of the type specifiers to the number of specifiers
     */
    public is_type(type_specifiers_map: Map<BasicTypeSpecifier, number>): boolean {
        let found_val: BasicTypeMultiset = null;
        this.variations.forEach((map_val, index, array) => {
            // Break loop if present
            if (found_val !== null) {
                return;
            }
            // Check number of specifiers is the same
            let matches: boolean = true;
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
            })
            // Return true if it matches
            if (matches) {
                return true;
            }
        })

        return false;
    }
}

/**
 * Creates and initialises a BasicTypeMultiset according to the type size and values
 * @param type_size The size of the given type
 * @param values The values associated with the given type
 */
function make_basic_type_multiset(type_size: number, values: Array<Map<BasicTypeSpecifier, number>>):
    BasicTypeMultiset {
    let multiset = new BasicTypeMultiset(type_size);
    values.forEach((value, index, array) => multiset.add_variation_set(value));
    return multiset;
}

/**
 * Matches a type with a set of string specifiers
 */
export class TypeMatcher {
    /**
     * The available basic type multisets represent Integers, Void, etc as specified by C17 Spec 6.7.2
     * @private
     */
    private static basic_type_multisets: Array<BasicTypeMultiset> = [
        // Represents the void type
        make_basic_type_multiset(0,
            [new Map<BasicTypeSpecifier, number>([[BasicTypeSpecifier.VOID, 1]])]),
        // Represents a char or a signed char
        make_basic_type_multiset(1, [
            new Map<BasicTypeSpecifier, number>([[BasicTypeSpecifier.CHAR, 1]]),
            new Map<BasicTypeSpecifier, number>([
                [BasicTypeSpecifier.UNSIGNED, 1], [BasicTypeSpecifier.CHAR, 1]
            ])]),
        // Represents an unsigned char
        make_basic_type_multiset(1, [
            new Map<BasicTypeSpecifier, number>([
                [BasicTypeSpecifier.SIGNED, 1], [BasicTypeSpecifier.CHAR, 1]
            ])]),
        // Represents a signed short
        make_basic_type_multiset(1, [
            new Map<BasicTypeSpecifier, number>([[BasicTypeSpecifier.SHORT, 1]]),
            new Map<BasicTypeSpecifier, number>([
                [BasicTypeSpecifier.SIGNED, 1], [BasicTypeSpecifier.SHORT, 1]
            ]),
            new Map<BasicTypeSpecifier, number>([
                [BasicTypeSpecifier.SHORT, 1], [BasicTypeSpecifier.INT, 1]
            ]),
            new Map<BasicTypeSpecifier, number>([
                [BasicTypeSpecifier.SIGNED, 1], [BasicTypeSpecifier.SHORT, 1], [BasicTypeSpecifier.INT, 1]
            ])
        ]),
        // Represents the signed int and specifies that signed by itself is also an int
        make_basic_type_multiset(4, [
            new Map<BasicTypeSpecifier, number>([
                [BasicTypeSpecifier.SIGNED, 1], [BasicTypeSpecifier.INT, 1]
            ]),
            new Map<BasicTypeSpecifier, number>([
                [BasicTypeSpecifier.SIGNED, 1]
            ]),
            new Map<BasicTypeSpecifier, number>([[BasicTypeSpecifier.INT, 1]])])
    ];

    /**
     * Gets the type multiset associated with a set of type specifiers
     * @param type_specifiers
     */
    public static get_type_multiset(type_specifiers: Array<string>): BasicTypeMultiset {
        const variation_count = new Map<BasicTypeSpecifier, number>;
        let has_been_signed = false;
        let is_signed = true;
        // Add the type specifiers to the list
        type_specifiers.forEach((value, index, array) => {
            const specifier: BasicTypeSpecifier = getBasicTypeSpecifier(value); // Does not return valid type
            if (specifier === null) { // Given type name is not a specifier
                throw new InvalidTypeException("Type does not exist")
            } else if (specifier === BasicTypeSpecifier.SIGNED || specifier === BasicTypeSpecifier.UNSIGNED) {
                // Ensure the signed value has not been manually set to something else
                if (has_been_signed && is_signed !== (specifier === BasicTypeSpecifier.SIGNED)) {
                    throw new MismatchedSignException("Type can not be both signed and unsigned")
                }
                is_signed = specifier === BasicTypeSpecifier.SIGNED;
                has_been_signed = true;
            }
            // Add to count
            const curr_count = variation_count.has(specifier) ? variation_count.get(specifier) : 0;
            variation_count.set(specifier, curr_count + 1);
        });

        // Attempts to find which multiset the map of specifiers matches to
        this.basic_type_multisets.forEach((value, index, array) => {
            if (value.is_type(variation_count)) {
                return value;
            }
        });
        throw new InvalidTypeException("Type does not match any valid types")
    }
}

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