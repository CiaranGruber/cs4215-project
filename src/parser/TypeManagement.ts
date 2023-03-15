/**
 * Type Environment
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
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

export class TypeMatcher {
    private static basic_type_multisets: Array<BasicTypeMultiset> = [TypeMatcher.make_type_multiset(0,
        [new Map<BasicTypeSpecifier, number>([
            [BasicTypeSpecifier.VOID, 1]
        ])])];

    private static make_type_multiset(type_size: number, values: Array<Map<BasicTypeSpecifier, number>>):
        BasicTypeMultiset {
        let multiset: BasicTypeMultiset = new BasicTypeMultiset(type_size);
        values.forEach((value, index, array) => multiset.add_variation_set(value));
        return multiset;
    }

    public static getTypeMultiset(type_specifiers: Array<string>): BasicTypeMultiset {
        const variation_count = new Map<BasicTypeSpecifier, number>;
        let has_been_signed = false;
        let is_signed = true;
        // Add the type specifiers to the list
        type_specifiers.forEach((value, index, array) => {
            const specifier: BasicTypeSpecifier = BasicTypeSpecifier[value];
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

        this.basic_type_multisets.forEach((value, index, array) => {
            if (value.is_type(variation_count)) {
                return value;
            }
        });
        throw new InvalidTypeException("Type does not match any valid types")
    }
}

export class BasicTypeMultiset {
    private type_size: number;
    private variations: Array<Map<BasicTypeSpecifier, number>>;

    constructor(type_size: number) {
        this.type_size = type_size;
        this.variations = new Array<Map<BasicTypeSpecifier, number>>();
    }

    public add_variation_set(variation_map: Map<BasicTypeSpecifier, number>) {
        this.variations.push(variation_map);
    }

    public is_type(type_specifiers_map: Map<BasicTypeSpecifier, number>): boolean {
        // Compare to type variations
        this.variations.forEach((map_val, index, array) => {
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