/**
 * VoidConverter
 *
 * Converts from Javascript numbers to C void values and vice versa
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import Converter, {get_built_in_type} from "./Converter";
import CValue from "../explicit-control-evaluator/CValue";
import {BuiltInTypeSpecifierType} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";

/**
 * Provides conversion between JavaScript numbers and C void values
 */
export default class VoidConverter extends Converter<void> {
    public static readonly type = get_built_in_type([BuiltInTypeSpecifierType.VOID], 0);

    convert_to_c(value: void): CValue {
        return new CValue(false, VoidConverter.type, new ArrayBuffer(0));
    }

    convert_to_js(value: CValue): void {

    }
}