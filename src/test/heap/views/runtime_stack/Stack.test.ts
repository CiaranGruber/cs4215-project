import CMemory from "../../../../heap/CMemory";
import Stack from "../../../../heap/views/runtime_stack/Stack";
import TypeInformation from "../../../../type_descriptions/TypeInformation";
import DeclarationSpecification from "../../../../type_descriptions/DeclarationSpecification";
import {TypeSpecDeclarationSpecifier} from "../../../../type_descriptions/DeclarationSpecifier";
import {BuiltInTypeSpecifierEnum} from "../../../../type_descriptions/type_specifier/TypeSpecifier";
import {
    BuiltInTypeSpecifierType
} from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import CValue from "../../../../explicit-control-evaluator/CValue";
import LanguageContext from "../../../../global_context/LanguageContext";

function get_base_return(): TypeInformation {
    const void_specifier = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(BuiltInTypeSpecifierType.VOID));
    const declaration_specification = DeclarationSpecification.from_specifiers([void_specifier])
    return new TypeInformation(declaration_specification, [], false);
}

function get_void_value(): CValue {
    return new CValue(false, get_base_return(), new ArrayBuffer(0));
}

test('Initialising the initial stack', () => {
    LanguageContext.initialise_instance(false);
    const memory_size = 128;
    const memory = new CMemory(memory_size);
    const stack = memory.stack;
    stack.enter_scope(get_base_return(), []);
    stack.exit_scope(get_void_value());
    expect(memory.middle_memory_free).toBe(memory_size - Stack.fixed_byte_length);
});

test('Initialising multiple frames', () => {
    LanguageContext.initialise_instance(false);
    const memory_size = 128;
    const memory = new CMemory(memory_size);
    const stack = memory.stack;
    stack.enter_scope(get_base_return(), []);
    stack.enter_scope(get_base_return(), []);
    stack.enter_scope(get_base_return(), []);
    stack.exit_scope(get_void_value());
    stack.exit_scope(get_void_value());
    stack.exit_scope(get_void_value());
    expect(memory.middle_memory_free).toBe(memory_size - Stack.fixed_byte_length);
});