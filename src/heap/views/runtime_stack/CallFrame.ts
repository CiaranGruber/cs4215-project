/**
 * CallFrame
 *
 * Represents a blockframe within C which contains details about the block frame
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import {SegmentationFaultError} from "../../RestrictedHeap";
import Environment from "./Environment";
import VariableDeclaration from "../../../explicit-control-evaluator/VariableDeclaration";
import TypeInformation from "../../../type_descriptions/TypeInformation";
import TypeInfoView from "../type_data/TypeInfoView";
import Stash from "./Stash";
import MemoryHandler, {MemoryCaller, UnknownCallerError} from "../../MemoryHandler";
import UInt16 from "../../../data_views/UInt16";
import FrameHeader from "./FrameHeader";
import {CMemoryTagValue} from "../base/CMemoryTag";

/**
 * Represents a call frame describing the information of a given pointer/scope
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>FrameHeader.byte_length - The frame header information</li>
 *     <li>2 bytes - The size of the return type information</li>
 *     <li>x bytes - The return type</li>
 *     <li>x bytes - The environment</li>
 *     <li>x bytes - The stash</li>
 * </ul>
 */
export default class CallFrame implements MemoryHandler {
    private static readonly frame_header_offset = 0;
    private static get return_type_size_offset() { return FrameHeader.byte_length; }
    private static readonly return_type_size_length = UInt16.byte_length;
    private static get return_type_offset() { return CallFrame.return_type_size_offset + CallFrame.return_type_size_length; }
    private get environment_offset() { return CallFrame.return_type_offset + this.return_type_size; }
    private get stash_offset() { return this.environment_offset + this.header.env_size; }
    private memory_handler: MemoryHandler;
    private data: HeapDataView;

    private constructor(data: HeapDataView, memory_handler: MemoryHandler) {
        this.data = data;
        this.memory_handler = memory_handler;
    }

    /**
     * Gets the byte offset of the call frame in memory
     */
    public get byte_offset() {
        return this.data.byte_offset;
    }

    /**
     * Gets the length in bytes of the call frame
     */
    public get byte_length() {
        return CallFrame.fixed_byte_length + this.return_type_size + this.header.env_size + this.header.stash_size;
    }

    /**
     * Gets the length in bytes of the call frame based upon the header
     */
    public static byte_length(view: HeapDataView) {
        return CallFrame.from_existing(view, undefined).byte_length;
    }

    /**
     * Gets the fixed size of a MallocVar value
     */
    public static get fixed_byte_length(): number {
        return FrameHeader.byte_length + this.return_type_size_length;
    }

    private get return_type_view(): HeapDataView {
        return this.data.subset(CallFrame.return_type_offset, this.return_type_size);
    }

    /**
     * Gets the address of the previous frame
     */
    public get prev_frame_offset(): number {
        return this.header.prev_frame_offset;
    }

    /**
     * Gets the return type of the function
     */
    public get return_type(): TypeInformation {
        return TypeInfoView.from_existing(this.return_type_view).type_information;
    }

    /**
     * Gets the stash associated with the given call frame
     */
    public get stash(): Stash {
        return Stash.from_existing(this.data.subset(this.stash_offset, this.header.stash_size), this);
    }

    /**
     * Gets the environment associated with the call frame
     */
    public get environment(): Environment {
        return Environment.from_existing(this.data.subset(this.environment_offset, this.header.env_size));
    }

    private get return_type_size_view(): UInt16 {
        return new UInt16(this.data.subset(CallFrame.return_type_size_offset, CallFrame.return_type_size_length),
            true);
    }

    private get return_type_size(): number {
        return this.return_type_size_view.value;
    }

    private set return_type_size(return_size: number) {
        this.return_type_size_view.value = return_size;
    }

    private get header_view(): HeapDataView {
        return this.data.subset(CallFrame.frame_header_offset, FrameHeader.byte_length);
    }

    private get header(): FrameHeader {
        return FrameHeader.from_existing(this.header_view);
    }

    /**
     * Gets a string representing the information about the call frame
     */
    public pretty_string(): string {
        let string = "";
        const divider = "---------------------\n";
        string += "Type: Call Frame\n";
        string += `Previous Frame Offset: ${this.prev_frame_offset}\n`;
        string += `Frame Offset: ${this.byte_offset}\n`;
        string += `Frame Size: ${this.byte_length}\n`;
        string += `Return Type: ${this.return_type.to_string()}\n`;
        string += divider;
        string += "Environment\n";
        string += this.environment.pretty_string();
        string += "\n";
        string += divider;
        string += "Stash\n";
        string += this.stash.pretty_string();
        return string;
    }

    /**
     * Allocates a call frame in the given heap view
     * @param view The view used to change the heap values
     * @param prev_frame_addr The address to the previous frame
     * @param return_type The address to the return type of the frame
     * @param declared_variables The array of variables that are to be declared
     * @param memory_handler The memory handler to be used if the CallFrame needs to adjust memory size
     */
    public static allocate_value(view: HeapDataView, prev_frame_addr: number, return_type: TypeInformation,
                                 declared_variables: Array<VariableDeclaration>, memory_handler: MemoryHandler): CallFrame {
        const call_frame = new CallFrame(view, memory_handler);
        const return_size = TypeInfoView.size_required(return_type);
        const environment_size = Environment.size_required(declared_variables);
        const stash_size = Stash.fixed_byte_length;
        const total_size = CallFrame.fixed_byte_length + environment_size + stash_size + return_size;
        // Ensure the data is not already protected
        if (!view.is_not_protected(0, total_size)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set values
        FrameHeader.allocate_value(call_frame.header_view, prev_frame_addr, CMemoryTagValue.CALL_FRAME,
            environment_size);
        call_frame.return_type_size = return_size;
        // Allocate relevant factors
        TypeInfoView.allocate_value(call_frame.return_type_view, return_type);
        Environment.allocate_value(view.subset(call_frame.environment_offset, environment_size),
            declared_variables);
        Stash.allocate_value(view.subset(call_frame.stash_offset, stash_size), call_frame);
        // Protect call frame metadata
        view.protect(0, CallFrame.fixed_byte_length);
        return call_frame;
    }

    /**
     * Determines the size that a call frame would require for initial allocation
     * @param return_type The return type of the call frame
     * @param declared_variables The declared variables
     */
    public static size_required(return_type: TypeInformation, declared_variables: Array<VariableDeclaration>) {
        const return_type_size = TypeInfoView.size_required(return_type);
        const environment_size = Environment.size_required(declared_variables);
        return this.fixed_byte_length + return_type_size + environment_size + Stash.fixed_byte_length;
    }

    /**
     * Initialises a new CallFrame view from an existing value
     * @param view The view for the CallFrame to build from
     * @param memory_handler The memory handler used if the call frame needs to adjust memory size
     */
    public static from_existing(view: HeapDataView, memory_handler: MemoryHandler): CallFrame {
        return new CallFrame(view, memory_handler);
    }

    reduce_memory(memory_reduction: number, caller: MemoryCaller): HeapDataView {
        if (caller !== MemoryCaller.STASH) {
            throw new UnknownCallerError("The only viable memory caller for a CallFrame is the Stash");
        }

        // Check stash size limitations
        const stash_size = this.header.stash_size;
        if (stash_size - memory_reduction < Stash.fixed_byte_length) {
            throw new SegmentationFaultError("The size of the stash cannot be reduced by more than the minimum stash " +
                "size");
        }

        // Adjust memory
        this.data = this.memory_handler.reduce_memory(memory_reduction, MemoryCaller.CALL_FRAME);
        this.header.stash_size = stash_size - memory_reduction;
        return this.data.subset(this.stash_offset, stash_size - memory_reduction);
    }

    request_memory(additional_memory_required: number, caller: MemoryCaller): HeapDataView {
        if (caller !== MemoryCaller.STASH) {
            throw new UnknownCallerError("The only viable memory caller for a CallFrame is the Stash");
        }

        // Adjust memory
        this.data = this.memory_handler.request_memory(additional_memory_required, MemoryCaller.CALL_FRAME);
        this.header.stash_size += additional_memory_required;
        return this.data.subset(this.stash_offset, this.header.stash_size);
    }
}