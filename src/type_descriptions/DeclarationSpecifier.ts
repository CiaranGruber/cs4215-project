/**
 * DeclarationSpecifier
 *
 * Represents a basic declaration specifier to be parsed by the DeclarationSpecification instance
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */


import TypeSpecifier from "./type_specifier/TypeSpecifier";
import {TypeQualifierType} from "./type_qualifier/TypeQualifier";

/**
 * Represents the types of declaration specifiers
 */
export enum DeclarationSpecifierType {
    STORAGE_CLASS_SPECIFIER,
    TYPE_SPECIFIER,
    TYPE_QUALIFIER,
    FUNCTION_SPECIFIER,
    ALIGNMENT_SPECIFIER
}

/**
 * Represents a declaration specifier
 */
export default abstract class DeclarationSpecifier {
    /**
     * Represents the type of the declaration specifier
     */
    public readonly type: DeclarationSpecifierType;

    /**
     * Constructs a new declaration specifier instance
     * @param type The type of the declaration specifier
     */
    protected constructor(type: DeclarationSpecifierType) {
        this.type = type;
    }
}

/**
 * Represents a type specifier as a type of declaration specifier
 */
export class TypeSpecDeclarationSpecifier extends DeclarationSpecifier {
    public readonly type_specifier: TypeSpecifier;

    /**
     * Initialises a new TypeSpecDeclarationSpecifier instance
     * @param type_specifier The type specifier associated with the instance
     */
    constructor(type_specifier: TypeSpecifier) {
        super(DeclarationSpecifierType.TYPE_SPECIFIER);
        this.type_specifier = type_specifier;
    }
}

/**
 * Represents a type qualifier as a type of declaration specifier
 */
export class TypeQualDeclarationSpecifier extends DeclarationSpecifier {
    public readonly type_qualifier: TypeQualifierType;

    /**
     * Initialises a new TypeSpecDeclarationSpecifier instance
     * @param type_qualifier The type qualifier
     */
    constructor(type_qualifier: TypeQualifierType) {
        super(DeclarationSpecifierType.TYPE_QUALIFIER);
        this.type_qualifier = type_qualifier;
    }
}