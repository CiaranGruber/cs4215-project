import {BuiltInTypeSpecifierEnum} from "../../../../type_descriptions/type_specifier/TypeSpecifier";
import {BuiltInTypeMatcher} from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeMatcher";
import BuiltInMultisetManager from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInMultisetManager";
import {
    BuiltInTypeSpecifierType
} from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";

test('Comparing index of multi-sets', () => {
    const specifiers1 = [new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.SIGNED)];
    const type_multiset = BuiltInTypeMatcher.get_type_multiset(specifiers1);
    const index = BuiltInMultisetManager.get_multiset_index(type_multiset);
    expect(BuiltInMultisetManager.get_multiset(index)).toBe(type_multiset);
});