/**
 * Explicit-Control Evaluator for C
 *
 * Used to represent the explicit-control evaluator used to evaluate and run C
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */

import ExplicitControlEvaluator from "./ExplicitControlEvaluator";
import VariableDeclaration from "./VariableDeclaration";
import CValue from "./CValue";
import Bool from "../data_views/Bool";
import {BinaryOperator} from "./operators/BinaryOperator";
import perform_unary_operation, {UnaryOperator} from "./operators/UnaryOperator";
import TypeInformation from "../type_descriptions/TypeInformation";
import {AssignmentOperator, convert_assign_to_binop} from "./operators/AssignOperator";
import Converter, {get_built_in_type} from "../converter/Converter";
import {BuiltInTypeSpecifierType} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import IntConverter from "../converter/IntConverter";
import CharConverter from "../converter/CharConverter";
import CConstants, {ConstantType} from "../global_context/CConstants";
import ShortConverter from "../converter/ShortConverter";
import LongConverter from "../converter/LongConverter";
import {InvalidTypeError} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeMatcher";
import FunctionPointerConverter from "../converter/FunctionPointerConverter";
import {UnknownDefinitionError} from "./ExplicitControlListener";

export enum MarkType {
    EMPTY,
    LOOP_CHECK,
    LOOP_ENDED,
    END_OF_FUNCTION,
    END_OF_CODE
}

/**
 * Represents the set of possible VM tags
 */
export enum VMTag {
    LISTENER = "LISTENER",
    POP = "POP",
    LD = "LD",
    LDCI = "LDCI",
    LDCL = "LCDL",
    LDCS = "LDCS",
    LDCC = "LDCC",
    LDCF = "LDCF",
    ASSIGN = "ASSIGN",
    ENTER_BLOCK = "ENTER_BLOCK",
    ENTER_CALL = "ENTER_CALL",
    EXIT_SCOPE = "EXIT_SCOPE",
    DECLARE = "DECLARE",
    BINOP = "BINOP",
    BRANCH = "BRANCH",
    CAST = "CAST",
    SIZE_OF = "SIZE_OF",
    SIZE_OF_VAR = "SIZE_OF_VAR",
    CALL = "CALL",
    UNARY = "UNARY",
    POSTFIX = "POSTFIX",
    MARK = "MARK",
    LOOP = "LOOP",
    RESET = "RESET",
    MAIN = "MAIN"
}

/**
 * The object used to represent a virtual machine instruction
 */
export abstract class Instruction {
    /**
     * The tag used to identify the instruction
     */
    public readonly tag: VMTag;

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
 * Represents a mark in the agenda
 */
export class AgendaMark extends Instruction {
    public readonly mark: MarkType;

    /**
     * Initialises a new AgendaMark instance
     * @param mark The associated mark
     */
    public constructor(mark: MarkType) {
        super(VMTag.MARK);
        this.mark = mark;
    }

    /**
     * Mark is ignored by the evaluator
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {

    }
}

/**
 * Runs the main function when it has been defined/declared
 */
export class MainInstruction extends Instruction {
    /**
     * Initialises a new main instruction
     */
    public constructor() {
        super(VMTag.MAIN);
    }

    /**
     * Runs the main function of the evaluator
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const instructions: Array<Instruction> = [];
        // Get arguments
        const argument_count = evaluator.args.length;
        // Push arguments
        evaluator.args.forEach((value) => {
            instructions.push(new LDCSInstruction(value));
            // Todo: Load string literal
        });
        // Push function
        instructions.push(new LDInstruction("main"));
        // Call main function
        instructions.push(new CallInstruction(argument_count));
        // Push to evaluator
        evaluator.push_all_to_agenda(instructions);
    }
}

/**
 * Performs a loop by checking an expression before running a statement
 */
export class LoopInstruction extends Instruction {
    private readonly expression_instruction: Instruction;
    private readonly statement_instruction: Instruction;

    /**
     * Initialises a new loop instruction with the relevant expression and statement
     * @param expression The expression used to test if the loop should run the statement
     * @param statement The statement to run
     */
    public constructor(expression: Instruction, statement: Instruction) {
        super(VMTag.LOOP);
        this.expression_instruction = expression;
        this.statement_instruction = statement;
    }

    /**
     * Checks an expression before running the given statement if it exists, else ending the loop
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const instructions: Array<Instruction> = [];
        instructions.push(this.expression_instruction);
        instructions.push(new BranchInstruction(this.statement_instruction, new ResetInstruction(MarkType.LOOP_ENDED)));
        instructions.push(new AgendaMark(MarkType.LOOP_CHECK));
        instructions.push(this);
        evaluator.push_all_to_agenda(instructions);
    }
}

/**
 * Performs a reset by popping items from the agenda until it reaches the appropriate mark
 */
export class ResetInstruction extends Instruction {
    private readonly mark_to_stop_at: MarkType;

    /**
     * Initialises a new ResetInstruction with the specific mark to stop at
     * @param mark_to_stop_at The mark at which the reset instruction should stop
     */
    public constructor(mark_to_stop_at: MarkType) {
        super(VMTag.RESET);
        this.mark_to_stop_at = mark_to_stop_at;
    }

    /**
     * Pops an instruction from the agenda and re-installs itself if the instruction is not the appropriate mark
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const instruction = evaluator.pop_agenda_item();
        // Add reset instruction if it is not at the specific mark
        if (instruction.tag !== VMTag.MARK || (instruction as AgendaMark).mark !== this.mark_to_stop_at) {
            evaluator.push_to_agenda(this);
        }
    }
}

/**
 * Used to represent instructions containing a visitor that is to be visited
 */
export class LambdaInstruction extends Instruction {
    private readonly context_enter_rule: () => void;

    /**
     * Initialises a new LambdaInstruction
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
 * Used to represent entering a block frame
 */
export class EnterBlockInstruction extends Instruction {
    private readonly declarations: Array<VariableDeclaration>;

    /**
     * Constructs a new Enter Block instruction used to enter a basic block
     * @param variable_declarations The declarations used within the block
     */
    constructor(variable_declarations: Array<VariableDeclaration>) {
        super(VMTag.ENTER_BLOCK);
        this.declarations = variable_declarations;
    }

    /**
     * Runs the block instruction adding a new block frame to the stack
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stack = evaluator.memory.stack;
        stack.enter_block(this.declarations);
    }
}

/**
 * Used to represent entering a call frame
 */
export class EnterCallInstruction extends Instruction {
    private readonly return_type: TypeInformation;
    private readonly declarations: Array<VariableDeclaration>;

    /**
     * Constructs a new Enter Call instruction used to enter a basic call frame
     * @param return_type The return type of the call instruction
     * @param variable_declarations The declarations used within the call frame
     */
    constructor(return_type: TypeInformation, variable_declarations: Array<VariableDeclaration>) {
        super(VMTag.ENTER_CALL);
        this.return_type = return_type;
        this.declarations = variable_declarations;
    }

    /**
     * Runs the call instruction adding a new call frame to the stack
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stack = evaluator.memory.stack;
        stack.enter_call(this.return_type, this.declarations);
    }
}

/**
 * Used to represent exiting scope of either call frames or block frames
 */
export class ExitScopeInstruction extends Instruction {
    /**
     * Constructs a new Exit
     */
    constructor() {
        super(VMTag.EXIT_SCOPE);
    }

    /**
     * Runs the instruction by exiting the relevant scope
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const memory = evaluator.memory;
        memory.stack.exit_scope(memory);
    }
}

/**
 * Declares a variable with or without assigning it
 */
export class DeclareInstruction extends Instruction {
    private readonly name: string;
    private readonly assign_value: boolean;

    /**
     * Constructs a new Declaration Instruction
     * @param name The name of the variable to declare
     * @param assign_value Whether to assign to the variable
     */
    constructor(name: string, assign_value: boolean) {
        super(VMTag.DECLARE);
        this.name = name;
        this.assign_value = assign_value;
    }

    /**
     * Declares the variable and potentially assigns it
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stack = evaluator.memory.stack;
        if (this.assign_value) {
            stack.declare_variable(this.name, evaluator.memory, stack.stash.pop().get_c_value(evaluator.memory));
        } else {
            stack.declare_variable(this.name, evaluator.memory);
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
export class LDInstruction extends Instruction {
    private readonly symbol: string

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
 * Represents a range of constants used for a given type
 */
class ConstantRange<T extends number | bigint> {
    /**
     * The minimum value for the type
     */
    public readonly min_value: bigint;
    /**
     * The maximum value for the type
     */
    public readonly max_value: bigint;
    /**
     * The converter used to create the value
     */
    public readonly converter: Converter<T>;

    /**
     * Constructs a new ConstantRange instance
     * @param converter The converter used to convert values to this type
     * @param min_value The constant used for the minimum value
     * @param max_value The constant used for the maximum value
     */
    public constructor(converter: Converter<T>, min_value: ConstantType, max_value: ConstantType) {
        this.min_value = CConstants.get_constant(min_value).value;
        this.max_value = CConstants.get_constant(max_value).value;
        this.converter = converter;
    }

    /**
     * Returns whether the value is in the given range
     * @param value The value to test
     */
    public in_range(value: T) {
        return value > this.min_value && value < this.max_value;
    }
}

/**
 * Creates a new load constant integer instruction for the OperatingStack
 */
export class LDCIInstruction extends Instruction {
    private static constant_tests: Array<ConstantRange<number>> = [
        new ConstantRange(new CharConverter(), ConstantType.SCHAR_MIN, ConstantType.SCHAR_MAX),
        new ConstantRange(new ShortConverter(), ConstantType.SHRT_MIN, ConstantType.SHRT_MAX),
        new ConstantRange(new IntConverter(), ConstantType.INT_MIN, ConstantType.INT_MAX)
    ];
    private readonly value: number;

    /**
     * Constructs a new LdciInstruction
     * @param value The integer to set
     */
    constructor(value: number) {
        super(VMTag.LDCI);
        this.value = value;
    }

    /**
     * Runs the LDCI instruction by pushing the given integer constant onto the stash
     * @param evaluator The virtual machine to modify
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stash = evaluator.memory.stack.stash;
        let value: CValue;
        // Find type that is of the minimum size
        LDCIInstruction.constant_tests.forEach((constant_test) => {
            if (!value && constant_test.in_range(this.value)) {
                value = constant_test.converter.convert_to_c(this.value);
            }
        });
        if (!value) {
            throw new InvalidTypeError(`The value ${this.value} cannot be converted`);
        }
        // Push onto stash
        stash.push(value);
    }
}

/**
 * The LDCLInstruction used to push bigint values to the stash
 */
export class LDCLInstruction extends Instruction {
    private static constant_tests: Array<ConstantRange<bigint>> = [
        new ConstantRange(new LongConverter(), ConstantType.LONG_MIN, ConstantType.LONG_MAX)
    ];
    private readonly value: bigint;

    /**
     * Constructs a new LCDL instruction
     * @param value The value that is to be pushed to the stash
     */
    constructor(value: bigint) {
        super(VMTag.LDCL);
        this.value = value;
    }

    /**
     * Loads a long value into the stash
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stash = evaluator.memory.stack.stash;
        let value: CValue;
        // Find minimum test type
        LDCLInstruction.constant_tests.forEach((constant_test) => {
            if (!value && constant_test.in_range(this.value)) {
                value = constant_test.converter.convert_to_c(this.value);
            }
        });
        if (!value) {
            throw new InvalidTypeError(`The value ${this.value} cannot be converted`);
        }
        // Push value onto stash
        stash.push(value);
    }
}

/**
 * Loads a string into the stash
 */
export class LDCSInstruction extends Instruction {
    private readonly string_value: string;

    /**
     * Initialises a new load string instruction
     * @param string_value The value to load
     */
    public constructor(string_value: string) {
        super(VMTag.LDCS);
        this.string_value = string_value;
    }

    /**
     * Loads a string by pushing the string value to stash
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        throw new UnknownDefinitionError("Loading strings not supported");
    }
}

/**
 * Loads a CValue into the C stash
 */
export class LDCCInstruction extends Instruction {
    private readonly value: CValue;

    /**
     * Initialises a new load CValue instruction
     * @param value The value to load
     */
    public constructor(value: CValue) {
        super(VMTag.LDCC);
        this.value = value;
    }

    /**
     * Loads the CValue into the stash
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        evaluator.memory.stack.stash.push(this.value);
    }
}

/**
 * Creates a new load constant function instruction for the Stash
 */
export class LDCFInstruction extends Instruction {
    private readonly func_key: number;
    private readonly return_type: TypeInformation;

    /**
     * Constructs a new LdcfInstruction
     * @param key The function key
     * @param return_type The return type of the function
     */
    constructor(key: number, return_type: TypeInformation) {
        super(VMTag.LDCF);
        this.func_key = key;
        this.return_type = return_type;
    }

    /**
     * Runs the instruction by putting the function value onto the stash
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stash = evaluator.memory.stack.stash;
        const value = new FunctionPointerConverter(this.return_type).convert_to_c(this.func_key)
        stash.push(value);
    }
}

/**
 * Branches to two separate sets of instructions based upon a boolean input
 */
export class BranchInstruction extends Instruction {
    private readonly success_branch: Instruction;
    private readonly failed_branch: Instruction;

    /**
     * Constructs the Branch instruction with two separate instruction branches
     * @param successful_branch The branch used in the case of a true value
     * @param failed_branch The branch used in the case of a false value
     */
    public constructor(successful_branch: Instruction, failed_branch: Instruction) {
        super(VMTag.BRANCH);
        this.success_branch = successful_branch;
        this.failed_branch = failed_branch;
    }

    /**
     * Casts the top value of the stash if it is not already a boolean value, else branches appropriately
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stash = evaluator.memory.stack.stash;
        const value = stash.pop();
        const bool_type = get_built_in_type([BuiltInTypeSpecifierType._BOOL], 0);
        // Cast to boolean if it isn't already one
        if (!value.type_information.equals(bool_type)) {
            const instructions: Array<Instruction> = [];
            instructions.push(new CastInstruction(bool_type));
            instructions.push(new BranchInstruction(this.success_branch, this.failed_branch));
            evaluator.push_all_to_agenda(instructions);
            stash.push(value);
            return;
        }
        // Push the successful branch
        if (new Bool(value.get_value(evaluator.memory)).value) {
            evaluator.push_to_agenda(this.success_branch);
        } else {
            evaluator.push_to_agenda(this.failed_branch);
        }
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
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stack = evaluator.memory.stack;
        const right = stack.stash.pop();
        const left = stack.stash.peek();
        if (this.operator === AssignmentOperator.ASSIGN) { // Assign value
            const memory = evaluator.memory;
            if (!left.type_information.equals(right.type_information)) {
                const instructions: Array<Instruction> = [];
                instructions.push(new CastInstruction(left.type_information));
                instructions.push(this);
                evaluator.push_all_to_agenda(instructions);
                stack.stash.push(right);
                return
            }
            left.set_value(memory, right.get_value(memory).referenced_buffer);
            return;
        }
        // Split into binary operator and assign
        stack.stash.push(left);
        stack.stash.push(right);
        const instructions: Array<Instruction> = []
        instructions.push(new BinopInstruction(convert_assign_to_binop(this.operator)));
        instructions.push(new AssignInstruction(AssignmentOperator.ASSIGN));
        evaluator.push_all_to_agenda(instructions);
    }
}

/**
 * Performs unary operator instructions based upon the given types
 */
export class UnaryOpInstruction extends Instruction {
    private readonly operator: UnaryOperator;

    /**
     * Constructs the given Unary instruction with the specific operator
     * @param operator The operator to run a unary instruction
     */
    constructor(operator: UnaryOperator) {
        super(VMTag.UNARY);
        this.operator = operator;
    }

    /**
     * Performs manipulations on the top stash value depending on the unary operator
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stash = evaluator.memory.stack.stash;
        const value = stash.pop();
        stash.push(perform_unary_operation(value, this.operator, evaluator.memory));
    }
}

/**
 * Performs binary operator instructions based upon the given types
 */
export class BinopInstruction extends Instruction {
    private readonly operator: BinaryOperator;

    /**
     * Constructs the given binary operator instruction with the specific operator
     * @param operator The operator to run a unary instruction
     */
    public constructor(operator: BinaryOperator) {
        super(VMTag.BINOP);
        this.operator = operator;
    }

    /**
     * Performs manipulations on the top stash value depending on the binary operator
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        // Todo: Develop sophisticated type-matching as required
        // Temporary pop to prevent memory-leak while it is not implemented
        evaluator.push_to_agenda(new PopInstruction());
    }
}

/**
 * Casts the top stash value to a specific type
 */
export class CastInstruction extends Instruction {
    private readonly cast_type: TypeInformation;

    /**
     * Constructs a new Cast Instruction to the specified type
     * @param type The type to cast to
     */
    public constructor(type: TypeInformation) {
        super(VMTag.CAST);
        this.cast_type = type;
    }

    /**
     * Casts the top stash value to the specified type
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stash = evaluator.memory.stack.stash;
        const value = stash.pop();
        stash.push(value.cast_to(evaluator.memory, this.cast_type));
    }
}

/**
 * Gets the size of a given type and pushes it to the stash
 */
export class SizeofInstruction extends Instruction {
    private readonly type: TypeInformation;

    /**
     * Constructs a sizeof instruction used to get the size of a type
     * @param type The type to get the size of
     */
    public constructor(type: TypeInformation) {
        super(VMTag.SIZE_OF);
        this.type = type;
    }

    /**
     * Pushes the size of a type onto the stash
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const size_value = new IntConverter().convert_to_c(this.type.data_size);
        evaluator.memory.stack.stash.push(size_value);
    }
}

/**
 * Gets the size of a given variable
 */
export class SizeofVarInstruction extends Instruction {
    /**
     * Constructs a new size of var instruction
     */
    public constructor() {
        super(VMTag.SIZE_OF_VAR);
    }

    /**
     * Gets the size of the variable on the top of the stash
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stash = evaluator.memory.stack.stash;
        const value = stash.pop();
        stash.push(new IntConverter().convert_to_c(value.type_information.data_size));
    }
}

/**
 * The instruction used to call values
 */
export class CallInstruction extends Instruction {
    private readonly arg_count: number;

    /**
     * Constructs a new call instruction with the specified argument count
     * @param arg_count The argument count for the function
     */
    public constructor(arg_count: number) {
        super(VMTag.CALL);
        this.arg_count = arg_count;
    }

    /**
     * Calls a function with the specified number of arguments
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        const stash = evaluator.memory.stack.stash;
        const args: Array<CValue> = [];
        // Collect arguments
        for (let i = 0; i < this.arg_count; i++) {
            args.push(stash.pop());
        }
        args.reverse();
        // Collect function call
        const function_call = stash.pop();
        // Call function
        function_call.call(args, evaluator.memory, evaluator.function_manager, (type) =>
            evaluator.push_to_agenda(new CastInstruction(type)));
    }
}

/**
 * Constructs a postfix instruction used for postfix operators
 */
export class PostfixInstruction extends Instruction {
    private readonly operator: UnaryOperator;

    /**
     * Constructs a new postfix instruction
     * @param operator The unary operator used for the postfix instruction
     */
    public constructor(operator: UnaryOperator) {
        super(VMTag.POSTFIX);
        this.operator = operator;
    }

    /**
     * Performs the given instruction on the given postfix operator
     * @param evaluator The explicit control evaluator
     */
    public run_instruction(evaluator: ExplicitControlEvaluator) {
        // Perform stash manipulation
        const stash = evaluator.memory.stack.stash;
        const duplicate_value = stash.peek().get_c_value(evaluator.memory);
        stash.push(duplicate_value); // Duplicate value for assign
        stash.push(new CharConverter().convert_to_c(1));
        // Assign value
        const instructions: Array<Instruction> = [];
        const operator = this.operator === UnaryOperator.POST_PLUS_PLUS ? AssignmentOperator.PLUS_ASSIGN :
            AssignmentOperator.SUBTRACT_ASSIGN;
        instructions.push(new AssignInstruction(operator));
        // Pop assigned value
        instructions.push(new PopInstruction());
        evaluator.push_all_to_agenda(instructions);
    }
}