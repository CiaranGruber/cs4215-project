import CMemory, {OutOfMemoryError} from "../../heap/CMemory";
import MallocVar from "../../heap/views/MallocVar";

test('Getting the heap size', () => {
    const heap: CMemory = new CMemory(100);
    expect(heap.size).toBe(100);
    expect(heap.middle_memory_free).toBe(100);
});

test('Allocating a value on the stack', () => {
    const heap: CMemory = new CMemory(100);
    heap.allocate_on_stack(20);
    expect(heap.middle_memory_free).toBe(80);
    // Test Out of Memory due to space required to store EmptyMalloc var
    expect(() => heap.allocate_on_stack(80)).toThrow(OutOfMemoryError);
});

test('Deallocating a value on the stack', () => {
    const heap: CMemory = new CMemory(128);
    heap.allocate_on_stack(32);
    heap.allocate_on_stack(32);
    heap.deallocate_from_stack(64);
    expect(heap.middle_memory_free).toBe(128);
});

test('Allocating a value on the heap', () => {
    const heap_size = 128;
    const value_size = 4;
    const heap: CMemory = new CMemory(heap_size);
    // Allocate once
    let view = heap.malloc(value_size);
    // Ensure space usage is accurate
    expect(heap.middle_memory_free).toBe(heap_size - value_size - MallocVar.fixed_byte_length);
    // Ensure all data is available for consumption
    expect(view.is_not_protected(0, view.byte_length)).toBeTruthy();
    // Test second allocation
    view = heap.malloc(4);
    expect(heap.middle_memory_free).toBe(heap_size - (value_size + MallocVar.fixed_byte_length) * 2);
    // Ensure all data is available for consumption
    expect(view.is_not_protected(0, view.byte_length)).toBeTruthy();
});

test('Freeing a value from the heap', () => {
    const heap_size = 128;
    const value_size = 1;
    const heap: CMemory = new CMemory(heap_size);
    // Allocate and free memory
    let view = heap.malloc(value_size);
    heap.free(view.byte_offset);
    expect(heap.middle_memory_free).toBe(heap_size);
});

test('Freeing values in the heap with basic merge', () => {
    const heap_size = 128;
    const value_size = 4;
    const heap: CMemory = new CMemory(heap_size);
    // Test allocating and deallocating
    let view0 = heap.malloc(value_size);
    let view1 = heap.malloc(value_size);
    heap.free(view1.byte_offset);
    expect(heap.middle_memory_free).toBe(heap_size - value_size - MallocVar.fixed_byte_length);
    heap.free(view0.byte_offset);
    expect(heap.middle_memory_free).toBe(heap_size);
});

test('Freeing values in the heap with complex merge', () => {
    const heap_size = 128;
    const value_size = 2;
    const heap: CMemory = new CMemory(heap_size);
    // Test complex allocation/deallocation instructions
    let view0 = heap.malloc(value_size);
    let view1 = heap.malloc(value_size * 3);
    let view2 = heap.malloc(value_size);
    const heap_free = heap.middle_memory_free;
    heap.free(view0.byte_offset);
    heap.free(view2.byte_offset);
    heap.free(view1.byte_offset);
    // All should allocate within the middle memory
    for (let i = 0; i < 4; i++) {
        const view3 = heap.malloc(value_size * 4);
        heap.free(view3.byte_offset);
    }
    expect(heap.middle_memory_free).toBe(heap_free);
});