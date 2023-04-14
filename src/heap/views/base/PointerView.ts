/**
 * Pointer
 *
 * Represents a reference to a value anywhere within the heap
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import {SegmentationFaultError} from "../../RestrictedHeap";
import LanguageContext from "../../../global_context/LanguageContext";
import Int32 from "../data/Int32";

/**
 * Represents a reference to a value anywhere within the heap
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>4 bytes - the address within the heap</li>
 * </ul>
 */
export default class PointerView {
    private static readonly address_offset = 0;
    private static get address_length() { return LanguageContext.pointer_size }
    private readonly overwrite_protection: boolean;
    private data: HeapDataView;

    private constructor(data: HeapDataView, overwrite_protection: boolean) {
        this.overwrite_protection = overwrite_protection;
        this.data = data;
    }

    /**
     * Gets the number of bytes used to represent a Pointer
     */
    public static get byte_length(): number {
        return PointerView.address_length;
    }

    public get address_view(): Int32 {
        return new Int32(this.data.subset(PointerView.address_offset, PointerView.address_length));
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

    /**
     * Allocates a pointer within the given heap view that cannot overwrite any protection values
     * @param view The view used to change the heap values
     * @param address The address to store for the pointer
     */
    public static allocate_value(view: HeapDataView, address: number);

    /**
     * Allocates a pointer within the given heap view
     * @param view The view used to change the heap values
     * @param address The address to store for the pointer
     * @param overwrite_protection Whether to overwrite any protection when setting the address
     */
    public static allocate_value(view: HeapDataView, address: number, overwrite_protection: boolean);

    public static allocate_value(view: HeapDataView, address: number, overwrite_protection?: boolean): PointerView {
        // Set default value for overwriting protection
        if (overwrite_protection === undefined) {
            overwrite_protection = false;
        }
        const pointer = new PointerView(view, overwrite_protection);
        // Ensure the data is not already protected
        if (!view.is_not_protected(0, PointerView.byte_length)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set address
        pointer.address = address;
        // Return pointer
        return pointer;
    }

    /**
     * Initialises a new Pointer view from the given view of the heap without the ability to overwrite any protected
     * values
     * @param view The view for the EmptyMalloc to build from
     */
    public static from_existing(view: HeapDataView);

    /**
     * Initialises a new Pointer view from the given view of the heap
     * @param view The view for the EmptyMalloc to build from
     * @param overwrite_protection Whether to overwrite any protection when setting the address
     */
    public static from_existing(view: HeapDataView, overwrite_protection: boolean);

    public static from_existing(view: HeapDataView, overwrite_protection?: boolean): PointerView {
        // Set default value for overwriting protection
        if (overwrite_protection === undefined) {
            overwrite_protection = false;
        }
        return new PointerView(view, overwrite_protection);
    }
}