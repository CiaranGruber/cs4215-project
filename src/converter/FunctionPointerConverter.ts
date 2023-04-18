/**
 * FunctionPointerConverter
 *
 * Converts from Javascript numbers to C function pointers and vice versa
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */


import Converter from "./Converter";
import CValue from "../explicit-control-evaluator/CValue";
import FunctionPointer from "../data_views/FunctionPointer";
import TypeInformation from "../type_descriptions/TypeInformation";
import DeclarationSpecification from "../type_descriptions/DeclarationSpecification";

export default class FunctionPointerConverter extends Converter<number> {
    public readonly type: TypeInformation;

    public constructor(return_type: TypeInformation) {
        super();
        this.type = new TypeInformation(DeclarationSpecification.function_specifier(return_type), []);
    }

    convert_to_c(value: number): CValue {
        return new CValue(false, this.type, FunctionPointer.create_buffer(value));
    }

    convert_to_js(value: CValue): number {
        return new FunctionPointer(value.cast_to(this.type).get_value(undefined)).value;
    }
}