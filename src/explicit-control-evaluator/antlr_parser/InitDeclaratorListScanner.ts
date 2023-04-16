import CVisitor from "../../parser/antlr_gen/CVisitor";
import VariableDeclaration from "../VariableDeclaration";
import DeclarationSpecification from "../../type_descriptions/DeclarationSpecification";
import {
    DeclaratorContext,
    DirectDeclaratorContext,
    InitDeclaratorContext,
    InitDeclaratorListContext,
    PointerContext,
    TypeQualifierContext,
    TypeQualifierListContext
} from "../../parser/antlr_gen/CParser";
import QualifiedPointer from "../../type_descriptions/QualifiedPointer";
import {UnknownDefinitionError} from "./ExplicitControlListener";
import TypeInformation from "../../type_descriptions/TypeInformation";
import TypeQualifier, {build_qualifier, TypeQualifierType} from "../../type_descriptions/type_qualifier/TypeQualifier";

export default function scan_for_declarations(declaration_specification: DeclarationSpecification,
                                      context: InitDeclaratorListContext): Array<VariableDeclaration> {
    return context.accept(new InitDeclaratorListScanner(declaration_specification));
}

class InitDeclaratorListScanner extends CVisitor<Array<VariableDeclaration>> {
    private readonly specification: DeclarationSpecification;

    public constructor(specification: DeclarationSpecification) {
        super();
        this.specification = specification;
    }

    // @ts-ignore
    visitInitDeclaratorList(ctx: InitDeclaratorListContext) {
        const declarations: Array<VariableDeclaration> = [];
        ctx.initDeclarator_list().forEach((value) => {
            const scanner = new InitDeclaratorScanner(this.specification);
            declarations.push(value.accept(scanner));
        });
        return declarations;
    }
}

class InitDeclaratorScanner extends CVisitor<VariableDeclaration> {
    private readonly specification: DeclarationSpecification;
    private is_function: boolean;
    private readonly pointers: Array<QualifiedPointer>;
    private readonly function_pointers: Array<QualifiedPointer>;

    public constructor(specification: DeclarationSpecification) {
        super();
        this.specification = specification;
        this.is_function = false;
        this.pointers = [];
        this.function_pointers = [];
    }

    // @ts-ignore
    visitInitDeclarator(ctx: InitDeclaratorContext): VariableDeclaration {
        const declaration = ctx.declarator().accept(this);
        // Ensure it is not assigning to a function
        if (ctx.Assign() !== null && declaration.type_information.is_function) {
            throw new UnknownDefinitionError("Cannot initialise a function like a variable");
        }
        return declaration;
    }

    // @ts-ignore
    visitDeclarator(ctx: DeclaratorContext): VariableDeclaration {
        if (ctx.pointer() !== null) {
            if (this.is_function) {
                this.function_pointers.push(...ctx.pointer().accept(new PointerScanner()));
            } else {
                this.pointers.push(...ctx.pointer().accept(new PointerScanner()));
            }
        }
        return ctx.directDeclarator().accept(this);
    }

    private make_type_information(): TypeInformation {
        if (this.is_function) {
            const return_type = new TypeInformation(this.specification, this.pointers);
            const function_specifier = DeclarationSpecification.function_specifier(return_type);
            return new TypeInformation(function_specifier, this.function_pointers);
        } else {
            return new TypeInformation(this.specification, this.pointers);
        }
    }

    // @ts-ignore
    visitDirectDeclarator(ctx: DirectDeclaratorContext): VariableDeclaration {
        if (ctx.Identifier() !== null && ctx.DigitSequence() === null) { // Final identifier
            return new VariableDeclaration(this.make_type_information(), ctx.Identifier().getText());
        }
        if (ctx.declarator() !== null) { // Declarator in brackets
            return ctx.declarator().accept(this);
        }
        if (ctx.parameterTypeList() !== null) { // Function definition (May be a pointer)
            if (this.is_function) {
                throw new UnknownDefinitionError("A function cannot return another function");
            }
            this.is_function = true;
            return ctx.directDeclarator().accept(this);
        }
    }
}

class PointerScanner extends CVisitor<Array<QualifiedPointer>> {
    // @ts-ignore
    visitPointer(ctx: PointerContext) {
        const type_qualifier = ctx.typeQualifierList().accept(new TypeQualifierListScanner());
        const pointers = [new QualifiedPointer(type_qualifier)];
        if (ctx.pointer() !== null) {
            pointers.push(...ctx.pointer().accept(this));
        }
        return pointers;
    }
}

class TypeQualifierListScanner extends CVisitor<TypeQualifier> {
    // @ts-ignore
    visitTypeQualifierList(ctx: TypeQualifierListContext) {
        const qualifiers: Array<TypeQualifierType> = [];
        ctx.typeQualifier_list().forEach((value) => {
            qualifiers.push(value.accept(new TypeQualifierScanner()));
        });
        return build_qualifier(qualifiers);
    }
}

class TypeQualifierScanner extends CVisitor<TypeQualifierType> {
    // @ts-ignore
    visitTypeQualifier(ctx: TypeQualifierContext) {
        if (ctx.Const() !== null) {
            return TypeQualifierType.CONST;
        } else if (ctx.Restrict() !== null) {
            return TypeQualifierType.RESTRICT;
        } else if (ctx.Volatile() !== null) {
            return TypeQualifierType.VOLATILE;
        }
        return TypeQualifierType._ATOMIC;
    }
}