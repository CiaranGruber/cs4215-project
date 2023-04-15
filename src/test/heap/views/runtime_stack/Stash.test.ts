import GlobalContext from "../../../../global_context/GlobalContext";
import CMemory from "../../../../heap/CMemory";
import TypeInformation from "../../../../type_descriptions/TypeInformation";
import {TypeSpecDeclarationSpecifier} from "../../../../type_descriptions/DeclarationSpecifier";
import {BuiltInTypeSpecifierEnum} from "../../../../type_descriptions/type_specifier/TypeSpecifier";
import {
    BuiltInTypeSpecifierType
} from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import DeclarationSpecification from "../../../../type_descriptions/DeclarationSpecification";
import CValue from "../../../../explicit-control-evaluator/CValue";
import Int32 from "../../../../data_views/Int32";
import Int16 from "../../../../data_views/Int16";

function get_basic_type(built_in_specifier: BuiltInTypeSpecifierType): TypeInformation {
    const void_specifier = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(built_in_specifier));
    const declaration_specification = DeclarationSpecification.from_specifiers([void_specifier])
    return new TypeInformation(declaration_specification, []);
}

function get_void_value(): CValue {
    return new CValue(false, get_basic_type(BuiltInTypeSpecifierType.VOID), new ArrayBuffer(0));
}

function get_int_value(value: number): CValue {
    return new CValue(false, get_basic_type(BuiltInTypeSpecifierType.INT), Int32.create_buffer(value));
}

function get_short_value(value: number): CValue {
    return new CValue(false, get_basic_type(BuiltInTypeSpecifierType.SHORT), Int16.create_buffer(value));
}

test('Pushing and pulling from stash', () => {
    // Initialise memory
    GlobalContext.initialise_instance(false);
    const memory_size = 128;
    const memory = new CMemory(memory_size);
    const stack = memory.stack;
    // Add value to stash
    stack.enter_block([]);
    stack.stash.push(get_void_value());
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
    stack.stash.push(get_void_value());
    // Return empty value
    stack.exit_scope();
    expect(stack.is_empty).toBeFalsy();
    // Check value returned
    const value = stack.stash.pop();
    expect(value).toStrictEqual(get_void_value());
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
    expect(value).toStrictEqual(get_int_value(0));
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
    stack.stash.push(get_int_value(156709));
    stack.exit_scope();
    // Check returned value
    const return_val = stack.stash.pop();
    const expected = get_short_value(25637);
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
    stack.stash.push(get_short_value(25637));
    stack.exit_scope();
    // Check value on stash
    const return_val = stack.stash.pop();
    const expected = get_int_value(25637);
    expect(return_val).toStrictEqual(expected);
});