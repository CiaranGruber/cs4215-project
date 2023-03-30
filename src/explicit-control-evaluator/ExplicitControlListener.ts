/**
 * Explicit Control Visitor
 *
 * Visits the explicit control visitor and
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */
import ExplicitControlEvaluator, {Instruction, ListenerInstruction, PopInstruction} from "./ExplicitControlEvaluator";
import CListener from "../parser/antlr_gen/CListener";
import {
    CompilationUnitContext, DeclarationContext, DeclarationSpecifierContext,
    DeclarationSpecifiersContext,
    ExternalDeclarationContext, InitDeclaratorContext, InitDeclaratorListContext,
    TranslationUnitContext, TypeSpecifierContext
} from "../parser/antlr_gen/CParser";
import CVisitor from "../parser/antlr_gen/CVisitor";
import {
    DeclarationSpecifier,
    DeclarationSpecifierType,
    QualifiedDeclarationSpecifier
} from "./types/DeclarationSpecifier";

export function create_base_instruction(ctx: CompilationUnitContext, evaluator: ExplicitControlEvaluator):
    ListenerInstruction<CompilationUnitListener, CompilationUnitContext> {
    return new ListenerInstruction(() => ctx.enterRule(new CompilationUnitListener(evaluator)))
}

/**
 * Represents the listener for the compilation unit
 */
class CompilationUnitListener extends CListener {
    private readonly evaluator: ExplicitControlEvaluator;

    /**
     * Initialises a new compilation unit listener with the given evaluator
     * @param evaluator The explicit control evaluator to be used
     */
    constructor(evaluator: ExplicitControlEvaluator) {
        super();
        this.evaluator = evaluator;
    }

    /**
     * Enters the compilation unit listener and performs the relevant agenda/stash manipulations
     * @param ctx The context for the compilation unit
     */
    // @ts-ignore
    enterCompilationUnit(ctx: CompilationUnitContext) {
        const new_instruction = new ListenerInstruction(
            () => ctx.translationUnit().enterRule(new TranslationUnitListener(this.evaluator)));
        this.evaluator.push_to_agenda(new_instruction);
    }
}

/**
 * Represents the listener for the translation unit
 */
class TranslationUnitListener extends CListener {
    private evaluator: ExplicitControlEvaluator;

    /**
     * Initialises a new translation unit listener with the given evaluator
     * @param evaluator The explicit control evaluator to be used
     */
    constructor(evaluator: ExplicitControlEvaluator) {
        super();
        this.evaluator = evaluator;
    }

    /**
     * Enters the translation unit listener and performs the relevant agenda/stash manipulations
     * @param ctx The context for the translation unit
     */
    // @ts-ignore
    enterTranslationUnit(ctx: TranslationUnitContext) {
        const instructions: Array<Instruction> = new Array<Instruction>();
        // Create instructions stack for the external declarations
        ctx.externalDeclaration_list().forEach((context, index, array) => {
            instructions.push(new ListenerInstruction(
                () => context.enterRule(new ExternalDeclarationListener(this.evaluator))));
        });
        // Append all external declarations from stack to agenda in reversed order
        while (instructions.length > 0) {
            this.evaluator.push_to_agenda(instructions.pop());
        }
    }
}

/**
 * Represents the listener for the external declaration
 */
class ExternalDeclarationListener extends CListener {
    private evaluator: ExplicitControlEvaluator;

    /**
     * Initialises a new external declaration listener with the given evaluator
     * @param evaluator The explicit control evaluator to be used
     */
    constructor(evaluator: ExplicitControlEvaluator) {
        super();
        this.evaluator = evaluator;
    }

    /**
     * Enters the external declaration listener and performs the relevant agenda/stash manipulations
     * @param ctx The context for the external declaration
     */
    // @ts-ignore
    enterExternalDeclaration(ctx: ExternalDeclarationContext) {
        if (ctx.functionDefinition() !== null) { // Function definition
            // Do function definition stuff
        } else if (ctx.declaration() !== null) { // Standard Declaration
            // Do standard declaration stuff
        } else if (ctx.Semi() === null) { // If not a stray semi-colon
            throw new UnknownDefinitionError("Ignored definition in External Declaration");
        }
    }
}

/**
 * Represents the listener for the declaration
 */
class DeclarationListener extends CListener {
    private evaluator: ExplicitControlEvaluator;

    /**
     * Initialises a new declaration listener with the given evaluator
     * @param evaluator The explicit control evaluator to be used
     */
    constructor(evaluator: ExplicitControlEvaluator) {
        super();
        this.evaluator = evaluator;
    }

    /**
     * Enters the external declaration listener and performs the relevant agenda/stash manipulations
     * @param ctx The context for the external declaration
     */
    // @ts-ignore
    enterDeclaration(ctx: DeclarationContext) {
        if (ctx.staticAssertDeclaration() !== null) {
            throw new UnknownDefinitionError("Static Assert declarations are not handled by this sub-language of C");
        }
        const instructions: Array<Instruction> = new Array<Instruction>();
        // Get type info
        const declaration_specifier = ctx.declarationSpecifiers();
        const type_info = declaration_specifier.accept(new DeclarationSpecifiersVisitor());
        const init_declarator_listener = new InitDeclaratorListListener(this.evaluator, type_info);
        instructions.push(new ListenerInstruction(() => ctx.initDeclaratorList().enterRule(init_declarator_listener)))
        // Pop value
        instructions.push(new PopInstruction());
        // Push instructions to agenda
        this.evaluator.push_all_to_agenda(instructions);
    }
}

class DeclarationSpecifiersVisitor extends CVisitor<QualifiedDeclarationSpecifier> {
    /**
     * Visits the declaration specifiers and returns the relevant type information
     * @param ctx The context for the declaration specifiers
     */
    // @ts-ignore
    visitDeclarationSpecifiers(ctx: DeclarationSpecifiersContext) {
        if (ctx.declarationSpecifier_list() !== null) { // Standard declaration list
            // Get declaration specifier information
            let specifiers = new Array<DeclarationSpecifier>();
            ctx.declarationSpecifier_list().forEach((value) => {
                const declaration_specifier_visitor = new DeclarationSpecifierVisitor();
                specifiers.push(value.accept(declaration_specifier_visitor));
            });
            return new QualifiedDeclarationSpecifier(specifiers);
        }
        throw new UnknownDefinitionError("Unknown declaration type");
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
        throw new UnknownDefinitionError("Unknown type definition");
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
        throw new UnknownDefinitionError("Unknown type specifier");
    }
}

/**
 * Represents the listener for the initDeclaratorList
 */
class InitDeclaratorListListener extends CListener {
    private evaluator: ExplicitControlEvaluator;
    private type_info: QualifiedDeclarationSpecifier;

    /**
     * Initialises a new InitDeclaratorListListener with the given evaluator and type info
     * @param evaluator The explicit control evaluator to be used
     * @param type_info The type info used for the init declarator list
     */
    constructor(evaluator: ExplicitControlEvaluator, type_info: QualifiedDeclarationSpecifier) {
        super();
        this.evaluator = evaluator;
        this.type_info = type_info;
    }

    /**
     * Enters the InitDeclaratorListListener and performs the relevant agenda/stash manipulations
     * @param ctx The context for the InitDeclaratorListListener
     */
    // @ts-ignore
    enterInitDeclaratorList(ctx: InitDeclaratorListContext) {
        // Create declarator instructions
        const instructions: Array<Instruction> = new Array<Instruction>();
        // Get declarator list evaluating left to right
        ctx.initDeclarator_list().forEach((context) => {
            const init_declarator_listener = new InitDeclaratorListener(this.evaluator, this.type_info);
            instructions.push(new ListenerInstruction(() => context.enterRule(init_declarator_listener)));
            // Add pop instruction for each initDeclarator
            instructions.push(new PopInstruction());
        });
        // Remove last pop instruction
        instructions.pop();
        // Push to agenda
        this.evaluator.push_all_to_agenda(instructions);
    }
}

/**
 * Represents the listener for the initDeclarator
 */
class InitDeclaratorListener extends CListener {
    private evaluator: ExplicitControlEvaluator;
    private type_info: QualifiedDeclarationSpecifier;

    /**
     * Initialises a new InitDeclaratorListener with the given evaluator and type info
     * @param evaluator The explicit control evaluator to be used
     * @param type_info The type info used for the init declarator
     */
    constructor(evaluator: ExplicitControlEvaluator, type_info: QualifiedDeclarationSpecifier) {
        super();
        this.evaluator = evaluator;
        this.type_info = type_info;
    }

    /**
     * Enters the InitDeclaratorListener and performs the relevant agenda/stash manipulations
     * @param ctx The context for the InitDeclaratorListListener
     */
    // @ts-ignore
    enterInitDeclarator(ctx: InitDeclaratorContext) {
        const instructions: Array<Instruction> = new Array<Instruction>();
        // Push initialiser value (right side of assign)
        const initialiser_listener = new InitialiserListener(this.evaluator);
        instructions.push(new ListenerInstruction(() => ctx.initialiser().enterRule(initialiser_listener)));
        // Push declarator (left side of assign)
        const declarator_listener = new DeclaratorListener(this.evaluator, this.type_info);
        instructions.push(new ListenerInstruction(() => ctx.declarator().enterRule(declarator_listener)));
        // Push assign instruction
        instructions.push();
        throw new UnknownDefinitionError("Init declarator not implemented");
    }
}

/**
 * Represents the listener for the initialiser
 */
class InitialiserListener extends CListener {
    private evaluator: ExplicitControlEvaluator;

    /**
     * Initialises a new InitDeclaratorListener with the given evaluator
     * @param evaluator The explicit control evaluator to be used
     */
    constructor(evaluator: ExplicitControlEvaluator) {
        super();
        this.evaluator = evaluator;
    }

    /**
     * Enters the InitDeclaratorListener and performs the relevant agenda/stash manipulations
     * @param ctx The context for the InitDeclaratorListListener
     */
    // @ts-ignore
    enterInitDeclarator(ctx: InitDeclaratorContext) {
        throw new UnknownDefinitionError("Initialiser not implemented");
    }
}

/**
 * Represents the listener for the declarator
 */
class DeclaratorListener extends CListener {
    private evaluator: ExplicitControlEvaluator;
    private type_info: QualifiedDeclarationSpecifier;

    /**
     * Initialises a new DeclaratorListener with the given evaluator and type info
     * @param evaluator The explicit control evaluator to be used
     * @param type_info The type info used for the declarator
     */
    constructor(evaluator: ExplicitControlEvaluator, type_info: QualifiedDeclarationSpecifier) {
        super();
        this.evaluator = evaluator;
        this.type_info = type_info;
    }

    /**
     * Enters the DeclaratorListener and performs the relevant agenda/stash manipulations
     * @param ctx The context for the DeclaratorListener
     */
    // @ts-ignore
    enterDeclarator(ctx: DeclaratorContext) {
        throw new UnknownDefinitionError("Initialiser not implemented");
    }
}

/**
 * Thrown when a given definition is not known/implemented by the explicit-control listener
 */
export class UnknownDefinitionError extends Error {
    /**
     * Constructs a new UnknownDefinitionError instance
     * @param message The message given along with the error
     */
    constructor(message) {
        super(message);
        this.name = "UnknownDefinitionError";
    }
}