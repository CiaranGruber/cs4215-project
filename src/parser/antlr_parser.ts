/**
 * Antlr Parser
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */

import { CompilationUnitContext } from "./antlr_gen/CParser";
import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import {CLexer} from "./antlr_gen/CLexer";
import {CParser} from "./antlr_gen/CParser";
import {AbstractParseTreeVisitor} from "antlr4ts/tree";
import {CVisitor} from "./antlr_gen/CVisitor";

// Create the lexer and parser
let inputStream = new ANTLRInputStream("int a = 3;");
let lexer = new CLexer(inputStream);
let tokenStream = new CommonTokenStream(lexer);
let parser = new CParser(tokenStream);

// Parse the input, where `compilationUnit` is whatever entry point you defined
let tree = parser.compilationUnit();

// Extend the AbstractParseTreeVisitor to get default visitor behaviour
class CountFunctionsVisitor extends AbstractParseTreeVisitor<number> implements CVisitor<number> {

    defaultResult() {
        return 0
    }

    aggregateResult(aggregate: number, nextResult: number) {
        return aggregate + nextResult
    }

    visit(context: CompilationUnitContext): number {
        return 1 + super.visitChildren(context)
    }
}

// Create the visitor
const countFunctionsVisitor = new CountFunctionsVisitor()

// Use the visitor entry point
countFunctionsVisitor.visit(tree)
