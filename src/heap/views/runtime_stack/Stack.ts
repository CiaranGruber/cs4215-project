/**
 * Stack
 *
 * Represents the stack within C memory
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import HeapDataView from "../../HeapDataView";
import BlockFrame from "./BlockFrame";
import TypeInformation from "../../../type_descriptions/TypeInformation";
import MemoryHandler, {MemoryCaller, UnknownCallerError} from "../../MemoryHandler";
import VariableDeclaration from "../../../explicit-control-evaluator/VariableDeclaration";
import {SegmentationFaultError} from "../../RestrictedHeap";
import CValue from "../../../explicit-control-evaluator/CValue";
import Int32 from "../../../data_views/Int32";
import Stash from "./Stash";
import FrameHeader from "./FrameHeader";
import CallFrame from "./CallFrame";
import CMemory from "../../CMemory";

/**
 * Represents a view of the C stack memory
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>4 bytes - The current block frame in the stack</li>
 *     <li>x × (CallFrame/BlockFrame).byte_length - The frames within the stack</li>
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
     * Gets the stash from the current frame
     */
    public get stash(): Stash {
        const frame_offset = this.curr_frame_offset;
        const frame = this.top_is_call_frame ? this.get_call_frame(frame_offset) : this.get_block_frame(frame_offset);
        if (frame === undefined) {
            throw new NothingOnStackError("No frames are currently on the stack (Therefore there is no stash)");
        }
        return frame.stash;
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

    /**
     * Determines whether the stack is currently empty
     */
    public get is_empty() {
        return this.curr_frame_offset === -1;
    }

    /**
     * Declares a variable without setting the value
     * @param name The name of the variable to declare
     * @param memory The memory used for C
     */
    public declare_variable(name: string, memory: CMemory): void;

    /**
     * Declares the variable with the set value
     * @param name The name of the value
     * @param memory The memory used for C
     * @param value The value to declare with
     */
    public declare_variable(name: string, memory: CMemory, value: CValue): void;

    public declare_variable(name: string, memory: CMemory, value?: CValue): void {
        const curr_offset = this.curr_frame_offset;
        const is_call_frame = FrameHeader.is_call_frame(this.data.subset(curr_offset, FrameHeader.byte_length));
        const frame = is_call_frame ? this.get_call_frame(curr_offset) : this.get_block_frame(curr_offset);
        frame.environment.declare_variable(name, memory, value);
    }

    public get_variable(name: string): CValue {
        let curr_offset = this.curr_frame_offset;
        // Search for variable starting at the top frame
        while (curr_offset !== -1) {
            const is_call_frame = FrameHeader.is_call_frame(this.data.subset(curr_offset, FrameHeader.byte_length));
            const frame = is_call_frame ? this.get_call_frame(curr_offset) : this.get_block_frame(curr_offset);
            const variable = frame.environment.get_variable(name);
            if (variable) {
                return variable;
            }
            // If it is a function call, get the variable from the global environment
            curr_offset = is_call_frame ? Stack.fixed_byte_length : frame.prev_frame_offset;
        }
        throw new VariableNotFoundError(`The variable ${name} was not found in any frames`);
    }

    private get top_is_call_frame(): boolean {
        if (this.is_empty) {
            return undefined;
        }

        return FrameHeader.is_call_frame(this.data.subset(this.curr_frame_offset, FrameHeader.byte_length));
    }

    /**
     * Gets the block frame from the stack at the specified offset
     * @returns The top-most block frame, else undefined
     */
    private get_block_frame(offset: number): BlockFrame {
        if (this.is_empty) {
            return undefined;
        }
        const frame_length = BlockFrame.byte_length(this.data.subset(offset, BlockFrame.fixed_byte_length));

        return BlockFrame.from_existing(this.data.subset(offset, frame_length), this);
    }

    /**
     * Gets the call frame from the stack at the specified offset
     * @returns The top-most call frame, else undefined
     */
    private get_call_frame(offset: number): CallFrame {
        if (this.is_empty) {
            return undefined;
        }
        const frame_length = CallFrame.byte_length(this.data.subset(offset, CallFrame.fixed_byte_length));

        return CallFrame.from_existing(this.data.subset(offset, frame_length), this);
    }

    /**
     * Gets a string representing the information about the stack
     */
    public pretty_string(): string {
        let string = "";
        const divider = "=============================\n";
        // Get the frames
        const frames: Array<CallFrame | BlockFrame> = [];
        let curr_offset = this.curr_frame_offset;
        // Search for variable starting at the top frame
        while (curr_offset !== -1) {
            const is_call_frame = FrameHeader.is_call_frame(this.data.subset(curr_offset, FrameHeader.byte_length));
            const frame = is_call_frame ? this.get_call_frame(curr_offset) : this.get_block_frame(curr_offset);
            frames.push(frame);
            // If it is a function call, get the variable from the global environment
            curr_offset = frame.prev_frame_offset;
        }
        // Prints the string
        string += `Frames: ${frames.length}\n`;
        string += `Offset: ${this.data.byte_offset}\n`;
        string += `Size: ${this.data.byte_length}\n`;
        let i = 1;
        while (frames.length > 0) {
            const frame = frames.pop();
            string += divider;
            string += `Frame ${i++}\n`
            string += frame.pretty_string();
            string += "\n";
        }
        return string;
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
     * Enters a block by allocating a new block frame with the given declared variables
     * @param declared_variables The variables that will be declared within the scope
     */
    public enter_block(declared_variables: Array<VariableDeclaration>): void {
        // Get offset information
        const prev_frame_offset = this.curr_frame_offset;
        const next_frame_offset = this.data.byte_offset + this.data.byte_length;
        this.curr_frame_offset = next_frame_offset;
        // Allocate new call frame
        const allocate_size = BlockFrame.size_required(declared_variables);
        this.data = this.memory_handler.request_memory(allocate_size, MemoryCaller.STACK);
        const allocated_view = this.data.subset(next_frame_offset, allocate_size);
        BlockFrame.allocate_value(allocated_view, prev_frame_offset, declared_variables, this);
    }

    /**
     * Enters a function call by allocating a new call frame with the given return type and declared variables
     * @param return_type The return type of the call frame
     * @param declared_variables The variables that will be declared within the scope
     */
    public enter_call(return_type: TypeInformation, declared_variables: Array<VariableDeclaration>): void {
        // Get offset information
        const prev_frame_offset = this.curr_frame_offset;
        const next_frame_offset = this.data.byte_offset + this.data.byte_length;
        this.curr_frame_offset = next_frame_offset;
        // Allocate new call frame
        const allocate_size = CallFrame.size_required(return_type, declared_variables);
        this.data = this.memory_handler.request_memory(allocate_size, MemoryCaller.STACK);
        const allocated_view = this.data.subset(next_frame_offset, allocate_size);
        CallFrame.allocate_value(allocated_view, prev_frame_offset, return_type, declared_variables, this);
    }

    /**
     * Exits a scope by deallocating the remaining frame and if it is a function, returning the last value on the stash
     * or void
     */
    public exit_scope(memory: CMemory) {
        // Get the current frame
        let is_call_frame = this.top_is_call_frame;
        if (is_call_frame === undefined) {
            throw new NothingOnStackError("Cannot exit scope when there is not block frame currently present");
        }
        const frame_offset = this.curr_frame_offset;
        const frame = is_call_frame ? this.get_call_frame(frame_offset) : this.get_block_frame(frame_offset);
        // Get return value to push onto stash if possible
        let return_value: CValue;
        if (is_call_frame) {
            const return_type = (frame as CallFrame).return_type;
            if (frame.stash.is_empty) {
                return_value = new CValue(false, return_type, return_type.default_value());
            } else {
                return_value = frame.stash.pop();
                return_value = return_value.cast_to(memory, return_type);
            }
        }

        // Move frame offset
        this.curr_frame_offset = frame.prev_frame_offset;

        // Deallocate frame from memory
        this.data = this.memory_handler.reduce_memory(frame.byte_length, MemoryCaller.STACK);

        // Push onto stash of previous frame
        if (is_call_frame) {
            const frame_offset = this.curr_frame_offset;
            const top_frame = this.top_is_call_frame ? this.get_call_frame(frame_offset) : this.get_block_frame(frame_offset);
            if (top_frame) {
                top_frame.stash.push(return_value);
            }
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
        if (caller !== MemoryCaller.BLOCK_FRAME && caller !== MemoryCaller.CALL_FRAME) {
            throw new UnknownCallerError("The only viable memory caller for the Stack is a CallFrame or a BlockFrame");
        }

        // Check stash size limitations
        const is_call_frame = this.top_is_call_frame;
        const frame_offset = this.curr_frame_offset;
        const frame = is_call_frame ? this.get_call_frame(frame_offset) : this.get_block_frame(frame_offset);
        const frame_size = frame.byte_length;
        const minimum_size = is_call_frame ? CallFrame.fixed_byte_length : BlockFrame.fixed_byte_length
        if (frame_size - memory_reduction < minimum_size) {
            throw new SegmentationFaultError("The size of a frame cannot be reduced by more than its fixed byte length");
        }

        // Adjust memory
        this.data = this.memory_handler.reduce_memory(memory_reduction, MemoryCaller.STACK);
        return this.data.subset(this.curr_frame_offset, frame_size - memory_reduction);
    }

    request_memory(additional_memory_required: number, caller: MemoryCaller): HeapDataView {
        if (caller !== MemoryCaller.BLOCK_FRAME && caller !== MemoryCaller.CALL_FRAME) {
            throw new UnknownCallerError("The only viable memory caller for the Stack is a CallFrame or a BlockFrame");
        }

        // Adjust memory
        this.data = this.memory_handler.request_memory(additional_memory_required, MemoryCaller.STACK);
        const frame_offset = this.curr_frame_offset;
        const frame = this.top_is_call_frame ? this.get_call_frame(frame_offset) : this.get_block_frame(frame_offset);
        return this.data.subset(this.curr_frame_offset,frame.byte_length + additional_memory_required);
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