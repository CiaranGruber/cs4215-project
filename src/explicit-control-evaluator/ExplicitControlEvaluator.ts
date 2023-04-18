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
import {Instruction} from "./Instruction";
import {create_base_instruction} from "./ExplicitControlListener";
import FunctionPointerConverter from "../converter/FunctionPointerConverter";
import DeclarationSpecification from "../type_descriptions/DeclarationSpecification";

/**
 * Adds the required built-ins to the given evaluator
 * @param memory The memory used for the evaluator
 * @param function_manager The function manager used to manage functions for a built-in
 */
function add_built_ins(memory: CMemory, function_manager: FunctionManager) {
    const stack = memory.stack;
    const declarations: Array<VariableDeclaration> = [];
    const name_to_key: Map<string, number> = new Map<string, number>();
    const name_to_type: Map<string, TypeInformation> = new Map<string, TypeInformation>();

    // Create common converters
    const void_pointer_conv = new PointerConverter([BuiltInTypeSpecifierType.VOID], 1);
    // Create function type

    function add_built_in_function(name: string, func: BuiltInFunction, return_type: TypeInformation) {
        const func_key = function_manager.add_function(func);
        const function_specification = DeclarationSpecification.function_specifier(return_type);
        declarations.push(new VariableDeclaration(new TypeInformation(function_specification, []), name));
        name_to_key.set(name, func_key);
        name_to_type.set(name, return_type);
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

    // Enters the given block
    stack.enter_block(declarations);
    name_to_key.forEach((value, key) => {
        const func_value = new FunctionPointerConverter(name_to_type.get(key)).convert_to_c(value);
        stack.declare_variable(key, func_value);
    });
}

/**
 * The explicit control evaluator containing the main memory for C
 */
export default class ExplicitControlEvaluator {
    private initialised: boolean;
    private _memory: CMemory;
    private _function_manager: FunctionManager;
    private agenda: Agenda;

    /**
     * Constructs a new ExplicitControlEvaluator instance
     */
    public constructor() {
        this.initialised = false;
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
     * @param context
     */
    public initialise(memory_size: number, context: CompilationUnitContext) {
        // Set up memory and built-ins
        this._memory = new CMemory(memory_size);
        this._function_manager = new FunctionManager();
        add_built_ins(this._memory, this._function_manager);
        // Add starting instruction to the agenda
        this.agenda = new Agenda();
        this.agenda.initialise();
        this.push_to_agenda(create_base_instruction(context, this));
    }

    /**
     * Runs the explicit-control antlr_parser and returns the value at the end of the program
     */
    public run(): number {
        let instruction = this.agenda.pop();
        while (instruction) {
            instruction.run_instruction(this);
            instruction = this.agenda.pop();
        }
        return 0;
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