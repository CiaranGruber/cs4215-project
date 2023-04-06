import BitArray from "../../heap/BitArray";

test('Getting the state of a bit in a BitArray', () => {
    // Set up the bit array
    const value: number = 33992
    const data_view: DataView = new DataView(new ArrayBuffer(2));
    const bits_in_data = data_view.byteLength * 8;
    data_view.setUint16(0, value);
    const bit_array = new BitArray(data_view);
    // Checks bits
    for (let bit = 0; bit < bits_in_data; bit++) {
        const is_set = (data_view.getUint16(0) & (1 << (bits_in_data - 1 - bit))) != 0;
        expect(bit_array.is_set(bit)).toBe(is_set);
    }
});

test('Setting a bit in a BitArray', () => {
    // Set up the bit array
    const heap: BitArray = new BitArray(new DataView(new ArrayBuffer(2)));
    // Set bits within the bit array
    heap.set_bit(3);
    heap.set_bit(8);
    heap.clear_bit(3);
    heap.set_bit(3);
    // Ensure the correct bits are set
    for (let i = 0; i < heap.byte_length * 8; i++) {
        if (i == 3 || i == 8) {
            expect(heap.is_set(i)).toBeTruthy();
        } else {
            expect(heap.is_set(i)).toBeFalsy();
        }
    }
});