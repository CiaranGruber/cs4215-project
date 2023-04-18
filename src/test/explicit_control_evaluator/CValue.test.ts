import GlobalContext from "../../global_context/GlobalContext";
import CMemory from "../../heap/CMemory";
import VariableDeclaration from "../../explicit-control-evaluator/VariableDeclaration";
import {BuiltInTypeSpecifierType} from "../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import TypeInformation from "../../type_descriptions/TypeInformation";
import {TypeQualDeclarationSpecifier, TypeSpecDeclarationSpecifier} from "../../type_descriptions/DeclarationSpecifier";
import {
    BuiltInTypeSpecifier,
    BuiltInTypeSpecifierEnum,
    TypeSpecifierType
} from "../../type_descriptions/type_specifier/TypeSpecifier";
import DeclarationSpecification from "../../type_descriptions/DeclarationSpecification";
import Int32 from "../../data_views/Int32";
import Int16 from "../../data_views/Int16";
import {build_qualifier, TypeQualifierType} from "../../type_descriptions/type_qualifier/TypeQualifier";
import {CannotSetValueError} from "../../heap/ImmutableDataView";
import Int8 from "../../data_views/Int8";
import BuiltInFunction from "../../functions/BuiltInFunction";
import FunctionManager from "../../functions/FunctionManager";
import BoolConverter from "../../converter/BoolConverter";
import BuiltInMultisetManager from "../../type_descriptions/type_specifier/built_in_types/BuiltInMultisetManager";
import {BuiltInTypeMatcher} from "../../type_descriptions/type_specifier/built_in_types/BuiltInTypeMatcher";
import Bool from "../../data_views/Bool";
import IntConverter from "../../converter/IntConverter";
import QualifiedPointer from "../../type_descriptions/QualifiedPointer";
import FunctionPointerConverter from "../../converter/FunctionPointerConverter";
import ShortConverter from "../../converter/ShortConverter";
import CharConverter from "../../converter/CharConverter";

function get_basic_type(built_in_specifier: BuiltInTypeSpecifierType): TypeInformation {
    const type_specifier = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(built_in_specifier));
    const declaration_specification = DeclarationSpecification.from_specifiers([type_specifier])
    return new TypeInformation(declaration_specification, []);
}

function is_type(built_in_specifier: BuiltInTypeSpecifierType, type: TypeInformation): boolean {
    const type_specifier = type.declaration_specifier.specifier;
    if (type_specifier.type !== TypeSpecifierType.BUILT_IN_MULTISET) {
        return false;
    }
    const expected_multiset = (type_specifier as BuiltInTypeSpecifier).type_multiset;
    const actual_multiset = BuiltInTypeMatcher.get_type_multiset([new BuiltInTypeSpecifierEnum(built_in_specifier)]);
    return BuiltInMultisetManager.get_multiset_index(actual_multiset) ===
        BuiltInMultisetManager.get_multiset_index(expected_multiset);
}

test('Referencing and dereferencing a value', () => {
    const memory_size = 128;
    const variable_name = "test_variable";
    const variable_ref_name = "test_variable_2";
    const variable_value = 4;
    // Initialise memory
    GlobalContext.initialise_instance(true);
    const memory = new CMemory(memory_size);
    const stack = memory.stack;

    // Set up variable to get reference for
    const int_type_spec = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.INT));
    const declaration_specifier = DeclarationSpecification.from_specifiers([int_type_spec]);
    const pointer = new QualifiedPointer(build_qualifier([]));
    const variable = new VariableDeclaration(new TypeInformation(declaration_specifier, []), variable_name);
    const variable_ref = new VariableDeclaration(new TypeInformation(declaration_specifier, [pointer]),
        variable_ref_name);
    stack.enter_block([variable, variable_ref]);
    // Declare and assign variables
    stack.declare_variable(variable_name);
    stack.declare_variable(variable_ref_name);
    stack.get_variable(variable_name).set_value(memory, Int32.create_buffer(variable_value));
    const reference = stack.get_variable(variable_name).ref();
    stack.get_variable(variable_ref_name).set_value(memory, reference.get_value(memory).referenced_buffer);

    // Get value
    const ref_variable = stack.get_variable(variable_ref_name);
    const value_retrieved = new Int32(ref_variable.deref(memory).get_value(memory)).value;
    expect(ref_variable.get_value(memory)).not.toEqual(value_retrieved);
    expect(value_retrieved).toEqual(variable_value);
});

test('Setting the value of a constant', () => {
    const memory_size = 128;
    const variable_name = "test_variable";
    // Initialise memory
    GlobalContext.initialise_instance(true);
    const memory = new CMemory(memory_size);
    const stack = memory.stack;

    // Set up type information
    const specifier = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.INT));
    const qualifier = new TypeQualDeclarationSpecifier(TypeQualifierType.CONST);
    const declaration_specification = DeclarationSpecification.from_specifiers([specifier, qualifier]);
    const type = new TypeInformation(declaration_specification, []);

    // Set up variable to get reference for
    const declaration = new VariableDeclaration(type, variable_name);
    stack.enter_block([declaration]);
    stack.declare_variable(variable_name);
    const variable = stack.get_variable(variable_name);
    expect(() => variable.set_value(memory, Int32.create_buffer(0))).toThrow(CannotSetValueError);
});

test('Calling a function', () => {
    const memory_size = 128;
    const function_name = "test_function";
    // Initialise memory
    GlobalContext.initialise_instance(true);
    const function_manager = new FunctionManager();
    const memory = new CMemory(memory_size);
    const stack = memory.stack;

    // Set up function
    const bool_type = get_basic_type(BuiltInTypeSpecifierType._BOOL);
    const type = new TypeInformation(DeclarationSpecification.function_specifier(bool_type), []);
    const variable_declaration = new VariableDeclaration(type, function_name);
    const func = new BuiltInFunction(() => {return true;}, new BoolConverter(), []);
    const key = function_manager.add_function(func);

    // Add function
    stack.enter_block([variable_declaration]);
    const c_value = new FunctionPointerConverter(type).convert_to_c(key);
    stack.declare_variable(function_name, c_value);

    // Run function
    const value = stack.get_variable(function_name);
    const return_val = value.call([], memory, function_manager);
    // Check type
    expect(is_type(BuiltInTypeSpecifierType._BOOL, return_val.type_information)).toBeTruthy();
    // Check return value
    expect(new Bool(return_val.get_value(undefined)).value).toBeTruthy();
});

test('Calling a function with a function pointer of a different type', () => {
    const memory_size = 128;
    const function_name = "test_function";
    const short_val = 609;
    const char_val = 97;
    // Initialise memory
    GlobalContext.initialise_instance(true);
    const function_manager = new FunctionManager();
    const memory = new CMemory(memory_size);
    const stack = memory.stack;

    // Set up function
    const char_type = get_basic_type(BuiltInTypeSpecifierType.CHAR);
    const type = new TypeInformation(DeclarationSpecification.function_specifier(char_type), []);
    const variable_declaration = new VariableDeclaration(type, function_name);
    const func = new BuiltInFunction(() => {return short_val;}, new IntConverter(), []);
    const key = function_manager.add_function(func);

    // Add function
    stack.enter_block([variable_declaration]);
    const c_value = new FunctionPointerConverter(type).convert_to_c(key);
    stack.declare_variable(function_name, c_value);

    // Run function
    const value = stack.get_variable(function_name);
    const return_val = value.call([], memory, function_manager);
    // Check type
    expect(is_type(BuiltInTypeSpecifierType.CHAR, return_val.type_information)).toBeTruthy();
    // Check return value
    expect(new Int8(return_val.get_value(undefined)).value).toEqual(char_val);
});

test('Casting to a smaller value', () => {
    const short_value = 9796;
    const char_value = 68;
    // Cast value
    let value = new ShortConverter().convert_to_c(short_value);
    value = value.cast_to(get_basic_type(BuiltInTypeSpecifierType.CHAR));
    expect(value.is_l_value).toBe(false);
    expect(new Int8(value.get_value(undefined)).value).toEqual(char_value);
});

test('Casting to a larger value', () => {
    const char_value = 68;
    const short_value = 68;
    // Cast value
    let value = new CharConverter().convert_to_c(char_value);
    value = value.cast_to(get_basic_type(BuiltInTypeSpecifierType.SHORT));
    expect(value.is_l_value).toBe(false);
    expect(new Int16(value.get_value(undefined)).value).toEqual(short_value);
});