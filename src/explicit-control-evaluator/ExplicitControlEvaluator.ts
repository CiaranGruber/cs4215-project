/**
 * Explicit-Control Evaluator for C
 *
 * Used to represent the explicit-control evaluator used to evaluate and run C
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import ECEnvironment from "./ECEnvironment";
import Stash, {SVal} from "./Stash";
import Agenda from "./Agenda";
import {CompilationUnitContext} from "../parser/antlr_gen/CParser";
import CListener from "../parser/antlr_gen/CListener";
import Heap from "./Heap";
import {EnvironmentPointer, Int32Value} from "./CValue";

/**
 * Represents the set of possible VM tags
 */
enum VMTag {
    LISTENER = "LISTENER",
    POP = "POP",
    LD = "LD",
    LDCI = "LDCI",
    REF = "REF",
    DEREF = "DEREF",
    ASSIGN = "ASSIGN"
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
     * @param evaluator The explicit-control evaluator that is to be manipulated by the instruction
     */
    public abstract run_instruction(evaluator: ExplicitControlEvaluator);
}

/**
 * Used to represent instructions containing a visitor that is to be visited
 */
export class ListenerInstruction<T extends CListener, K extends CompilationUnitContext> extends Instruction {
    private readonly context_enter_rule: () => void;

    /**
     * Initialises a new ListenerInstruction
     * @param context_enter_rule The lambda function used to represent the context entering the listener as a rule
     */
    constructor(context_enter_rule: () => void) {
        super(VMTag.LISTENER);
        this.context_enter_rule = context_enter_rule;
    }

    /**
     * Runs the listener with the required context
     * @param evaluator The evaluator instance
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        this.context_enter_rule();
    }
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
     * Runs the pop instruction by popping a value from the stash
     * @param evaluator The evaluator to pop the value from
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        evaluator.pop_from_S();
    }
}

/**
 * Used to represent a load instruction
 */
export class LdInstruction extends Instruction {
    private symbol: string

    /**
     * Constructs a new LD Instruction with the given symbol
     * @param symbol The symbol used for the LD instruction
     */
    constructor(symbol: string) {
        super(VMTag.LD);
        this.symbol = symbol;
    }

    /**
     * Runs the LD instruction by loading a value from the environment
     * @param evaluator The evaluator to use for the environment
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const pointer = EnvironmentPointer.new_environment_pointer(evaluator.environment.get_position(this.symbol));
        evaluator.push_to_S(pointer);
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
     * @param value The value to set for the LCDI instruction
     */
    constructor(value: number) {
        super(VMTag.LDCI);
    }

    /**
     * Runs the LDCI instruction by pushing the given constant integer onto the operating stack
     * @param evaluator The virtual machine to modify
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        evaluator.push_to_S(Int32Value.new_int32(this.value));
    }
}

/**
 *
 */
export class AssignInstruction extends Instruction {
    /**
     * Initialises a new Assign instruction
     */
    constructor() {
        super(VMTag.ASSIGN);
    }

    /**
     * Runs the assign instruction by assigning a popped value from the stash to the address pointed at from the next
     * value
     * @param evaluator The evaluator to run
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        // const value: ArrayBuffer = evaluator.pop_from_S();

    }
}

/**
 * The explicit control evaluator for the C evaluator
 */
export default class ExplicitControlEvaluator {
    private A: Agenda;
    private S: Stash;
    private E: ECEnvironment;
    private _Heap: Heap;

    /**
     * Initialises a new ExplicitControlEvaluator with the specified
     * @param starting_instruction The instruction to start off the explicit-control evaluator
     */
    constructor(starting_instruction: Instruction) {
        this.A.push(starting_instruction);
    }

    /**
     * Gets the heap used by the explicit control evaluator
     */
    public get heap(): Heap {
        return this._Heap;
    }

    /**
     * Gets the environment used by the explicit-control evaluator
     */
    public get environment(): ECEnvironment {
        return this.E;
    }

    /**
     * Pushes the given instruction to the agenda
     * @param instruction The instruction to push
     */
    public push_to_agenda(instruction: Instruction) {
        this.A.push(instruction);
    }

    /**
     * Pushes a list of instructions to the agenda ensuring order is kept
     * @param instructions The instructions to push
     */
    public push_all_to_agenda(instructions: Array<Instruction>) {
        instructions.reverse();
        instructions.forEach((instruction) => this.push_to_agenda(instruction));
        instructions.reverse();
    }

    /**
     * Pops a given value from the stash
     */
    public pop_from_S(): SVal {
        return this.S.pop();
    }

    public peek_from_S(): SVal {
        return this.S.peek();
    }

    /**
     * Pushes a value to the stash
     * @param value The value to push to the stash
     */
    public push_to_S(value: ArrayBuffer) {
        this.S.push(value);
    }
}