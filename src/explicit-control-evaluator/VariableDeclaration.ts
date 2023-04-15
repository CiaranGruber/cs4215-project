/**
 * VariableDeclaration
 *
 * Represents information about a variable to be declared in C
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import TypeInformation from "../type_descriptions/TypeInformation";

/**
 * Contains the information for the declaration of a variable
 */
export default class VariableDeclaration {
    /**
     * The type information for the variable
     */
    public readonly type_information: TypeInformation;
    /**
     * The name of the variable
     */
    public readonly name: string;

    /**
     * Creates a new variable declaration with the given type information and name
     * @param type_information The type of the variable
     * @param name The name of the variable
     */
    public constructor(type_information: TypeInformation, name: string) {
        this.type_information = type_information;
        this.name = name;
    }
}