/**
 * TypeSpecifierView
 *
 * Represents the type specifier information within the C memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import CMemoryTag, {CMemoryTagValue} from "../../base/CMemoryTag";
import HeapDataView from "../../../HeapDataView";
import {SegmentationFaultError} from "../../../RestrictedHeap";
import TypeSpecifier, {
    BuiltInTypeSpecifier,
    InvalidSpecifierError,
    TypeSpecifierType
} from "../../../../type_descriptions/type_specifier/TypeSpecifier";
import BuiltInTypeSpecifierView from "./BuiltInTypeSpecifierView";
import UInt16 from "../../../../data_views/UInt16";

/**
 * Represents a set of type information
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>CMemoryTag.byte_length - The tag representing the type (Eg. Reference/Struct/Enum)</li>
 *     <li>2 bytes - The size of the specifier</li>
 *     <li>x bytes - The type specifier information</li>
 * </ul>
 */
export default class TypeSpecifierView {
    private static readonly tag_offset = 0;
    private static readonly size_offset = CMemoryTag.byte_length;
    private static readonly size_length = UInt16.byte_length;
    private static readonly specifier_info_offset = TypeSpecifierView.size_offset + TypeSpecifierView.size_length;
    private data: HeapDataView;

    private constructor(data: HeapDataView) {
        this.data = data;
    }

    /**
     * Gets the fixed size of an TypeSpecifier value
     */
    public static get fixed_byte_length(): number {
        return CMemoryTag.byte_length + this.size_length;
    }

    /**
     * Initialises a new TypeSpecifier instance to represent the given value
     */
    public get type_specifier(): TypeSpecifier {
        switch (this.tag) {
            case CMemoryTagValue.BUILT_IN_TYPE:
                return new BuiltInTypeSpecifier(BuiltInTypeSpecifierView.from_existing(this.specifier_info_view).multiset);
        }
    }

    private get tag_view(): HeapDataView {
        return this.data.subset(TypeSpecifierView.tag_offset, CMemoryTag.byte_length);
    }

    /**
     * Gets the tag representing the type specifier
     */
    private get tag(): CMemoryTagValue {
        return CMemoryTag.from_existing(this.tag_view).tag;
    }

    private get size_view(): UInt16 {
        return new UInt16(this.data.subset(TypeSpecifierView.size_offset, TypeSpecifierView.size_length),
            true);
    }

    private get size(): number {
        return this.size_view.value;
    }

    private set size(new_size: number) {
        this.size_view.value = new_size;
    }

    private get specifier_info_view(): HeapDataView {
        return this.data.subset(TypeSpecifierView.specifier_info_offset, this.size);
    }

    /**
     * Allocates an environment in the given heap view
     * @param view The view used to change the heap values
     * @param type_specifier The type specifier
     */
    public static allocate_value(view: HeapDataView, type_specifier: TypeSpecifier): TypeSpecifierView {
        const type_info_view = new TypeSpecifierView(view);
        const total_size = TypeSpecifierView.fixed_byte_length;
        // Ensure the explicit_control_evaluator is not already protected
        if (!view.is_not_protected(0, total_size)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set specifier based upon type
        switch (type_specifier.type) {
            case TypeSpecifierType.BUILT_IN_MULTISET:
                CMemoryTag.allocate_value(type_info_view.tag_view, CMemoryTagValue.BUILT_IN_TYPE);
                type_info_view.size = BuiltInTypeSpecifierView.byte_length;
                BuiltInTypeSpecifierView.allocate_value(type_info_view.specifier_info_view,
                    type_specifier as BuiltInTypeSpecifier);
                break;
            default:
                throw new InvalidSpecifierError("The given specifier cannot be converted into a type view");
        }
        // Protect type specifier
        view.protect(0, total_size);
        return type_info_view;
    }

    /**
     * Gets the size required to store the given type specifier
     * @param type_specifier The type specifier
     */
    public static size_required(type_specifier: TypeSpecifier): number {
        const fixed_length = TypeSpecifierView.fixed_byte_length;
        switch (type_specifier.type) {
            case TypeSpecifierType.BUILT_IN_MULTISET:
                return fixed_length + BuiltInTypeSpecifierView.byte_length;
            default:
                throw new InvalidSpecifierError("The size of the given specifier cannot be determined");
        }
    }

    /**
     * Initialises a new TypeSpecifierView from an existing value
     * @param view The view for the TypeSpecifierView to build from
     */
    public static from_existing(view: HeapDataView): TypeSpecifierView {
        return new TypeSpecifierView(view);
    }
}