import {CompilationUnitContext} from "../parser/antlr_gen/CParser";
import CompilationUnitVisitor from "./CompilationUnitVisitor";
import {Instruction} from "../evaluator/VirtualMachine";

function compile(tree: CompilationUnitContext): Array<Instruction> {
    return tree.accept(new CompilationUnitVisitor());
}