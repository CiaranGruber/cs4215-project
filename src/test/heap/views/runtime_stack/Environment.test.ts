import CMemory from "../../../../heap/CMemory";
import Stack, {VariableNotFoundError} from "../../../../heap/views/runtime_stack/Stack";
import LanguageContext from "../../../../global_context/LanguageContext";
import TypeInformation from "../../../../type_descriptions/TypeInformation";
import {TypeSpecDeclarationSpecifier} from "../../../../type_descriptions/DeclarationSpecifier";
import {BuiltInTypeSpecifierEnum} from "../../../../type_descriptions/type_specifier/TypeSpecifier";
import {
    BuiltInTypeSpecifierType
} from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import DeclarationSpecification from "../../../../type_descriptions/DeclarationSpecification";
import CValue from "../../../../explicit-control-evaluator/CValue";
import VariableDeclaration from "../../../../explicit-control-evaluator/VariableDeclaration";
import Int32 from "../../../../explicit-control-evaluator/views/data/Int32";

function get_base_return(): TypeInformation {
    const void_specifier = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.VOID));
    const declaration_specification = DeclarationSpecification.from_specifiers([void_specifier]);
    return new TypeInformation(declaration_specification, [], false);
}

function get_int_type(): TypeInformation {
    const int_specifier = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.INT));
    const declaration_specification = DeclarationSpecification.from_specifiers([int_specifier]);
    return new TypeInformation(declaration_specification, [], false);
}

function get_void_value(): CValue {
    return new CValue(false, get_base_return(), new ArrayBuffer(0));
}

test('Storing and retrieving variables', () => {
    const memory_size = 128;
    const maximum_space = memory_size - Stack.fixed_byte_length;
    const variable_name = "test_variable";
    const value_to_set = 4;
    // Initialise memory
    LanguageContext.initialise_instance(true);
    const memory = new CMemory(memory_size);
    const stack = memory.stack;

    // Create declaration
    const variable = new VariableDeclaration(get_int_type(), variable_name);
    // Enter scope with declaration
    stack.enter_scope(get_base_return(), [variable]);
    expect(() => stack.get_variable(variable_name)).toThrow(VariableNotFoundError);

    // Declare variable
    stack.declare_variable(variable_name);
    // Set variable
    const retrieved_value = stack.get_variable(variable_name);
    const value_buffer = new ArrayBuffer(Int32.byte_length);
    new Int32(new DataView(value_buffer)).value = value_to_set;
    retrieved_value.set_value(memory, value_buffer);

    // Retrieve value
    const second_variable = stack.get_variable(variable_name);
    const value_found = new Int32(second_variable.get_value(memory)).value;
    expect(value_found).toBe(value_to_set);

    // Clear memory
    stack.exit_scope(get_void_value());
    expect(memory.middle_memory_free).toBe(maximum_space);
});

test('Retrieving variables from parent scope', () => {
    const memory_size = 128;
    const maximum_space = memory_size - Stack.fixed_byte_length;
    const variable_name = "test_variable";
    const value_to_set = 4;
    // Initialise memory
    LanguageContext.initialise_instance(true);
    const memory = new CMemory(memory_size);
    const stack = memory.stack;

    // Create declaration
    const variable = new VariableDeclaration(get_int_type(), variable_name);
    // Create scope with variable
    stack.enter_scope(get_base_return(), [variable]);
    stack.declare_variable(variable_name);
    stack.enter_scope(get_base_return(), []);
    // Set value from child scope
    const retrieved_value = stack.get_variable(variable_name);
    const value_buffer = new ArrayBuffer(Int32.byte_length);
    new Int32(new DataView(value_buffer)).value = value_to_set;
    retrieved_value.set_value(memory, value_buffer);
    // Exit scope
    stack.exit_scope(get_void_value());

    // Retrieve value from parent scope
    const second_variable = stack.get_variable(variable_name);
    const value_found = new Int32(second_variable.get_value(memory)).value;
    expect(value_found).toBe(value_to_set);

    // Clear memory
    stack.exit_scope(get_void_value());
    expect(memory.middle_memory_free).toBe(maximum_space);
});