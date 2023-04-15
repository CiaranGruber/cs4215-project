/**
 * Converter
 *
 * Converts from Javascript values to C values and vice versa
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import CValue from "../explicit-control-evaluator/CValue";
import {BuiltInTypeSpecifierType} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import TypeInformation from "../type_descriptions/TypeInformation";
import DeclarationSpecifier, {TypeSpecDeclarationSpecifier} from "../type_descriptions/DeclarationSpecifier";
import {BuiltInTypeSpecifierEnum} from "../type_descriptions/type_specifier/TypeSpecifier";
import DeclarationSpecification from "../type_descriptions/DeclarationSpecification";
import QualifiedPointer from "../type_descriptions/QualifiedPointer";
import {build_qualifier} from "../type_descriptions/type_qualifier/TypeQualifier";

/**
 * Creates a built_in type based upon the given specifiers and the pointer count
 * @param built_in_specifiers The specifiers used to construct the type
 * @param pointers The pointer depth of the type
 */
export function get_built_in_type(built_in_specifiers: Array<BuiltInTypeSpecifierType>, pointers: number): TypeInformation {
    const type_specifiers: Array<DeclarationSpecifier> = [];
    built_in_specifiers.forEach((value) => {
        type_specifiers.push(new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(value)));
    })
    const declaration_specification = DeclarationSpecification.from_specifiers(type_specifiers);
    const pointer_array: Array<QualifiedPointer> = [];
    for (let i = 0; i < pointers; i++) {
        pointer_array.push(new QualifiedPointer(build_qualifier([])));
    }
    return new TypeInformation(declaration_specification, pointer_array);
}

/**
 * Provides conversion between JavaScript values and C values
 */
export default abstract class Converter<T> {
    /**
     * Converts the given CValue to a JavaScript value
     * @param value The value to convert
     */
    public abstract convert_to_js(value: CValue): T;

    /**
     * Converts the given JavaScript value to a C value
     * @param value The value to convert
     */
    public abstract convert_to_c(value: T): CValue;
}