/**
 * Blockframe
 *
 * Represents a blockframe within C which contains details about the block frame
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import PointerView from "../base/PointerView";
import {SegmentationFaultError} from "../../RestrictedHeap";
import Environment from "./Environment";
import VariableDeclaration from "../../../explicit-control-evaluator/VariableDeclaration";
import TypeInformation from "../../../type_descriptions/TypeInformation";
import TypeInfoView from "../type_data/TypeInfoView";
import Stash from "./Stash";
import MemoryHandler, {MemoryCaller, UnknownCallerError} from "../../MemoryHandler";
import UInt16 from "../data/UInt16";
import UInt32 from "../data/UInt32";

/**
 * Represents a blockframe describing the information of a given pointer/scope
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>2 bytes - The size of the return type information</li>
 *     <li>4 bytes - The size of the environment</li>
 *     <li>4 bytes - The size of the stash</li>
 *     <li>Pointer.byte_length - The address of the previous scope definition</li>
 *     <li>x bytes - The return type</li>
 *     <li>x bytes - The environment</li>
 *     <li>x bytes - The stash</li>
 * </ul>
 */
export default class Blockframe implements MemoryHandler {
    private static readonly return_type_size_offset = 0;
    private static readonly return_type_size_length = UInt16.byte_length;
    private static readonly env_size_offset = Blockframe.return_type_size_offset + Blockframe.return_type_size_length;
    private static readonly env_size_length = UInt32.byte_length;
    private static readonly stash_size_offset = Blockframe.env_size_offset + Blockframe.env_size_length;
    private static readonly stash_size_length = UInt32.byte_length;
    private static readonly prev_frame_offset = Blockframe.stash_size_offset + Blockframe.stash_size_length;
    private static get return_type_offset() { return Blockframe.prev_frame_offset + PointerView.byte_length; }
    private get environment_offset() { return Blockframe.return_type_offset + this.return_type_size; }
    private get stash_offset() { return this.environment_offset + this.env_size; }
    private memory_handler: MemoryHandler;
    private data: HeapDataView;

    private constructor(data: HeapDataView, memory_handler: MemoryHandler) {
        this.data = data;
        this.memory_handler = memory_handler;
    }

    /**
     * Gets the length in bytes of the blockframe
     */
    public get byte_length() {
        return Blockframe.fixed_byte_length + this.return_type_size + this.env_size + this.stash_size;
    }

    /**
     * Gets the byte offset of the blockframe in memory
     */
    public get byte_offset() {
        return this.data.byte_offset;
    }

    /**
     * Gets the byte length of a blockframe with data specified within the given view
     * @param view The view containing the blockframe data
     */
    public static byte_length(view: HeapDataView): number {
        return Blockframe.from_existing(view, undefined).byte_length;
    }

    /**
     * Gets the fixed size of a MallocVar value
     */
    public static get fixed_byte_length(): number {
        return this.return_type_size_length + Blockframe.env_size_length + Blockframe.stash_size_length +
            PointerView.byte_length;
    }

    private get prev_scope_view(): PointerView {
        return PointerView.from_existing(this.data.subset(Blockframe.prev_frame_offset, PointerView.byte_length),
            true);
    }

    /**
     * Gets the address of the previous scope
     */
    public get prev_frame_offset(): number {
        return this.prev_scope_view.address;
    }

    private set prev_frame_offset(prev_scope: number) {
        this.prev_scope_view.address = prev_scope;
    }

    private get return_type_view(): HeapDataView {
        return this.data.subset(Blockframe.return_type_offset, this.return_type_size);
    }

    /**
     * Gets the address to the return type
     */
    public get return_type(): TypeInformation {
        return TypeInfoView.from_existing(this.return_type_view).type_information;
    }

    /**
     * Gets the stash associated with the given blockframe
     */
    public get stash(): Stash {
        return Stash.from_existing(this.data.subset(this.stash_offset, this.stash_size), this);
    }

    /**
     * Gets the environment associated with the blockframe
     */
    public get environment(): Environment {
        return Environment.from_existing(this.data.subset(this.environment_offset, this.env_size));
    }

    private get return_type_size_view(): UInt16 {
        return new UInt16(this.data.subset(Blockframe.return_type_size_offset, Blockframe.return_type_size_length),
            true);
    }

    /**
     * Gets the size of the environment in bytes
     */
    public get return_type_size(): number {
        return this.return_type_size_view.value;
    }

    private set return_type_size(return_size: number) {
        this.return_type_size_view.value = return_size;
    }

    private get env_size_view(): UInt32 {
        return new UInt32(this.data.subset(Blockframe.env_size_offset, Blockframe.env_size_length));
    }

    /**
     * Gets the size of the environment in bytes
     */
    public get env_size(): number {
        return this.env_size_view.value;
    }

    private set env_size(env_size: number) {
        this.env_size_view.value = env_size;
    }

    private get stash_size_view(): UInt32 {
        return new UInt32(this.data.subset(Blockframe.stash_size_offset, Blockframe.stash_size_length),
            true);
    }

    /**
     * Gets the address to the stash
     */
    public get stash_size(): number {
        return this.stash_size_view.value;
    }

    private set stash_size(stash_size: number) {
        this.stash_size_view.value = stash_size;
    }

    /**
     * Allocates a blockframe in the given heap view
     * @param view The view used to change the heap values
     * @param prev_frame_addr The address to the previous frame
     * @param return_type The address to the return type of the frame
     * @param declared_variables The array of variables that are to be declared
     * @param memory_handler The memory handler to be used if the Blockframe needs to adjust memory size
     */
    public static allocate_value(view: HeapDataView, prev_frame_addr: number, return_type: TypeInformation,
                                 declared_variables: Array<VariableDeclaration>, memory_handler: MemoryHandler): Blockframe {
        const blockframe = new Blockframe(view, memory_handler);
        const return_size = TypeInfoView.size_required(return_type);
        const environment_size = Environment.size_required(declared_variables);
        const stash_size = Stash.fixed_byte_length;
        const total_size = Blockframe.fixed_byte_length + environment_size + stash_size + return_size;
        // Ensure the data is not already protected
        if (!view.is_not_protected(0, total_size)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set values
        blockframe.prev_frame_offset = prev_frame_addr;
        blockframe.return_type_size = return_size;
        blockframe.env_size = environment_size;
        blockframe.stash_size = stash_size;
        // Allocate relevant factors
        TypeInfoView.allocate_value(blockframe.return_type_view, return_type);
        Environment.allocate_value(view.subset(blockframe.environment_offset, environment_size),
            declared_variables);
        Stash.allocate_value(view.subset(blockframe.stash_offset, stash_size), blockframe);
        // Protect blockframe metadata
        view.protect(0, Blockframe.fixed_byte_length);
        return blockframe;
    }

    /**
     * Determines the size that a blockframe would require for initial allocation
     * @param return_type The return type of the blockframe
     * @param declared_variables The declared variables
     */
    public static size_required(return_type: TypeInformation, declared_variables: Array<VariableDeclaration>) {
        const return_type_size = TypeInfoView.size_required(return_type);
        const environment_size = Environment.size_required(declared_variables);
        return this.fixed_byte_length + return_type_size + environment_size + Stash.fixed_byte_length;
    }

    /**
     * Initialises a new Blockframe view from an existing value
     * @param view The view for the Blockframe to build from
     * @param memory_handler The memory handler used if the blockframe needs to adjust memory size
     */
    public static from_existing(view: HeapDataView, memory_handler: MemoryHandler): Blockframe {
        return new Blockframe(view, memory_handler);
    }

    reduce_memory(memory_reduction: number, caller: MemoryCaller): HeapDataView {
        if (caller !== MemoryCaller.STASH) {
            throw new UnknownCallerError("The only viable memory caller for a Blockframe is the Stash");
        }

        // Check stash size limitations
        const stash_size = this.stash_size;
        if (stash_size - memory_reduction < Stash.fixed_byte_length) {
            throw new SegmentationFaultError("The size of the stash cannot be reduced by more than the minimum stash " +
                "size");
        }

        // Adjust memory
        this.data = this.memory_handler.reduce_memory(memory_reduction, MemoryCaller.BLOCK_FRAME);
        this.stash_size = stash_size - memory_reduction;
        return this.data.subset(this.stash_offset, stash_size - memory_reduction);
    }

    request_memory(additional_memory_required: number, caller: MemoryCaller): HeapDataView {
        if (caller !== MemoryCaller.STASH) {
            throw new UnknownCallerError("The only viable memory caller for a Blockframe is the Stash");
        }

        // Adjust memory
        this.data = this.memory_handler.request_memory(additional_memory_required, MemoryCaller.BLOCK_FRAME);
        this.stash_size += additional_memory_required;
        return this.data.subset(this.stash_offset, this.stash_size);
    }
}