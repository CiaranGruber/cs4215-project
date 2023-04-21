import {TypeNameContext} from "../../../parser/antlr_gen/CParser";
import CVisitor from "../../../parser/antlr_gen/CVisitor";
import TypeInformation from "../../../type_descriptions/TypeInformation";
import scan_spec_qual_list from "./SpecifierQualifierScanner";
import scan_abstract_declaration from "../declaration_scanners/AbstractDeclaratorScanner";

/**
 * Scans a type name to retrieve the associated type
 * @param ctx The type name context to scan
 */
export default function scan_for_type(ctx: TypeNameContext): TypeInformation {
    return ctx.accept(new TypeScanner());
}

class TypeScanner extends CVisitor<TypeInformation> {
    // @ts-ignore
    visitTypeName(ctx: TypeNameContext) {
        const declaration_specification = scan_spec_qual_list(ctx.specifierQualifierList());
        if (!ctx.abstractDeclarator()) {
            return new TypeInformation(declaration_specification, []);
        }
        return scan_abstract_declaration(ctx.abstractDeclarator(), declaration_specification);
    }
}