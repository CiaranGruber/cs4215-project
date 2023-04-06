import RestrictedHeap from "../../heap/RestrictedHeap";
import HeapDataView from "../../heap/HeapDataView";

test('Getting a value', () => {
    const heap = new RestrictedHeap(100);
    const view = new HeapDataView(heap, 4, 2);
    // Set value in heap
    const value = new ArrayBuffer(2);
    new DataView(value).setUint16(0, 32321);
    heap.set_value(4, value);
    // Test what the value is
    const view_value = view.get_value(1, 1);
    expect(view_value.referenced_buffer).toStrictEqual(value.slice(1));
});

test('Setting a value', () => {
    const heap = new RestrictedHeap(100);
    const view = new HeapDataView(heap, 4, 2);
    // Set value in heap
    const value = new ArrayBuffer(1);
    new DataView(value).setUint8(0, 32321);
    view.set_value(value, 1);
    // Test what the value is
    const heap_value = heap.get_value(5, 1);
    expect(heap_value.referenced_buffer).toStrictEqual(value);
});

test('Protecting a value', () => {
    const heap = new RestrictedHeap(100);
    const view = new HeapDataView(heap, 4, 5);
    view.protect(1, 3);
    expect(heap.is_protected(5, 3)).toBeTruthy();
});

test('Testing if a value is fully protected', () => {
    const heap = new RestrictedHeap(100);
    const view = new HeapDataView(heap, 4, 5);
    heap.set_protected(5, true, 3);
    expect(view.is_protected(1, 3)).toBeTruthy();
    expect(view.is_protected(1, 4)).toBeFalsy();
});

test('Testing if a value is not fully protected', () => {
    const heap = new RestrictedHeap(100, true);
    const view = new HeapDataView(heap, 4, 5);
    heap.set_protected(5, false, 3);
    expect(view.is_not_protected(1, 3)).toBeTruthy();
    expect(view.is_not_protected(1, 4)).toBeFalsy();
});