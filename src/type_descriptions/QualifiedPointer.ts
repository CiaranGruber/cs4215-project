/**
 * QualifiedPointer
 *
 * Represents a fully qualified pointer
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import TypeQualifier from "./type_qualifier/TypeQualifier";

/**
 * Used to represent a fully qualified pointer
 */
export default class QualifiedPointer {
    /**
     * The type qualifier for the given pointer
     */
    public readonly type_qualifier: TypeQualifier;

    /**
     * Initialises a new qualified pointer
     * @param type_qualifier The type qualifier used for the pointer
     */
    public constructor(type_qualifier: TypeQualifier) {
        this.type_qualifier = type_qualifier;
    }
}