import {DeclaratorContext, DirectDeclaratorContext} from "../../parser/antlr_gen/CParser";
import CVisitor from "../../parser/antlr_gen/CVisitor";

export default function scan_for_name(ctx: DeclaratorContext): string {
    return ctx.accept(new DeclaratorVisitor());
}

class DeclaratorVisitor extends CVisitor<string> {
    // @ts-ignore
    visitDeclarator(ctx: DeclaratorContext) {
        return ctx.directDeclarator().accept(this);
    }

    // @ts-ignore
    visitDirectDeclarator(ctx: DirectDeclaratorContext) {
        if (ctx.Identifier() && !ctx.DigitSequence()) {
            return ctx.Identifier().getText();
        }
        if (ctx.declarator()) {
            return ctx.declarator().accept(this);
        }
        if (ctx.directDeclarator()) {
            return ctx.directDeclarator().accept(this);
        }
    }
}