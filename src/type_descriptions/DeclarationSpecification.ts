/**
 * DeclarationSpecification
 *
 * Describes a fully qualified declaration type
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import DeclarationSpecifier, {
    DeclarationSpecifierType,
    TypeQualDeclarationSpecifier,
    TypeSpecDeclarationSpecifier
} from "./DeclarationSpecifier";
import TypeSpecifier, {InvalidSpecifierError} from "./type_specifier/TypeSpecifier";
import TypeQualifier, {build_qualifier, TypeQualifierType} from "./type_qualifier/TypeQualifier";
import TypeValidator from "./type_specifier/TypeValidator";

/**
 * Represents a fully specified declaration type
 */
export default class DeclarationSpecification {
    /**
     * The type specifier for the declaration
     */
    public readonly specifier: TypeSpecifier;
    /**
     * The type qualifier for the declaration
     */
    public readonly qualifier: TypeQualifier;

    private constructor(type_specifier: TypeSpecifier, type_qualifier: TypeQualifier) {
        this.specifier = type_specifier;
        this.qualifier = type_qualifier;
    }

    /**
     * Parses the given set of declaration specifiers in order to get a fully specified declaration type
     * @param specifiers The specifiers used
     */
    public static from_specifiers(specifiers: Array<DeclarationSpecifier>): DeclarationSpecification {
        const type_specifiers: Array<TypeSpecifier> = new Array<TypeSpecifier>();
        const type_qualifiers: Array<TypeQualifierType> = new Array<TypeQualifierType>();

        // Parse specifiers
        specifiers.forEach((value) => {
            switch (value.type) {
                case DeclarationSpecifierType.TYPE_SPECIFIER:
                    const type_specifier = value as TypeSpecDeclarationSpecifier;
                    type_specifiers.push(type_specifier.type_specifier);
                    break;
                case DeclarationSpecifierType.TYPE_QUALIFIER:
                    const type_qualifier = value as TypeQualDeclarationSpecifier;
                    type_qualifiers.push(type_qualifier.type_qualifier);
                    break;
                default:
                    throw new InvalidSpecifierError("The declaration specifier was not recognised");
            }
        });

        // Return constructed specification
        return new DeclarationSpecification(TypeValidator.get_type(type_specifiers), build_qualifier(type_qualifiers));
    }

    /**
     * Initialises a new DeclarationSpecification from a set of existing specifications
     * @param type_specifier The type specifier
     * @param type_qualifier The type qualifier
     */
    public static from_existing_specs(type_specifier: TypeSpecifier, type_qualifier: TypeQualifier) {
        return new DeclarationSpecification(type_specifier, type_qualifier);
    }
}