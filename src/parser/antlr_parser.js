"use strict";
/**
 * Antlr Parser
 *
 * Created for CS4215 term project
 *
 * By Ciaran Gruber and Jody Tang
 */
Object.defineProperty(exports, "__esModule", { value: true });
const antlr4ts_1 = require("antlr4ts");
const CLexer_1 = require("./antlr_out/CLexer");
const CParser_1 = require("./antlr_out/CParser");
const tree_1 = require("antlr4ts/tree");
// Create the lexer and parser
let inputStream = new antlr4ts_1.ANTLRInputStream(`
int test() {
    int a = 2;
    return a;
}

test()`);
let lexer = new CLexer_1.CLexer(inputStream);
let tokenStream = new antlr4ts_1.CommonTokenStream(lexer);
let parser = new CParser_1.CParser(tokenStream);
// Parse the input, where `compilationUnit` is whatever entry point you defined
let tree = parser.compilationUnit();
// Extend the AbstractParseTreeVisitor to get default visitor behaviour
class CountFunctionsVisitor extends tree_1.AbstractParseTreeVisitor {
    defaultResult() {
        return 0;
    }
    aggregateResult(aggregate, nextResult) {
        return aggregate + nextResult;
    }
    visit(context) {
        return 1 + super.visitChildren(context);
    }
}
// Create the visitor
const countFunctionsVisitor = new CountFunctionsVisitor();
// Use the visitor entry point
countFunctionsVisitor.visit(tree);
//# sourceMappingURL=antlr_parser.js.map