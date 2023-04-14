/**
 * Stack
 *
 * Represents the stack within C memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import HeapDataView from "../../HeapDataView";
import Blockframe from "./Blockframe";
import TypeInformation from "../../../type_descriptions/TypeInformation";
import MemoryHandler, {MemoryCaller, UnknownCallerError} from "../../MemoryHandler";
import VariableDeclaration from "../../../explicit-control-evaluator/VariableDeclaration";
import {SegmentationFaultError} from "../../RestrictedHeap";
import CValue from "../../../explicit-control-evaluator/CValue";
import Int32 from "../data/Int32";
import Stash from "./Stash";

/**
 * Represents a view of the C stack memory
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>4 bytes - The current blockframe in the stack</li>
 *     <li>x × Blockframe.byte_length - The blockframes within the stack</li>
 * </ul>
 */
export default class Stack implements MemoryHandler {
    private static readonly curr_frame_offset_offset = 0;
    private static readonly curr_frame_offset_length = Int32.byte_length;
    private memory_handler: MemoryHandler;
    private data: HeapDataView;

    private constructor(data: HeapDataView, memory: MemoryHandler) {
        this.data = data;
        this.memory_handler = memory;
    }

    /**
     * Gets the stash from the current blockframe
     */
    public get stash(): Stash {
        const blockframe = this.blockframe;
        if (blockframe === undefined) {
            throw new NothingOnStackError("No blockframes are currently on the stack (Therefore no stash)");
        }
        return blockframe.stash;
    }

    /**
     * Gets the fixed size of a Stack in memory
     */
    public static get fixed_byte_length() {
        return this.curr_frame_offset_length;
    }

    private get curr_frame_offset_view(): Int32 {
        return new Int32(this.data.subset(Stack.curr_frame_offset_offset, Stack.curr_frame_offset_length),
            true);
    }

    private get curr_frame_offset(): number {
        return this.curr_frame_offset_view.value;
    }

    private set curr_frame_offset(new_offset: number) {
        this.curr_frame_offset_view.value = new_offset;
    }

    public get is_empty() {
        return this.curr_frame_offset === -1;
    }

    public declare_variable(name: string) {
        const curr_offset = this.curr_frame_offset;
        const frame_size = Blockframe.byte_length(this.data.subset(curr_offset, Blockframe.fixed_byte_length));
        const frame = Blockframe.from_existing(this.data.subset(curr_offset, frame_size), this);
        frame.environment.declare_variable(name);
    }

    public get_variable(name: string): CValue {
        let curr_offset = this.curr_frame_offset;
        // Search for variable starting at the top frame
        while (curr_offset !== -1) {
            const frame_size = Blockframe.byte_length(this.data.subset(curr_offset, Blockframe.fixed_byte_length));
            const frame = Blockframe.from_existing(this.data.subset(curr_offset, frame_size), this);
            const variable = frame.environment.get_variable(name);
            if (variable !== undefined) {
                return variable;
            }
            curr_offset = frame.prev_frame_offset;
        }
        throw new VariableNotFoundError(`The variable ${name} was not found in any frames`);
    }

    /**
     * Gets the top-most blockframe from the stack
     * @returns The top-most blockframe, else undefined
     */
    private get blockframe(): Blockframe {
        if (this.is_empty) {
            return undefined;
        }
        const frame_offset = this.curr_frame_offset;
        const blockframe_length = Blockframe.byte_length(this.data.subset(frame_offset, Blockframe.fixed_byte_length));

        return Blockframe.from_existing(this.data.subset(frame_offset, blockframe_length), this);
    }

    /**
     * Allocates a new stack in the given heap view
     * @param view The view used to change the heap values
     * @param memory_handler The handler used by the stack to request for more memory
     */
    public static allocate_value(view: HeapDataView, memory_handler: MemoryHandler): Stack {
        const stack = new Stack(view, memory_handler);
        // Ensure the data is not already protected
        if (!view.is_not_protected(0, Stack.fixed_byte_length)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set curr_frame_offset to default
        stack.curr_frame_offset = -1;
        // Protect the stack
        view.protect(0, Stack.fixed_byte_length);
        return stack;
    }

    /**
     * Enters a scope by allocating a new blockframe with the given return type and declared variables
     * @param return_type The return type of the blockframe
     * @param declared_variables The variables that will be declared within the scope
     */
    public enter_scope(return_type: TypeInformation, declared_variables: Array<VariableDeclaration>): Blockframe {
        // Get offset information
        const prev_frame_offset = this.curr_frame_offset;
        const next_frame_offset = this.data.byte_offset + this.data.byte_length;
        this.curr_frame_offset = next_frame_offset;
        // Allocate new blockframe
        const allocate_size = Blockframe.size_required(return_type, declared_variables);
        this.data = this.memory_handler.request_memory(allocate_size, MemoryCaller.STACK);
        const allocated_view = this.data.subset(next_frame_offset, allocate_size);
        return Blockframe.allocate_value(allocated_view, prev_frame_offset, return_type, declared_variables, this);
    }

    /**
     * Exits a scope by deallocating the remaining blockframe and adding the given CValue to the base stack if possible
     */
    public exit_scope(return_value: CValue) {
        // Get the current top blockframe
        let top_blockframe = this.blockframe;
        if (top_blockframe === undefined) {
            throw new NothingOnStackError("Cannot exit scope when there is not blockframe currently present");
        }
        // Cast the return value to an appropriate alternative value
        return_value.cast_to(top_blockframe.return_type);
        // Deallocate blockframe from memory
        this.curr_frame_offset = top_blockframe.prev_frame_offset;
        this.data = this.memory_handler.reduce_memory(top_blockframe.byte_length, MemoryCaller.STACK);
        // Push return value onto stash if possible
        top_blockframe = this.blockframe;
        if (top_blockframe !== undefined) {
            top_blockframe.stash.push(return_value);
        }
    }

    /**
     * Initialises a new Stack view from an existing value
     * @param view The view for the Stack to build from
     * @param memory_handler The memory handler associated with the given stack
     */
    public static from_existing(view: HeapDataView, memory_handler: MemoryHandler): Stack {
        return new Stack(view, memory_handler);
    }

    reduce_memory(memory_reduction: number, caller: MemoryCaller): HeapDataView {
        if (caller !== MemoryCaller.BLOCK_FRAME) {
            throw new UnknownCallerError("The only viable memory caller for the Stack is a Blockframe");
        }

        // Check stash size limitations
        const blockframe_size = this.blockframe.byte_length;
        if (blockframe_size - memory_reduction < Blockframe.fixed_byte_length) {
            throw new SegmentationFaultError("The size of a blockframe cannot be reduced by more than the minimum " +
                "blockframe size");
        }

        // Adjust memory
        this.data = this.memory_handler.reduce_memory(memory_reduction, MemoryCaller.STACK);
        return this.data.subset(this.curr_frame_offset, blockframe_size - memory_reduction);
    }

    request_memory(additional_memory_required: number, caller: MemoryCaller): HeapDataView {
        if (caller !== MemoryCaller.BLOCK_FRAME) {
            throw new UnknownCallerError("The only viable memory caller for the Stack is a Blockframe");
        }

        // Adjust memory
        this.data = this.memory_handler.request_memory(additional_memory_required, MemoryCaller.STACK);
        return this.data.subset(this.curr_frame_offset,
            this.blockframe.byte_length + additional_memory_required);
    }
}

/**
 * Thrown when the stack attempts to exit scope without already being within a scope
 */
export class NothingOnStackError extends Error {
    /**
     * Constructs a new NothingOnStackError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "NothingOnStackError";
    }
}

/**
 * Thrown when the given variable is not found within the stack
 */
export class VariableNotFoundError extends Error {
    /**
     * Constructs a new VariableNotFoundError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "VariableNotFoundError";
    }
}