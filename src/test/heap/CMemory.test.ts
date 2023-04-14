import CMemory, {OutOfMemoryError} from "../../heap/CMemory";
import MallocVar from "../../heap/views/base/MallocVar";
import Stack from "../../heap/views/runtime_stack/Stack";
import LanguageContext from "../../global_context/LanguageContext";

test('Getting the heap size', () => {
    LanguageContext.initialise_instance(true);
    const memory_size = 100;
    const memory: CMemory = new CMemory(memory_size);
    expect(memory.size).toBe(memory_size);
    expect(memory.middle_memory_free).toBe(memory_size - Stack.fixed_byte_length);
});

test('Allocating a value on the stack', () => {
    LanguageContext.initialise_instance(true);
    const memory_size = 100;
    const variable_size = 20;
    const memory: CMemory = new CMemory(memory_size);
    memory.allocate_on_stack(variable_size);
    expect(memory.middle_memory_free).toBe(memory_size - Stack.fixed_byte_length - variable_size);
    // Test Out of Memory due to space required to store EmptyMalloc var
    expect(() => memory.allocate_on_stack(memory_size - Stack.fixed_byte_length - variable_size)).toThrow(OutOfMemoryError);
});

test('Deallocating a value on the stack', () => {
    LanguageContext.initialise_instance(true);
    const memory_size = 128;
    const value_size = 32;
    const memory: CMemory = new CMemory(memory_size);
    memory.allocate_on_stack(value_size);
    memory.allocate_on_stack(value_size);
    memory.deallocate_from_stack(value_size * 2);
    expect(memory.middle_memory_free).toBe(memory_size - Stack.fixed_byte_length);
});

test('Allocating a value on the heap', () => {
    LanguageContext.initialise_instance(true);
    const memory_size = 128;
    const expected_mem_size = memory_size - Stack.fixed_byte_length;
    const value_size = 8;
    const memory: CMemory = new CMemory(memory_size);
    // Allocate once
    let view = memory.malloc(value_size);
    // Ensure space usage is accurate
    expect(memory.middle_memory_free).toBe(expected_mem_size - value_size - MallocVar.fixed_byte_length);
    // Ensure all data is available for consumption
    expect(view.is_not_protected(0, view.byte_length)).toBeTruthy();
    // Test second allocation
    view = memory.malloc(value_size);
    expect(memory.middle_memory_free).toBe(expected_mem_size - (value_size + MallocVar.fixed_byte_length) * 2);
    // Ensure all data is available for consumption
    expect(view.is_not_protected(0, view.byte_length)).toBeTruthy();
});

test('Freeing a value from the heap', () => {
    LanguageContext.initialise_instance(true);
    const memory_size = 128;
    const value_size = 1;
    const expected_mem_size = memory_size - Stack.fixed_byte_length;
    const memory: CMemory = new CMemory(memory_size);
    // Allocate and free memory
    let view = memory.malloc(value_size);
    memory.free(view.byte_offset);
    expect(memory.middle_memory_free).toBe(expected_mem_size);
});

test('Freeing values in the heap with basic merge', () => {
    LanguageContext.initialise_instance(true);
    const memory_size = 128;
    const value_size = 8;
    const expected_mem_size = memory_size - Stack.fixed_byte_length;
    const memory: CMemory = new CMemory(memory_size);
    // Test allocating and deallocating
    let view0 = memory.malloc(value_size);
    let view1 = memory.malloc(value_size);
    memory.free(view1.byte_offset);
    expect(memory.middle_memory_free).toBe(expected_mem_size - value_size - MallocVar.fixed_byte_length);
    memory.free(view0.byte_offset);
    expect(memory.middle_memory_free).toBe(expected_mem_size);
});

test('Freeing values in the heap with complex merge', () => {
    LanguageContext.initialise_instance(true);
    const memory_size = 128;
    const value_size = 2;
    const memory: CMemory = new CMemory(memory_size);
    // Test complex allocation/deallocation instructions
    let view0 = memory.malloc(value_size);
    let view1 = memory.malloc(value_size * 3);
    let view2 = memory.malloc(value_size);
    const heap_free = memory.middle_memory_free;
    memory.free(view0.byte_offset);
    memory.free(view2.byte_offset);
    memory.free(view1.byte_offset);
    // All should allocate within the middle memory
    for (let i = 0; i < 4; i++) {
        const view3 = memory.malloc(value_size * 4);
        memory.free(view3.byte_offset);
    }
    expect(memory.middle_memory_free).toBe(heap_free);
});