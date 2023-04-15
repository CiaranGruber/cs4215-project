/**
 * Explicit Control Evaluator for C
 *
 * Functions as the main explicit control evaluator for C, allowing
 * Created for CS4215 term project
 *
 * By Ciaran Gruber
 */
import CMemory from "../heap/CMemory";
import {CompilationUnitContext} from "../parser/antlr_gen/CParser";
import GlobalContext from "../global_context/GlobalContext";
import BuiltInFunction from "../functions/BuiltInFunction";
import IntConverter from "../converter/IntConverter";
import PointerConverter from "../converter/PointerConverter";
import {BuiltInTypeSpecifierType} from "../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import FunctionManager from "../functions/FunctionManager";
import VariableDeclaration from "./VariableDeclaration";
import Int32 from "../data_views/Int32";
import TypeInformation from "../type_descriptions/TypeInformation";
import VoidConverter from "../converter/VoidConverter";

function add_built_ins(memory: CMemory, function_manager: FunctionManager) {
    const stack = memory.stack;
    const declarations: Array<VariableDeclaration> = [];
    const name_to_key: Map<string, number> = new Map<string, number>();

    // Create common converters
    const void_pointer_conv = new PointerConverter([BuiltInTypeSpecifierType.VOID], 1);
    // Create function type

    function add_built_in(name: string, func: BuiltInFunction, function_type: TypeInformation) {
        const func_key = function_manager.add_function(func);
        declarations.push(new VariableDeclaration(function_type, name));
        name_to_key.set(name, func_key);
    }

    // Add relevant functions
    add_built_in("malloc", new BuiltInFunction((args) => memory.malloc(args[0] as number),
        void_pointer_conv, [new IntConverter()]), void_pointer_conv.type);
    add_built_in("free", new BuiltInFunction((args) => memory.free(args[0] as number),
        new VoidConverter(), [void_pointer_conv]), VoidConverter.type);
    add_built_in("defragment", new BuiltInFunction(() => memory.defragment(), new VoidConverter(),
        []), VoidConverter.type);

    stack.enter_block(declarations);
    name_to_key.forEach((value, key) => {
        stack.declare_variable(key);
        stack.get_variable(key).set_value(memory, Int32.create_buffer(value));
    });
}

export function run(memory_size: number, context: CompilationUnitContext) {
    // Initialise instances
    GlobalContext.initialise_instance(true);
    const function_manager = new FunctionManager();
    const memory = new CMemory(memory_size);
    // Add built-ins to memory
    add_built_ins(memory, function_manager);
}