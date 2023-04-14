import BuiltInTypeMultiset from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeMultiset";
import {
    BuiltInTypeSpecifierType
} from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import IntegerCaster from "../../../../type_descriptions/type_casting/IntegerCaster";

test('Testing if value is in multiset', () => {
    // Create multiset
    const multiset = new BuiltInTypeMultiset(4, new IntegerCaster(4));
    multiset.add_variation_set(new Map([[BuiltInTypeSpecifierType.SIGNED, 1]]));
    multiset.add_variation_set(new Map([[BuiltInTypeSpecifierType.INT, 2]]));
    // Get test values
    const valid_type = new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.INT, 2]]);
    const invalid_type = new Map<BuiltInTypeSpecifierType, number>([[BuiltInTypeSpecifierType.SIGNED, 2]]);
    // Test values
    expect(multiset.is_type(valid_type)).toBe(true);
    expect(multiset.is_type(invalid_type)).toBe(false);
});

// test('Casting to a smaller value', () => {
//     // Set up multiset
//     const multiset = new BuiltInTypeMultiset(1);
//     const type_specifier = new BuiltInTypeSpecifier(multiset);
//     // Set starting value
//     const value = new DataView(new ArrayBuffer(2));
//     value.setUint16(0, 9796);
//     // Get cast result
//     const returned = new DataView(BuiltInTypeMultiset.cast_value(type_specifier, value));
//     // Test
//     expect(returned.getUint8(0)).toBe(68);
// });
//
// test('Casting to a larger value', () => {
//     // Set up multiset
//     const multiset = new BuiltInTypeMultiset(2);
//     const type_specifier = new BuiltInTypeSpecifier(multiset);
//     // Set starting value
//     const value = new DataView(new ArrayBuffer(1));
//     value.setUint8(0, 68);
//     // Get cast result
//     const returned = new DataView(BuiltInTypeMultiset.cast_value(type_specifier, value));
//     // Test
//     expect(returned.getUint16(0)).toBe(68);
// });