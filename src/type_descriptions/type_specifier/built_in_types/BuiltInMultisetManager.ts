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
import {BuiltInMultisetDescription} from "./BuiltInMultisetDescription";
import GenericTypeCaster from "../../type_casting/GenericTypeCaster";
import VoidCaster from "../../type_casting/VoidCaster";
import IntegerCaster from "../../type_casting/IntegerCaster";

/**
 * Creates and initialises a BasicTypeMultiset according to the type size and values
 * @param type_size The size of the given type
 * @param type_caster The cast object used to csat to the specified type
 * @param descriptors The descriptors used to describe types
 * @param values The values associated with the given type
 */
function make_basic_type_multiset(type_size: number, type_caster: GenericTypeCaster,
                                  descriptors: Set<BuiltInMultisetDescription>,
                                  values: Array<Map<BuiltInTypeSpecifierType, number>>): BuiltInTypeMultiset {
    let multiset = new BuiltInTypeMultiset(type_size, type_caster);
    values.forEach((value) => multiset.add_variation_set(value));
    descriptors.forEach((value) => multiset.add_descriptor(value));
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
        make_basic_type_multiset(0, new VoidCaster(), new Set([BuiltInMultisetDescription.IS_VOID]),
            [new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.VOID, 1]])]),
        // Represents a char or a signed char
        make_basic_type_multiset(1, new IntegerCaster(1),
            new Set([BuiltInMultisetDescription.IS_INTEGER]),
            [
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.CHAR, 1]]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.CHAR, 1]
                ])
            ]),
        // Represents an unsigned char
        make_basic_type_multiset(1, new IntegerCaster(1),
            new Set([BuiltInMultisetDescription.IS_INTEGER]), [
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.SIGNED, 1], [BuiltInTypeSpecifierType.CHAR, 1]
                ])
            ]),
        // Represents a signed short
        make_basic_type_multiset(2, new IntegerCaster(2),
            new Set([BuiltInMultisetDescription.IS_INTEGER]), [
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
        make_basic_type_multiset(4, new IntegerCaster(4),
            new Set([BuiltInMultisetDescription.IS_INTEGER]), [
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.SIGNED, 1]]),
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.INT, 1]]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.SIGNED, 1], [BuiltInTypeSpecifierType.INT, 1]
                ])
            ]),
        // Represents the unsigned int and specifies that unsigned by itself is also an unsigned int
        make_basic_type_multiset(4,  new IntegerCaster(4),
            new Set([BuiltInMultisetDescription.IS_INTEGER]), [
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.UNSIGNED, 1]]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.INT, 1]
                ])
            ]),
        // Represents a signed long
        make_basic_type_multiset(8, new IntegerCaster(8),
            new Set([BuiltInMultisetDescription.IS_INTEGER]), [
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.LONG, 1]]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.SIGNED, 1], [BuiltInTypeSpecifierType.LONG, 1]
                ]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.LONG, 1], [BuiltInTypeSpecifierType.INT, 1]
                ]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.SIGNED, 1], [BuiltInTypeSpecifierType.LONG, 1],
                    [BuiltInTypeSpecifierType.INT, 1]
                ])
            ]),
        // Represents an unsigned long
        make_basic_type_multiset(8, new IntegerCaster(8),
            new Set([BuiltInMultisetDescription.IS_INTEGER]), [
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.LONG, 1]
                ]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.LONG, 1],
                    [BuiltInTypeSpecifierType.INT, 1]
                ])        ]),
                // Represents a signed long long value
                make_basic_type_multiset(8, new IntegerCaster(8),
                        new Set([BuiltInMultisetDescription.IS_INTEGER]), [
                                        new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.LONG, 2]]),
                        new Map<BuiltInTypeSpecifierType, number>([
                            [BuiltInTypeSpecifierType.SIGNED, 1], [BuiltInTypeSpecifierType.LONG, 2]
                        ]),
                        new Map<BuiltInTypeSpecifierType, number>([
                            [BuiltInTypeSpecifierType.LONG, 2], [BuiltInTypeSpecifierType.INT, 1]
                        ]),
                        new Map<BuiltInTypeSpecifierType, number>([
                            [BuiltInTypeSpecifierType.SIGNED, 1], [BuiltInTypeSpecifierType.LONG, 2],
                            [BuiltInTypeSpecifierType.INT, 1]
                        ])
                    ]),
        // Represents an unsigned long long
        make_basic_type_multiset(8, new IntegerCaster(8),
            new Set([BuiltInMultisetDescription.IS_INTEGER]), [
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.LONG, 2]
                ]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.LONG, 2],
                    [BuiltInTypeSpecifierType.INT, 1]
                ])
            ]),
        // Represents a float
        make_basic_type_multiset(4, new VoidCaster(),
            new Set([BuiltInMultisetDescription.IS_FLOAT]), [
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.FLOAT, 1]])
            ]),
        // Represents a double
        make_basic_type_multiset(8, new VoidCaster(),
            new Set([BuiltInMultisetDescription.IS_FLOAT]), [
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.DOUBLE, 1]])
            ]),
        // Represents a long double
        make_basic_type_multiset(8, new VoidCaster(),
            new Set([BuiltInMultisetDescription.IS_FLOAT]), [
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.LONG, 1], [BuiltInTypeSpecifierType.DOUBLE, 1]
                ])
            ]),
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