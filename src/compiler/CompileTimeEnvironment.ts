import {BasicTypeMultiset} from "./TypeManagement";
import {EnvironmentPosition} from "../evaluator/Environment";

class CSymbol {
    public readonly name: string;
    private _type: BasicTypeMultiset;
    public readonly pointer_depth: number;

    /**
     * Constructs a new CSymbol with the specified values
     * @param name The name of the symbol
     * @param type The type of the symbol
     * @param pointer_depth The pointer value for the symbol
     */
    constructor(name: string, type: BasicTypeMultiset, pointer_depth: number) {
        this.name = name;
        this._type = type;
        this.pointer_depth = pointer_depth;
    }

    get type() {
        return this._type;
    }

    /**
     * Determines if the given type matches the symbol type
     * @param type The type to test against
     */
    public is_type(type: BasicTypeMultiset): boolean {
        return this.type === type;
    }
}

/**
 * The compile-time environment used when compiling for environment references and syntax checking
 */
export default class CompileTimeEnvironment {
    /**
     * The current depth of the compile time environment (Ie. number of parent frames)
     * @private
     */
    private env_depth: number;
    /**
     * The parent frame
     * @private
     */
    private parent_frame: CompileTimeEnvironment;
    /**
     * The array of variables in the environment
     * @private
     */
    private readonly symbols: Array<CSymbol>;
    /**
     * An array containing reserved names used in other parts of the program
     * @private
     */
    private readonly reserved_names: Set<string>;
    /**
     * The position value to be returned if the compile-time environment does not contain the symbol
     * @private
     */
    private static invalid_position = null;

    /**
     * Constructs a new compile-time environment instance
     */
    constructor() {
        this.env_depth = 0;
        this.parent_frame = null;
        this.symbols = new Array<CSymbol>();
    }

    /**
     * Extends the compile-time environment and returns a new environment
     */
    public extend() : CompileTimeEnvironment {
        const newCTE = new CompileTimeEnvironment();
        // Set reference for new compile-time environment to current
        newCTE.env_depth = this.env_depth + 1;
        newCTE.parent_frame = this;

        return newCTE;
    }

    /**
     * Adds a name to the list of reserved names not allowed for compile-time-environments
     * @param name The name to add
     */
    public add_reserved_name(name: string) {
        this.reserved_names.add(name);
    }

    /**
     * Adds the given symbol to the compile-time environment
     * @param symbol_name The name of the symbol to add
     * @param type The type of the symbol
     * @param pointer_depth The pointer depth for the symbol
     */
    public add_symbol(symbol_name: string, type: BasicTypeMultiset, pointer_depth: number) {
        // Ensure symbol does not already exist
        this.symbols.forEach((value, index, array) => {
            if (value.name == symbol_name) {
                throw new SymbolNameTakenException(`Symbol '${symbol_name}' already exists in the compile-time ` +
                    `environment`);
            }
        });

        // Add symbol to compile-time environment
        this.symbols.push(new CSymbol(symbol_name, type, pointer_depth));
    }

    private name_is_reserved(symbol_name: string) : boolean {
        // Check if name is reserved in current frame
        if (this.reserved_names.has(symbol_name)) {
            return true;
        } else if (this.parent_frame === null) {
            return false;
        }
        return this.parent_frame.name_is_reserved(symbol_name);
    }

    /**
     * Gets the position of the given symbol
     * @param symbol_name The name of the symbol
     * @throws SymbolNotFoundException Thrown if the symbol was not found and it is not expected to be added
     */
    public get_position(symbol_name: string) : EnvironmentPosition {
        // Ensure name is not reserved
        if (this.name_is_reserved(symbol_name)) {
            throw new SymbolNameTakenException(`Symbol '${symbol_name}' is reserved elsewhere by the program`)
        }

        // Get position
        const new_position = this.rec_get_position(symbol_name);

        if (new_position !== CompileTimeEnvironment.invalid_position) {
            return new_position;
        }
        // Throw error for compiler to deal with
        throw new SymbolNotFoundException(`Symbol '${symbol_name}' was not found in the compile-time environment`);
    }

    private rec_get_position(symbol_name: string) : EnvironmentPosition {
        // Try to find variable in current frame
        for (let i = 0; i < this.symbols.length; i++) {
            if (this.symbols[i].name === symbol_name) {
                return new EnvironmentPosition(this.env_depth, i);
            }
        }

        if (this.parent_frame !== null) { // Check for existence in parent frame
            return this.parent_frame.rec_get_position(symbol_name);
        }

        // Symbol was not found and it is the last environment
        return CompileTimeEnvironment.invalid_position;
    }
}

/**
 * Thrown when a symbol is not found in the compile-time environment
 */
export class SymbolNotFoundException extends Error {
    /**
     * Constructs a new SymbolNotFoundException instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "SymbolNotFoundException";
    }
}

/**
 * Thrown when a symbol name is taken by another part of the program
 */
export class SymbolNameTakenException extends Error {
    /**
     * Constructs a new SymbolNameTakenException instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "SymbolNameTakenException";
    }
}