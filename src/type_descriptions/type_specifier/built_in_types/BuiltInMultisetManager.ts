/**
 * BuiltInMultisetManager
 *
 * Manages the available built-in multisets for C providing the relevant integer references
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import {BuiltInTypeSpecifierType} from "./BuiltInTypeSpecifierType";
import BuiltInTypeMultiset from "./BuiltInTypeMultiset";

/**
 * Creates and initialises a BasicTypeMultiset according to the type size and values
 * @param type_size The size of the given type
 * @param values The values associated with the given type
 */
function make_basic_type_multiset(type_size: number, values: Array<Map<BuiltInTypeSpecifierType, number>>):
    BuiltInTypeMultiset {
    let multiset = new BuiltInTypeMultiset(type_size);
    values.forEach((value) => multiset.add_variation_set(value));
    return multiset;
}

/**
 * Contains the set of potential built-in multisets available for use within the program and manages value
 * representations
 */
export default class BuiltInMultisetManager {
    /**
     * The available basic type multisets represent Integers, Void, etc as specified by C17 Spec 6.7.2
     * @private
     */
    private static basic_type_multisets: Array<BuiltInTypeMultiset> = [
        // Represents the void type
        make_basic_type_multiset(0,
            [new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.VOID, 1]])]),
        // Represents a char or a signed char
        make_basic_type_multiset(1, [
            new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.CHAR, 1]]),
            new Map<BuiltInTypeSpecifierType, number>([
                [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.CHAR, 1]
            ])]),
        // Represents an unsigned char
        make_basic_type_multiset(1, [
            new Map<BuiltInTypeSpecifierType, number>([
                [BuiltInTypeSpecifierType.SIGNED, 1], [BuiltInTypeSpecifierType.CHAR, 1]
            ])]),
        // Represents a signed short
        make_basic_type_multiset(1, [
            new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.SHORT, 1]]),
            new Map<BuiltInTypeSpecifierType, number>([
                [BuiltInTypeSpecifierType.SIGNED, 1], [BuiltInTypeSpecifierType.SHORT, 1]
            ]),
            new Map<BuiltInTypeSpecifierType, number>([
                [BuiltInTypeSpecifierType.SHORT, 1], [BuiltInTypeSpecifierType.INT, 1]
            ]),
            new Map<BuiltInTypeSpecifierType, number>([
                [BuiltInTypeSpecifierType.SIGNED, 1], [BuiltInTypeSpecifierType.SHORT, 1], [BuiltInTypeSpecifierType.INT, 1]
            ])
        ]),
        // Represents the signed int and specifies that signed by itself is also an int
        make_basic_type_multiset(4, [
            new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.SIGNED, 1]]),
            new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.INT, 1]]),
            new Map<BuiltInTypeSpecifierType, number>([
                [BuiltInTypeSpecifierType.SIGNED, 1], [BuiltInTypeSpecifierType.INT, 1]
            ])
        ]),
        // Represents the unsigned int and specifies that unsigned by itself is also an unsigned int
        make_basic_type_multiset(4, [
            new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.UNSIGNED, 1]]),
            new Map<BuiltInTypeSpecifierType, number>([
                [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.INT, 1]
            ])
        ])
    ];

    /**
     * Gets the full array of multisets in the manager
     */
    public static get multiset_array(): Array<BuiltInTypeMultiset> {
        return BuiltInMultisetManager.basic_type_multisets;
    }

    /**
     * Gets the index of the given multiset in the array
     * @param type_multiset The type multiset to find
     * @returns The index of the type multiset if found; -1 if it is not found
     */
    public static get_multiset_index(type_multiset: BuiltInTypeMultiset): number {
        return BuiltInMultisetManager.basic_type_multisets.indexOf(type_multiset);
    }

    /**
     * Gets the multiset of the given idnex
     * @param index The index of the given multiset
     */
    public static get_multiset(index: number): BuiltInTypeMultiset {
        return BuiltInMultisetManager.basic_type_multisets[index];
    }
}