/**
 * Declaration Specifier
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */
import {BasicTypeMultiset, TypeMatcher} from "./TypeManagement";

/**
 * Represents the types of declaration specifiers
 */
export enum DeclarationSpecifierType {
    STORAGE_CLASS_SPECIFIER = 0,
    TYPE_SPECIFIER = 1,
    TYPE_QUALIFIER = 2,
    FUNCTION_SPECIFIER = 3,
    ALIGNMENT_SPECIFIER = 4
}

/**
 * Represents a declaration specifier
 */
export class DeclarationSpecifier {
    /**
     * Represents the type of the declaration specifier
     */
    public readonly type: DeclarationSpecifierType;
    /**
     * The specifier in string representation
     */
    public readonly specifier_string: string;

    /**
     * Constructs a new declaration specifier instance
     * @param type The type of the declaration specifier
     * @param specifier_string The string representing the specifier
     */
    constructor(type: DeclarationSpecifierType, specifier_string: string) {
        this.type = type;
        this.specifier_string = specifier_string;
    }
}

/**
 * Represents the information for a fully qualified declaration specifier
 */
export class QualifiedDeclarationSpecifier {
    /**
     * The type information used for the declaration specifier
     * @private
     */
   private type_information: BasicTypeMultiset;

    /**
     * Constructs a new qualified declaration specifier
     * @param specifiers The specifiers that are represented
     */
   constructor(specifiers: Array<DeclarationSpecifier>) {
       // Create type information
       const type_specifiers = new Array<string>();
       // Sort specifiers
       specifiers.forEach((value, index, array) => {
           switch (value.type) {
               case DeclarationSpecifierType.TYPE_SPECIFIER:
                   type_specifiers.push(value.specifier_string);
           }
       });
       // Convert type information
       this.type_information = TypeMatcher.get_type_multiset(type_specifiers);
   }
}