import CMemory from "../../../../heap/CMemory";
import Stack, {VariableNotFoundError} from "../../../../heap/views/runtime_stack/Stack";
import GlobalContext from "../../../../global_context/GlobalContext";
import TypeInformation from "../../../../type_descriptions/TypeInformation";
import {TypeSpecDeclarationSpecifier} from "../../../../type_descriptions/DeclarationSpecifier";
import {BuiltInTypeSpecifierEnum} from "../../../../type_descriptions/type_specifier/TypeSpecifier";
import {
    BuiltInTypeSpecifierType
} from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import DeclarationSpecification from "../../../../type_descriptions/DeclarationSpecification";
import VariableDeclaration from "../../../../explicit-control-evaluator/VariableDeclaration";
import Int32 from "../../../../data_views/Int32";

function get_base_return(): TypeInformation {
    const void_specifier = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.VOID));
    const declaration_specification = DeclarationSpecification.from_specifiers([void_specifier]);
    return new TypeInformation(declaration_specification, []);
}

function get_int_type(): TypeInformation {
    const int_specifier = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.INT));
    const declaration_specification = DeclarationSpecification.from_specifiers([int_specifier]);
    return new TypeInformation(declaration_specification, []);
}

test('Storing and retrieving variables', () => {
    const memory_size = 128;
    const maximum_space = memory_size - Stack.fixed_byte_length;
    const variable_name = "test_variable";
    const value_to_set = 4;
    // Initialise memory
    GlobalContext.initialise_instance(true);
    const memory = new CMemory(memory_size);
    const stack = memory.stack;

    // Create declaration
    const variable = new VariableDeclaration(variable_name, get_int_type());
    // Enter scope with declaration
    stack.enter_block([variable]);
    expect(() => stack.get_variable(variable_name)).toThrow(VariableNotFoundError);

    // Declare variable
    stack.declare_variable(variable_name, memory);
    // Set variable
    const retrieved_value = stack.get_variable(variable_name);
    retrieved_value.set_value(memory, Int32.create_buffer(value_to_set));

    // Retrieve value
    const second_variable = stack.get_variable(variable_name);
    const value_found = new Int32(second_variable.get_value(memory)).value;
    expect(value_found).toBe(value_to_set);

    // Clear memory
    stack.exit_scope(memory);
    expect(memory.middle_memory_free).toBe(maximum_space);
});

test('Retrieving variables from parent scope', () => {
    const memory_size = 128;
    const maximum_space = memory_size - Stack.fixed_byte_length;
    const variable_name = "test_variable";
    const value_to_set = 5;
    // Initialise memory
    GlobalContext.initialise_instance(true);
    const memory = new CMemory(memory_size);
    const stack = memory.stack;

    // Create declaration
    const variable = new VariableDeclaration(variable_name, get_int_type());
    // Create scope with variable
    stack.enter_block([variable]);
    stack.declare_variable(variable_name, memory);
    stack.enter_call(get_base_return(), []);
    // Set value from child scope
    const retrieved_value = stack.get_variable(variable_name);
    retrieved_value.set_value(memory, Int32.create_buffer(value_to_set));
    // Exit scope
    stack.exit_scope(memory);

    // Retrieve value from parent scope
    const second_variable = stack.get_variable(variable_name);
    const value_found = new Int32(second_variable.get_value(memory)).value;
    expect(value_found).toBe(value_to_set);

    // Clear memory
    stack.exit_scope(memory);
    expect(memory.middle_memory_free).toBe(maximum_space);
});