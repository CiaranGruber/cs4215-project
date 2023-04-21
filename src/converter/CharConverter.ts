/**
 * CharConverter
 *
 * Converts from Javascript numbers to C char values and vice versa
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import Converter, {get_built_in_type} from "./Converter";
import CValue from "../explicit-control-evaluator/CValue";
import {BuiltInTypeSpecifierType} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import Int8 from "../data_views/Int8";

/**
 * Provides conversion between JavaScript numbers and C int values
 */
export default class CharConverter extends Converter<number> {
    public static readonly type = get_built_in_type([BuiltInTypeSpecifierType.CHAR], 0);

    convert_to_c(value: number): CValue {
        return new CValue(false, CharConverter.type, Int8.create_buffer(value));
    }

    convert_to_js(value: CValue): number {
        return new Int8(value.cast_to(undefined, CharConverter.type).get_value(undefined)).value;
    }
}