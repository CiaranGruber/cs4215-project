/**
 * Declaration Specifier
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */
import {BasicTypeMultiset} from "./TypeManagement";

/**
 * Represents the types of declaration specifiers
 */
enum DeclarationSpecifierType {
    STORAGE_CLASS_SPECIFIER = 0,
    TYPE_SPECIFIER = 1,
    TYPE_QUALIFIER = 2,
    FUNCTION_SPECIFIER = 3,
    ALIGNMENT_SPECIFIER = 4
}

export class DeclarationSpecifier {
    public readonly type: DeclarationSpecifierType;
    public readonly information: string;

    constructor(type: DeclarationSpecifierType, information: string) {
        this.type = type;
        this.information = information;
    }
}

/**
 * Represents the information for a fully qualified declaration specifier
 */
class QualifiedDeclarationSpecifier {
   private type_information: BasicTypeMultiset;

   constructor(type_information: BasicTypeMultiset) {
       this.type_information = type_information;
   }
}