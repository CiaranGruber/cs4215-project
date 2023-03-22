/**
 * Virtual Machine for C
 *
 * Used to represent the virtual machine used to evaluate and run C
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

import Environment, {EnvironmentPosition} from "./Environment";
import OperatingStack, {OSType, OSVal} from "./OperatingStack";
import RuntimeStack from "./RuntimeStack";
import Heap from "./Heap";

/**
 * Represents the set of possible VM tags
 */
enum VMTag {
    POP = "POP",
    LD = "LD",
    LDCI = "LDCI",
    REF = "REF",
    DEREF = "DEREF"
}

/**
 * The object used to represent a virtual machine instruction
 */
export abstract class Instruction {
    /**
     * The tag used to identify the instruction
     */
    private tag: VMTag;

    /**
     * Initialises a new Instruction instance
     * @param tag The tag for the instruction instance
     */
    protected constructor(tag: VMTag) {
        this.tag = tag;
    }

    /**
     * Runs the given instruction
     * @param virtual_machine The virtual machine that is to be manipulated by the instruction
     */
    public abstract run_instruction(virtual_machine: VirtualMachine);
}

/**
 * Used to represent a pop instruction
 */
export class PopInstruction extends Instruction {
    /**
     * Constructs a new Pop instruction
     */
    constructor() {
        super(VMTag.POP);
    }

    /**
     * Runs the pop instruction by popping a value from the operating stack
     * @param virtual_machine
     */
    public run_instruction(virtual_machine: VirtualMachine) {
    }
}

/**
 * Used to represent a load instruction
 */
export class LdInstruction extends Instruction {
    private position: EnvironmentPosition

    constructor(position: EnvironmentPosition) {
        super(VMTag.LD);
        this.position = position;
    }
}

/**
 * Creates a new load constant integer instruction for the OperatingStack
 */
export class LdciInstruction extends Instruction {
    /**
     * The integer used for the load constant
     */
    private value: number;

    /**
     * Constructs a new LdciInstruction
     * @param value
     */
    constructor(value: number) {
        super(VMTag.LDCI);
    }

    /**
     * Runs the LDCI instruction by pushing the given constant integer onto the operating stack
     * @param virtual_machine The virtual machine to modify
     */
    run_instruction(virtual_machine: VirtualMachine) {
    }
}

/**
 * The virtual machine for the C evaluator
 */
export default class VirtualMachine {
    private _PC: number;
    private OS: OperatingStack;
    private RTS: RuntimeStack;
    private E: Environment;
    private _Heap: Heap;

    public get PC() {
        return this._PC;
    }

    public set PC(new_value: number) {
        this._PC = new_value;
    }

    public get Heap(): Heap {
        return this._Heap;
    }

    public pop_from_os(): OSVal {
        return this.OS.pop();
    }

    public push_to_os(address: number, type: OSType) {
        this.OS.push(address, type);
    }
}