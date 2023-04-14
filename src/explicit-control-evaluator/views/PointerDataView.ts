/**
 * PointerDataView
 *
 * Represents a reference to a value anywhere within the heap
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import LanguageContext from "../../global_context/LanguageContext";
import DataViewSubset from "./DataViewSubset";
import Int32 from "./data/Int32";
import ImmutableDataView from "../../heap/ImmutableDataView";

/**
 * Represents a reference to a value anywhere within the heap
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>4 bytes - the address within the heap</li>
 * </ul>
 */
export default class PointerDataView {
    private static readonly address_offset = 0;
    private static get address_length() { return LanguageContext.pointer_size }
    private data: DataViewSubset;

    public constructor(data: DataView) {
        this.data = new DataViewSubset(data, 0, PointerDataView.byte_length);
    }

    /**
     * Gets the number of bytes used to represent a Pointer
     */
    public static get byte_length(): number {
        return PointerDataView.address_length;
    }

    public get view(): ImmutableDataView {
        return new ImmutableDataView(this.data);
    }

    private get address_view(): Int32 {
        return new Int32(this.data.subset(PointerDataView.address_offset, PointerDataView.address_length));
    }

    /**
     * Gets the address in the heap that the Pointer points to
     */
    public get address(): number {
        return this.address_view.value;
    }

    /**
     * Sets the address of the value in the heap that the Pointer points to
     * @param address The address to set
     */
    public set address(address: number) {
        this.address_view.value = address;
    }
}