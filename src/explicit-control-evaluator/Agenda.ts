/**
 * Agenda
 *
 * Manages the agenda for the explicit-control evaluator
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

import {Instruction} from "./ExplicitControlEvaluator";

/**
 * The agenda for the explicit-control evaluator
 */
export default class Agenda {
    private agenda_instructions: Array<Instruction>;

    public push(instruction: Instruction): void {
        this.agenda_instructions.push(instruction);
    }

    public pop(): Instruction {
        return this.agenda_instructions.pop();
    }
}