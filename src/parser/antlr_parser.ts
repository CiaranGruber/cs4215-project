/**
 * Antlr Parser
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

import CLexer from "./antlr_gen/CLexer";
import CParser from "./antlr_gen/CParser";
import CCompiler, {Instruction} from "./CCompiler";
import {CharStream, CommonTokenStream} from 'antlr4';

// Create the lexer and parser
function compile(input: string) : Array<Instruction> {
    const chars = new CharStream(input); // replace this with a FileStream as required
    let lexer = new CLexer(chars);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new CParser(tokenStream);

    // Parse the input, where `compilationUnit` is whatever entry point you defined
    let tree = parser.compilationUnit();

    // Use the visitor entry point
    return tree.accept(new CCompiler());
}
