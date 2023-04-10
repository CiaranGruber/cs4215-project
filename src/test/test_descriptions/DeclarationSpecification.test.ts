import {TypeQualDeclarationSpecifier, TypeSpecDeclarationSpecifier} from "../../type_descriptions/DeclarationSpecifier";
import {
    BuiltInTypeSpecifier,
    BuiltInTypeSpecifierEnum,
    TypeSpecifierType
} from "../../type_descriptions/type_specifier/TypeSpecifier";
import DeclarationSpecification from "../../type_descriptions/DeclarationSpecification";
import {BuiltInTypeMatcher} from "../../type_descriptions/type_specifier/built_in_types/BuiltInTypeMatcher";
import {TypeQualifierType} from "../../type_descriptions/type_qualifier/TypeQualifier";
import {BuiltInTypeSpecifierType} from "../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";

test('Basic declaration', () => {
    // Set up specifiers
    const type_specifier = new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.VOID);
    const specifiers = [new TypeSpecDeclarationSpecifier(type_specifier)];
    // Get declaration specification
    const declaration_specification = DeclarationSpecification.from_specifiers(specifiers);
    expect(declaration_specification.specifier.type).toBe(TypeSpecifierType.BUILT_IN_MULTISET);
    // Compare to the correct multiset
    const multiset_specifier = declaration_specification.specifier as BuiltInTypeSpecifier;
    expect(multiset_specifier.type_multiset).toBe(BuiltInTypeMatcher.get_type_multiset([type_specifier]));
});

test('Complex declaration', () => {
    // Set up specifiers
    const specifiers = [new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.SIGNED)),
        new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.INT)),
        new TypeQualDeclarationSpecifier(TypeQualifierType.CONST)];
    // Get declaration specification
    const declaration_specification = DeclarationSpecification.from_specifiers(specifiers);
    expect(declaration_specification.specifier.type).toBe(TypeSpecifierType.BUILT_IN_MULTISET);
    // Compare to the correct multiset
    const multiset_specifier = declaration_specification.specifier as BuiltInTypeSpecifier;
    const expected_multiset = BuiltInTypeMatcher.get_type_multiset([
        new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.SIGNED),
        new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.INT)
    ]);
    expect(multiset_specifier.type_multiset).toBe(expected_multiset);
    // Check qualifier details
    expect(declaration_specification.qualifier.is_const()).toBeTruthy();
    expect(declaration_specification.qualifier.is_atomic()).toBeFalsy();
    expect(declaration_specification.qualifier.is_restrict()).toBeFalsy();
    expect(declaration_specification.qualifier.is_volatile()).toBeFalsy();
});