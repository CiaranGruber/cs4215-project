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
import TypeSpecifier, {FunctionTypeSpecifier, InvalidSpecifierError} from "./type_specifier/TypeSpecifier";
import TypeQualifier, {build_qualifier, TypeQualifierType} from "./type_qualifier/TypeQualifier";
import TypeValidator from "./type_specifier/TypeValidator";
import TypeInformation from "./TypeInformation";

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

    /**
     * Gets the type used to represent a function
     */
    public static function_specifier(return_type: TypeInformation): DeclarationSpecification {
        return DeclarationSpecification.from_existing_specs(new FunctionTypeSpecifier(return_type),
            build_qualifier([TypeQualifierType.CONST]));
    }

    /**
     * Determines whether the given specification is equivalent to another through deep equality
     * @param other The other specification to compare
     */
    public equals(other: DeclarationSpecification): boolean {
        if (!this.qualifier.equals(other.qualifier)) {
            return false;
        }
        return this.specifier.equals(other.specifier);
    }
}