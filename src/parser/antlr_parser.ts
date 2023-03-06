/**
 * Antlr Parser
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import {CLexer} from "./antlr_out/CLexer";
import {CParser} from "./antlr_out/CParser";

// Create the lexer and parser
let inputStream = new ANTLRInputStream("text");
let lexer = new CLexer(inputStream);
let tokenStream = new CommonTokenStream(lexer);
let parser = new CParser(tokenStream);

// Parse the input, where `compilationUnit` is whatever entry point you defined
let tree = parser.compilationUnit();

let message: string = "Are you there?"

console.log(message)