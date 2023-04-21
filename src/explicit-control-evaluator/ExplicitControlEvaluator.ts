/**
 * Explicit Control Evaluator for C
 *
 * Functions as the main explicit control antlr_parser for C, allowing
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import CMemory from "../heap/CMemory";
import {CompilationUnitContext} from "../parser/antlr_gen/CParser";
import BuiltInFunction from "../functions/BuiltInFunction";
import IntConverter from "../converter/IntConverter";
import PointerConverter from "../converter/PointerConverter";
import {BuiltInTypeSpecifierType} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import FunctionManager from "../functions/FunctionManager";
import VariableDeclaration from "./VariableDeclaration";
import TypeInformation from "../type_descriptions/TypeInformation";
import VoidConverter from "../converter/VoidConverter";
import Agenda from "./Agenda";
import {AgendaMark, Instruction, MarkType, VMTag} from "./Instruction";
import {create_base_instruction} from "./ExplicitControlListener";
import FunctionPointerConverter from "../converter/FunctionPointerConverter";
import DeclarationSpecification from "../type_descriptions/DeclarationSpecification";

/**
 * Adds the required built-ins to the given evaluator
 * @param evaluator The explicit control evaluator
 * @param function_manager The function manager used to manage functions for a built-in
 */
function add_built_ins(evaluator: ExplicitControlEvaluator, function_manager: FunctionManager) {
    const memory = evaluator.memory;

    // Create common converters
    const void_pointer_conv = new PointerConverter([BuiltInTypeSpecifierType.VOID], 1);
    // Create function type

    function add_built_in_function(name: string, func: BuiltInFunction, return_type: TypeInformation) {
        const func_key = function_manager.add_function(func);
        const function_specification = DeclarationSpecification.function_specifier(return_type);
        const declaration = new VariableDeclaration(name, new TypeInformation(function_specification, []));
        evaluator.add_built_in_decl(declaration);
        evaluator.add_ext_decl_function(() => {
            const func_value = new FunctionPointerConverter(return_type).convert_to_c(func_key);
            memory.stack.declare_variable(name, memory, func_value);
        });
    }

    // Add relevant functions
    add_built_in_function("malloc", new BuiltInFunction((args) => memory.malloc(args[0] as number),
        void_pointer_conv, [new IntConverter()]), void_pointer_conv.type);
    add_built_in_function("free", new BuiltInFunction((args) => memory.free(args[0] as number),
        new VoidConverter(), [void_pointer_conv]), VoidConverter.type);
    add_built_in_function("defragment", new BuiltInFunction(() => memory.defragment(), new VoidConverter(),
        []), VoidConverter.type);
    add_built_in_function("print_int", new BuiltInFunction((args) => console.log(args[0] as number),
        new VoidConverter(), [new IntConverter()]), IntConverter.type);
}

/**
 * The explicit control evaluator containing the main memory for C
 */
export default class ExplicitControlEvaluator {
    private initialised: boolean;
    private _memory: CMemory;
    private _function_manager: FunctionManager;
    private _args: Array<string>;
    private _built_in_declarations: Array<VariableDeclaration>;
    private built_in_functions: Array<() => void>;
    private agenda: Agenda;

    /**
     * Constructs a new ExplicitControlEvaluator instance
     */
    public constructor() {
        this.initialised = false;
    }

    /**
     * Gets the arguments used in the program
     */
    public get args(): Array<string> {
        return this._args;
    }

    /**
     * Gets the built-in declarations added to the evaluator
     */
    public get built_in_declarations() {
        return this._built_in_declarations;
    }

    /**
     * Adds a built-in declaration to the evaluator to be declared later
     * @param declaration The declaration to add
     */
    public add_built_in_decl(declaration: VariableDeclaration) {
        this._built_in_declarations.push(declaration);
    }

    /**
     * Adds the given function to be run when the main block is entered
     * @param func The function to run
     */
    public add_ext_decl_function(func: () => void) {
        this.built_in_functions.push(func);
    }

    /**
     * Runs the external declaration functions
     */
    public run_ext_decl_functions() {
        this.built_in_functions.forEach((func) => {
            func();
        });
        this.built_in_functions = [];
    }

    /**
     * Gets the memory associated with the explicit-control antlr_parser
     */
    public get memory(): CMemory {
        return this._memory;
    }

    /**
     * Gets the function manager for the explicit-control antlr_parser
     */
    public get function_manager(): FunctionManager {
        return this._function_manager;
    }

    /**
     * Initialises the antlr_parser with new values
     * @param memory_size The size of the memory to create
     * @param context The context for the evaluator to start from
     */
    public initialise(memory_size: number, context: CompilationUnitContext) {
        // Set up memory and built-ins
        this._memory = new CMemory(memory_size);
        this._function_manager = new FunctionManager();
        this._built_in_declarations = [];
        this.built_in_functions = [];
        // Add starting instruction to the agenda
        this.agenda = new Agenda();
        this.agenda.initialise();
        this.push_to_agenda(create_base_instruction(context, this));
        // Add built-ins
        add_built_ins(this, this._function_manager);
        this.initialised = true;
    }

    /**
     * Runs the explicit-control antlr_parser and returns the value at the end of the program
     */
    public run(args: Array<string>): number {
        if (!this.initialised) {
            throw new EvaluatorNotInitialisedError("The evaluator has not been initialised yet");
        }
        this._args = args;
        let instruction = this.agenda.pop();
        // Run instruction code until end of code
        while (instruction) {
            instruction.run_instruction(this);
            instruction = this.agenda.pop();
            if (instruction.tag === VMTag.MARK) {
                const tag = instruction as AgendaMark;
                if (tag.mark === MarkType.END_OF_CODE) {
                    // Causes code to stop running
                    instruction = undefined;
                }
            }
        }
        this.initialised = false;
        return new IntConverter().convert_to_js(this.memory.stack.stash.pop());
    }

    /**
     * Pops an instruction off the agenda
     */
    public pop_agenda_item(): Instruction {
       return this.agenda.pop();
    }

    /**
     * Pushes the given instruction to the agenda
     * @param instruction The instruction to push
     */
    public push_to_agenda(instruction: Instruction) {
        this.agenda.push(instruction);
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
}

/**
 * Thrown when the evaluator has not been initialised prior to attempting to run it
 */
export class EvaluatorNotInitialisedError extends Error {
    /**
     * Constructs a new EvaluatorNotInitialisedError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "EvaluatorNotInitialisedError";
    }
}