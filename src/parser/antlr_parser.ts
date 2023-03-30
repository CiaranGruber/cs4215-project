/**
 * Antlr Parser
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

import {CharStream, CommonTokenStream} from 'antlr4';
import CLexer from "./antlr_gen/CLexer.js"; // Had to add .js - This is a hack
import CParser, {CompilationUnitContext, DirectDeclaratorContext} from "./antlr_gen/CParser.js";

export function parseInput(input: string): CompilationUnitContext {
    const chars = new CharStream(input); // replace this with a FileStream as required
    let lexer = new CLexer(chars);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new CParser(tokenStream);

    // Parse the input, where `compilationUnit` is whatever entry point you defined
    return parser.compilationUnit();
}

const compilation = parseInput(`int a = 2;

int main() {
    return 0;
}`);