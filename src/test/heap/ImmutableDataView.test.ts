import ImmutableDataView from "../../heap/ImmutableDataView";

test('Getting the referenced buffer', () => {
    const value = 38296;
    // Set up the immutable data view
    const base_data_view = new DataView(new ArrayBuffer(5), 2, 2);
    base_data_view.setUint16(0, value);
    const immutable_data_view = new ImmutableDataView(base_data_view);
    // Get the expected value
    const expected = new ArrayBuffer(2);
    new DataView(expected).setUint16(0, value);
    // Test equality
    expect(immutable_data_view.referenced_buffer).toStrictEqual(expected);
});