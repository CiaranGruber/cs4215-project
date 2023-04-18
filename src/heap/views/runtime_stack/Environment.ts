/**
 * Environment
 *
 * Represents an environment within C containing information about variables
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import {SegmentationFaultError} from "../../RestrictedHeap";
import VariableDeclaration from "../../../explicit-control-evaluator/VariableDeclaration";
import VariableMem from "./VariableMem";
import CMemoryTag, {CMemoryTagValue} from "../base/CMemoryTag";
import {VariableNotFoundError} from "./Stack";
import CValue from "../../../explicit-control-evaluator/CValue";

/**
 * Represents an environment containing information about variables
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>x × VariableMem.byte_length - The variables stored within the environment</li>
 * </ul>
 * or (if empty):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>CMemoryTag.byte_length - The empty environment tag</li>
 * </ul>
 */
export default class Environment {
    private static readonly variable_offset = 0;
    private static readonly empty_tag_offset = 0;
    private data: HeapDataView;

    private constructor(data: HeapDataView) {
        this.data = data;
    }

    /**
     * Gets the number of bytes taken up by an empty environment
     */
    public static get empty_byte_length(): number {
        return CMemoryTag.byte_length;
    }

    /**
     * Determines if the given environment is empty or not
     */
    public is_empty(): boolean {
        if (this.data.is_not_protected(0, CMemoryTag.byte_length)) {
            return false;
        }
        return CMemoryTag.from_existing(this.data.subset(0, CMemoryTag.byte_length)).tag ==
            CMemoryTagValue.EMPTY_ENVIRONMENT;
    }

    /**
     * Gets the given variable from the environment if it exists
     * @param name The name of the variable to find
     * @returns The VariableMem if one matching the name is found and declared, else undefined
     */
    public get_variable(name: string): CValue {
        if (this.is_empty()) {
            return undefined;
        }
        let offset = Environment.variable_offset;
        // Search for the variable
        while (offset < this.data.byte_length) {
            // Find out the appropriate view for the variable
            const variable_header_view = this.data.subset(offset, VariableMem.fixed_byte_length);
            const variable_size = VariableMem.get_size(variable_header_view);
            const variable_view = this.data.subset(offset, variable_size);
            // Get the complete variable view
            const variable = VariableMem.from_existing(variable_view);
            // Determine if the given variable is both declared and matches the required name
            if (variable.is_name(name)) {
                return variable.is_declared ? variable.value : undefined;
            }
            offset += variable_size;
        }
        return undefined;
    }

    /**
     * Declares the given variable in the environment without setting a value
     * @param name The name of the variable to declare
     */
    public declare_variable(name: string);

    /**
     * Declares the given variable in the environment and sets its value
     * @param name The name of the variable to declare
     * @param value The value to set during the declaration
     */
    public declare_variable(name: string, value: CValue);

    public declare_variable(name: string, value?: CValue): void {
        if (this.is_empty()) {
            throw new VariableNotFoundError(`The variable ${name} is not present in the current environment`);
        }
        let offset = Environment.variable_offset;
        // Search for the variable
        while (offset < this.data.byte_length) {
            // Find out the appropriate view for the variable
            const variable_header_view = this.data.subset(offset, VariableMem.fixed_byte_length);
            const variable_size = VariableMem.get_size(variable_header_view);
            const variable_view = this.data.subset(offset, variable_size);
            // Get the complete variable view
            const variable = VariableMem.from_existing(variable_view);
            // Declare the given variable
            if (variable.is_name(name)) {
                if (variable.is_declared) {
                    throw new VariableAlreadyDeclaredError(`The variable ${name} has already been declared in the 
                    environment`);
                }
                variable.declare();
                // Set value if relevant
                if (value) {
                    const heap_view = variable.data_view;
                    heap_view.set_value(value.cast_to(variable.type_info).data);
                }
                return;
            }
            offset += variable_size;
        }
    }

    /**
     * Allocates an environment in the given heap view
     * @param view The view used to change the heap values
     * @param variables The variables to allocate for in the environment
     */
    public static allocate_value(view: HeapDataView, variables: Array<VariableDeclaration>): Environment {
        const environment = new Environment(view);
        const environment_size = this.size_required(variables);
        // Ensure the data is not already protected
        if (!view.is_not_protected(0, environment_size)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Store empty tag if there are no variables
        if (variables.length === 0) {
            CMemoryTag.allocate_value(view.subset(this.empty_tag_offset, CMemoryTag.byte_length),
                CMemoryTagValue.EMPTY_ENVIRONMENT);
            // Protect environment
            view.protect(0, environment_size);
            return environment;
        }
        // Store variable information
        let offset = this.variable_offset;
        variables.forEach((value) => {
            const size_required = VariableMem.size_required(value);
            const variable_view = environment.data.subset(offset, size_required);
            VariableMem.allocate_value(variable_view, value);
            offset += size_required;
        });
        return environment;
    }

    /**
     * Determines the required size of the environment
     * @param variables The variables to be used within the environment
     */
    public static size_required(variables: Array<VariableDeclaration>) {
        if (variables.length === 0) {
            return Environment.empty_byte_length;
        }
        return variables.map((value) => VariableMem.size_required(value))
            .reduce((previousValue, currentValue) => previousValue + currentValue)
    }

    /**
     * Initialises a new Environment view from an existing value
     * @param view The view for the Environment to build from
     */
    public static from_existing(view: HeapDataView): Environment {
        return new Environment(view);
    }
}

/**
 * Thrown when the given variable has already been declared within the environment
 */
export class VariableAlreadyDeclaredError extends Error {
    /**
     * Constructs a new VariableAlreadyDeclaredError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "VariableAlreadyDeclaredError";
    }
}