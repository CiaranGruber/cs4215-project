/**
 * Agenda
 *
 * Manages the agenda for the explicit-control antlr_parser
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

import {Instruction} from "./Instruction";

/**
 * The agenda for the explicit-control antlr_parser
 */
export default class Agenda {
    private agenda_instructions: Array<Instruction>;

    public constructor() {
    }

    public initialise() {
        this.agenda_instructions = [];
    }

    public push(instruction: Instruction): void {
        this.agenda_instructions.push(instruction);
    }

    public pop(): Instruction {
        return this.agenda_instructions.pop();
    }
}