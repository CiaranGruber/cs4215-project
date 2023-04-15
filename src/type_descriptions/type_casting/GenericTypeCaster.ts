/**
 * GenericTypeCaster
 *
 * Describes the generic cast object used to cast values to a specific type
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import TypeInformation from "../TypeInformation";
import ImmutableDataView from "../../heap/ImmutableDataView";

/**
 * Performs a basic cast reading bytes from the right first and padding appropriately
 * @param dest_size The size of the destination data
 * @param data The data to cast
 * @protected
 */
export function basic_padding_cast(dest_size: number, data: DataView): ArrayBuffer {
    // If casting size is smaller, ignore the left-hand side
    if (data.byteLength > dest_size) {
        const end_offset = data.byteOffset + data.byteLength;
        const start_offset = end_offset - dest_size;
        return data.buffer.slice(start_offset, end_offset);
    }
    // If the cast size is larger, pad left
    const new_buffer = new ArrayBuffer(dest_size);
    const start_offset = new_buffer.byteLength - data.byteLength;
    // Copy to new buffer
    new Uint8Array(new_buffer, start_offset).set(new Uint8Array(data.buffer, data.byteOffset));
    return new_buffer;
}

/**
 * Describes a generic type caster with the ability to cast from a source type to a specific destination type
 */
export default abstract class GenericTypeCaster {
    /**
     * Casts the given data of src type
     * @param src The source type to cast from
     * @param data The data to cast
     */
    public abstract cast_to(src: TypeInformation, data: ImmutableDataView): ArrayBuffer;

    /**
     * Gets the default value for the given type - typically just an empty array buffer
     */
    public abstract default_value(): ArrayBuffer;
}