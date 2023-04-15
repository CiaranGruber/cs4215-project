/**
 * IntegerCaster
 *
 * Describes the cast object used to cast values to an integer type of specific size
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import TypeInformation from "../TypeInformation";
import {InvalidCastError} from "../type_specifier/built_in_types/BuiltInTypeMultiset";
import GenericTypeCaster, {basic_padding_cast} from "./GenericTypeCaster";
import {BuiltInTypeSpecifier, TypeSpecifierType} from "../type_specifier/TypeSpecifier";
import GlobalContext from "../../global_context/GlobalContext";
import {BuiltInMultisetDescription} from "../type_specifier/built_in_types/BuiltInMultisetDescription";

/**
 * Used for casting objects to an integer type (including shorts/longs)
 */
export default class IntegerCaster extends GenericTypeCaster {
    private static get basic_cast(): Array<TypeSpecifierType> { return [TypeSpecifierType.BUILT_IN_MULTISET,
        TypeSpecifierType.FUNCTION] }
    private readonly data_size: number;

    /**
     * Constructs a new IntegerCaster
     * @param data_size The size of the integer data
     */
    public constructor(data_size: number) {
        super();
        this.data_size = data_size;
    }

    public cast_to(src: TypeInformation, data: DataView): ArrayBuffer {
        const src_specifier = src.declaration_specifier.specifier;
        // Most basic cast
        if (src.is_pointer || src.is_function || IntegerCaster.basic_cast.includes(src_specifier.type)) {
            let src_data_size;
            if (src.is_pointer) {
                src_data_size = GlobalContext.pointer_size;
            } else if (src.is_function) {
                src_data_size = GlobalContext.function_pointer_size;
            } else if (src_specifier.type === TypeSpecifierType.FUNCTION) {
                src_data_size = src_specifier.data_size;
            } else {
                // Ensure specifier isn't a float as according to
                const built_in_specifier = src_specifier as BuiltInTypeSpecifier;
                src_data_size = built_in_specifier.data_size;
                // Cast value from float
                if (built_in_specifier.type_multiset.is_described_as(BuiltInMultisetDescription.IS_FLOAT)) {
                    throw new Error("Casting from a float is not implemented yet");
                }
            }
            const byte_offset = data.byteLength - src_data_size;
            return basic_padding_cast(this.data_size, new DataView(data.buffer, byte_offset, src_data_size));
        }
        throw new InvalidCastError("Failed to cast value to pointer");
    }

    public default_value(): ArrayBuffer {
        return new ArrayBuffer(this.data_size);
    }
}