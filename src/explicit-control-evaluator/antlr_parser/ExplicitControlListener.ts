/**
 * Explicit Control Visitor
 *
 * Visits the explicit control visitor and
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */
import {
    AssignmentExpressionContext,
    CompilationUnitContext,
    ConditionalExpressionContext,
    DeclarationContext,
    ExternalDeclarationContext,
    InitDeclaratorContext,
    InitDeclaratorListContext,
    InitialiserContext,
    LogicalAndExpressionContext,
    LogicalOrExpressionContext,
    TranslationUnitContext
} from "../../parser/antlr_gen/CParser";
import ExplicitControlEvaluator from "../ExplicitControlEvaluator";
import {
    AssignInstruction,
    BranchInstruction,
    DeclareInstruction,
    EnterBlockInstruction,
    ExitScopeInstruction,
    Instruction,
    ListenerInstruction,
    PopInstruction,
    PushValueInstruction
} from "../Instruction";
import CListener from "../../parser/antlr_gen/CListener";
import scan_for_external_declarations from "./ExternalDeclarationScanner";
import scan_for_name from "./NameScanner";
import {get_assign_operator} from "./OperatorScanner";
import CValue from "../CValue";
import {BuiltInTypeSpecifierType} from "../../type_descriptions/type_specifier/built_in_types/BuiltInTypeSpecifierType";
import TypeInformation from "../../type_descriptions/TypeInformation";
import {TypeSpecDeclarationSpecifier} from "../../type_descriptions/DeclarationSpecifier";
import {BuiltInTypeSpecifierEnum} from "../../type_descriptions/type_specifier/TypeSpecifier";
import DeclarationSpecification from "../../type_descriptions/DeclarationSpecification";
import Bool from "../../data_views/Bool";

export function create_base_instruction(ctx: CompilationUnitContext, evaluator: ExplicitControlEvaluator):
    ListenerInstruction<CompilationUnitListener> {
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
    private readonly evaluator: ExplicitControlEvaluator;

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
        // Scan for declarations
        const declarations = scan_for_external_declarations(ctx);
        instructions.push(new EnterBlockInstruction(declarations));
        // Create instructions stack for the external declarations
        ctx.externalDeclaration_list().forEach((context) => {
            instructions.push(new ListenerInstruction(
                () => context.enterRule(new ExternalDeclarationListener(this.evaluator))));
        });
        // Exit scope
        instructions.push(new ExitScopeInstruction());
        // Push instructions to agenda
        this.evaluator.push_all_to_agenda(instructions)
    }
}

/**
 * Represents the listener for the external declaration
 */
class ExternalDeclarationListener extends CListener {
    private readonly evaluator: ExplicitControlEvaluator;

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
            // Todo: Complete function definition
        } else if (ctx.declaration() !== null) { // Standard Declaration
            const rule = new DeclarationListener(this.evaluator);
            const new_instruction = new ListenerInstruction(() => ctx.declaration().enterRule(rule));
            this.evaluator.push_to_agenda(new_instruction);
            // Do standard declaration stuff
        } else if (ctx.Semi() === null) { // If it not a stray semi-colon
            throw new UnknownDefinitionError("Ignored definition in External Declaration");
        }
    }
}

/**
 * Represents the listener for the declaration
 */
class DeclarationListener extends CListener {
    private readonly evaluator: ExplicitControlEvaluator;

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
        const init_declarator_listener = new InitDeclaratorListListener(this.evaluator);
        instructions.push(new ListenerInstruction(() => ctx.initDeclaratorList().enterRule(init_declarator_listener)));
        // Pop value
        instructions.push(new PopInstruction());
        // Push instructions to agenda
        this.evaluator.push_all_to_agenda(instructions);
    }
}

/**
 * Represents the listener for the initDeclaratorList
 */
class InitDeclaratorListListener extends CListener {
    private readonly evaluator: ExplicitControlEvaluator;

    /**
     * Initialises a new InitDeclaratorListListener with the given explicit control evaluator
     * @param evaluator The explicit control evaluator to be used
     */
    constructor(evaluator: ExplicitControlEvaluator) {
        super();
        this.evaluator = evaluator;
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
            const init_declarator_listener = new InitDeclaratorListener(this.evaluator);
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
    private readonly evaluator: ExplicitControlEvaluator;

    /**
     * Initialises a new InitDeclaratorListener with the given evaluator and type info
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
        const instructions: Array<Instruction> = [];
        if (ctx.Assign() !== null) {
            // Push initialiser
            const initialiser_listener = new InitialiserListener(this.evaluator);
            instructions.push(new ListenerInstruction(() => ctx.initialiser().enterRule(initialiser_listener)));
        }
        // Push declare instruction
        const declaration_name = scan_for_name(ctx.declarator());
        instructions.push(new DeclareInstruction(declaration_name, ctx.Assign() !== null));
        // Push instructions to agenda
        this.evaluator.push_all_to_agenda(instructions);
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

    // @ts-ignore
    enterInitialiser(ctx: InitialiserContext) {
        if (ctx.initialiserList() !== null) {
            throw new UnknownDefinitionError("Array/Struct initialisers not implemented yet")
        }
        ctx.assignmentExpression().enterRule(new ExpressionListener(this.evaluator));
    }
}

class ExpressionListener extends CListener {
    private evaluator: ExplicitControlEvaluator;

    constructor(evaluator: ExplicitControlEvaluator) {
        super();
        this.evaluator = evaluator;
    }

    // @ts-ignore
    enterAssignmentExpression(ctx: AssignmentExpressionContext) {
        if (!ctx.conditionalExpression() !== null) { // Move to conditional
            const instruction = new ListenerInstruction(() => ctx.conditionalExpression().enterRule(this));
            this.evaluator.push_to_agenda(instruction);
        } else if (ctx.assignmentOperator() !== null) { // Perform assignment
            const instructions: Array<Instruction> = [];
            // Evaluate right side
            instructions.push(new ListenerInstruction(() => ctx.assignmentExpression().enterRule(this)));
            // Evaluate left side
            instructions.push(new ListenerInstruction(() => ctx.unaryExpression().enterRule(this)));
            // Perform assignment
            instructions.push(new AssignInstruction(get_assign_operator(ctx.assignmentOperator())));
            this.evaluator.push_all_to_agenda(instructions);
        } else {
            throw new UnknownDefinitionError("DigitSequence not accounted for");
        }
    }

    // @ts-ignore
    enterConditionalExpression(ctx: ConditionalExpressionContext) {
        const instructions: Array<Instruction> = [];
        // Push or expression first
        instructions.push(new ListenerInstruction(() => ctx.logicalOrExpression().enterRule(this)));
        // Push branches
        const success_instr = new ListenerInstruction(() => ctx.expression().enterRule(this));
        const fail_instr = new ListenerInstruction(() => ctx.conditionalExpression().enterRule(this));
        instructions.push(new BranchInstruction(success_instr, fail_instr));
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterLogicalOrExpression(ctx: LogicalOrExpressionContext) {
        const instructions: Array<Instruction> = [];
        // Push initial comparison
        instructions.push(new ListenerInstruction(() => ctx.logicalAndExpression().enterRule(this)));
        // Push remaining comparisons
        if (ctx.logicalOrExpression() !== null) {
            const if_failed = new ListenerInstruction(() => ctx.enterRule(this));
            instructions.push(new BranchInstruction(new PushValueInstruction(get_bool_value(true)), if_failed));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterLogicalAndExpression(ctx: LogicalAndExpressionContext) {
        const instructions: Array<Instruction> = [];
        // Push initial comparison
        instructions.push(new ListenerInstruction(() => ctx.inclusiveOrExpression().enterRule(this)));
        // Push remaining comparisons
        if (ctx.logicalAndExpression() !== null) {
            const if_passed = new ListenerInstruction(() => ctx.enterRule(this));
            instructions.push(new BranchInstruction(if_passed, new PushValueInstruction(get_bool_value(false))));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }
}

function get_basic_type(built_in_specifier: BuiltInTypeSpecifierType): TypeInformation {
    const void_specifier = new TypeSpecDeclarationSpecifier(new BuiltInTypeSpecifierEnum(built_in_specifier));
    const declaration_specification = DeclarationSpecification.from_specifiers([void_specifier])
    return new TypeInformation(declaration_specification, []);
}

function get_bool_value(value: boolean): CValue {
    return new CValue(false, get_basic_type(BuiltInTypeSpecifierType._BOOL), Bool.create_buffer(value));
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