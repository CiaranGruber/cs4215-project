import CFunction from "./CFunction";
import CMemory from "../heap/CMemory";
import CValue from "../explicit-control-evaluator/CValue";
import TypeInformation from "../type_descriptions/TypeInformation";
import VariableDeclaration from "../explicit-control-evaluator/VariableDeclaration";
import ExplicitControlEvaluator from "../explicit-control-evaluator/ExplicitControlEvaluator";
import {
    AgendaMark,
    DeclareInstruction,
    EnterCallInstruction,
    ExitScopeInstruction,
    Instruction,
    LDCCInstruction,
    MarkType
} from "../explicit-control-evaluator/Instruction";

/**
 * The listener function type used to run a C-defined function
 */
export default class ListenerFunction extends CFunction {
    private readonly instruction: Instruction;
    private readonly evaluator: ExplicitControlEvaluator;
    private readonly parameters: Array<VariableDeclaration>;
    private readonly variables_in_statement: Array<VariableDeclaration>;
    private readonly return_type: TypeInformation;

    public constructor(evaluator: ExplicitControlEvaluator, instruction: Instruction, args: Array<VariableDeclaration>,
                       variables_in_statement: Array<VariableDeclaration>, return_type: TypeInformation) {
        super();
        this.instruction = instruction;
        this.evaluator = evaluator;
        this.parameters = args;
        this.variables_in_statement = variables_in_statement;
        this.return_type = return_type;
    }

    public run(memory: CMemory, args: Array<CValue>) {
        const instructions: Array<Instruction> = [];
        // Get total declarations
        const total_declarations: Array<VariableDeclaration> = [];
        this.parameters.forEach((value) => {
            if (value.name) { // Ignore abstract declarators
                total_declarations.push(value);
            }
        });
        total_declarations.push(...this.variables_in_statement);
        // Add block entry
        instructions.push(new EnterCallInstruction(this.return_type, total_declarations));
        // Declare parameters and set values
        for (let i = 0; i < args.length; i++) {
            const parameter = this.parameters[i];
            if (parameter.name) { // Ignore parameters with abstract declarators
                instructions.push(new LDCCInstruction(args[i]));
                instructions.push(new DeclareInstruction(parameter.name, true));
            }
        }
        // Push body
        instructions.push(this.instruction);
        instructions.push(new AgendaMark(MarkType.END_OF_FUNCTION));
        // Exit scope
        instructions.push(new ExitScopeInstruction());
        this.evaluator.push_all_to_agenda(instructions);
    }
}