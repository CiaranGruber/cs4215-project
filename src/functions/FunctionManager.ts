/**
 * FunctionManager
 *
 * Manages the functions used within C, matching keys with specific functions
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import CFunction from "./CFunction";

/**
 * Manages the functions used within C, matching keys with specific functions
 */
export default class FunctionManager {
    private functions: Map<number, CFunction>;
    private curr_key: number;

    /**
     * Initialises a new FunctionManager instance
     */
    public constructor() {
        this.functions = new Map<number, CFunction>();
        this.curr_key = 10;
    }

    private get new_key(): number {
        while (this.functions.has(this.curr_key)) {
            this.curr_key++;
        }
        return this.curr_key;
    }

    /**
     * Adds the given function to the function manager
     * @param func The function to add
     */
    public add_function(func: CFunction): number {
        const key = this.new_key;
        this.functions.set(key, func);
        return key;
    }

    /**
     * Removes the function indicated with the key from the function manager
     * @param key The key of the function to remove
     */
    public remove_function(key: number) {
        this.functions.delete(key);
    }

    /**
     * Gets the function identified by the given key
     * @param key The key used to identify the function
     */
    public get_function(key: number) {
        return this.functions.get(key);
    }
}