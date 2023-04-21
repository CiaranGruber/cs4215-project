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
    BlockItemContext,
    BlockItemListContext,
    CastExpressionContext,
    CompilationUnitContext,
    CompoundStatementContext,
    ConditionalExpressionContext,
    ConstantContext,
    DeclarationContext,
    EqualityExpressionContext,
    ExclusiveOrExpressionContext,
    ExpressionContext,
    ExpressionStatementContext,
    ExternalDeclarationContext,
    ForDeclarationContext,
    FunctionDefinitionContext,
    InclusiveOrExpressionContext,
    InitDeclaratorContext,
    InitDeclaratorListContext,
    InitialiserContext,
    IntegerConstantContext,
    IterationStatementContext,
    JumpStatementContext,
    LogicalAndExpressionContext,
    LogicalOrExpressionContext,
    MultiplicativeExpressionContext,
    PostfixExpressionContext,
    PrimaryExpressionContext,
    RelationalExpressionContext,
    SelectionStatementContext,
    ShiftExpressionContext,
    StatementContext,
    TranslationUnitContext,
    UnaryExpressionContext
} from "../parser/antlr_gen/CParser";
import ExplicitControlEvaluator from "./ExplicitControlEvaluator";
import {
    AgendaMark,
    AssignInstruction,
    BinopInstruction,
    BranchInstruction,
    CallInstruction,
    CastInstruction,
    DeclareInstruction,
    EnterBlockInstruction,
    ExitScopeInstruction,
    Instruction,
    LambdaInstruction,
    LDCFInstruction,
    LDCIInstruction,
    LDInstruction,
    LoopInstruction,
    MainInstruction,
    MarkType,
    PopInstruction,
    PostfixInstruction,
    ResetInstruction,
    SizeofInstruction,
    SizeofVarInstruction,
    UnaryOpInstruction
} from "./Instruction";
import CListener from "../parser/antlr_gen/CListener";
import scan_for_external_declarations from "./scanners/ExternalDeclarationScanner";
import scan_for_name from "./scanners/declaration_scanners/NameScanner";
import {get_assign_operator, get_unary_operator} from "./scanners/OperatorScanner";
import {BinaryOperator} from "./operators/BinaryOperator";
import {UnaryOperator} from "./operators/UnaryOperator";
import scan_for_type from "./scanners/type_scanners/TypeScanner";
import CharConverter from "../converter/CharConverter";
import {AssignmentOperator} from "./operators/AssignOperator";
import scan_for_argument_count from "./scanners/ArgumentCountScanner";
import ListenerFunction from "../functions/ListenerFunction";
import scan_function_definition from "./scanners/FunctionDefinitionScanner";
import scan_for_compound_declarations from "./scanners/CompoundStatementScanner";
import scan_for_condition from "./scanners/ForConditionScanner";
import IntConverter from "../converter/IntConverter";

export function create_base_instruction(ctx: CompilationUnitContext, evaluator: ExplicitControlEvaluator):
    LambdaInstruction {
    return new LambdaInstruction(() => ctx.enterRule(new ExplicitControlListener(evaluator)))
}

class ExplicitControlListener extends CListener {
    private readonly evaluator: ExplicitControlEvaluator;

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
            const new_instruction = new LambdaInstruction(() => ctx.translationUnit().enterRule(this));
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
        declarations.push(...this.evaluator.built_in_declarations);
        // Enter main block
        instructions.push(new EnterBlockInstruction(declarations));
        instructions.push(new LambdaInstruction(() => this.evaluator.run_ext_decl_functions()));
        // Create instructions stack for the external declarations
        ctx.externalDeclaration_list().forEach((context) => {
            instructions.push(new LambdaInstruction(() => context.enterRule(this)));
        });
        // Exit scope
        instructions.push(new AgendaMark(MarkType.END_OF_CODE));
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
            const new_instruction = new LambdaInstruction(() => ctx.functionDefinition().enterRule(this));
            this.evaluator.push_to_agenda(new_instruction);
        } else if (ctx.declaration()) { // Standard Declaration
            const new_instruction = new LambdaInstruction(() => ctx.declaration().enterRule(this));
            this.evaluator.push_to_agenda(new_instruction);
        }
    }

    /**
     * Enters the declaration listener and performs the relevant agenda/stash manipulations
     * @param ctx The context for the declaration
     */
    // @ts-ignore
    enterDeclaration(ctx: DeclarationContext) {
        if (ctx.staticAssertDeclaration()) {
            throw new UnknownDefinitionError("Static Assert declarations are not handled by this sub-language of C");
        }
        const instructions: Array<Instruction> = new Array<Instruction>();
        // Get type info
        instructions.push(new LambdaInstruction(() => ctx.initDeclaratorList().enterRule(this)));
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
            instructions.push(new LambdaInstruction(() => context.enterRule(this)));
            // Add pop instruction for each initDeclarator
            instructions.push(new PopInstruction());
        });
        // Remove last pop instruction
        instructions.pop();
        // Push to agenda
        this.evaluator.push_all_to_agenda(instructions);
    }

    /**
     * Enters the function and performs the relevant agenda/stash manipulations
     * @param ctx The context for the function definition
     */
    // @ts-ignore
    enterFunctionDefinition(ctx: FunctionDefinitionContext) {
        const instructions: Array<Instruction> = [];
        const function_definition = scan_function_definition(ctx);
        // Get function key
        const function_manager = this.evaluator.function_manager;
        const instruction = new LambdaInstruction(() => {
            // Enter statement if there are items
            const block_list = ctx.compoundStatement().blockItemList();
            if (block_list) {
                block_list.enterRule(this);
            }
        });
        // Collect declarations
        const declarations = scan_for_compound_declarations(ctx.compoundStatement());
        // Develop function
        const func = new ListenerFunction(this.evaluator, instruction, function_definition.args, declarations,
            function_definition.return_type);
        // Add to function manager
        const key = function_manager.add_function(func);
        instructions.push(new LDCFInstruction(key, function_definition.return_type));
        instructions.push(new DeclareInstruction(function_definition.name, true));
        // Check for main instruction
        if (function_definition.name === "main") {
            if (!function_definition.return_type.equals(IntConverter.type)) {
                throw new UnknownDefinitionError("Non-int main function not supported");
            }
            instructions.push(new MainInstruction());
        }
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
            instructions.push(new LambdaInstruction(() => ctx.initialiser().enterRule(this)));
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
        this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.assignmentExpression().enterRule(this)));
    }

    // @ts-ignore
    enterExpression(ctx: ExpressionContext) {
        // Create declarator instructions
        const instructions: Array<Instruction> = [];
        // Get declarator list evaluating left to right
        ctx.assignmentExpression_list().forEach((context) => {
            instructions.push(new LambdaInstruction(() => context.enterRule(this)));
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
            const instruction = new LambdaInstruction(() => ctx.conditionalExpression().enterRule(this));
            this.evaluator.push_to_agenda(instruction);
        } else if (ctx.assignmentExpression()) { // Perform assignment
            const instructions: Array<Instruction> = [];
            // Evaluate left side
            instructions.push(new LambdaInstruction(() => ctx.unaryExpression().enterRule(this)));
            // Evaluate right side
            instructions.push(new LambdaInstruction(() => ctx.assignmentExpression().enterRule(this)));
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
        instructions.push(new LambdaInstruction(() => ctx.logicalOrExpression().enterRule(this)));
        // Push branches
        if (ctx.expression()) {
            const success_instr = new LambdaInstruction(() => ctx.expression().enterRule(this));
            const fail_instr = new LambdaInstruction(() => ctx.conditionalExpression().enterRule(this));
            instructions.push(new BranchInstruction(success_instr, fail_instr));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterLogicalOrExpression(ctx: LogicalOrExpressionContext) {
        const instructions: Array<Instruction> = [];
        // Push left side
        instructions.push(new LambdaInstruction(() => ctx.logicalAndExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.logicalOrExpression()) {
            instructions.push(new LambdaInstruction(() => ctx.logicalOrExpression().enterRule(this)));
            instructions.push(new BinopInstruction(BinaryOperator.OR));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterLogicalAndExpression(ctx: LogicalAndExpressionContext) {
        const instructions: Array<Instruction> = [];
        // Push left side
        instructions.push(new LambdaInstruction(() => ctx.inclusiveOrExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.logicalAndExpression()) {
            instructions.push(new LambdaInstruction(() => ctx.logicalAndExpression().enterRule(this)));
            instructions.push(new BinopInstruction(BinaryOperator.AND));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterInclusiveOrExpression(ctx: InclusiveOrExpressionContext) {
        const instructions: Array<Instruction> = []
        // Push left side
        instructions.push(new LambdaInstruction(() => ctx.exclusiveOrExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.inclusiveOrExpression()) {
            instructions.push(new LambdaInstruction(() => ctx.inclusiveOrExpression().enterRule(this)));
            instructions.push(new BinopInstruction(BinaryOperator.BIT_OR));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterExclusiveOrExpression(ctx: ExclusiveOrExpressionContext) {
        const instructions: Array<Instruction> = []
        // Push left side
        instructions.push(new LambdaInstruction(() => ctx.andExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.exclusiveOrExpression()) {
            instructions.push(new LambdaInstruction(() => ctx.exclusiveOrExpression().enterRule(this)));
            instructions.push(new BinopInstruction(BinaryOperator.BIT_XOR));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterAndExpression(ctx: AndExpressionContext) {
        const instructions: Array<Instruction> = []
        // Push left side
        instructions.push(new LambdaInstruction(() => ctx.equalityExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.andExpression()) {
            instructions.push(new LambdaInstruction(() => ctx.andExpression().enterRule(this)));
            instructions.push(new BinopInstruction(BinaryOperator.BIT_XOR));
        }
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterEqualityExpression(ctx: EqualityExpressionContext) {
        const instructions: Array<Instruction> = []
        // Push left side
        instructions.push(new LambdaInstruction(() => ctx.relationalExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.equalityExpression()) {
            instructions.push(new LambdaInstruction(() => ctx.equalityExpression().enterRule(this)));
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
        instructions.push(new LambdaInstruction(() => ctx.shiftExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.relationalExpression()) {
            instructions.push(new LambdaInstruction(() => ctx.relationalExpression().enterRule(this)));
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
        instructions.push(new LambdaInstruction(() => ctx.additiveExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.shiftExpression()) {
            instructions.push(new LambdaInstruction(() => ctx.shiftExpression().enterRule(this)));
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
        instructions.push(new LambdaInstruction(() => ctx.multiplicativeExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.additiveExpression()) {
            instructions.push(new LambdaInstruction(() => ctx.additiveExpression().enterRule(this)));
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
        instructions.push(new LambdaInstruction(() => ctx.castExpression().enterRule(this)));
        // Push right side if relevant
        if (ctx.multiplicativeExpression()) {
            instructions.push(new LambdaInstruction(() => ctx.multiplicativeExpression().enterRule(this)));
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
            this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.unaryExpression().enterRule(this)));
            return;
        } else if (ctx.DigitSequence()) {
            throw new UnknownDefinitionError("Digit Sequence not implemented");
        }
        const instructions: Array<Instruction> = []
        const type = scan_for_type(ctx.typeName());
        instructions.push(new LambdaInstruction(() => ctx.castExpression().enterRule(this)));
        instructions.push(new CastInstruction(type));
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterUnaryExpression(ctx: UnaryExpressionContext) {
        if (ctx.postfixExpression()) {
            this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.postfixExpression().enterRule(this)));
        } else if (ctx.typeName()) { // Sizeof or _Alignof
            const type = scan_for_type(ctx.typeName());
            this.evaluator.push_to_agenda(new SizeofInstruction(type));
        } else if (ctx.unaryOperator()) { // Unary operator
            const operator = get_unary_operator(ctx.unaryOperator());
            const instructions: Array<Instruction> = [];
            instructions.push(new LambdaInstruction(() => ctx.castExpression().enterRule(this)));
            instructions.push(new UnaryOpInstruction(operator));
            this.evaluator.push_all_to_agenda(instructions);
        } else if (ctx.Identifier()) { // Invalid implementation
            throw new UnknownDefinitionError("Identifier GCC extension not implemented");
        } else { // Standard unary expression
            const stash = this.evaluator.memory.stack.stash;
            const instructions: Array<Instruction> = [];
            instructions.push(new LambdaInstruction(() => ctx.unaryExpression()));
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
            this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.primaryExpression().enterRule(this)));
            return;
        } else if (ctx.expression()) { // Array access
            const instructions: Array<Instruction> = [];
            instructions.push(new LambdaInstruction(() => ctx.expression().enterRule(this)));
            instructions.push(new LambdaInstruction(() => ctx.postfixExpression().enterRule(this)));
            instructions.push(new BinopInstruction(BinaryOperator.PLUS));
            instructions.push(new UnaryOpInstruction(UnaryOperator.DEREF));
            this.evaluator.push_all_to_agenda(instructions);
        } else if (ctx.argumentExpressionList()) { // Function call
            const instructions: Array<Instruction> = [];
            const argument_count = scan_for_argument_count(ctx.argumentExpressionList());
            instructions.push(new LambdaInstruction(() => ctx.postfixExpression().enterRule(this)));
            instructions.push(new LambdaInstruction(() => ctx.argumentExpressionList().enterRule(this)));
            instructions.push(new CallInstruction(argument_count));
            this.evaluator.push_all_to_agenda(instructions);
        } else if (ctx.Identifier()) { // Struct get value
            throw new UnknownDefinitionError("Structs and Unions are not supported");
        } else if (ctx.PlusPlus() || ctx.MinusMinus()) { // Postfix ++/--
            const instructions: Array<Instruction> = [];
            instructions.push(new LambdaInstruction(() => ctx.postfixExpression().enterRule(this)));
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
            instructions.push(new LambdaInstruction(() => value.enterRule(this)));
        });
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterPrimaryExpression(ctx: PrimaryExpressionContext) {
        if (ctx.Identifier()) {
            this.evaluator.push_to_agenda(new LDInstruction(ctx.Identifier().getText()))
        } else if (ctx.constant()) {
            this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.constant().enterRule(this)));
        } else if (ctx.StringLiteral(0)) {
            throw new UnknownDefinitionError("String literals not supported");
        } else if (ctx.expression()) {
            this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.expression().enterRule(this)));
        } else if (ctx.genericSelection()) {
            throw new UnknownDefinitionError("Generic selections not supported");
        } else {
            throw new UnknownDefinitionError("Other versions of primary expression not supported");
        }
    }

    // @ts-ignore
    enterConstant(ctx: ConstantContext) {
        if (ctx.integerConstant()) {
            this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.integerConstant().enterRule(this)));
        } else if (ctx.CharacterConstant()) {
            throw new UnknownDefinitionError("Character constants not supported yet");
        } else if (ctx.floatingConstant()) {
            throw new UnknownDefinitionError("Floating constants not supported");
        }
    }

    // @ts-ignore
    enterIntegerConstant(ctx: IntegerConstantContext) {
        // Todo: Allow Long values to be parsed
        if (ctx.IntegerSuffix()) {
            throw new UnknownDefinitionError("Integer suffixes not supported");
        } else if (ctx.DecimalConstant()) { // Parse a decimal constant
            const value = parseInt(ctx.DecimalConstant().getText());
            this.evaluator.push_to_agenda(new LDCIInstruction(value));
        } else if (ctx.OctalConstant()) { // Parse an octal constant
            const octal_text = ctx.OctalConstant().getText();
            // Get value including that for a lone '0'
            const value = octal_text.length > 1 ? parseInt(octal_text.slice(1), 8) : 0;
            this.evaluator.push_to_agenda(new LDCIInstruction(value));
        } else if (ctx.HexadecimalConstant()) { // Parse a hexadecimal constant
            const value = parseInt(ctx.HexadecimalConstant().getText().slice(2), 16);
            this.evaluator.push_to_agenda(new LDCIInstruction(value));
        } else if (ctx.BinaryConstant()) { // Parse a binary constant
            const value = parseInt(ctx.BinaryConstant().getText().slice(2), 2);
            this.evaluator.push_to_agenda(new LDCIInstruction(value));
        }
    }

    // @ts-ignore
    enterStatement(ctx: StatementContext) {
        if (ctx.labelledStatement()) {
            throw new UnknownDefinitionError("Labelled statements are not supported");
        } else if (ctx.compoundStatement()) {
            this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.compoundStatement().enterRule(this)));
        } else if (ctx.expressionStatement()) {
            this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.expressionStatement().enterRule(this)));
        } else if (ctx.selectionStatement()) {
            this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.selectionStatement().enterRule(this)));
        } else if (ctx.iterationStatement()) {
            this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.iterationStatement().enterRule(this)));
        } else if (ctx.jumpStatement()) {
            this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.jumpStatement().enterRule(this)));
        } else {
            throw new UnknownDefinitionError("Asm volatile instruction not supported");
        }
    }

    // @ts-ignore
    enterCompoundStatement(ctx: CompoundStatementContext) {
        const instructions: Array<Instruction> = [];
        const declarations = scan_for_compound_declarations(ctx);
        instructions.push(new EnterBlockInstruction(declarations));
        if (ctx.blockItemList()) {
            instructions.push(new LambdaInstruction(() => ctx.blockItemList().enterRule(this)));
        }
        instructions.push(new ExitScopeInstruction());
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterBlockItemList(ctx: BlockItemListContext) {
        const instructions: Array<Instruction> = [];
        ctx.blockItem_list().forEach((value) => {
            instructions.push(new LambdaInstruction(() => value.enterRule(this)));
        });
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterBlockItem(ctx: BlockItemContext) {
        if (ctx.statement()) {
            this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.statement().enterRule(this)));
        } else {
            this.evaluator.push_to_agenda(new LambdaInstruction(() => ctx.declaration().enterRule(this)));
        }
    }

    // @ts-ignore
    enterExpressionStatement(ctx: ExpressionStatementContext) {
        if (ctx.expression()) {
            const instructions: Array<Instruction> = [];
            instructions.push(new LambdaInstruction(() => ctx.expression().enterRule(this)));
            instructions.push(new PopInstruction());
            this.evaluator.push_all_to_agenda(instructions);
        }
    }

    // @ts-ignore
    enterSelectionStatement(ctx: SelectionStatementContext) {
        if (ctx.If()) { // If statement
            const instructions: Array<Instruction> = [];
            // Get main expression and success instruction
            instructions.push(new LambdaInstruction(() => ctx.expression().enterRule(this)));
            const success_instr = new LambdaInstruction(() => ctx.statement(0).enterRule(this));
            // Create branching instruction
            if (ctx.statement_list().length === 2) {
                const fail_instr = new LambdaInstruction(() => ctx.statement(1).enterRule(this));
                instructions.push(new BranchInstruction(success_instr, fail_instr))
            } else {
                instructions.push(new BranchInstruction(success_instr, new AgendaMark(MarkType.EMPTY)));
            }
            // Push instructions
            this.evaluator.push_all_to_agenda(instructions);
        } else {
            throw new UnknownDefinitionError("Switch statements not supported");
        }
    }

    // @ts-ignore
    enterIterationStatement(ctx: IterationStatementContext) {
        const instructions: Array<Instruction> = [];
        const statement_instr = new LambdaInstruction(() => ctx.statement().enterRule(this));
        if (ctx.Do()) { // Do-while loop
            // Get main instructions
            const expression_instr = new LambdaInstruction(() => ctx.expression().enterRule(this));
            // Develop instructions
            instructions.push(statement_instr);
            instructions.push(new LoopInstruction(expression_instr, statement_instr));
        } else if (ctx.For()) { // For condition
            // Scan for condition
            const for_condition = scan_for_condition(ctx.forCondition(), this);
            // Add iterator to listener instruction
            const loop_statement = new LambdaInstruction(() => {
                const instructions: Array<Instruction> = [];
                instructions.push(statement_instr);
                instructions.push(for_condition.iterator_instruction);
                this.evaluator.push_all_to_agenda(instructions);
            });
            // Push instructions
            instructions.push(new EnterBlockInstruction(for_condition.declarations));
            instructions.push(for_condition.declaration_instruction);
            instructions.push(new LoopInstruction(for_condition.branch_instruction, loop_statement));
            instructions.push(new ExitScopeInstruction());
        } else { // While loop
            // Get main instructions
            const expression_instr = new LambdaInstruction(() => ctx.expression().enterRule(this));
            // Develop instructions
            instructions.push(new LoopInstruction(expression_instr, statement_instr));
        }
        instructions.push(new AgendaMark(MarkType.LOOP_ENDED));
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterForDeclaration(ctx: ForDeclarationContext) {
        const instructions: Array<Instruction> = new Array<Instruction>();
        // Get type info
        instructions.push(new LambdaInstruction(() => ctx.initDeclaratorList().enterRule(this)));
        // Pop value
        instructions.push(new PopInstruction());
        // Push instructions to agenda
        this.evaluator.push_all_to_agenda(instructions);
    }

    // @ts-ignore
    enterJumpStatement(ctx: JumpStatementContext) {
        if (ctx.Return()) { // Return statement
            const instructions: Array<Instruction> = [];
            // Add expression
            if (ctx.expression()) {
                instructions.push(new LambdaInstruction(() => ctx.expression().enterRule(this)));
            }
            // Add reset instruction
            instructions.push(new ResetInstruction(MarkType.END_OF_FUNCTION));
            this.evaluator.push_all_to_agenda(instructions);
        } else if (ctx.Continue()) {
            this.evaluator.push_to_agenda(new ResetInstruction(MarkType.LOOP_CHECK));
        } else if (ctx.Break()) {
            this.evaluator.push_to_agenda(new ResetInstruction(MarkType.LOOP_ENDED));
        } else if (ctx.Goto() && ctx.Identifier()) {
            throw new UnknownDefinitionError("Goto instructions not supported");
        } else {
            throw new UnknownDefinitionError("GCC extension for Goto expression not supported");
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