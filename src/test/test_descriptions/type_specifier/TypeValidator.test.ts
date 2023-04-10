import TypeValidator from "../../../type_descriptions/type_specifier/TypeValidator";
import {
    BuiltInTypeSpecifier,
    BuiltInTypeSpecifierEnum,
    TypeSpecifierType
} from "../../../type_descriptions/type_specifier/TypeSpecifier";
import {BuiltInTypeMatcher} from "../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeMatcher";
import {
    BuiltInTypeSpecifierType
} from "../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";

test('Validation basic types', () => {
    let specifiers: Array<BuiltInTypeSpecifierEnum> = [new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.VOID)];
    let type = TypeValidator.get_type(specifiers);
    expect(type.type).toBe(TypeSpecifierType.BUILT_IN_MULTISET);
    expect((type as BuiltInTypeSpecifier).type_multiset).toBe(BuiltInTypeMatcher.get_type_multiset(specifiers));
});