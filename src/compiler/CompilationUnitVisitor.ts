/**
 * C Compilation Unit Visitor
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

import CVisitor from "../parser/antlr_gen/CVisitor";
import {
    CompilationUnitContext,
    DeclarationContext,
    DeclarationSpecifierContext,
    DeclarationSpecifiersContext,
    ExternalDeclarationContext,
    FunctionDefinitionContext,
    TranslationUnitContext,
    TypeSpecifierContext
} from "../parser/antlr_gen/CParser";
import CompileTimeEnvironment from "./CompileTimeEnvironment";
import {BasicTypeMultiset} from "./TypeManagement";
import {DeclarationSpecifier, DeclarationSpecifierType, QualifiedDeclarationSpecifier} from "./DeclarationSpecifier";
import {Instruction} from "../evaluator/VirtualMachine";

/**
 * Throws an error with the given message
 * @param message
 */
function throw_error(message: string) {
    throw new Error(message);
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
        ctx.translationUnit().accept(new TranslationUnitVisitor(this.cd, this.cte))
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
            context.accept(new ExternalDeclarationVisitor(this.cd, this.cte));
        });
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
            ctx.functionDefinition().accept(new FunctionDefinitionVisitor(this.cd, this.cte));
        } else if (ctx.declaration() !== null) { // Standard Declaration
            ctx.declaration().accept(new DeclarationVisitor(this.cd, this.cte));
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
            const qualified_specifier = new DeclarationSpecifiersVisitor().visit(ctx.declarationSpecifiers());
            const k = 1;
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
                const declaration_specifier_visitor = new DeclarationSpecifierVisitor();
                specifiers.push(value.accept(declaration_specifier_visitor));
            });
            return new QualifiedDeclarationSpecifier(specifiers);
        }
        throw_error("Unknown declaration type");
    }
}

class DeclarationSpecifierVisitor extends CVisitor<DeclarationSpecifier> {
    /**
     * Visits the declaration specifiers and returns the declaration specifier
     * @param ctx The context for the declaration specifiers
     */
    // @ts-ignore
    visitDeclarationSpecifier(ctx: DeclarationSpecifierContext) {
        if (ctx.typeSpecifier() !== null) { // Get the type specifier
            const type_specifier_visitor = new TypeSpecifierVisitor();
            return ctx.typeSpecifier().accept(type_specifier_visitor);
        }
        throw_error("Unknown declaration specifier");
    }
}

class TypeSpecifierVisitor extends CVisitor<DeclarationSpecifier> {
    /**
     * Visits the type specifier and returns the string representation
     * @param ctx The context for the type specifier
     */
    // @ts-ignore
    visitTypeSpecifier(ctx: TypeSpecifierContext) {
        if (ctx.Void() !== null) { // Gets the representation for void
            return new DeclarationSpecifier(DeclarationSpecifierType.TYPE_SPECIFIER, ctx.Void().getText());
        } else if (ctx.Int() !== null) { // Gets the representation for int
            return new DeclarationSpecifier(DeclarationSpecifierType.TYPE_SPECIFIER, ctx.Int().getText());
        } else if (ctx.Char() !== null) { // Gets the representation for char
            return new DeclarationSpecifier(DeclarationSpecifierType.TYPE_SPECIFIER, ctx.Char().getText());
        } else if (ctx.Double() !== null) { // Gets the representation for double
            return new DeclarationSpecifier(DeclarationSpecifierType.TYPE_SPECIFIER, ctx.Double().getText());
        }
        throw_error("Unknown type specifier");
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