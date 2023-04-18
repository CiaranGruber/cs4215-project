import GlobalContext from "../../../../global_context/GlobalContext";
import CMemory from "../../../../heap/CMemory";
import TypeInformation from "../../../../type_descriptions/TypeInformation";
import {TypeSpecDeclarationSpecifier} from "../../../../type_descriptions/DeclarationSpecifier";
import {BuiltInTypeSpecifierEnum} from "../../../../type_descriptions/type_specifier/TypeSpecifier";
import {
    BuiltInTypeSpecifierType
} from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import DeclarationSpecification from "../../../../type_descriptions/DeclarationSpecification";
import VoidConverter from "../../../../converter/VoidConverter";
import IntConverter from "../../../../converter/IntConverter";
import ShortConverter from "../../../../converter/ShortConverter";

function get_basic_type(built_in_specifier: BuiltInTypeSpecifierType): TypeInformation {
    const void_specifier = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(built_in_specifier));
    const declaration_specification = DeclarationSpecification.from_specifiers([void_specifier])
    return new TypeInformation(declaration_specification, []);
}

test('Pushing and pulling from stash', () => {
    // Initialise memory
    GlobalContext.initialise_instance(false);
    const memory_size = 128;
    const memory = new CMemory(memory_size);
    const stack = memory.stack;
    // Add value to stash
    stack.enter_block([]);
    stack.stash.push(new VoidConverter().convert_to_c());
    // Compare peek/popped value
    const value1 = stack.stash.peek();
    expect(stack.stash.is_empty).toBeFalsy();
    const value2 = stack.stash.pop();
    expect(stack.stash.is_empty).toBeTruthy();
    expect(value1).toStrictEqual(value2);
    // Exit scope
    stack.exit_scope();
});

test('Returned value appearing on stash', () => {
    // Initialise memory
    GlobalContext.initialise_instance(false);
    const memory_size = 128;
    const memory = new CMemory(memory_size);
    const stack = memory.stack;
    // Enter scope and return value
    stack.enter_block([]);
    stack.enter_call(get_basic_type(BuiltInTypeSpecifierType.VOID), []);
    stack.stash.push(new VoidConverter().convert_to_c());
    // Return empty value
    stack.exit_scope();
    expect(stack.is_empty).toBeFalsy();
    // Check value returned
    const value = stack.stash.pop();
    expect(value).toStrictEqual(new VoidConverter().convert_to_c());
});

test('Default value appearing on stash on return', () => {
    // Initialise memory
    GlobalContext.initialise_instance(false);
    const memory_size = 128;
    const memory = new CMemory(memory_size);
    const stack = memory.stack;
    // Enter scope and return value
    stack.enter_block([]);
    stack.enter_call(get_basic_type(BuiltInTypeSpecifierType.INT), []);
    // Return empty value
    stack.exit_scope();
    expect(stack.is_empty).toBeFalsy();
    // Check value returned
    const value = stack.stash.pop();
    expect(value).toStrictEqual(new IntConverter().convert_to_c(0));
});

test('Casting down return type before putting on stash', () => {
    // Initialise memory
    GlobalContext.initialise_instance(false);
    const memory_size = 128;
    const memory = new CMemory(memory_size);
    const stack = memory.stack;
    // Enter scope and return value
    stack.enter_block([]);
    stack.enter_call(get_basic_type(BuiltInTypeSpecifierType.SHORT), []);
    // Return an int value
    stack.stash.push(new IntConverter().convert_to_c(156709));
    stack.exit_scope();
    // Check returned value
    const return_val = stack.stash.pop();
    const expected = new ShortConverter().convert_to_c(25637);
    expect(return_val).toStrictEqual(expected);
});

test('Casting up return type before putting on stash', () => {
    // Initialise memory
    GlobalContext.initialise_instance(false);
    const memory_size = 128;
    const memory = new CMemory(memory_size);
    const stack = memory.stack;
    // Enter scope and return value
    stack.enter_block([]);
    stack.enter_call(get_basic_type(BuiltInTypeSpecifierType.INT), []);
    // Return a short value
    stack.stash.push(new ShortConverter().convert_to_c(25637));
    stack.exit_scope();
    // Check value on stash
    const return_val = stack.stash.pop();
    const expected = new IntConverter().convert_to_c(25637);
    expect(return_val).toStrictEqual(expected);
});