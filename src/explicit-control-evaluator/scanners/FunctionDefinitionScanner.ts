import {FunctionDefinitionContext} from "../../parser/antlr_gen/CParser";
import TypeInformation from "../../type_descriptions/TypeInformation";
import VariableDeclaration from "../VariableDeclaration";
import CVisitor from "../../parser/antlr_gen/CVisitor";
import scan_declaration_specification from "./type_scanners/DeclarationSpecificationScanner";
import DeclarationSpecification from "../../type_descriptions/DeclarationSpecification";
import scan_declarator from "./declaration_scanners/DeclaratorScanner";
import {FunctionTypeSpecifier} from "../../type_descriptions/type_specifier/TypeSpecifier";
import scan_for_parameters from "./ParameterScanner";

/**
 * Describes a function definition
 */
export class FunctionDefinition {
    /**
     * The name of the function to define
     */
    public readonly name: string;
    /**
     * The return type of the function
     */
    public readonly return_type: TypeInformation;
    /**
     * The arguments within the function
     */
    public readonly args: Array<VariableDeclaration>;

    public constructor(name: string, return_type: TypeInformation, args: Array<VariableDeclaration>) {
        this.name = name;
        this.return_type = return_type;
        this.args = args;
    }
}

export default function scan_function_definition(ctx: FunctionDefinitionContext): FunctionDefinition {
    return ctx.accept(new FunctionDefinitionScanner())
}

class FunctionDefinitionScanner extends CVisitor<FunctionDefinition> {
    // @ts-ignore
    visitFunctionDefinition(ctx: FunctionDefinitionContext): FunctionDefinition {
        const specifiers = ctx.declarationSpecifiers() ? scan_declaration_specification(ctx.declarationSpecifiers())
            : DeclarationSpecification.default();
        const declaration = scan_declarator(ctx.declarator(), specifiers);
        const args = scan_for_parameters(ctx.declarator());
        const func_specifier = declaration.type_information.declaration_specifier.specifier as FunctionTypeSpecifier;
        // Return function definition
        return new FunctionDefinition(declaration.name, func_specifier.return_type, args);
    }
}