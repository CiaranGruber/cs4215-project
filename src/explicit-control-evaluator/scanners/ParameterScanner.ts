import {
    DeclaratorContext,
    DirectDeclaratorContext,
    ParameterDeclarationContext,
    ParameterListContext,
    ParameterTypeListContext
} from "../../parser/antlr_gen/CParser";
import CVisitor from "../../parser/antlr_gen/CVisitor";
import VariableDeclaration from "../VariableDeclaration";
import {UnknownDefinitionError} from "../ExplicitControlListener";
import scan_declaration_specification from "./type_scanners/DeclarationSpecificationScanner";
import scan_declarator from "./declaration_scanners/DeclaratorScanner";
import scan_abstract_declarator from "./declaration_scanners/AbstractDeclaratorScanner";
import TypeInformation from "../../type_descriptions/TypeInformation";

/**
 * <p>Scans for the parameters in a given function declarator and returns the arguments</p>
 * <p>Note: This function assumes the declarator is valid</p>
 * @param ctx The declarator context for the function
 */
export default function scan_for_parameters(ctx: DeclaratorContext): Array<VariableDeclaration> {
    return ctx.accept(new ParameterScanner());
}

class ParameterScanner extends CVisitor<Array<VariableDeclaration>> {
    // @ts-ignore
    visitDeclarator(ctx: DeclaratorContext) {
        return ctx.directDeclarator().accept(this);
    }

    // @ts-ignore
    visitDirectDeclarator(ctx: DirectDeclaratorContext) {
        if (ctx.parameterTypeList()) {
            return ctx.parameterTypeList().accept(this);
        } else if (ctx.LeftParen() && !ctx.identifierList()) {
            return [];
        }
    }

    // @ts-ignore
    visitParameterTypeList(ctx: ParameterTypeListContext) {
        if (ctx.Comma()) {
            throw new UnknownDefinitionError("Variable number parameters not supported");
        }
        return ctx.parameterList().accept(this);
    }

    // @ts-ignore
    visitParameterList(ctx: ParameterListContext) {
        const parameters: Array<VariableDeclaration> = [];
        ctx.parameterDeclaration_list().forEach((parameter_context) => {
            parameters.push(parameter_context.accept(new ParameterDeclarationScanner()));
        });
        return parameters;
    }
}

class ParameterDeclarationScanner extends CVisitor<VariableDeclaration> {
    // @ts-ignore
    visitParameterDeclaration(ctx: ParameterDeclarationContext): VariableDeclaration {
        const specification = scan_declaration_specification(ctx.declarationSpecifiers());
        if (ctx.declarator()) {
            return scan_declarator(ctx.declarator(), specification);
        } else if (ctx.abstractDeclarator()) {
            const type_info = scan_abstract_declarator(ctx.abstractDeclarator(), specification);
            return new VariableDeclaration(undefined, type_info);
        } else {
            const type_info = new TypeInformation(specification, []);
            return new VariableDeclaration(undefined, type_info);
        }
    }
}