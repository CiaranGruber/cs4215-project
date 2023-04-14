/**
 * Int32
 *
 * Represents a Int32 for use by the evaluator within C Memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

/**
 * Represents a BigInt32 for use by the evaluator within C Memory
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>4 bytes - The number stored</li>
 * </ul>
 */
export default class Int32 {
    public static readonly byte_length = 4;
    private readonly data: DataView;

    /**
     * Initialises a new C Int32 viewer without the ability to overwrite protected values
     * @param view The view of the data with the Int32
     */
    public constructor(view: DataView) {
        this.data = view;
    }

    /**
     * Gets the value associated with the view
     */
    public get value(): number {
        return this.data.getInt32(0);
    }

    /**
     * Sets the value associated with the view
     * @param new_value The new value to set
     */
    public set value(new_value: number) {
        this.data.setInt32(0, new_value);
    }
}