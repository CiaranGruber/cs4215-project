/**
 * BigInt64
 *
 * Represents a BigInt64 for use by the evaluator within C Memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

/**
 * Represents a BigInt32 for use by the evaluator within C Memory
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>8 bytes - The number stored</li>
 * </ul>
 */
export default class BigInt64 {
    public static readonly byte_length = 8;
    private readonly data: DataView;

    /**
     * Initialises a new C BigInt64 viewer without the ability to overwrite protected values
     * @param view The view of the data with the BigInt64
     */
    public constructor(view: DataView) {
        this.data = view;
    }

    /**
     * Gets the value associated with the view
     */
    public get value(): bigint {
        return this.data.getBigInt64(0);
    }

    /**
     * Sets the value associated with the view
     * @param new_value The new value to set
     */
    public set value(new_value: bigint) {
        this.data.setBigInt64(0, new_value);
    }
}