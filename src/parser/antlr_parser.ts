/**
 * Antlr Parser
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

import {CharStream, CommonTokenStream, FileStream} from "antlr4";
import CLexer from "./antlr_gen/CLexer";
import CParser, {CompilationUnitContext} from "./antlr_gen/CParser";

export function parse_input(input: CharStream | FileStream): CompilationUnitContext {
    let lexer = new CLexer(input);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new CParser(tokenStream);

    // Parse the input, where `compilationUnit` is whatever entry point you defined
    return parser.compilationUnit();
}