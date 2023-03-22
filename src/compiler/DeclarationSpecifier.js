/**
 * Declaration Specifier
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */
import { TypeMatcher } from "./TypeManagement.js";
/**
 * Represents the types of declaration specifiers
 */
export var DeclarationSpecifierType;
(function (DeclarationSpecifierType) {
    DeclarationSpecifierType[DeclarationSpecifierType["STORAGE_CLASS_SPECIFIER"] = 0] = "STORAGE_CLASS_SPECIFIER";
    DeclarationSpecifierType[DeclarationSpecifierType["TYPE_SPECIFIER"] = 1] = "TYPE_SPECIFIER";
    DeclarationSpecifierType[DeclarationSpecifierType["TYPE_QUALIFIER"] = 2] = "TYPE_QUALIFIER";
    DeclarationSpecifierType[DeclarationSpecifierType["FUNCTION_SPECIFIER"] = 3] = "FUNCTION_SPECIFIER";
    DeclarationSpecifierType[DeclarationSpecifierType["ALIGNMENT_SPECIFIER"] = 4] = "ALIGNMENT_SPECIFIER";
})(DeclarationSpecifierType || (DeclarationSpecifierType = {}));
/**
 * Represents a declaration specifier
 */
export class DeclarationSpecifier {
    /**
     * Constructs a new declaration specifier instance
     * @param type The type of the declaration specifier
     * @param specifier_string The string representing the specifier
     */
    constructor(type, specifier_string) {
        this.type = type;
        this.specifier_string = specifier_string;
    }
}
/**
 * Represents the information for a fully qualified declaration specifier
 */
export class QualifiedDeclarationSpecifier {
    /**
     * Constructs a new qualified declaration specifier
     * @param specifiers The specifiers that are represented
     */
    constructor(specifiers) {
        // Create type information
        const type_specifiers = new Array();
        // Sort specifiers
        specifiers.forEach((value, index, array) => {
            switch (value.type) {
                case DeclarationSpecifierType.TYPE_SPECIFIER:
                    type_specifiers.push(value.specifier_string);
            }
        });
        // Convert type information
        this.type_information = TypeMatcher.getTypeMultiset(type_specifiers);
    }
}
//# sourceMappingURL=DeclarationSpecifier.js.map