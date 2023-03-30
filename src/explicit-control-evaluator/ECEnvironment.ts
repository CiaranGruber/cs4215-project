/**
 * ECEnvironment
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */
import {BasicTypeMultiset} from "../compiler/TypeManagement";
import {UninitialisedValue} from "./CValue";

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
     * Assumptions:
     *  - array_index is ignored if the value is not an array
     */
    constructor(env_depth: number, value_index: number) {
        this.env_depth = env_depth;
        this.value_index = value_index;
    }
}

/**
 * Represents a Symbol within the Environment
 */
class CSymbol {
    public readonly name: string;
    private _type: BasicTypeMultiset;
    public readonly pointer_depth: number;
    private is_initialised: boolean;
    private _value: ArrayBuffer;

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
        this._value = UninitialisedValue.new_unitialised_value();
        this.is_initialised = false;
    }

    /**
     * Gets the type representing the C symbol
     */
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

    /**
     * Sets the value specified by the symbol
     * @param value The value to set for the symbol
     */
    set value(value: ArrayBuffer) {
        this.is_initialised = true;
        this._value = value;
    }

    /**
     * Gets the CValueOld used to represent the value buffer
     */
    get value(): ArrayBuffer {
        if (this.is_initialised) {
            throw new ValueNotInitialisedException(`Variable ${this.name} has not been initialised`);
        }
        return this._value;
    }
}

/**
 * Represents the environment as used by the C explicit-control evaluator
 */
export default class ECEnvironment {
    /**
     * The current depth of the compile time environment (Ie. number of parent frames)
     * @private
     */
    private env_depth: number;
    /**
     * The parent frame
     * @private
     */
    private parent_frame: ECEnvironment;
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
    public extend() : ECEnvironment {
        const newCTE = new ECEnvironment();
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
    public add_symbol(symbol_name: string, type: BasicTypeMultiset, pointer_depth: number): void {
        // Ensure name is not reserved
        if (this.name_is_reserved(symbol_name)) {
            throw new SymbolNameTakenException(`Symbol '${symbol_name}' is reserved elsewhere by the program`)
        }

        // Ensure symbol does not already exist in current frame
        this.symbols.forEach((value) => {
            if (value.name == symbol_name) {
                throw new SymbolNameTakenException(`Symbol '${symbol_name}' already exists in the compile-time ` +
                    `environment`);
            }
        });

        // Add symbol to compile-time environment
        this.symbols.push(new CSymbol(symbol_name, type, pointer_depth));
    }

    /**
     * Gets the given symbol based upon a set position
     * @param position The position of the symbol
     * Assumptions:
     * <li>A symbol at the given position is present within the environment</li>
     */
    public get_symbol(position: EnvironmentPosition): ArrayBuffer {
        if (this.env_depth == position.env_depth) { // Variable is in current environment
            return this.symbols[position.value_index].value;
        }

        // Return symbol in a parent frame
        return this.parent_frame.get_symbol(position);
    }

    /**
     * Sets the value of the specific symbol
     * @param position The position of the symbol to set
     * @param value The value to set the symbol to
     * Assumptions:
     * <li>A symbol at the given position is present within the environment</li>
     */
    public set_symbol(position: EnvironmentPosition, value: ArrayBuffer) {
        if (this.env_depth == position.env_depth) { // Variable is in current environment
            this.symbols[position.value_index].value = value;
            return;
        }

        // Set the symbol in a parent frame
        this.parent_frame.set_symbol(position, value);
    }

    /**
     * Gets the position of the given symbol
     * @param symbol_name The name of the symbol
     * @throws SymbolNotFoundException Thrown if the symbol was not found, and it is not expected to be added
     */
    public get_position(symbol_name: string) : EnvironmentPosition {
        // Try to find variable in current frame
        for (let i = 0; i < this.symbols.length; i++) {
            if (this.symbols[i].name === symbol_name) {
                return new EnvironmentPosition(this.env_depth, i);
            }
        }

        if (this.parent_frame !== null) { // Check for existence in parent frame
            return this.parent_frame.get_position(symbol_name);
        }

        // Symbol was not found and it is the last environment
        throw new SymbolNotFoundException(`Symbol '${symbol_name}' was not found in the compile-time environment`);
    }

    private name_is_reserved(symbol_name: string) : boolean {
        // Check if name is reserved in current frame
        if (this.reserved_names.has(symbol_name)) {
            return true;
        } else if (this.parent_frame === null) {
            return false;
        }
        // Check if it is reserved in a parent frame
        return this.parent_frame.name_is_reserved(symbol_name);
    }
}

/**
 * Thrown when a value has not been initialised yet
 */
export class ValueNotInitialisedException extends Error {
    /**
     * Constructs a new ValueNotInitialisedException instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "ValueNotInitialisedException";
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