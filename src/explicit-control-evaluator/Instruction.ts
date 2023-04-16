/**
 * Explicit-Control Evaluator for C
 *
 * Used to represent the explicit-control evaluator used to evaluate and run C
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import ExplicitControlEvaluator from "./ExplicitControlEvaluator";
import CListener from "../parser/antlr_gen/CListener";
import VariableDeclaration from "./VariableDeclaration";
import {AssignmentOperator, BinopOperator, convert_assign_to_binop} from "./antlr_parser/OperatorScanner";
import {SpecifierDescription} from "../type_descriptions/type_specifier/SpecifierDescription";
import {InvalidTypeError} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeMatcher";
import LongConverter from "../converter/LongConverter";
import CValue from "./CValue";
import Bool from "../data_views/Bool";

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
    ASSIGN = "ASSIGN",
    ENTER_BLOCK = "ENTER_BLOCK",
    EXIT_SCOPE = "EXIT_SCOPE",
    DECLARE = "DECLARE",
    BINOP = "BINOP",
    BRANCH = "BRANCH",
    PUSH = "PUSH",
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
export class ListenerInstruction<T extends CListener> extends Instruction {
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
 * Used to represent entering scope
 */
export class EnterBlockInstruction extends Instruction {
    private readonly declarations: Array<VariableDeclaration>;

    constructor(variable_declarations: Array<VariableDeclaration>) {
        super(VMTag.ENTER_BLOCK);
        this.declarations = variable_declarations;
    }

    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stack = evaluator.memory.stack;
        stack.enter_block(this.declarations);
    }
}

export class ExitScopeInstruction extends Instruction {
    constructor() {
        super(VMTag.EXIT_SCOPE);
    }

    public run_instruction(evaluator: ExplicitControlEvaluator) {
        evaluator.memory.stack.exit_scope();
    }
}

export class DeclareInstruction extends Instruction {
    private name: string;
    private assign_value: boolean;

    constructor(name: string, assign_value: boolean) {
        super(VMTag.DECLARE);
        this.name = name;
        this.assign_value = assign_value;
    }

    run_instruction(evaluator: ExplicitControlEvaluator) {
        const stack = evaluator.memory.stack;
        if (this.assign_value) {
            stack.declare_variable(this.name, stack.stash.pop());
        } else {
            stack.declare_variable(this.name);
        }
        stack.stash.push(stack.get_variable(this.name));
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
        evaluator.memory.stack.stash.pop();
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
        const stack = evaluator.memory.stack;
        stack.stash.push(stack.get_variable(this.symbol));

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

    }
}

export class BranchInstruction extends Instruction {
    private readonly success_branch: Instruction;
    private readonly failed_branch: Instruction;

    public constructor(successful_branch: Instruction, failed_branch: Instruction) {
        super(VMTag.BRANCH);
        this.success_branch = successful_branch;
        this.failed_branch = failed_branch;
    }

    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stack = evaluator.memory.stack;
        const value = stack.stash.pop().get_value(evaluator.memory);
        if (new Bool(value).value) {
            evaluator.push_to_agenda(this.success_branch);
        } else {
            evaluator.push_to_agenda(this.failed_branch);
        }
    }
}

export class PushValueInstruction extends Instruction {
    private value_to_push: CValue;

    constructor(value_to_push: CValue) {
        super(VMTag.PUSH);
    }

    run_instruction(evaluator: ExplicitControlEvaluator) {
        evaluator.memory.stack.stash.push(this.value_to_push);
    }
}

/**
 * Assigns a value to another value
 */
export class AssignInstruction extends Instruction {
    private readonly operator: AssignmentOperator;
    
    /**
     * Initialises a new Assign instruction
     */
    constructor(operator: AssignmentOperator) {
        super(VMTag.ASSIGN);
        this.operator = operator;
    }

    /**
     * Runs the assign instruction by assigning a popped value from the stash to the address pointed at from the next
     * value
     * @param evaluator The evaluator to run
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stack = evaluator.memory.stack;
        const right = stack.stash.pop();
        const left = stack.stash.peek();
        if (this.operator === AssignmentOperator.ASSIGN) { // Assign value
            const memory = evaluator.memory;
            const right_value = right.cast_to(left.type_information).get_value(memory).referenced_buffer;
            left.set_value(memory, right_value);
        } else { // Split into binary operator and assign
            stack.stash.push(left);
            stack.stash.push(right);
            evaluator.push_to_agenda(new BinopInstruction(convert_assign_to_binop(this.operator)));
            evaluator.push_to_agenda(new AssignInstruction(AssignmentOperator.ASSIGN));
        }
    }
}

export class BinopInstruction extends Instruction {
    private readonly operator: BinopOperator;

    constructor(operator: BinopOperator) {
        super(VMTag.BINOP);
        this.operator = operator;
    }

    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const memory = evaluator.memory;
        const stash = evaluator.memory.stack.stash;
        const right = stash.pop();
        const right_value = new LongConverter().convert_to_js(right);
        const left = stash.pop();
        const left_value = new LongConverter().convert_to_js(left);
        // Todo: Improve way of doing operators
        let pointer_count;
        let value: CValue;
        switch (this.operator) {
            case BinopOperator.PLUS:
                pointer_count = left.type_information.is_described_as(SpecifierDescription.IS_POINTER) ? 1 : 0;
                pointer_count += right.type_information.is_described_as(SpecifierDescription.IS_POINTER) ? 1 : 0;
                if (pointer_count === 0) {
                    value = new LongConverter().convert_to_c(left_value + right_value);
                } else if (pointer_count === 1 && left.type_information.is_pointer) {
                    value = new LongConverter().convert_to_c(left_value + right_value *
                        BigInt(left.type_information.data_size));
                } else if (pointer_count === 1 && left.type_information.is_pointer) {
                    value = new LongConverter().convert_to_c(right_value + left_value *
                        BigInt(left.type_information.data_size));
                } else {
                    throw new InvalidTypeError("Cannot add two pointers together");
                }
                stash.push(value);
                break;
            case BinopOperator.MINUS:
                pointer_count = left.type_information.is_described_as(SpecifierDescription.IS_POINTER) ? 1 : 0;
                pointer_count += right.type_information.is_described_as(SpecifierDescription.IS_POINTER) ? 1 : 0;
                if (pointer_count === 0) {
                    value = new LongConverter().convert_to_c(left_value - right_value);
                } else if (pointer_count === 1 && left.type_information.is_pointer) {
                    value = new LongConverter().convert_to_c(left_value - right_value *
                        BigInt(left.type_information.data_size));
                } else if (pointer_count === 1 && left.type_information.is_pointer) {
                    value = new LongConverter().convert_to_c(right_value - left_value *
                        BigInt(left.type_information.data_size));
                } else {
                    throw new InvalidTypeError("Cannot add two pointers together");
                }
                stash.push(value);
                break;
            case BinopOperator.MULTIPLY:
                if (left.type_information.is_described_as(SpecifierDescription.IS_POINTER) ||
                    right.type_information.is_described_as(SpecifierDescription.IS_POINTER)) {
                    throw new InvalidTypeError("Multiply requires two integer values");
                }
                return left.set_value(memory, new LongConverter().convert_to_c(left_value * right_value).data);
            case BinopOperator.MODULO:
                if (!right.type_information.is_described_as(SpecifierDescription.IS_INTEGER) ||
                    !left.type_information.is_described_as(SpecifierDescription.IS_INTEGER)) {
                    throw new InvalidTypeError("Modulus required two integer values");
                }
                return left.set_value(memory, new LongConverter().convert_to_c(left_value % right_value).data);
        }
    }
}