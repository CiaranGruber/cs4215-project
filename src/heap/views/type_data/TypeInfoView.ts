/**
 * TypeInfoView
 *
 * Represents a set of type information within the C memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import {SegmentationFaultError} from "../../RestrictedHeap";
import TypeInformation from "../../../type_descriptions/TypeInformation";
import TypeQualifierView from "./TypeQualifierView";
import TypeSpecifierView from "./type_specifier/TypeSpecifierView";
import DeclarationSpecification from "../../../type_descriptions/DeclarationSpecification";
import QualifiedPointer from "../../../type_descriptions/QualifiedPointer";
import Bool from "../data/Bool";
import UInt8 from "../data/UInt8";
import UInt16 from "../data/UInt16";

/**
 * Represents a set of type information
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>1 byte - Whether the given value is a function</li>
 *     <li>1 byte - The number of qualifiers (note >1 indicates it is a pointer)</li>
 *     <li>2 bytes - The size of the type specifier</li>
 *     <li>x × TypeQualifierView.byte_length - The variable size information regarding type qualification and qualified
 *     pointers</li>
 *     <li>x bytes - The type specifier information</li>
 * </ul>
 */
export default class TypeInfoView {
    private static readonly is_function_offset = 0;
    private static readonly is_function_length = Bool.byte_length;
    private static readonly qualifier_count_offset = TypeInfoView.is_function_offset + TypeInfoView.is_function_length;
    private static readonly qualifier_count_length = UInt8.byte_length;
    private static readonly specifier_size_offset = TypeInfoView.qualifier_count_offset +
        TypeInfoView.qualifier_count_length;
    private static readonly specifier_size_length = UInt16.byte_length;
    private static readonly qualifier_offset = TypeInfoView.specifier_size_offset + TypeInfoView.specifier_size_length;
    public get specifier_offset() {
        return TypeInfoView.qualifier_offset + this.qualifier_count * TypeQualifierView.byte_length;
    }
    private data: HeapDataView;

    private constructor(data: HeapDataView) {
        this.data = data;
    }

    /**
     * Gets the fixed size of an TypeInformation value
     */
    public static get fixed_byte_length(): number {
        return this.is_function_length + this.qualifier_count_length + this.specifier_size_length;
    }

    /**
     * Gets the type information represented by the given type
     */
    public get type_information(): TypeInformation {
        const type_qualifier = TypeQualifierView.from_existing(this.qualifier_view(0)).type_qualifier;
        const type_specifier = TypeSpecifierView.from_existing(this.specifier_view).type_specifier;
        const declaration_specification = DeclarationSpecification.from_existing_specs(type_specifier, type_qualifier);
        const pointers: Array<QualifiedPointer> = [];
        for (let i = 1; i < this.qualifier_count; i++) {
            const type_qualifier = TypeQualifierView.from_existing(this.qualifier_view(i)).type_qualifier;
            pointers.push(new QualifiedPointer(type_qualifier));
        }
        return new TypeInformation(declaration_specification, pointers, this.is_function);
    }

    private qualifier_view(index: number): HeapDataView {
        return this.data.subset(TypeInfoView.qualifier_offset + TypeQualifierView.byte_length * index,
            TypeQualifierView.byte_length);
    }

    private get specifier_view(): HeapDataView {
        return this.data.subset(this.specifier_offset, this.specifier_size);
    }

    private get is_function_view(): Bool {
        return new Bool(this.data.subset(TypeInfoView.is_function_offset, TypeInfoView.is_function_length),
            true);
    }

    /**
     * Whether the given type is a function or not
     */
    public get is_function(): boolean {
        // Determine if it is a pointer
        if (this.qualifier_count > 1) {
            return false;
        }
        // Determine if, given it is not a pointer, it is a function
        return this.is_function_view.value;
    }

    private set is_function(is_function: boolean) {
        this.is_function_view.value = is_function;
    }

    private get qualifier_count_view(): UInt8 {
        return new UInt8(this.data.subset(TypeInfoView.qualifier_count_offset, TypeInfoView.qualifier_count_length),
            true);
    }

    private get qualifier_count(): number {
        return this.qualifier_count_view.value;
    }

    private set qualifier_count(new_count: number) {
        this.qualifier_count_view.value = new_count;
    }

    private get specifier_size_view(): UInt16 {
        return new UInt16(this.data.subset(TypeInfoView.specifier_size_offset, TypeInfoView.specifier_size_length),
            true);
    }

    private get specifier_size(): number {
        return this.specifier_size_view.value;
    }

    private set specifier_size(new_size: number) {
        this.specifier_size_view.value = new_size;
    }

    /**
     * Allocates an environment in the given heap view
     * @param view The view used to change the heap values
     * @param type_information The type information used to create the view
     */
    public static allocate_value(view: HeapDataView, type_information: TypeInformation): TypeInfoView {
        const type_info_view = new TypeInfoView(view);
        const total_size = TypeInfoView.size_required(type_information);
        // Ensure the data is not already protected
        if (!view.is_not_protected(0, total_size)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set is_function status
        type_info_view.is_function = type_information.is_function;
        // Set qualifiers
        type_info_view.qualifier_count = type_information.pointers.length + 1;
        TypeQualifierView.allocate_value(type_info_view.qualifier_view(0),
            type_information.declaration_specifier.qualifier);
        for (let i = 0; i < type_information.pointers.length; i++) {
            TypeQualifierView.allocate_value(type_info_view.qualifier_view(i + 1),
                type_information.pointers[i].type_qualifier);
        }
        // Set specifier
        type_info_view.specifier_size = TypeSpecifierView.size_required(type_information.declaration_specifier.specifier);
        TypeSpecifierView.allocate_value(type_info_view.specifier_view,
            type_information.declaration_specifier.specifier);
        // Protect type info view
        view.protect(0, total_size);
        return type_info_view;
    }

    /**
     * Gets the size required to store the given type information
     * @param type_information The type information
     */
    public static size_required(type_information: TypeInformation): number {
        const fixed_length = TypeInfoView.fixed_byte_length;
        const qualifier_length = TypeQualifierView.byte_length * (type_information.pointers.length + 1);
        const specifier_length = TypeSpecifierView.size_required(type_information.declaration_specifier.specifier);
        return fixed_length + qualifier_length + specifier_length;
    }

    /**
     * Initialises a new Environment view from an existing value
     * @param view The view for the Environment to build from
     */
    public static from_existing(view: HeapDataView): TypeInfoView {
        return new TypeInfoView(view);
    }
}