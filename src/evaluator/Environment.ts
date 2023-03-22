/**
 * ECEnvironment
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

export class EnvironmentPosition {
    /**
     * The frame of the compile-time environment
     */
    public readonly env_depth: number;
    /**
     * The index of the value that is stored
     */
    public readonly value_index: number;

    /**
     * Constructs the ECEnvironment Position to be referenced elsewhere
     * @param env_depth The depth of the environment
     * @param value_index The index representing the location of the variable
     */
    constructor(env_depth: number, value_index: number) {
        this.env_depth = env_depth;
        this.value_index = value_index;
    }
}

/**
 * Represents the environment as used by the C virtual machine
 */
export default class Environment {

}