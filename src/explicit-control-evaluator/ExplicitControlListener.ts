/**
 * Explicit Control Visitor
 *
 * Visits the explicit control visitor and
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */
import {
    AdditiveExpressionContext,
    AndExpressionContext,
    ArgumentExpressionListContext,
    AssignmentExpressionContext,
    CastExpressionContext,
    CompilationUnitContext,
    ConditionalExpressionContext,
    ConstantContext,
    DeclarationContext,
    EqualityExpressionContext,
    ExclusiveOrExpressionContext,
    ExternalDeclarationContext,
    InclusiveOrExpressionContext,
    InitDeclaratorContext,
    InitDeclaratorListContext,
    InitialiserContext,
    IntegerConstantContext,
    LogicalAndExpressionContext,
    LogicalOrExpressionContext,
    MultiplicativeExpressionContext,
    PostfixExpressionContext,
    PrimaryExpressionContext,
    RelationalExpressionContext,
    ShiftExpressionContext,
    TranslationUnitContext,
    UnaryExpressionContext
} from "../parser/antlr_gen/CParser";
import ExplicitControlEvaluator from "./ExplicitControlEvaluator";
import {
    AssignInstruction,
    BinopInstruction,
    BranchInstruction,
    CallInstruction,
    CastInstruction,
    DeclareInstruction,
    EnterBlockInstruction,
    ExitScopeInstruction,
    Instruction,
    LDCIInstruction,
    LdInstruction,
    ListenerInstruction,
    PopInstruction,
    PostfixInstruction,
    SizeofInstruction,
    SizeofVarInstruction,
    UnaryOpInstruction
} from "./Instruction";
import CListener from "../parser/antlr_gen/CListener";
import scan_for_external_declarations from "./scanners/ExternalDeclarationScanner";
import scan_for_name from "./scanners/NameScanner";
import {get_assign_operator, get_unary_operator} from "./scanners/OperatorScanner";
import {BinaryOperator} from "./operators/BinaryOperator";
import {UnaryOperator} from "./operators/UnaryOperator";
import scan_for_type from "./scanners/type_scanners/TypeScanner";
import CharConverter from "../converter/CharConverter";
import {AssignmentOperator} from "./operators/AssignOperator";
import scan_for_argument_count from "./scanners/ArgumentCountScanner";

export function create_base_instruction(ctx: CompilationUnitContext, evaluator: ExplicitControlEvaluator):
    ListenerInstruction<ExplicitControlListener> {
    return new ListenerInstruction(() => ctx.enterRule(new ExplicitControlListener(evaluator)))
}

class ExplicitControlListener extends CListener {
    private evaluator: ExplicitControlEvaluator;

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
        if (ctx.translationUnit()) {
            const new_instruction = new ListenerInstruction(() => ctx.translationUnit().enterRule(this));
            this.evaluator.push_to_agenda(new_instruction);
        }
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
                () => context.enterRule(this)));
        });
        // Exit scope
        instructions.push(new ExitScopeInstruction());
        // Push instructions to agenda
        this.evaluator.push_all_to_agenda(instructions)
    }

    /**
     * Enters the external declaration listener and performs the relevant agenda/stash manipulations
     * @param ctx The context for the external declaration
     */
    // @ts-ignore
    enterExternalDeclaration(ctx: ExternalDeclarationContext) {
        if (ctx.functionDefinition()) { // Function definition
            // Todo: Complete function definition
        } else if (ctx.declaration()) { // Standard Declaration
            const new_instruction = new ListenerInstruction(() => ctx.declaration().enterRule(this));
            this.evaluator.push_to_agenda(new_instruction);
            // Do standard declaration stuff
        } else if (!ctx.Semi()) { // If it not a stray semi-colon
            throw new UnknownDefinitionError("Ignored definition in External Declaration");
        }
    }

    /**
     * Enters the external declaration listener and performs the relevant agenda/stash manipulations
     * @param ctx The context for the external declaration
     */
    // @ts-ignore
    enterDeclaration(ctx: DeclarationContext) {
        if (ctx.staticAssertDeclaration()) {
            throw new UnknownDefinitionError("Static Assert declarations are not handled by this sub-language of C");
        }
        const instructions: Array<Instruction> = new Array<Instruction>();
        // Get type info
        instructions.push(new ListenerInstruction(() => ctx.initDeclaratorList().enterRule(this)));
        // Pop value
        instructions.push(new PopInstruction());
        // Push instructions to agenda
        this.evaluator.push_all_to_agenda(instructions);
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
            instructions.push(new ListenerInstruction(() => context.enterRule(this)));
            // Add pop instruction for each initDeclarator
            instructions.push(new PopInstruction());
        });
        // Remove last pop instruction
        instructions.pop();
        // Push to agenda
        this.evaluator.push_all_to_agenda(instructions);
    }

    /**
     * Enters the InitDeclaratorListener and performs the relevant agenda/stash manipulations
     * @param ctx The context for the InitDeclaratorListListener
     */
    // @ts-ignore
    enterInitDeclarator(ctx: InitDeclaratorContext) {
        const instructions: Array<Instruction> = [];
        if (ctx.Assign()) {
            // Push initialiser
            instructions.push(new ListenerInstruction(() => ctx.initialiser().enterRule(this)));
        }
        // Push declare instruction
        const declaration_name = scan_for_name(ctx.declarator());
        const should_assign = ctx.Assign() !== undefined;
        instructions.push(new DeclareInstruction(declaration_name, should_assign));
        // Push instructions to agenda
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterInitialiser(ctx: InitialiserContext) {
        if (ctx.initialiserList()) {
            throw new UnknownDefinitionError("Array/Struct initialisers not implemented yet")
        }
        this.evaluator.push_to_agenda(new ListenerInstruction(() => ctx.assignmentExpression().enterRule(this)));
    }

    // @ts-ignore
    enterExpression(ctx: ExpressionContext) {
        // Create declarator instructions
        const instructions: Array<Instruction> = [];
        // Get declarator list evaluating left to right
        ctx.assignmentExpression_list().forEach((context) => {
            instructions.push(new ListenerInstruction(() => context.enterRule(this)));
            // Add pop instruction for each initDeclarator
            instructions.push(new PopInstruction());
        });
        // Remove last pop instruction
        instructions.pop();
        // Push to agenda
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterAssignmentExpression(ctx: AssignmentExpressionContext) {
        if (ctx.conditionalExpression()) { // Move to conditional
            const instruction = new ListenerInstruction(() => ctx.conditionalExpression().enterRule(this));
            this.evaluator.push_to_agenda(instruction);
        } else if (ctx.assignmentExpression()) { // Perform assignment
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
        if (ctx.expression()) {
            const success_instr = new ListenerInstruction(() => ctx.expression().enterRule(this));
            const fail_instr = new ListenerInstruction(() => ctx.conditionalExpression().enterRule(this));
            instructions.push(new BranchInstruction(success_instr, fail_instr));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterLogicalOrExpression(ctx: LogicalOrExpressionContext) {
        const instructions: Array<Instruction> = [];
        // Push left side
        instructions.push(new ListenerInstruction(() => ctx.logicalAndExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.logicalOrExpression()) {
            instructions.push(new ListenerInstruction(() => ctx.logicalOrExpression().enterRule(this)));
            instructions.push(new BinopInstruction(BinaryOperator.OR));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterLogicalAndExpression(ctx: LogicalAndExpressionContext) {
        const instructions: Array<Instruction> = [];
        // Push left side
        instructions.push(new ListenerInstruction(() => ctx.inclusiveOrExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.logicalAndExpression()) {
            instructions.push(new ListenerInstruction(() => ctx.logicalAndExpression().enterRule(this)));
            instructions.push(new BinopInstruction(BinaryOperator.AND));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterInclusiveOrExpression(ctx: InclusiveOrExpressionContext) {
        const instructions: Array<Instruction> = []
        // Push left side
        instructions.push(new ListenerInstruction(() => ctx.exclusiveOrExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.inclusiveOrExpression()) {
            instructions.push(new ListenerInstruction(() => ctx.inclusiveOrExpression().enterRule(this)));
            instructions.push(new BinopInstruction(BinaryOperator.BIT_OR));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterExclusiveOrExpression(ctx: ExclusiveOrExpressionContext) {
        const instructions: Array<Instruction> = []
        // Push left side
        instructions.push(new ListenerInstruction(() => ctx.andExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.exclusiveOrExpression()) {
            instructions.push(new ListenerInstruction(() => ctx.exclusiveOrExpression().enterRule(this)));
            instructions.push(new BinopInstruction(BinaryOperator.BIT_XOR));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterAndExpression(ctx: AndExpressionContext) {
        const instructions: Array<Instruction> = []
        // Push left side
        instructions.push(new ListenerInstruction(() => ctx.equalityExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.andExpression()) {
            instructions.push(new ListenerInstruction(() => ctx.andExpression().enterRule(this)));
            instructions.push(new BinopInstruction(BinaryOperator.BIT_XOR));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterEqualityExpression(ctx: EqualityExpressionContext) {
        const instructions: Array<Instruction> = []
        // Push left side
        instructions.push(new ListenerInstruction(() => ctx.relationalExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.equalityExpression()) {
            instructions.push(new ListenerInstruction(() => ctx.equalityExpression().enterRule(this)));
            instructions.push(new BinopInstruction(BinaryOperator.EQUAL));
            if (ctx.NotEqual()) {
                instructions.push(new UnaryOpInstruction(UnaryOperator.NOT));
            }
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterRelationalExpression(ctx: RelationalExpressionContext) {
        const instructions: Array<Instruction> = []
        // Push left side
        instructions.push(new ListenerInstruction(() => ctx.shiftExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.relationalExpression()) {
            instructions.push(new ListenerInstruction(() => ctx.relationalExpression().enterRule(this)));
            if (ctx.Greater()) {
                instructions.push(new BinopInstruction(BinaryOperator.GREATER_THAN));
            } else if (ctx.GreaterEqual()) {
                instructions.push(new BinopInstruction(BinaryOperator.GREATER_THAN_OR_EQUAL));
            } else if (ctx.Less()) {
                instructions.push(new BinopInstruction(BinaryOperator.LESS_THAN))
            } else {
                instructions.push(new BinopInstruction(BinaryOperator.LESS_THAN_OR_EQUAL));
            }
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterShiftExpression(ctx: ShiftExpressionContext) {
        const instructions: Array<Instruction> = []
        // Push left side
        instructions.push(new ListenerInstruction(() => ctx.additiveExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.shiftExpression()) {
            instructions.push(new ListenerInstruction(() => ctx.shiftExpression().enterRule(this)));
            if (ctx.LeftShift()) {
                instructions.push(new BinopInstruction(BinaryOperator.LEFT_SHIFT));
            } else {
                instructions.push(new BinopInstruction(BinaryOperator.RIGHT_SHIFT));
            }
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterAdditiveExpression(ctx: AdditiveExpressionContext) {
        const instructions: Array<Instruction> = []
        // Push left side
        instructions.push(new ListenerInstruction(() => ctx.multiplicativeExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.additiveExpression()) {
            instructions.push(new ListenerInstruction(() => ctx.additiveExpression().enterRule(this)));
            if (ctx.Plus()) {
                instructions.push(new BinopInstruction(BinaryOperator.PLUS));
            } else {
                instructions.push(new BinopInstruction(BinaryOperator.SUBTRACT));
            }
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterMultiplicativeExpression(ctx: MultiplicativeExpressionContext) {
        const instructions: Array<Instruction> = []
        // Push left side
        instructions.push(new ListenerInstruction(() => ctx.castExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.multiplicativeExpression()) {
            instructions.push(new ListenerInstruction(() => ctx.multiplicativeExpression().enterRule(this)));
            if (ctx.Star()) {
                instructions.push(new BinopInstruction(BinaryOperator.MULTIPLY));
            } else if (ctx.Div()) {
                instructions.push(new BinopInstruction(BinaryOperator.DIVIDE));
            } else {
                instructions.push(new BinopInstruction(BinaryOperator.MODULO));
            }
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterCastExpression(ctx: CastExpressionContext) {
        if (ctx.unaryExpression()) {
            this.evaluator.push_to_agenda(new ListenerInstruction(() => ctx.unaryExpression().enterRule(this)));
            return;
        } else if (ctx.DigitSequence()) {
            throw new UnknownDefinitionError("Digit Sequence not implemented");
        }
        const instructions: Array<Instruction> = []
        const type = scan_for_type(ctx.typeName());
        instructions.push(new ListenerInstruction(() => ctx.castExpression().enterRule(this)));
        instructions.push(new CastInstruction(type));
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterUnaryExpression(ctx: UnaryExpressionContext) {
        if (ctx.postfixExpression()) {
            this.evaluator.push_to_agenda(new ListenerInstruction(() => ctx.postfixExpression().enterRule(this)));
        } else if (ctx.typeName()) { // Sizeof or _Alignof
            const type = scan_for_type(ctx.typeName());
            this.evaluator.push_to_agenda(new SizeofInstruction(type));
        } else if (ctx.unaryOperator()) { // Unary operator
            const operator = get_unary_operator(ctx.unaryOperator());
            const instructions: Array<Instruction> = [];
            instructions.push(new ListenerInstruction(() => ctx.castExpression().enterRule(this)));
            instructions.push(new UnaryOpInstruction(operator));
            this.evaluator.push_all_to_agenda(instructions);
        } else if (ctx.Identifier()) { // Invalid implementation
            throw new UnknownDefinitionError("Identifier GCC extension not implemented");
        } else { // Standard unary expression
            const stash = this.evaluator.memory.stack.stash;
            const instructions: Array<Instruction> = [];
            instructions.push(new ListenerInstruction(() => ctx.unaryExpression()));
            if (ctx.PlusPlus()) {
                stash.push(new CharConverter().convert_to_c(1));
                instructions.push(new AssignInstruction(AssignmentOperator.PLUS_ASSIGN));
            } else if (ctx.MinusMinus()) {
                stash.push(new CharConverter().convert_to_c(1));
                instructions.push(new AssignInstruction(AssignmentOperator.SUBTRACT_ASSIGN));
            } else {
                instructions.push(new SizeofVarInstruction());
            }
            this.evaluator.push_all_to_agenda(instructions);
        }
    }

    // @ts-ignore
    enterPostfixExpression(ctx: PostfixExpressionContext) {
        if (ctx.primaryExpression()) {
            this.evaluator.push_to_agenda(new ListenerInstruction(() => ctx.primaryExpression().enterRule(this)));
            return;
        } else if (ctx.expression()) { // Array access
            const instructions: Array<Instruction> = [];
            instructions.push(new ListenerInstruction(() => ctx.expression().enterRule(this)));
            instructions.push(new ListenerInstruction(() => ctx.postfixExpression().enterRule(this)));
            instructions.push(new BinopInstruction(BinaryOperator.PLUS));
            instructions.push(new UnaryOpInstruction(UnaryOperator.DEREF));
            this.evaluator.push_all_to_agenda(instructions);
        } else if (ctx.argumentExpressionList()) { // Function call
            const instructions: Array<Instruction> = [];
            const argument_count = scan_for_argument_count(ctx.argumentExpressionList());
            instructions.push(new ListenerInstruction(() => ctx.postfixExpression().enterRule(this)));
            instructions.push(new ListenerInstruction(() => ctx.argumentExpressionList().enterRule(this)));
            instructions.push(new CallInstruction(argument_count));
            this.evaluator.push_all_to_agenda(instructions);
        } else if (ctx.Identifier()) { // Struct get value
            throw new UnknownDefinitionError("Structs and Unions are not supported");
        } else if (ctx.PlusPlus() || ctx.MinusMinus()) { // Postfix ++/--
            const instructions: Array<Instruction> = [];
            instructions.push(new ListenerInstruction(() => ctx.postfixExpression().enterRule(this)));
            const operator = ctx.PlusPlus() ? UnaryOperator.POST_PLUS_PLUS : UnaryOperator.POST_MINUS_MINUS;
            instructions.push(new PostfixInstruction(operator));
            this.evaluator.push_all_to_agenda(instructions);
        } else {
            throw new UnknownDefinitionError("Structs/Union/Array initialisers not supported");
        }
    }

    // @ts-ignore
    enterArgumentExpressionList(ctx: ArgumentExpressionListContext) {
        const instructions: Array<Instruction> = [];
        // Add argument expressions from left to right
        ctx.assignmentExpression_list().forEach((value) => {
            instructions.push(new ListenerInstruction(() => value.enterRule(this)));
        });
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterPrimaryExpression(ctx: PrimaryExpressionContext) {
        if (ctx.Identifier()) {
            this.evaluator.push_to_agenda(new LdInstruction(ctx.Identifier().getText()))
        } else if (ctx.constant()) {
            this.evaluator.push_to_agenda(new ListenerInstruction(() => ctx.constant().enterRule(this)));
        } else if (ctx.StringLiteral(0)) {
            throw new UnknownDefinitionError("String literals not supported");
        } else if (ctx.expression()) {
            this.evaluator.push_to_agenda(new ListenerInstruction(() => ctx.expression().enterRule(this)));
        } else if (ctx.genericSelection()) {
            throw new UnknownDefinitionError("Generic selections not supported");
        } else {
            throw new UnknownDefinitionError("Other versions of primary expression not supported");
        }
    }

    // @ts-ignore
    enterConstant(ctx: ConstantContext) {
        if (ctx.integerConstant()) {
            this.evaluator.push_to_agenda(new ListenerInstruction(() => ctx.integerConstant().enterRule(this)));
        } else if (ctx.CharacterConstant()) {
            throw new UnknownDefinitionError("Character constants not supported yet");
        } else if (ctx.floatingConstant()) {
            throw new UnknownDefinitionError("Floating constants not supported");
        }
    }

    // @ts-ignore
    enterIntegerConstant(ctx: IntegerConstantContext) {
        if (ctx.IntegerSuffix()) {
            throw new UnknownDefinitionError("Integer suffixes not supported");
        } else if (ctx.DecimalConstant()) {
            // Todo: Allow Long values to be parsed
            const value: number = parseInt(ctx.DecimalConstant().getText());
            this.evaluator.push_to_agenda(new LDCIInstruction(value));
        } else if (ctx.OctalConstant()) {
            throw new UnknownDefinitionError("Octal constants not supported");
        } else if (ctx.HexadecimalConstant()) {
            throw new UnknownDefinitionError("Hexadecimal constants not supported");
        } else if (ctx.BinaryConstant()) {
            throw new UnknownDefinitionError("Binary constants not supported");
        }
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