import RestrictedHeap, {SegmentationFaultError} from "../../heap/RestrictedHeap";

test('Editing a non-editable Heap value', () => {
    // Set up new heap with editable section
    const heap: RestrictedHeap = new RestrictedHeap(11, true);
    // Attempt to set a value not within the editable section
    const value = new DataView(new ArrayBuffer(1));
    expect(() => heap.set_value(0, value.buffer)).toThrow(SegmentationFaultError);
});

test('Editing an editable Heap value', () => {
    // Set up new heap with editable section
    const heap: RestrictedHeap = new RestrictedHeap(11, true);
    const offset = 2;
    const length = 3;
    heap.set_protected(offset, false, length);
    // Attempt to set a value within the editable section
    const value = new DataView(new ArrayBuffer(1));
    for (let i = offset; i < offset + length; i++) {
        expect(() => heap.set_value(i, value.buffer)).not.toThrow(SegmentationFaultError);
    }
});

test('Setting and getting a value in the heap', () => {
    // Set up heap
    const heap: RestrictedHeap = new RestrictedHeap(11, true);
    const offset = 2;
    heap.set_protected(offset, false, 2);
    // Get the value to set
    const value = new ArrayBuffer(2);
    new DataView(value).setUint16(0, 42200);
    // Set value within the heap
    heap.set_value(offset, value);
    // Test if the value was set
    const data_section = heap.get_value(offset, 2);
    expect(data_section.referenced_buffer).toStrictEqual(value);
});

test('Setting a heap value to be editable', () => {
    const heap: RestrictedHeap = new RestrictedHeap(11);
    heap.set_protected(2, true, 3);
    expect(heap.is_protected(2, 3)).toBeTruthy();
});

test('Value range is fully protected', () => {
    const heap: RestrictedHeap = new RestrictedHeap(11, true);
    expect(heap.is_protected(2, 3)).toBeTruthy();
    heap.set_protected(3, false);
    expect(heap.is_protected(2, 3)).toBeFalsy();
});

test('Value range is fully editable', () => {
    const heap: RestrictedHeap = new RestrictedHeap(11);
    expect(heap.is_not_protected(2, 3)).toBeTruthy();
    heap.set_protected(3, true);
    expect(heap.is_not_protected(2, 3)).toBeFalsy();
});