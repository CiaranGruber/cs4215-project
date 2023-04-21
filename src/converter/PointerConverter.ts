/**
 * PointerConverter
 *
 * Converts from Javascript numbers to C pointers and vice versa
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */


import Converter, {get_built_in_type} from "./Converter";
import CValue from "../explicit-control-evaluator/CValue";
import {BuiltInTypeSpecifierType} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import Pointer from "../data_views/Pointer";
import {InvalidTypeError} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeMatcher";

export default class PointerConverter extends Converter<number> {
    public readonly type;

    public constructor(type_specifiers: Array<BuiltInTypeSpecifierType>, pointer_count: number) {
        super();
        if (pointer_count < 1) {
            throw new InvalidTypeError("Pointer converters must have a pointer count > 0");
        }
        this.type = get_built_in_type(type_specifiers, pointer_count);
    }

    convert_to_c(value: number): CValue {
        return new CValue(false, this.type, Pointer.create_buffer(value));
    }

    convert_to_js(value: CValue): number {
        return new Pointer(value.cast_to(undefined, this.type).get_value(undefined)).value;
    }
}