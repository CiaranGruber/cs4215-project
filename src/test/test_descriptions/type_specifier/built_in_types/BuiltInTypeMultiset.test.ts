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