import {ForConditionContext} from "../../parser/antlr_gen/CParser";
import CVisitor from "../../parser/antlr_gen/CVisitor";
import {AgendaMark, Instruction, LambdaInstruction, MarkType} from "../Instruction";
import CListener from "../../parser/antlr_gen/CListener";
import VariableDeclaration from "../VariableDeclaration";
import scan_for_declaration from "./declaration_scanners/ForDeclarationScanner";

/**
 * Scans a For Condition to determine the instructions
 * @param ctx The context to scan
 * @param main_listener The listener used to run the main instructions
 */
export default function scan_for_condition(ctx: ForConditionContext, main_listener: CListener): ForCondition {
    return ctx.accept(new ForConditionScanner(main_listener));
}

/**
 * Contains the sections of the for condition
 */
export class ForCondition {
    /**
     * The initial declarations if they exist, else undefined
     */
    public readonly declarations: Array<VariableDeclaration>;
    /**
     * The declaration to run at the start of the for loop
     */
    public readonly declaration_instruction: Instruction;
    /**
     * The instruction used to run at the start and end of each looping
     */
    public readonly branch_instruction: Instruction;
    /**
     * The iterator instruction to run at the end of each loop
     */
    public readonly iterator_instruction: Instruction;

    /**
     * Constructs a new ForCondition instance with the specified instructions
     * @param declarations The array of declarations used in the initial iterator declaration
     * @param declaration_instruction The declaration instruction to run at the start
     * @param branch_instruction The branch instruction to run at the start of each looping
     * @param iterator_instruction The iterator instruction to run at the end of each statement
     */
    constructor(declarations: Array<VariableDeclaration>, declaration_instruction: Instruction,
                branch_instruction: Instruction, iterator_instruction: Instruction) {
        this.declarations = declarations;
        this.declaration_instruction = declaration_instruction;
        this.branch_instruction = branch_instruction;
        this.iterator_instruction = iterator_instruction;
    }
}

class ForConditionScanner extends CVisitor<ForCondition> {
    private readonly main_listener: CListener;

    public constructor(main_listener: CListener) {
        super();
        this.main_listener = main_listener;
    }

    // @ts-ignore
    visitForCondition(ctx: ForConditionContext) {
        // Get declaration instruction
        let declarations;
        let declaration_instr;
        if (ctx.forDeclaration()) {
            declaration_instr = new LambdaInstruction(() =>
                ctx.forDeclaration().enterRule(this.main_listener));
            declarations = scan_for_declaration(ctx.forDeclaration());
        } else if (ctx.expression()) {
            declaration_instr = new LambdaInstruction(() => ctx.expression().enterRule(this.main_listener));
            declarations = [];
        } else {
            declaration_instr = new AgendaMark(MarkType.EMPTY);
            declarations = [];
        }
        // Get branching instruction
        const branch_instr = new LambdaInstruction(() => ctx.forExpression(0).enterRule(this.main_listener));
        // Get iterator instruction
        const iterator_instr = new LambdaInstruction(() => ctx.forExpression(1).enterRule(this.main_listener));
        // Get branching instruction
        return new ForCondition(declarations, declaration_instr, branch_instr, iterator_instr);
    }
}