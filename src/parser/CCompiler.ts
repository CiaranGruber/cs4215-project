import CVisitor from "./antlr_gen/CVisitor";
import {CompilationUnitContext} from "./antlr_gen/CParser";

/**
 * The object used to represent a virtual machine instruction
 */
export class Instruction {
    /**
     * The tag used to identify the instruction
     */
    tag: string
    /**
     * The additional values stored within the virtual machine instruction
     * Note: Map can be replaced with object but may be more relevant for TypeScript than generic object
     * Note 2: Any in map could be replaced with integer pointing to instruction that points to data in alternative array
     */
    values: Map<string, any>
}

/**
 * Acts as the entry point to which a C compiler may run from
 * Does not return a value as shown by use of void - May instead return write_counter, etc
 */
export default class CCompiler extends CVisitor<Array<Instruction>> {
    /**
     * The writing counter used for the compiler
     */
    private write_counter: number;
    /**
     * The instructions array that is appended to by the compiler
     */
    private instructions: Array<Instruction>;
    /**
     * The compile-time environment used for the setting of environments
     */
    private compile_time_environment;

    constructor() {
        super()
        this.write_counter = 0;
        this.instructions = new Array<Instruction>();
    }

    /**
     * Performs the compilation function for visiting a compilation unit
     * @param ctx The context for the compilation unit
     */
    // @ts-ignore
    visitCompilationUnit(ctx: CompilationUnitContext) {
        return ctx.translationUnit().accept(this)
    }
}