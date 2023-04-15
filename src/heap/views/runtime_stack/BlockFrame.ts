/**
 * BlockFrame
 *
 * Represents a block frame within C which contains details about the block frame
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import {SegmentationFaultError} from "../../RestrictedHeap";
import Environment from "./Environment";
import VariableDeclaration from "../../../explicit-control-evaluator/VariableDeclaration";
import Stash from "./Stash";
import MemoryHandler, {MemoryCaller, UnknownCallerError} from "../../MemoryHandler";
import FrameHeader from "./FrameHeader";
import {CMemoryTagValue} from "../base/CMemoryTag";

/**
 * Represents a block frame describing the information of a given pointer/scope
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>FrameHeader.byte_length - The frame header information</li>
 *     <li>x bytes - The environment</li>
 *     <li>x bytes - The stash</li>
 * </ul>
 */
export default class BlockFrame implements MemoryHandler {
    private static readonly frame_header_offset = 0;
    private static get environment_offset() { return BlockFrame.frame_header_offset + FrameHeader.byte_length; }
    private get stash_offset() { return BlockFrame.environment_offset + this.header.env_size; }
    private memory_handler: MemoryHandler;
    private data: HeapDataView;

    private constructor(data: HeapDataView, memory_handler: MemoryHandler) {
        this.data = data;
        this.memory_handler = memory_handler;
    }

    /**
     * Gets the byte offset of the block frame in memory
     */
    public get byte_offset() {
        return this.data.byte_offset;
    }

    /**
     * Gets the length in bytes of the block frame
     */
    public get byte_length() {
        return BlockFrame.fixed_byte_length + this.header.env_size + this.header.stash_size;
    }

    /**
     * Gets the length in bytes of a block frame based upon the header
     */
    public static byte_length(view: HeapDataView) {
        return BlockFrame.from_existing(view, undefined).byte_length;
    }

    /**
     * Gets the fixed size of a MallocVar value
     */
    public static get fixed_byte_length(): number {
        return FrameHeader.byte_length;
    }

    /**
     * Gets the address of the previous frame
     */
    public get prev_frame_offset(): number {
        return this.header.prev_frame_offset;
    }

    /**
     * Gets the stash associated with the given block frame
     */
    public get stash(): Stash {
        return Stash.from_existing(this.data.subset(this.stash_offset, this.header.stash_size), this);
    }

    /**
     * Gets the environment associated with the block frame
     */
    public get environment(): Environment {
        return Environment.from_existing(this.data.subset(BlockFrame.environment_offset, this.header.env_size));
    }

    private get header_view(): HeapDataView {
        return this.data.subset(BlockFrame.frame_header_offset, FrameHeader.byte_length);
    }

    private get header(): FrameHeader {
        return FrameHeader.from_existing(this.header_view);
    }

    /**
     * Allocates a block frame in the given heap view
     * @param view The view used to change the heap values
     * @param prev_frame_addr The address to the previous frame
     * @param declared_variables The array of variables that are to be declared
     * @param memory_handler The memory handler to be used if the BlockFrame needs to adjust memory size
     */
    public static allocate_value(view: HeapDataView, prev_frame_addr: number,
                                 declared_variables: Array<VariableDeclaration>,
                                 memory_handler: MemoryHandler): BlockFrame {
        const block_frame = new BlockFrame(view, memory_handler);
        const environment_size = Environment.size_required(declared_variables);
        const stash_size = Stash.fixed_byte_length;
        const total_size = BlockFrame.fixed_byte_length + environment_size + stash_size;
        // Ensure the explicit_control_evaluator is not already protected
        if (!view.is_not_protected(0, total_size)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set values
        FrameHeader.allocate_value(block_frame.header_view, prev_frame_addr, CMemoryTagValue.BLOCK_FRAME,
            environment_size);
        // Allocate relevant factors
        Environment.allocate_value(view.subset(this.environment_offset, environment_size),
            declared_variables);
        Stash.allocate_value(view.subset(block_frame.stash_offset, stash_size), block_frame);
        // Protect block frame metadata
        view.protect(0, BlockFrame.fixed_byte_length);
        return block_frame;
    }

    /**
     * Determines the size that a block frame would require for initial allocation
     * @param declared_variables The declared variables
     */
    public static size_required(declared_variables: Array<VariableDeclaration>) {
        const environment_size = Environment.size_required(declared_variables);
        return this.fixed_byte_length + environment_size + Stash.fixed_byte_length;
    }

    /**
     * Initialises a new BlockFrame view from an existing value
     * @param view The view for the BlockFrame to build from
     * @param memory_handler The memory handler used if the block frame needs to adjust memory size
     */
    public static from_existing(view: HeapDataView, memory_handler: MemoryHandler): BlockFrame {
        return new BlockFrame(view, memory_handler);
    }

    reduce_memory(memory_reduction: number, caller: MemoryCaller): HeapDataView {
        if (caller !== MemoryCaller.STASH) {
            throw new UnknownCallerError("The only viable memory caller for a BlockFrame is the Stash");
        }

        // Check stash size limitations
        const stash_size = this.header.stash_size;
        if (stash_size - memory_reduction < Stash.fixed_byte_length) {
            throw new SegmentationFaultError("The size of the stash cannot be reduced by more than the minimum stash " +
                "size");
        }

        // Adjust memory
        this.data = this.memory_handler.reduce_memory(memory_reduction, MemoryCaller.BLOCK_FRAME);
        this.header.stash_size = stash_size - memory_reduction;
        return this.data.subset(this.stash_offset, stash_size - memory_reduction);
    }

    request_memory(additional_memory_required: number, caller: MemoryCaller): HeapDataView {
        if (caller !== MemoryCaller.STASH) {
            throw new UnknownCallerError("The only viable memory caller for a BlockFrame is the Stash");
        }

        // Adjust memory
        this.data = this.memory_handler.request_memory(additional_memory_required, MemoryCaller.BLOCK_FRAME);
        this.header.stash_size += additional_memory_required;
        return this.data.subset(this.stash_offset, this.header.stash_size);
    }
}