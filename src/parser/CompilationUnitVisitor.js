/**
 * C Compilation Unit Visitor
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */
import CVisitor from "./antlr_gen/CVisitor.js";
export var VMTag;
(function (VMTag) {
    VMTag["POP"] = "POP";
})(VMTag || (VMTag = {}));
function throw_error(message) {
    throw new Error(message);
}
/**
 * The object used to represent a virtual machine instruction
 */
export class Instruction {
    /**
     * Initialises a new Instruction instance
     * @param tag The tag for the instruction instance
     * @param values The values to add for the instance
     */
    constructor(tag, values) {
        this.tag = tag;
        this.values = values;
    }
}
class CCompilationData {
    /**
     * Constructs a new Compilation data instance with the default values
     */
    constructor() {
        this.wc = 0;
        this.instr = new Array();
    }
}
class StandardCVisitor extends CVisitor {
    /**
     * Constructs the standard visitor with the specified compilation data and compile_time_environment
     * @param compilation_data The compilation data to be added to the constructor
     * @param compile_time_environment The compile time environment used by the visitor
     */
    constructor(compilation_data, compile_time_environment) {
        super();
        this.cd = compilation_data;
        this.cte = compile_time_environment;
    }
    get write_counter() {
        return this.cd.wc;
    }
    set write_counter(write_counter) {
        this.cd.wc = write_counter;
    }
    get instructions() {
        return this.cd.instr;
    }
}
/**
 * Acts as the entry point to which a C compiler may run from
 * Does not return a value as shown by use of void - May instead return write_counter, etc
 */
export default class CompilationUnitVisitor extends StandardCVisitor {
    /**
     * Creates a new compilation unit with default compilation data
     */
    constructor() {
        const compilationData = new CCompilationData();
        compilationData.wc = 0;
        compilationData.instr = new Array();
        super(compilationData, null);
    }
    /**
     * Visits the compilation unit and returns the instructions array
     * @param ctx The context for the compilation unit
     */
    // @ts-ignore
    visitCompilationUnit(ctx) {
        const translationUnitVisitor = new TranslationUnitVisitor(this.cd, this.cte);
        ctx.translationUnit().accept(translationUnitVisitor);
        return this.cd.instr;
    }
}
class TranslationUnitVisitor extends StandardCVisitor {
    /**
     * Instantiates a new translation unit visitor
     */
    constructor(compilation_data, compile_time_environment) {
        super(compilation_data, compile_time_environment);
    }
    /**
     * Visits the translation unit and returns the instructions array
     * @param ctx The context for the translation unit
     */
    // @ts-ignore
    visitTranslationUnit(ctx) {
        // Visit each external declaration
        ctx.externalDeclaration_list().forEach((context, index, array) => {
            const externalDeclarationVisitor = new ExternalDeclarationVisitor(this.cd, this.cte);
            context.accept(externalDeclarationVisitor);
        });
        // Return instructions
        return this.cd.instr;
    }
}
class ExternalDeclarationVisitor extends StandardCVisitor {
    /**
     * Instantiates a new external declaration visitor
     */
    constructor(compilation_data, compile_time_environment) {
        super(compilation_data, compile_time_environment);
    }
    /**
     * Visits the external declaration and returns the instructions array
     * @param ctx The context for the external declaration
     */
    // @ts-ignore
    visitExternalDeclaration(ctx) {
        if (ctx.functionDefinition() !== null) { // Function definition
            const functionVisitor = new FunctionDefinitionVisitor(this.cd, this.cte);
            ctx.functionDefinition().accept(functionVisitor);
        }
        else if (ctx.declaration() !== null) { // Standard Declaration
            const declarationVisitor = new DeclarationVisitor(this.cd, this.cte);
            ctx.declaration().accept(declarationVisitor);
        }
        else if (ctx.Semi() === null) { // If not a stray semi-colon
            throw_error("Ignored definition in External Declaration");
        }
        return this.cd.instr;
    }
}
class DeclarationVisitor extends StandardCVisitor {
    /**
     * Instantiates a new external declaration visitor
     */
    constructor(compilation_data, compile_time_environment) {
        super(compilation_data, compile_time_environment);
    }
    /**
     * Visits the declaration and returns the instructions array
     * @param ctx The context for the declaration
     */
    // @ts-ignore
    visitDeclaration(ctx) {
        throw_error("Declaration not implemented");
        return this.cd.instr;
    }
}
class FunctionDefinitionVisitor extends StandardCVisitor {
    /**
     * Instantiates a new external declaration visitor
     */
    constructor(compilation_data, compile_time_environment) {
        super(compilation_data, compile_time_environment);
    }
    /**
     * Visits the function definition and returns the instructions array
     * @param ctx The context for the function definition
     */
    // @ts-ignore
    visitFunctionDefinition(ctx) {
        throw_error("Function definition not implemented");
        return this.cd.instr;
    }
}
//# sourceMappingURL=CompilationUnitVisitor.js.map