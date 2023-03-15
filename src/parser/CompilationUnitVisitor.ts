/**
 * C Compilation Unit Visitor
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

import CVisitor from "./antlr_gen/CVisitor.js";
import {
    CompilationUnitContext, DeclarationContext, DeclarationSpecifierContext, DeclarationSpecifiersContext,
    ExternalDeclarationContext, FunctionDefinitionContext,
    TranslationUnitContext
} from "./antlr_gen/CParser.js";
import CompileTimeEnvironment from "./CompileTimeEnvironment";
import {BasicTypeMultiset, TypeMatcher} from "./TypeManagement";
import {DeclarationSpecifier} from "./DeclarationSpecifier";

export enum VMTag {
    POP = "POP"
}

function throw_error(message: string) {
    throw new Error(message);
}

/**
 * The object used to represent a virtual machine instruction
 */
export class Instruction {
    /**
     * The tag used to identify the instruction
     */
    public readonly tag: VMTag;
    /**
     * The additional values stored within the virtual machine instruction
     * Note: Map can be replaced with object but may be more relevant for TypeScript than generic object
     * Note 2: Any in map could be replaced with integer pointing to instruction that points to data in alternative array
     */
    public readonly values: Map<string, any> | null;

    /**
     * Initialises a new Instruction instance
     * @param tag The tag for the instruction instance
     * @param values The values to add for the instance
     */
    constructor(tag: VMTag, values: Map<string, any> | null) {
        this.tag = tag;
        this.values = values;
    }
}

class CCompilationData {
    /**
     * The writing counter used for the compiler
     */
    public wc: number;
    /**
     * The instructions array that is appended to by the compiler
     */
    public instr: Array<Instruction>;

    /**
     * Constructs a new Compilation data instance with the default values
     */
    constructor() {
        this.wc = 0;
        this.instr = new Array<Instruction>();
    }
}

class StandardCVisitor extends CVisitor<Array<Instruction>> {
    /**
     * The compilation data for the standard visitor
     * @private
     */
    public readonly cd: CCompilationData;
    /**
     * The compile-time environment used for the setting of environments
     */
    public readonly cte : CompileTimeEnvironment;

    /**
     * Constructs the standard visitor with the specified compilation data and compile_time_environment
     * @param compilation_data The compilation data to be added to the constructor
     * @param compile_time_environment The compile time environment used by the visitor
     */
    constructor(compilation_data: CCompilationData, compile_time_environment : CompileTimeEnvironment) {
        super();
        this.cd = compilation_data;
        this.cte = compile_time_environment;
    }

    protected get write_counter(): number {
        return this.cd.wc;
    }

    protected set write_counter(write_counter: number) {
        this.cd.wc = write_counter;
    }

    protected get instructions(): Array<Instruction> {
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
        compilationData.instr = new Array<Instruction>();
        super(compilationData, new CompileTimeEnvironment());
    }

    /**
     * Visits the compilation unit and returns the instructions array
     * @param ctx The context for the compilation unit
     */
    // @ts-ignore
    visitCompilationUnit(ctx: CompilationUnitContext) {
        const translationUnitVisitor: TranslationUnitVisitor = new TranslationUnitVisitor(this.cd,
            this.cte);
        ctx.translationUnit().accept(translationUnitVisitor)
        return this.cd.instr;
    }
}

class TranslationUnitVisitor extends StandardCVisitor {
    /**
     * Instantiates a new translation unit visitor
     */
    constructor(compilation_data: CCompilationData, compile_time_environment) {
        super(compilation_data, compile_time_environment);
    }

    /**
     * Visits the translation unit and returns the instructions array
     * @param ctx The context for the translation unit
     */
    // @ts-ignore
    visitTranslationUnit(ctx: TranslationUnitContext) {
        // Visit each external declaration
        ctx.externalDeclaration_list().forEach((context, index, array) => {
            const externalDeclarationVisitor = new ExternalDeclarationVisitor(this.cd,
                this.cte);
            context.accept(externalDeclarationVisitor);
        })
        // Return instructions
        return this.cd.instr;
    }
}

class ExternalDeclarationVisitor extends StandardCVisitor {
    /**
     * Instantiates a new external declaration visitor
     */
    constructor(compilation_data: CCompilationData, compile_time_environment) {
        super(compilation_data, compile_time_environment);
    }

    /**
     * Visits the external declaration and returns the instructions array
     * @param ctx The context for the external declaration
     */
    // @ts-ignore
    visitExternalDeclaration(ctx: ExternalDeclarationContext) {
        if (ctx.functionDefinition() !== null) { // Function definition
            const functionVisitor = new FunctionDefinitionVisitor(this.cd, this.cte);
            ctx.functionDefinition().accept(functionVisitor);
        } else if (ctx.declaration() !== null) { // Standard Declaration
            const declarationVisitor = new DeclarationVisitor(this.cd, this.cte);
            ctx.declaration().accept(declarationVisitor);
        } else if (ctx.Semi() === null) { // If not a stray semi-colon
            throw_error("Ignored definition in External Declaration");
        }
        return this.cd.instr;
    }
}

class DeclarationVisitor extends StandardCVisitor {
    /**
     * Instantiates a new external declaration visitor
     */
    constructor(compilation_data: CCompilationData, compile_time_environment) {
        super(compilation_data, compile_time_environment);
    }

    /**
     * Visits the declaration and returns the instructions array
     * @param ctx The context for the declaration
     */
    // @ts-ignore
    visitDeclaration(ctx: DeclarationContext) {
        if (ctx.declarationSpecifiers() !== null) { // Standard declaration
            // Get type information

        } else {
            throw_error("Unknown declaration type");
        }
        return this.cd.instr;
    }
}

class DeclarationSpecifiersVisitor extends CVisitor<BasicTypeMultiset> {
    /**
     * Visits the declaration specifiers and returns the relevant type information
     * @param ctx The context for the declaration specifiers
     */
    // @ts-ignore
    visitDeclarationSpecifiers(ctx: DeclarationSpecifiersContext) {
        if (ctx.declarationSpecifier_list() !== null) { // Standard declaration list
            // Get declaration specifier information
            let specifiers = new Array<DeclarationSpecifier>();
            ctx.declarationSpecifier_list().forEach((value, index,
                                                     array) => {

            })
        } else {
            throw_error("Unknown declaration type");
        }
    }
}

class DeclarationSpecifierVisitor extends CVisitor<BasicTypeMultiset> {
    /**
     * Visits the declaration specifiers and returns the declaration specifier
     * @param ctx The context for the declaration specifiers
     */
    // @ts-ignore
    visitDeclarationSpecifier(ctx: DeclarationSpecifierContext) {
        if (ctx.typeSpecifier() !== null) { // Get the type specifier

        } else {
            throw_error("Unknown declaration type");
        }
    }
}

class FunctionDefinitionVisitor extends StandardCVisitor {
    /**
     * Instantiates a new external declaration visitor
     */
    constructor(compilation_data: CCompilationData, compile_time_environment) {
        super(compilation_data, compile_time_environment);
    }

    /**
     * Visits the function definition and returns the instructions array
     * @param ctx The context for the function definition
     */
    // @ts-ignore
    visitFunctionDefinition(ctx: FunctionDefinitionContext) {
        throw_error("Function definition not implemented");
        return this.cd.instr;
    }
}