/**
 * FunctionCaster
 *
 * Describes the casting object used to cast values to a pointer
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import TypeInformation from "../TypeInformation";
import {InvalidCastError} from "../type_specifier/built_in_types/BuiltInTypeMultiset";
import GenericTypeCaster, {basic_padding_cast} from "./GenericTypeCaster";
import {BuiltInTypeSpecifier, TypeSpecifierType} from "../type_specifier/TypeSpecifier";
import GlobalContext from "../../global_context/GlobalContext";
import {SpecifierDescription} from "../type_specifier/SpecifierDescription";

/**
 * Used to cast values to a pointer type
 */
export default class FunctionCaster extends GenericTypeCaster {
    private static get basic_cast(): Array<TypeSpecifierType> { return [TypeSpecifierType.BUILT_IN_MULTISET,
        TypeSpecifierType.FUNCTION]; }

    public cast_to(src: TypeInformation, data: DataView): ArrayBuffer {
        const dest_size = GlobalContext.pointer_size;
        const src_specifier = src.declaration_specifier.specifier;
        // Most basic cast
        if (src.is_pointer || src.is_function || FunctionCaster.basic_cast.includes(src_specifier.type)) {
            let src_data_size;
            if (src.is_pointer) {
                src_data_size = GlobalContext.pointer_size;
            } else if (src.is_function) {
                src_data_size = GlobalContext.function_pointer_size;
            } else if (src_specifier.type === TypeSpecifierType.FUNCTION) {
                src_data_size = src_specifier.data_size;
            } else {
                // Ensure specifier isn't a float as according to spec
                const built_in_specifier = src_specifier as BuiltInTypeSpecifier;
                if (built_in_specifier.type_multiset.is_described_as(SpecifierDescription.IS_FLOAT)) {
                    throw new InvalidCastError("Cannot cast float value to a pointer")
                }
                src_data_size = built_in_specifier.data_size;
            }
            const byte_offset = data.byteLength - src_data_size;
            return basic_padding_cast(dest_size, new DataView(data.buffer, byte_offset, src_data_size));
        }
        throw new InvalidCastError("Failed to cast value to pointer");
    }

    public default_value(): ArrayBuffer {
        return new ArrayBuffer(GlobalContext.pointer_size);
    }
}