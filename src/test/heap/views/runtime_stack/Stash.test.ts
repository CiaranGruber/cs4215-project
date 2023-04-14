import LanguageContext from "../../../../global_context/LanguageContext";
import CMemory from "../../../../heap/CMemory";
import TypeInformation from "../../../../type_descriptions/TypeInformation";
import {TypeSpecDeclarationSpecifier} from "../../../../type_descriptions/DeclarationSpecifier";
import {BuiltInTypeSpecifierEnum} from "../../../../type_descriptions/type_specifier/TypeSpecifier";
import {
    BuiltInTypeSpecifierType
} from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import DeclarationSpecification from "../../../../type_descriptions/DeclarationSpecification";
import CValue from "../../../../explicit-control-evaluator/CValue";
import Int32 from "../../../../explicit-control-evaluator/views/data/Int32";
import Int16 from "../../../../explicit-control-evaluator/views/data/Int16";

function get_basic_type(built_in_specifier: BuiltInTypeSpecifierType): TypeInformation {
    const void_specifier = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(built_in_specifier));
    const declaration_specification = DeclarationSpecification.from_specifiers([void_specifier])
    return new TypeInformation(declaration_specification, [], false);
}

function get_void_value(): CValue {
    return new CValue(false, get_basic_type(BuiltInTypeSpecifierType.VOID), new ArrayBuffer(0));
}

function get_int_value(value: number): CValue {
    const int_val = new ArrayBuffer(Int32.byte_length);
    new Int32(new DataView(int_val)).value = value;
    return new CValue(false, get_basic_type(BuiltInTypeSpecifierType.INT), int_val);
}

function get_short_value(value: number): CValue {
    const short_val = new ArrayBuffer(Int16.byte_length);
    new Int16(new DataView(short_val)).value = value;
    return new CValue(false, get_basic_type(BuiltInTypeSpecifierType.SHORT), short_val);
}

test('Pushing and pulling from stash', () => {
    // Initialise memory
    LanguageContext.initialise_instance(false);
    const memory_size = 128;
    const memory = new CMemory(memory_size);
    const stack = memory.stack;
    // Add value to stash
    stack.enter_scope(get_basic_type(BuiltInTypeSpecifierType.VOID), []);
    stack.stash.push(get_void_value());
    // Compare peek/popped value
    const value1 = stack.stash.peek();
    expect(stack.stash.is_empty).toBeFalsy();
    const value2 = stack.stash.pop();
    expect(stack.stash.is_empty).toBeTruthy();
    expect(value1).toStrictEqual(value2);
    // Exit scope
    stack.exit_scope(get_void_value());
});

test('Returned value appearing on stash', () => {
    // Initialise memory
    LanguageContext.initialise_instance(false);
    const memory_size = 128;
    const memory = new CMemory(memory_size);
    const stack = memory.stack;
    // Enter scope and return value
    stack.enter_scope(get_basic_type(BuiltInTypeSpecifierType.VOID), []);
    stack.enter_scope(get_basic_type(BuiltInTypeSpecifierType.VOID), []);
    // Return void value
    stack.exit_scope(get_void_value());
    expect(stack.is_empty).toBeFalsy();
    // Check value returned
    const value = stack.stash.pop();
    expect(value).toStrictEqual(get_void_value());
});

test('Casting down return type before putting on stash', () => {
    // Initialise memory
    LanguageContext.initialise_instance(false);
    const memory_size = 128;
    const memory = new CMemory(memory_size);
    const stack = memory.stack;
    // Enter scope and return value
    stack.enter_scope(get_basic_type(BuiltInTypeSpecifierType.VOID), []);
    stack.enter_scope(get_basic_type(BuiltInTypeSpecifierType.SHORT), []);
    // Exit scope with int
    stack.exit_scope(get_int_value(156709));
    const return_val = stack.stash.pop();
    const expected = get_short_value(25637);
    expect(return_val).toEqual(expected);
});

test('Casting up return type before putting on stash', () => {
    // Initialise memory
    LanguageContext.initialise_instance(false);
    const memory_size = 128;
    const memory = new CMemory(memory_size);
    const stack = memory.stack;
    // Enter scope and return value
    stack.enter_scope(get_basic_type(BuiltInTypeSpecifierType.VOID), []);
    stack.enter_scope(get_basic_type(BuiltInTypeSpecifierType.INT), []);
    // Exit scope with short
    stack.exit_scope(get_short_value(25637));
    const return_val = stack.stash.pop();
    const expected = get_int_value(25637);
    expect(return_val).toEqual(expected);
});