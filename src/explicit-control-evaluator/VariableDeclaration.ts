/**
 * VariableDeclaration
 *
 * Represents information about a variable to be declared in C
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import TypeInformation from "../type_descriptions/TypeInformation";

export default class VariableDeclaration {
    public readonly type_information: TypeInformation;
    public readonly name: string;

    public constructor(type_information: TypeInformation, name: string) {
        this.type_information = type_information;
        this.name = name;
    }
}