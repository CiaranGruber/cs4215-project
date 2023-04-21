/**
 * BuiltInMultisetManager
 *
 * Manages the available built-in multi-sets for C providing the relevant integer references
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import {BuiltInTypeSpecifierType} from "./BuiltInTypeSpecifierType";
import BuiltInTypeMultiset from "./BuiltInTypeMultiset";
import {SpecifierDescription} from "../SpecifierDescription";
import GenericTypeCaster from "../../type_casting/GenericTypeCaster";
import VoidCaster from "../../type_casting/VoidCaster";
import IntegerCaster from "../../type_casting/IntegerCaster";

/**
 * Creates and initialises a BasicTypeMultiset according to the type size and values
 * @param string_rep The string representation of the multiset
 * @param type_size The size of the given type
 * @param type_caster The cast object used to csat to the specified type
 * @param descriptors The descriptors used to describe types
 * @param values The values associated with the given type
 */
function make_basic_type_multiset(string_rep: string, type_size: number, type_caster: GenericTypeCaster,
                                  descriptors: Set<SpecifierDescription>,
                                  values: Array<Map<BuiltInTypeSpecifierType, number>>): BuiltInTypeMultiset {
    let multiset = new BuiltInTypeMultiset(string_rep, type_size, type_caster);
    values.forEach((value) => multiset.add_variation_set(value));
    descriptors.forEach((value) => multiset.add_descriptor(value));
    return multiset;
}

/**
 * Contains the set of potential built-in multi-sets available for use within the program and manages value
 * representations
 */
export default class BuiltInMultisetManager {
    /**
     * The available basic type multi-sets represent Integers, Void, etc. as specified by C17 Spec 6.7.2
     * @private
     */
    private static _basic_type_multi_sets: Array<BuiltInTypeMultiset>;
    /**
     * Late invocation of multiset creation to prevent JavaScript import bugs
     */
    private static get basic_type_multi_sets() {
        if (this._basic_type_multi_sets) {
            return this._basic_type_multi_sets;
        }
        this._basic_type_multi_sets = [
            // Represents the void type
            make_basic_type_multiset("void", 0, new VoidCaster(),
                new Set([SpecifierDescription.IS_VOID]), [new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.VOID, 1]])]),
            // Represents a char or a signed char
            make_basic_type_multiset("char", 1, new IntegerCaster(1), new Set([SpecifierDescription.IS_INTEGER, SpecifierDescription.IS_ARITHMETIC]), [
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.CHAR, 1]]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.CHAR, 1]
                ])
            ]),
            // Represents an unsigned char
            make_basic_type_multiset("signed char", 1, new IntegerCaster(1),
                new Set([SpecifierDescription.IS_INTEGER, SpecifierDescription.IS_ARITHMETIC]), [
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.SIGNED, 1], [BuiltInTypeSpecifierType.CHAR, 1]
                ])
            ]),
            // Represents a signed short
            make_basic_type_multiset("short int", 2, new IntegerCaster(2),
                new Set([SpecifierDescription.IS_INTEGER, SpecifierDescription.IS_ARITHMETIC]), [
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
            // Represents an unsigned short
            make_basic_type_multiset("short unsigned int", 2, new IntegerCaster(2),
                new Set([SpecifierDescription.IS_INTEGER, SpecifierDescription.IS_ARITHMETIC]), [
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.SHORT, 1]]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.SHORT, 1]
                ]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.SHORT, 1], [BuiltInTypeSpecifierType.INT, 1]
                ])
            ]),
            // Represents the signed int and specifies that signed by itself is also an int
            make_basic_type_multiset("int", 4, new IntegerCaster(4), new Set([SpecifierDescription.IS_INTEGER, SpecifierDescription.IS_ARITHMETIC]), [
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.SIGNED, 1]]),
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.INT, 1]]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.SIGNED, 1], [BuiltInTypeSpecifierType.INT, 1]
                ])
            ]),
            // Represents the unsigned int and specifies that unsigned by itself is also an unsigned int
            make_basic_type_multiset("unsigned int", 4, new IntegerCaster(4), new Set([SpecifierDescription.IS_INTEGER, SpecifierDescription.IS_ARITHMETIC]), [
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.UNSIGNED, 1]]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.INT, 1]
                ])
            ]),
            // Represents a signed long
            make_basic_type_multiset("long int", 8, new IntegerCaster(8),
                new Set([SpecifierDescription.IS_INTEGER, SpecifierDescription.IS_ARITHMETIC]), [
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
            make_basic_type_multiset("long unsigned int", 8, new IntegerCaster(8),
                new Set([SpecifierDescription.IS_INTEGER, SpecifierDescription.IS_ARITHMETIC]), [
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.LONG, 1]
                ]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.LONG, 1],
                    [BuiltInTypeSpecifierType.INT, 1]
                ])]),
            // Represents a signed long long value
            make_basic_type_multiset("long long int", 8, new IntegerCaster(8),
                new Set([SpecifierDescription.IS_INTEGER, SpecifierDescription.IS_ARITHMETIC]), [
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
            make_basic_type_multiset("long long unsigned int", 8, new IntegerCaster(8),
                new Set([SpecifierDescription.IS_INTEGER, SpecifierDescription.IS_ARITHMETIC]), [
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.LONG, 2]
                ]),
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.UNSIGNED, 1], [BuiltInTypeSpecifierType.LONG, 2],
                    [BuiltInTypeSpecifierType.INT, 1]
                ])
            ]),
            // Todo: Treat _Bool type as other than an integer (Note: casting in particular)
            make_basic_type_multiset("_Bool", 1, new IntegerCaster(1),
                new Set([SpecifierDescription.IS_INTEGER, SpecifierDescription.IS_ARITHMETIC]), [
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType._BOOL, 1]])
            ]),
            // Represents a float
            make_basic_type_multiset("float", 4, new VoidCaster(),
                new Set([SpecifierDescription.IS_FLOAT, SpecifierDescription.IS_ARITHMETIC]), [
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.FLOAT, 1]])
            ]),
            // Represents a double
            make_basic_type_multiset("double", 8, new VoidCaster(),
                new Set([SpecifierDescription.IS_FLOAT, SpecifierDescription.IS_ARITHMETIC]), [
                new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.DOUBLE, 1]])
            ]),
            // Represents a long double
            make_basic_type_multiset("long double", 8, new VoidCaster(),
                new Set([SpecifierDescription.IS_FLOAT, SpecifierDescription.IS_ARITHMETIC]), [
                new Map<BuiltInTypeSpecifierType, number>([
                    [BuiltInTypeSpecifierType.LONG, 1], [BuiltInTypeSpecifierType.DOUBLE, 1]
                ])
            ]),
        ];
        return this._basic_type_multi_sets;
    }

    /**
     * Gets the full array of multi-sets in the manager
     */
    public static get multiset_array(): Array<BuiltInTypeMultiset> {
            return BuiltInMultisetManager.basic_type_multi_sets;
    }

    /**
     * Gets the index of the given multiset in the array
     * @param type_multiset The type multiset to find
     * @returns The index of the type multiset if found; -1 if it is not found
     */
    public static get_multiset_index(type_multiset: BuiltInTypeMultiset): number {
        return BuiltInMultisetManager.basic_type_multi_sets.indexOf(type_multiset);
    }

    /**
     * Gets the multiset of the given index
     * @param index The index of the given multiset
     */
    public static get_multiset(index: number): BuiltInTypeMultiset {
        return BuiltInMultisetManager.basic_type_multi_sets[index];
    }
}