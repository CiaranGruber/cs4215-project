import {BlockItemContext, BlockItemListContext, CompoundStatementContext} from "../../parser/antlr_gen/CParser";
import VariableDeclaration from "../VariableDeclaration";
import CVisitor from "../../parser/antlr_gen/CVisitor";
import scan_declaration from "./declaration_scanners/DeclarationScanner";

/**
 * Scans a given translation unit for the external declarations within the program
 * @param ctx The translation unit context
 */
export default function scan_for_compound_declarations(ctx: CompoundStatementContext): Array<VariableDeclaration> {
    return ctx.accept(new CompoundStatementScanner());
}

class CompoundStatementScanner extends CVisitor<Array<VariableDeclaration>> {
    // @ts-ignore
    visitCompoundStatement(ctx: CompoundStatementContext) {
        if (ctx.blockItemList()) {
            return ctx.blockItemList().accept(this);
        }
        return [];
    }

    // @ts-ignore
    visitBlockItemList(ctx: BlockItemListContext) {
        const declarations: Array<VariableDeclaration> = [];
        ctx.blockItem_list().forEach((value) => {
            declarations.push(...value.accept(new BlockItemScanner()));
        });
        return declarations;
    }
}

class BlockItemScanner extends CVisitor<Array<VariableDeclaration>> {
    // @ts-ignore
    visitBlockItem(ctx: BlockItemContext) {
        if (ctx.declaration()) {
            return scan_declaration(ctx.declaration());
        }
        return [];
    }
}