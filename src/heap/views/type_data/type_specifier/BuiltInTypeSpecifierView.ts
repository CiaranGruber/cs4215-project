/**
 * BuiltInTypeSpecifierView
 *
 * Represents the information for a built-in type specifier within the C memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../../HeapDataView";
import BuiltInTypeMultiset from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInTypeMultiset";
import BuiltInMultisetManager from "../../../../type_descriptions/type_specifier/built_in_types/BuiltInMultisetManager";
import {BuiltInTypeSpecifier} from "../../../../type_descriptions/type_specifier/TypeSpecifier";
import {SegmentationFaultError} from "../../../RestrictedHeap";
import UInt8 from "../../../../data_views/UInt8";

/**
 * Represents the information used for a built-in type specifier
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>1 byte - The index of the built-in multiset as according to the multiset manager</li>
 * </ul>
 */
export default class BuiltInTypeSpecifierView {
    private static readonly specifier_index_offset = 0;
    private static readonly specifier_index_length = UInt8.byte_length;
    private data: HeapDataView;

    private constructor(data: HeapDataView) {
        this.data = data;
    }

    /**
     * Gets the number of bytes used to represent a BuiltInTypeSpecifierView
     */
    public static get byte_length(): number {
        return this.specifier_index_length;
    }

    private get multiset_view(): UInt8 {
        return new UInt8(this.data.subset(BuiltInTypeSpecifierView.specifier_index_offset,
            BuiltInTypeSpecifierView.specifier_index_length), true);
    }

    /**
     * Gets the multiset used to represent the instance from the multiset manager
     */
    public get multiset(): BuiltInTypeMultiset {
        return BuiltInMultisetManager.get_multiset(this.multiset_view.value);
    }

    private set multiset(multiset: BuiltInTypeMultiset) {
        this.multiset_view.value = BuiltInMultisetManager.get_multiset_index(multiset);
    }

    /**
     * Allocates a built-in type specifier in the given heap view
     * @param view The view used to change the heap values
     * @param type_specifier The type specifier
     */
    public static allocate_value(view: HeapDataView, type_specifier: BuiltInTypeSpecifier): BuiltInTypeSpecifierView {
        const type_info_view = new BuiltInTypeSpecifierView(view);
        // Ensure the explicit_control_evaluator is not already protected
        if (!view.is_not_protected(0, this.byte_length)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set the specifier reference
        type_info_view.multiset = type_specifier.type_multiset;
        // Protect built-in type specifier
        view.protect(0, this.byte_length);
        return type_info_view;
    }

    /**
     * Initialises a new BuiltInTypeSpecifierView from an existing value
     * @param view The view for the BuiltInTypeSpecifierView to build from
     */
    public static from_existing(view: HeapDataView): BuiltInTypeSpecifierView {
        return new BuiltInTypeSpecifierView(view);
    }
}