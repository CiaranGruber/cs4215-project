/**
 * VoidCaster
 *
 * Describes the casting object used to cast values to a void value
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import GenericTypeCaster from "./GenericTypeCaster";
import TypeInformation from "../TypeInformation";
import ImmutableDataView from "../../heap/ImmutableDataView";

/**
 * Used for casting objects to an integer type (including shorts/longs)
 */
export default class VoidCaster extends GenericTypeCaster {
    public cast_to(src: TypeInformation, data: ImmutableDataView): ArrayBuffer {
        // Allows casts from any type and will return explicit_control_evaluator of 0 size
        return new ArrayBuffer(0);
    }

    public default_value(): ArrayBuffer {
        return new ArrayBuffer(0);
    }
}