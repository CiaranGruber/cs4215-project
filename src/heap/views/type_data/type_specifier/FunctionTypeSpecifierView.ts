/**
 * FunctionTypeSpecifierView
 *
 * Represents the information for a function type specifier within the C memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import UInt16 from "../../../../data_views/UInt16";
import HeapDataView from "../../../HeapDataView";
import {FunctionTypeSpecifier} from "../../../../type_descriptions/type_specifier/TypeSpecifier";
import TypeInformation from "../../../../type_descriptions/TypeInformation";
import TypeInfoView from "../TypeInfoView";
import {SegmentationFaultError} from "../../../RestrictedHeap";

/**
 * Represents the information used for a built-in type specifier
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>2 bytes - The size needed to store the return type</li>
 * </ul>
 */
export default class FunctionTypeSpecifierView {
    private static readonly return_type_size_offset = 0;
    private static readonly return_type_size_length = UInt16.byte_length;
    private static readonly return_type_offset = FunctionTypeSpecifierView.return_type_size_offset +
        FunctionTypeSpecifierView.return_type_size_length;
    private data: HeapDataView;

    private constructor(data: HeapDataView) {
        this.data = data;
    }

    /**
     * Gets the number of bytes used to represent a BuiltInTypeSpecifierView
     */
    public static get fixed_byte_length(): number {
        return this.return_type_size_length;
    }

    /**
     * Gets the byte length of the function type specifier
     */
    public get byte_length(): number {
        return FunctionTypeSpecifierView.fixed_byte_length + this.return_type_size;
    }

    private get return_type_size_view(): UInt16 {
        return new UInt16(this.data.subset(FunctionTypeSpecifierView.return_type_size_offset,
            FunctionTypeSpecifierView.return_type_size_length), true);
    }

    private get return_type_size(): number {
        return this.return_type_size_view.value;
    }

    private set return_type_size(new_size: number) {
        this.return_type_size_view.value = new_size;
    }

    private get return_type_view(): HeapDataView {
        return this.data.subset(FunctionTypeSpecifierView.return_type_offset, this.return_type_size);
    }

    /**
     * Gets the return type of the function
     */
    public get return_type(): TypeInformation {
        return TypeInfoView.from_existing(this.return_type_view).type_information;
    }

    /**
     * Allocates an environment in the given heap view
     * @param view The view used to change the heap values
     * @param type_specifier The type specifier
     */
    public static allocate_value(view: HeapDataView, type_specifier: FunctionTypeSpecifier): FunctionTypeSpecifierView {
        const function_specifier_view = new FunctionTypeSpecifierView(view);
        // Get the total size
        const type_info_size = TypeInfoView.size_required(type_specifier.return_type);
        // Ensure the data is not already protected
        if (!view.is_not_protected(0, FunctionTypeSpecifierView.fixed_byte_length + type_info_size)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set the specifier reference
        function_specifier_view.return_type_size = type_info_size;
        TypeInfoView.allocate_value(function_specifier_view.return_type_view, type_specifier.return_type);
        // Protect built-in type specifier
        view.protect(0, type_info_size);
        return function_specifier_view;
    }

    /**
     * Gets the size required to store a function type specifier
     * @param type_specifier The type specifier
     */
    public static size_required(type_specifier: FunctionTypeSpecifier): number {
        return FunctionTypeSpecifierView.fixed_byte_length + TypeInfoView.size_required(type_specifier.return_type);
    }

    /**
     * Initialises a new FunctionTypeSpecifierView from an existing value
     * @param view The view for the FunctionTypeSpecifierView to build from
     */
    public static from_existing(view: HeapDataView): FunctionTypeSpecifierView {
        return new FunctionTypeSpecifierView(view);
    }
}