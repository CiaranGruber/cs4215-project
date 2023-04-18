import ExplicitControlEvaluator from "../explicit-control-evaluator/ExplicitControlEvaluator";
import {parse_input} from "../parser/antlr_parser";
import GlobalContext from "../global_context/GlobalContext";
import {CharStream, FileStream} from "antlr4";

/**
 * Parses the given code and the runs the evaluator
 * @param code The code to run as either a file or a string
 */
export default function parse_and_run(code: string | CharStream | FileStream): number {
    GlobalContext.initialise_instance(true);
    if (typeof code === "string") {
        code = new CharStream(code);
    }
    const parsed_context = parse_input(code);
    const evaluator = new ExplicitControlEvaluator();
    evaluator.initialise(1024, parsed_context);
    return evaluator.run();
}

const value = parse_and_run(`
int b = sizeof(int);
int *d = &b;
void print_test = print_int(d);`);
console.log(value);