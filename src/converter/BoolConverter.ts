/**
 * IntConverter
 *
 * Converts from Javascript numbers to C int values and vice versa
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import Converter, {get_built_in_type} from "./Converter";
import CValue from "../explicit-control-evaluator/CValue";
import {BuiltInTypeSpecifierType} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import Bool from "../data_views/Bool";

/**
 * Provides conversion between JavaScript boolean values and C _Bool values
 */
export default class BoolConverter extends Converter<boolean> {
    public static readonly type = get_built_in_type([BuiltInTypeSpecifierType._BOOL], 0);

    convert_to_c(value: boolean): CValue {
        return new CValue(false, BoolConverter.type, Bool.create_buffer(value));
    }

    convert_to_js(value: CValue): boolean {
        return new Bool(value.cast_to(BoolConverter.type).get_value(undefined)).value;
    }
}