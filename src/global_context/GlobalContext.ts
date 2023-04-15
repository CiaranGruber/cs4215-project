/**
 * LanguageContext
 *
 * Represents a value in C
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

/**
 * Contains the context behind which the explicit-control evaluator will run
 */
export default class GlobalContext {
    private static context: GlobalContext;
    private pointer_size;

    private constructor() {
    }

    /**
     * Gets the default pointer size for values within the heap
     */
    public static get pointer_size(): number {
        if (this.context === undefined) {
            throw new ContextNotInitialisedError("Global Context has yet to be initialised");
        }

        return this.context.pointer_size;
    }

    /**
     * The size of function pointers for the evaluator to use
     */
    public static get function_pointer_size(): number {
        if (this.context === undefined) {
            throw new ContextNotInitialisedError("Language Context has yet to be initialised");
        }

        return this.context.pointer_size;
    }

    /**
     * Initialises the context with the required values
     * @param is_64_bit Whether the instance should run in 64-bit mode
     */
    public static initialise_instance(is_64_bit: boolean) {
        const pointer_size = is_64_bit ? 4 : 4;
        const context = new GlobalContext();
        context.pointer_size = pointer_size;
        this.context = context;
    }
}

/**
 * Thrown when the language context has not been initialised yet
 */
export class ContextNotInitialisedError extends Error {
    /**
     * Constructs a new ContextNotInitialisedError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "ContextNotInitialisedError";
    }
}