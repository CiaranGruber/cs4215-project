import {BuiltInTypeMatcher} from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeMatcher";
import {BuiltInTypeSpecifierEnum} from "../../../../type_descriptions/type_specifier/TypeSpecifier";
import {
    BuiltInTypeSpecifierType
} from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";

test('Test equivalent types', () => {
    const specifiers1 = [new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.SIGNED)];
    const specifiers2 = [new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.INT)];
    const type_multiset1 = BuiltInTypeMatcher.get_type_multiset(specifiers1);
    const type_multiset2 = BuiltInTypeMatcher.get_type_multiset(specifiers2);
    expect(type_multiset1).toBe(type_multiset2);
});

test('Test unequal types', () => {
    const specifiers1 = [new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.CHAR)];
    const specifiers2 = [new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.INT)];
    const type_multiset1 = BuiltInTypeMatcher.get_type_multiset(specifiers1);
    const type_multiset2 = BuiltInTypeMatcher.get_type_multiset(specifiers2);
    expect(type_multiset1).not.toBe(type_multiset2);
});