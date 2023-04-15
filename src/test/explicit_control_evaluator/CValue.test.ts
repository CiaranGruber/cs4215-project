import LanguageContext from "../../global_context/LanguageContext";
import CMemory from "../../heap/CMemory";
import VariableDeclaration from "../../explicit-control-evaluator/VariableDeclaration";
import {BuiltInTypeSpecifierType} from "../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import TypeInformation from "../../type_descriptions/TypeInformation";
import {TypeQualDeclarationSpecifier, TypeSpecDeclarationSpecifier} from "../../type_descriptions/DeclarationSpecifier";
import {BuiltInTypeSpecifierEnum} from "../../type_descriptions/type_specifier/TypeSpecifier";
import DeclarationSpecification from "../../type_descriptions/DeclarationSpecification";
import CValue from "../../explicit-control-evaluator/CValue";
import Int32 from "../../data_views/Int32";
import Int16 from "../../data_views/Int16";
import {TypeQualifierType} from "../../type_descriptions/type_qualifier/TypeQualifier";
import {CannotSetValueError} from "../../heap/ImmutableDataView";
import Int8 from "../../data_views/Int8";

function get_basic_type(built_in_specifier: BuiltInTypeSpecifierType): TypeInformation {
    const type_specifier = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(built_in_specifier));
    const declaration_specification = DeclarationSpecification.from_specifiers([type_specifier])
    return new TypeInformation(declaration_specification, [], false);
}

test('Testing referencing and dereferencing a value', () => {
    const memory_size = 128;
    const variable_name = "test_variable";
    const variable_value = 4;
    // Initialise memory
    LanguageContext.initialise_instance(true);
    const memory = new CMemory(memory_size);
    const stack = memory.stack;

    // Set up variable to get reference for
    const variable = new VariableDeclaration(get_basic_type(BuiltInTypeSpecifierType.INT), variable_name);
    stack.enter_block([variable]);
    stack.declare_variable(variable_name);
    stack.get_variable(variable_name).set_value(memory, Int32.create_buffer(variable_value));

    // Dereference variable
    const value = stack.get_variable(variable_name);
    value.ref();
    value.deref(memory);
    const value_retrieved = new Int32(value.get_value(memory)).value;
    expect(value_retrieved).toEqual(variable_value);
});

test('Setting the value of a constant', () => {
    const memory_size = 128;
    const variable_name = "test_variable";
    // Initialise memory
    LanguageContext.initialise_instance(true);
    const memory = new CMemory(memory_size);
    const stack = memory.stack;

    // Set up type information
    const specifier = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.INT));
    const qualifier = new TypeQualDeclarationSpecifier(TypeQualifierType.CONST);
    const declaration_specification = DeclarationSpecification.from_specifiers([specifier, qualifier]);
    const type = new TypeInformation(declaration_specification, [], false);

    // Set up variable to get reference for
    const declaration = new VariableDeclaration(type, variable_name);
    stack.enter_block([declaration]);
    stack.declare_variable(variable_name);
    const variable = stack.get_variable(variable_name);
    expect(() => variable.set_value(memory, Int32.create_buffer(0))).toThrow(CannotSetValueError);
});

test('Casting to a smaller value', () => {
    const short_value = 9796;
    const char_value = 68;
    // Cast value
    const value = new CValue(false, get_basic_type(BuiltInTypeSpecifierType.SHORT),
        Int16.create_buffer(short_value));
    value.cast_to(get_basic_type(BuiltInTypeSpecifierType.CHAR));
    expect(value.is_l_value).toBe(false);
    expect(new Int8(value.get_value(undefined)).value).toEqual(char_value);
});

test('Casting to a larger value', () => {
    const char_value = 68;
    const short_value = 68;
    // Cast value
    const value = new CValue(false, get_basic_type(BuiltInTypeSpecifierType.CHAR),
        Int8.create_buffer(char_value));
    value.cast_to(get_basic_type(BuiltInTypeSpecifierType.SHORT));
    expect(value.is_l_value).toBe(false);
    expect(new Int16(value.get_value(undefined)).value).toEqual(short_value);
});