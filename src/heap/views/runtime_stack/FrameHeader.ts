/**
 * FrameHeader
 *
 * Represents the header for each type of frame in C
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import HeapDataView from "../../HeapDataView";
import {SegmentationFaultError} from "../../RestrictedHeap";
import Stash from "./Stash";
import UInt32 from "../../../data_views/UInt32";
import CMemoryTag, {CMemoryTagValue} from "../base/CMemoryTag";
import Pointer from "../../../data_views/Pointer";

/**
 * Represents a frame header describing the information of a frame
 *
 * Data Format (in order):
 * <ul style="margin-top: 0px; margin-bottom: 0px">
 *     <li>CMemoryTag.byte_length - The tag representing if it is a blockframe or a callframe</li>
 *     <li>4 bytes - The size of the environment</li>
 *     <li>4 bytes - The size of the stash</li>
 *     <li>Pointer.byte_length - The address of the previous scope definition</li>
 * </ul>
 */
export default class FrameHeader {
    private static readonly tag_offset = 0;
    private static readonly env_size_offset = FrameHeader.tag_offset + CMemoryTag.byte_length;
    private static readonly env_size_length = UInt32.byte_length;
    private static readonly stash_size_offset = FrameHeader.env_size_offset + FrameHeader.env_size_length;
    private static readonly stash_size_length = UInt32.byte_length;
    private static readonly prev_frame_offset = FrameHeader.stash_size_offset + FrameHeader.stash_size_length;
    private data: HeapDataView;

    private constructor(data: HeapDataView) {
        this.data = data;
    }

    /**
     * Gets the length in bytes of the frame
     */
    public static get byte_length() {
        return CMemoryTag.byte_length + this.env_size_length + this.stash_size_length + Pointer.byte_length;
    }

    /**
     * Determines whether the header is the header for a callframe. Alternative is a call frame
     */
    public static is_callframe(view: HeapDataView): boolean {
        return CMemoryTag.from_existing(view.subset(this.tag_offset, CMemoryTag.byte_length)).tag === CMemoryTagValue.CALL_FRAME;
    }

    /**
     * Gets the byte offset of the frame in memory
     */
    public get byte_offset() {
        return this.data.byte_offset;
    }

    private get tag_view(): HeapDataView {
        return this.data.subset(FrameHeader.tag_offset, CMemoryTag.byte_length);
    }

    private get prev_frame_view(): HeapDataView {
        return this.data.subset(FrameHeader.prev_frame_offset, Pointer.byte_length);
    }

    /**
     * Gets the address of the previous frame
     */
    public get prev_frame_offset(): number {
        return new Pointer(this.prev_frame_view).value;
    }

    private set prev_frame_offset(prev_scope: number) {
        new Pointer(this.prev_frame_view, true).value = prev_scope;
    }

    private get env_size_view(): UInt32 {
        return new UInt32(this.data.subset(FrameHeader.env_size_offset, FrameHeader.env_size_length));
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
        return new UInt32(this.data.subset(FrameHeader.stash_size_offset, FrameHeader.stash_size_length),
            true);
    }

    /**
     * Gets the address to the stash
     */
    public get stash_size(): number {
        return this.stash_size_view.value;
    }

    /**
     * Sets the stash size to the given value
     * @param stash_size The new size to set
     */
    public set stash_size(stash_size: number) {
        this.stash_size_view.value = stash_size;
    }

    /**
     * Allocates a frame header in the given heap view
     * @param view The view used to change the heap values
     * @param prev_frame_addr The address to the previous frame
     * @param tag The tag to use for the FrameHeader
     * environment (first blockframe)
     * @param environment_size The size of the environment that is to be stored
     */
    public static allocate_value(view: HeapDataView, prev_frame_addr: number, tag: CMemoryTagValue,
                                 environment_size: number): FrameHeader {
        const frame_header = new FrameHeader(view);
        // Ensure the data is not already protected
        if (!view.is_not_protected(0, FrameHeader.byte_length)) {
            throw new SegmentationFaultError("Data to be allocated is already protected");
        }
        // Set values
        CMemoryTag.allocate_value(frame_header.tag_view, tag);
        frame_header.prev_frame_offset = prev_frame_addr;
        frame_header.env_size = environment_size;
        frame_header.stash_size = Stash.fixed_byte_length;
        // Protect frame header
        view.protect(0, FrameHeader.byte_length);
        return frame_header;
    }

    /**
     * Initialises a new Callframe view from an existing value
     * @param view The view for the Callframe to build from
     */
    public static from_existing(view: HeapDataView): FrameHeader {
        return new FrameHeader(view);
    }
}