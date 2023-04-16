/**
 * LongConverter
 *
 * Converts from Javascript numbers to C int values and vice versa
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import Converter, {get_built_in_type} from "./Converter";
import CValue from "../explicit-control-evaluator/CValue";
import {BuiltInTypeSpecifierType} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import BigInt64 from "../data_views/BigInt64";

/**
 * Provides conversion between JavaScript numbers and C int values
 */
export default class LongConverter extends Converter<bigint> {
    public static readonly type = get_built_in_type([BuiltInTypeSpecifierType.LONG], 0);

    convert_to_c(value: bigint): CValue {
        return new CValue(false, LongConverter.type, BigInt64.create_buffer(value));
    }

    convert_to_js(value: CValue): bigint {
        return new BigInt64(value.cast_to(LongConverter.type).get_value(undefined)).value;
    }
}