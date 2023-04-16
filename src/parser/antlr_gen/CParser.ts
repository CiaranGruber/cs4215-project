// Generated from src/parser/C.g4 by ANTLR 4.12.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer,
	BailErrorStrategy,
	DecisionState,
	DFA,
	FailedPredicateException,
	Interval,
	IntervalSet,
	NoViableAltException,
	Parser,
	ParserATNSimulator,
	ParserRuleContext,
	PredictionContextCache,
	PredictionMode,
	RecognitionException,
	RuleContext,
	RuleNode,
	TerminalNode,
	Token,
	TokenStream
} from 'antlr4';
import CListener from "./CListener.js";
import CVisitor from "./CVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class CParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly Auto = 20;
	public static readonly Break = 21;
	public static readonly Case = 22;
	public static readonly Char = 23;
	public static readonly Const = 24;
	public static readonly Continue = 25;
	public static readonly Default = 26;
	public static readonly Do = 27;
	public static readonly Double = 28;
	public static readonly Else = 29;
	public static readonly Enum = 30;
	public static readonly Extern = 31;
	public static readonly Float = 32;
	public static readonly For = 33;
	public static readonly Goto = 34;
	public static readonly If = 35;
	public static readonly Inline = 36;
	public static readonly Int = 37;
	public static readonly Long = 38;
	public static readonly Register = 39;
	public static readonly Restrict = 40;
	public static readonly Return = 41;
	public static readonly Short = 42;
	public static readonly Signed = 43;
	public static readonly Sizeof = 44;
	public static readonly Static = 45;
	public static readonly Struct = 46;
	public static readonly Switch = 47;
	public static readonly Typedef = 48;
	public static readonly Union = 49;
	public static readonly Unsigned = 50;
	public static readonly Void = 51;
	public static readonly Volatile = 52;
	public static readonly While = 53;
	public static readonly Alignas = 54;
	public static readonly Alignof = 55;
	public static readonly Atomic = 56;
	public static readonly Bool = 57;
	public static readonly Complex = 58;
	public static readonly Generic = 59;
	public static readonly Imaginary = 60;
	public static readonly Noreturn = 61;
	public static readonly StaticAssert = 62;
	public static readonly ThreadLocal = 63;
	public static readonly LeftParen = 64;
	public static readonly RightParen = 65;
	public static readonly LeftBracket = 66;
	public static readonly RightBracket = 67;
	public static readonly LeftBrace = 68;
	public static readonly RightBrace = 69;
	public static readonly Less = 70;
	public static readonly LessEqual = 71;
	public static readonly Greater = 72;
	public static readonly GreaterEqual = 73;
	public static readonly LeftShift = 74;
	public static readonly RightShift = 75;
	public static readonly Plus = 76;
	public static readonly PlusPlus = 77;
	public static readonly Minus = 78;
	public static readonly MinusMinus = 79;
	public static readonly Star = 80;
	public static readonly Div = 81;
	public static readonly Mod = 82;
	public static readonly And = 83;
	public static readonly Or = 84;
	public static readonly AndAnd = 85;
	public static readonly OrOr = 86;
	public static readonly Caret = 87;
	public static readonly Not = 88;
	public static readonly Tilde = 89;
	public static readonly Question = 90;
	public static readonly Colon = 91;
	public static readonly Semi = 92;
	public static readonly Comma = 93;
	public static readonly Assign = 94;
	public static readonly StarAssign = 95;
	public static readonly DivAssign = 96;
	public static readonly ModAssign = 97;
	public static readonly PlusAssign = 98;
	public static readonly MinusAssign = 99;
	public static readonly LeftShiftAssign = 100;
	public static readonly RightShiftAssign = 101;
	public static readonly AndAssign = 102;
	public static readonly XorAssign = 103;
	public static readonly OrAssign = 104;
	public static readonly Equal = 105;
	public static readonly NotEqual = 106;
	public static readonly Arrow = 107;
	public static readonly Dot = 108;
	public static readonly Ellipsis = 109;
	public static readonly Identifier = 110;
	public static readonly Constant = 111;
	public static readonly DigitSequence = 112;
	public static readonly StringLiteral = 113;
	public static readonly ComplexDefine = 114;
	public static readonly IncludeDirective = 115;
	public static readonly AsmBlock = 116;
	public static readonly LineAfterPreprocessing = 117;
	public static readonly LineDirective = 118;
	public static readonly PragmaDirective = 119;
	public static readonly Whitespace = 120;
	public static readonly Newline = 121;
	public static readonly BlockComment = 122;
	public static readonly LineComment = 123;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_primaryExpression = 0;
	public static readonly RULE_genericSelection = 1;
	public static readonly RULE_genericAssocList = 2;
	public static readonly RULE_genericAssociation = 3;
	public static readonly RULE_postfixExpression = 4;
	public static readonly RULE_argumentExpressionList = 5;
	public static readonly RULE_unaryExpression = 6;
	public static readonly RULE_unaryOperator = 7;
	public static readonly RULE_castExpression = 8;
	public static readonly RULE_multiplicativeExpression = 9;
	public static readonly RULE_additiveExpression = 10;
	public static readonly RULE_shiftExpression = 11;
	public static readonly RULE_relationalExpression = 12;
	public static readonly RULE_equalityExpression = 13;
	public static readonly RULE_andExpression = 14;
	public static readonly RULE_exclusiveOrExpression = 15;
	public static readonly RULE_inclusiveOrExpression = 16;
	public static readonly RULE_logicalAndExpression = 17;
	public static readonly RULE_logicalOrExpression = 18;
	public static readonly RULE_conditionalExpression = 19;
	public static readonly RULE_assignmentExpression = 20;
	public static readonly RULE_assignmentOperator = 21;
	public static readonly RULE_expression = 22;
	public static readonly RULE_constantExpression = 23;
	public static readonly RULE_declaration = 24;
	public static readonly RULE_declarationSpecifiers = 25;
	public static readonly RULE_declarationSpecifiers2 = 26;
	public static readonly RULE_declarationSpecifier = 27;
	public static readonly RULE_initDeclaratorList = 28;
	public static readonly RULE_initDeclarator = 29;
	public static readonly RULE_storageClassSpecifier = 30;
	public static readonly RULE_typeSpecifier = 31;
	public static readonly RULE_structOrUnionSpecifier = 32;
	public static readonly RULE_structOrUnion = 33;
	public static readonly RULE_structDeclarationList = 34;
	public static readonly RULE_structDeclaration = 35;
	public static readonly RULE_specifierQualifierList = 36;
	public static readonly RULE_structDeclaratorList = 37;
	public static readonly RULE_structDeclarator = 38;
	public static readonly RULE_enumSpecifier = 39;
	public static readonly RULE_enumeratorList = 40;
	public static readonly RULE_enumerator = 41;
	public static readonly RULE_enumerationConstant = 42;
	public static readonly RULE_atomicTypeSpecifier = 43;
	public static readonly RULE_typeQualifier = 44;
	public static readonly RULE_functionSpecifier = 45;
	public static readonly RULE_alignmentSpecifier = 46;
	public static readonly RULE_declarator = 47;
	public static readonly RULE_directDeclarator = 48;
	public static readonly RULE_vcSpecificModifer = 49;
	public static readonly RULE_gccDeclaratorExtension = 50;
	public static readonly RULE_gccAttributeSpecifier = 51;
	public static readonly RULE_gccAttributeList = 52;
	public static readonly RULE_gccAttribute = 53;
	public static readonly RULE_nestedParenthesesBlock = 54;
	public static readonly RULE_pointer = 55;
	public static readonly RULE_typeQualifierList = 56;
	public static readonly RULE_parameterTypeList = 57;
	public static readonly RULE_parameterList = 58;
	public static readonly RULE_parameterDeclaration = 59;
	public static readonly RULE_identifierList = 60;
	public static readonly RULE_typeName = 61;
	public static readonly RULE_abstractDeclarator = 62;
	public static readonly RULE_directAbstractDeclarator = 63;
	public static readonly RULE_typedefName = 64;
	public static readonly RULE_initialiser = 65;
	public static readonly RULE_initialiserList = 66;
	public static readonly RULE_designation = 67;
	public static readonly RULE_designatorList = 68;
	public static readonly RULE_designator = 69;
	public static readonly RULE_staticAssertDeclaration = 70;
	public static readonly RULE_statement = 71;
	public static readonly RULE_labeledStatement = 72;
	public static readonly RULE_compoundStatement = 73;
	public static readonly RULE_blockItemList = 74;
	public static readonly RULE_blockItem = 75;
	public static readonly RULE_expressionStatement = 76;
	public static readonly RULE_selectionStatement = 77;
	public static readonly RULE_iterationStatement = 78;
	public static readonly RULE_forCondition = 79;
	public static readonly RULE_forDeclaration = 80;
	public static readonly RULE_forExpression = 81;
	public static readonly RULE_jumpStatement = 82;
	public static readonly RULE_compilationUnit = 83;
	public static readonly RULE_translationUnit = 84;
	public static readonly RULE_externalDeclaration = 85;
	public static readonly RULE_functionDefinition = 86;
	public static readonly literalNames: (string | null)[] = [ null, "'__extension__'", 
                                                            "'__builtin_va_arg'", 
                                                            "'__builtin_offsetof'", 
                                                            "'__m128'", 
                                                            "'__m128d'", 
                                                            "'__m128i'", 
                                                            "'__typeof__'", 
                                                            "'__inline__'", 
                                                            "'__stdcall'", 
                                                            "'__declspec'", 
                                                            "'__cdecl'", 
                                                            "'__clrcall'", 
                                                            "'__fastcall'", 
                                                            "'__thiscall'", 
                                                            "'__vectorcall'", 
                                                            "'__asm'", "'__attribute__'", 
                                                            "'__asm__'", 
                                                            "'__volatile__'", 
                                                            "'auto'", "'break'", 
                                                            "'case'", "'char'", 
                                                            "'const'", "'continue'", 
                                                            "'default'", 
                                                            "'do'", "'double'", 
                                                            "'else'", "'enum'", 
                                                            "'extern'", 
                                                            "'float'", "'for'", 
                                                            "'goto'", "'if'", 
                                                            "'inline'", 
                                                            "'int'", "'long'", 
                                                            "'register'", 
                                                            "'restrict'", 
                                                            "'return'", 
                                                            "'short'", "'signed'", 
                                                            "'sizeof'", 
                                                            "'static'", 
                                                            "'struct'", 
                                                            "'switch'", 
                                                            "'typedef'", 
                                                            "'union'", "'unsigned'", 
                                                            "'void'", "'volatile'", 
                                                            "'while'", "'_Alignas'", 
                                                            "'_Alignof'", 
                                                            "'_Atomic'", 
                                                            "'_Bool'", "'_Complex'", 
                                                            "'_Generic'", 
                                                            "'_Imaginary'", 
                                                            "'_Noreturn'", 
                                                            "'_Static_assert'", 
                                                            "'_Thread_local'", 
                                                            "'('", "')'", 
                                                            "'['", "']'", 
                                                            "'{'", "'}'", 
                                                            "'<'", "'<='", 
                                                            "'>'", "'>='", 
                                                            "'<<'", "'>>'", 
                                                            "'+'", "'++'", 
                                                            "'-'", "'--'", 
                                                            "'*'", "'/'", 
                                                            "'%'", "'&'", 
                                                            "'|'", "'&&'", 
                                                            "'||'", "'^'", 
                                                            "'!'", "'~'", 
                                                            "'?'", "':'", 
                                                            "';'", "','", 
                                                            "'='", "'*='", 
                                                            "'/='", "'%='", 
                                                            "'+='", "'-='", 
                                                            "'<<='", "'>>='", 
                                                            "'&='", "'^='", 
                                                            "'|='", "'=='", 
                                                            "'!='", "'->'", 
                                                            "'.'", "'...'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "Auto", "Break", 
                                                             "Case", "Char", 
                                                             "Const", "Continue", 
                                                             "Default", 
                                                             "Do", "Double", 
                                                             "Else", "Enum", 
                                                             "Extern", "Float", 
                                                             "For", "Goto", 
                                                             "If", "Inline", 
                                                             "Int", "Long", 
                                                             "Register", 
                                                             "Restrict", 
                                                             "Return", "Short", 
                                                             "Signed", "Sizeof", 
                                                             "Static", "Struct", 
                                                             "Switch", "Typedef", 
                                                             "Union", "Unsigned", 
                                                             "Void", "Volatile", 
                                                             "While", "Alignas", 
                                                             "Alignof", 
                                                             "Atomic", "Bool", 
                                                             "Complex", 
                                                             "Generic", 
                                                             "Imaginary", 
                                                             "Noreturn", 
                                                             "StaticAssert", 
                                                             "ThreadLocal", 
                                                             "LeftParen", 
                                                             "RightParen", 
                                                             "LeftBracket", 
                                                             "RightBracket", 
                                                             "LeftBrace", 
                                                             "RightBrace", 
                                                             "Less", "LessEqual", 
                                                             "Greater", 
                                                             "GreaterEqual", 
                                                             "LeftShift", 
                                                             "RightShift", 
                                                             "Plus", "PlusPlus", 
                                                             "Minus", "MinusMinus", 
                                                             "Star", "Div", 
                                                             "Mod", "And", 
                                                             "Or", "AndAnd", 
                                                             "OrOr", "Caret", 
                                                             "Not", "Tilde", 
                                                             "Question", 
                                                             "Colon", "Semi", 
                                                             "Comma", "Assign", 
                                                             "StarAssign", 
                                                             "DivAssign", 
                                                             "ModAssign", 
                                                             "PlusAssign", 
                                                             "MinusAssign", 
                                                             "LeftShiftAssign", 
                                                             "RightShiftAssign", 
                                                             "AndAssign", 
                                                             "XorAssign", 
                                                             "OrAssign", 
                                                             "Equal", "NotEqual", 
                                                             "Arrow", "Dot", 
                                                             "Ellipsis", 
                                                             "Identifier", 
                                                             "Constant", 
                                                             "DigitSequence", 
                                                             "StringLiteral", 
                                                             "ComplexDefine", 
                                                             "IncludeDirective", 
                                                             "AsmBlock", 
                                                             "LineAfterPreprocessing", 
                                                             "LineDirective", 
                                                             "PragmaDirective", 
                                                             "Whitespace", 
                                                             "Newline", 
                                                             "BlockComment", 
                                                             "LineComment" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"primaryExpression", "genericSelection", "genericAssocList", "genericAssociation", 
		"postfixExpression", "argumentExpressionList", "unaryExpression", "unaryOperator", 
		"castExpression", "multiplicativeExpression", "additiveExpression", "shiftExpression", 
		"relationalExpression", "equalityExpression", "andExpression", "exclusiveOrExpression", 
		"inclusiveOrExpression", "logicalAndExpression", "logicalOrExpression", 
		"conditionalExpression", "assignmentExpression", "assignmentOperator", 
		"expression", "constantExpression", "declaration", "declarationSpecifiers", 
		"declarationSpecifiers2", "declarationSpecifier", "initDeclaratorList", 
		"initDeclarator", "storageClassSpecifier", "typeSpecifier", "structOrUnionSpecifier", 
		"structOrUnion", "structDeclarationList", "structDeclaration", "specifierQualifierList", 
		"structDeclaratorList", "structDeclarator", "enumSpecifier", "enumeratorList", 
		"enumerator", "enumerationConstant", "atomicTypeSpecifier", "typeQualifier", 
		"functionSpecifier", "alignmentSpecifier", "declarator", "directDeclarator", 
		"vcSpecificModifer", "gccDeclaratorExtension", "gccAttributeSpecifier", 
		"gccAttributeList", "gccAttribute", "nestedParenthesesBlock", "pointer", 
		"typeQualifierList", "parameterTypeList", "parameterList", "parameterDeclaration", 
		"identifierList", "typeName", "abstractDeclarator", "directAbstractDeclarator", 
		"typedefName", "initialiser", "initialiserList", "designation", "designatorList", 
		"designator", "staticAssertDeclaration", "statement", "labeledStatement", 
		"compoundStatement", "blockItemList", "blockItem", "expressionStatement", 
		"selectionStatement", "iterationStatement", "forCondition", "forDeclaration", 
		"forExpression", "jumpStatement", "compilationUnit", "translationUnit", 
		"externalDeclaration", "functionDefinition",
	];
	public get grammarFileName(): string { return "C.g4"; }
	public get literalNames(): (string | null)[] { return CParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return CParser.symbolicNames; }
	public get ruleNames(): string[] { return CParser.ruleNames; }
	public get serializedATN(): number[] { return CParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, CParser._ATN, CParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public primaryExpression(): PrimaryExpressionContext {
		let localctx: PrimaryExpressionContext = new PrimaryExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, CParser.RULE_primaryExpression);
		let _la: number;
		try {
			this.state = 207;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 174;
				this.match(CParser.Identifier);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 175;
				this.match(CParser.Constant);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 177;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 176;
					this.match(CParser.StringLiteral);
					}
					}
					this.state = 179;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===113);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 181;
				this.match(CParser.LeftParen);
				this.state = 182;
				this.expression();
				this.state = 183;
				this.match(CParser.RightParen);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 185;
				this.genericSelection();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 187;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 186;
					this.match(CParser.T__0);
					}
				}

				this.state = 189;
				this.match(CParser.LeftParen);
				this.state = 190;
				this.compoundStatement();
				this.state = 191;
				this.match(CParser.RightParen);
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 193;
				this.match(CParser.T__1);
				this.state = 194;
				this.match(CParser.LeftParen);
				this.state = 195;
				this.unaryExpression();
				this.state = 196;
				this.match(CParser.Comma);
				this.state = 197;
				this.typeName();
				this.state = 198;
				this.match(CParser.RightParen);
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 200;
				this.match(CParser.T__2);
				this.state = 201;
				this.match(CParser.LeftParen);
				this.state = 202;
				this.typeName();
				this.state = 203;
				this.match(CParser.Comma);
				this.state = 204;
				this.unaryExpression();
				this.state = 205;
				this.match(CParser.RightParen);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public genericSelection(): GenericSelectionContext {
		let localctx: GenericSelectionContext = new GenericSelectionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, CParser.RULE_genericSelection);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 209;
			this.match(CParser.Generic);
			this.state = 210;
			this.match(CParser.LeftParen);
			this.state = 211;
			this.assignmentExpression();
			this.state = 212;
			this.match(CParser.Comma);
			this.state = 213;
			this.genericAssocList();
			this.state = 214;
			this.match(CParser.RightParen);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public genericAssocList(): GenericAssocListContext {
		let localctx: GenericAssocListContext = new GenericAssocListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, CParser.RULE_genericAssocList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 216;
			this.genericAssociation();
			this.state = 221;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===93) {
				{
				{
				this.state = 217;
				this.match(CParser.Comma);
				this.state = 218;
				this.genericAssociation();
				}
				}
				this.state = 223;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public genericAssociation(): GenericAssociationContext {
		let localctx: GenericAssociationContext = new GenericAssociationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, CParser.RULE_genericAssociation);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 226;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 4:
			case 5:
			case 6:
			case 7:
			case 23:
			case 24:
			case 28:
			case 30:
			case 32:
			case 37:
			case 38:
			case 40:
			case 42:
			case 43:
			case 46:
			case 49:
			case 50:
			case 51:
			case 52:
			case 56:
			case 57:
			case 58:
			case 110:
				{
				this.state = 224;
				this.typeName();
				}
				break;
			case 26:
				{
				this.state = 225;
				this.match(CParser.Default);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 228;
			this.match(CParser.Colon);
			this.state = 229;
			this.assignmentExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public postfixExpression(): PostfixExpressionContext {
		let localctx: PostfixExpressionContext = new PostfixExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, CParser.RULE_postfixExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 245;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				{
				this.state = 231;
				this.primaryExpression();
				}
				break;
			case 2:
				{
				this.state = 233;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 232;
					this.match(CParser.T__0);
					}
				}

				this.state = 235;
				this.match(CParser.LeftParen);
				this.state = 236;
				this.typeName();
				this.state = 237;
				this.match(CParser.RightParen);
				this.state = 238;
				this.match(CParser.LeftBrace);
				this.state = 239;
				this.initialiserList();
				this.state = 241;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===93) {
					{
					this.state = 240;
					this.match(CParser.Comma);
					}
				}

				this.state = 243;
				this.match(CParser.RightBrace);
				}
				break;
			}
			this.state = 261;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 40965) !== 0) || _la===107 || _la===108) {
				{
				this.state = 259;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 66:
					{
					this.state = 247;
					this.match(CParser.LeftBracket);
					this.state = 248;
					this.expression();
					this.state = 249;
					this.match(CParser.RightBracket);
					}
					break;
				case 64:
					{
					this.state = 251;
					this.match(CParser.LeftParen);
					this.state = 253;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 1083393) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12959) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0)) {
						{
						this.state = 252;
						this.argumentExpressionList();
						}
					}

					this.state = 255;
					this.match(CParser.RightParen);
					}
					break;
				case 107:
				case 108:
					{
					this.state = 256;
					_la = this._input.LA(1);
					if(!(_la===107 || _la===108)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					this.state = 257;
					this.match(CParser.Identifier);
					}
					break;
				case 77:
				case 79:
					{
					this.state = 258;
					_la = this._input.LA(1);
					if(!(_la===77 || _la===79)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 263;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public argumentExpressionList(): ArgumentExpressionListContext {
		let localctx: ArgumentExpressionListContext = new ArgumentExpressionListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, CParser.RULE_argumentExpressionList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 264;
			this.assignmentExpression();
			this.state = 269;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===93) {
				{
				{
				this.state = 265;
				this.match(CParser.Comma);
				this.state = 266;
				this.assignmentExpression();
				}
				}
				this.state = 271;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public unaryExpression(): UnaryExpressionContext {
		let localctx: UnaryExpressionContext = new UnaryExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, CParser.RULE_unaryExpression);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 275;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 272;
					_la = this._input.LA(1);
					if(!(_la===44 || _la===77 || _la===79)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					}
				}
				this.state = 277;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
			}
			this.state = 289;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 2:
			case 3:
			case 59:
			case 64:
			case 110:
			case 111:
			case 113:
				{
				this.state = 278;
				this.postfixExpression();
				}
				break;
			case 76:
			case 78:
			case 80:
			case 83:
			case 88:
			case 89:
				{
				this.state = 279;
				this.unaryOperator();
				this.state = 280;
				this.castExpression();
				}
				break;
			case 44:
			case 55:
				{
				this.state = 282;
				_la = this._input.LA(1);
				if(!(_la===44 || _la===55)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 283;
				this.match(CParser.LeftParen);
				this.state = 284;
				this.typeName();
				this.state = 285;
				this.match(CParser.RightParen);
				}
				break;
			case 85:
				{
				this.state = 287;
				this.match(CParser.AndAnd);
				this.state = 288;
				this.match(CParser.Identifier);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public unaryOperator(): UnaryOperatorContext {
		let localctx: UnaryOperatorContext = new UnaryOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, CParser.RULE_unaryOperator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 291;
			_la = this._input.LA(1);
			if(!(((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12437) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public castExpression(): CastExpressionContext {
		let localctx: CastExpressionContext = new CastExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, CParser.RULE_castExpression);
		let _la: number;
		try {
			this.state = 303;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 15, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 294;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===1) {
					{
					this.state = 293;
					this.match(CParser.T__0);
					}
				}

				this.state = 296;
				this.match(CParser.LeftParen);
				this.state = 297;
				this.typeName();
				this.state = 298;
				this.match(CParser.RightParen);
				this.state = 299;
				this.castExpression();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 301;
				this.unaryExpression();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 302;
				this.match(CParser.DigitSequence);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public multiplicativeExpression(): MultiplicativeExpressionContext {
		let localctx: MultiplicativeExpressionContext = new MultiplicativeExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, CParser.RULE_multiplicativeExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 305;
			this.castExpression();
			this.state = 310;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 80)) & ~0x1F) === 0 && ((1 << (_la - 80)) & 7) !== 0)) {
				{
				{
				this.state = 306;
				_la = this._input.LA(1);
				if(!(((((_la - 80)) & ~0x1F) === 0 && ((1 << (_la - 80)) & 7) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 307;
				this.castExpression();
				}
				}
				this.state = 312;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public additiveExpression(): AdditiveExpressionContext {
		let localctx: AdditiveExpressionContext = new AdditiveExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, CParser.RULE_additiveExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 313;
			this.multiplicativeExpression();
			this.state = 318;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===76 || _la===78) {
				{
				{
				this.state = 314;
				_la = this._input.LA(1);
				if(!(_la===76 || _la===78)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 315;
				this.multiplicativeExpression();
				}
				}
				this.state = 320;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public shiftExpression(): ShiftExpressionContext {
		let localctx: ShiftExpressionContext = new ShiftExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, CParser.RULE_shiftExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 321;
			this.additiveExpression();
			this.state = 326;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===74 || _la===75) {
				{
				{
				this.state = 322;
				_la = this._input.LA(1);
				if(!(_la===74 || _la===75)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 323;
				this.additiveExpression();
				}
				}
				this.state = 328;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public relationalExpression(): RelationalExpressionContext {
		let localctx: RelationalExpressionContext = new RelationalExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, CParser.RULE_relationalExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 329;
			this.shiftExpression();
			this.state = 334;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 15) !== 0)) {
				{
				{
				this.state = 330;
				_la = this._input.LA(1);
				if(!(((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 15) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 331;
				this.shiftExpression();
				}
				}
				this.state = 336;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public equalityExpression(): EqualityExpressionContext {
		let localctx: EqualityExpressionContext = new EqualityExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, CParser.RULE_equalityExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 337;
			this.relationalExpression();
			this.state = 342;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===105 || _la===106) {
				{
				{
				this.state = 338;
				_la = this._input.LA(1);
				if(!(_la===105 || _la===106)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 339;
				this.relationalExpression();
				}
				}
				this.state = 344;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public andExpression(): AndExpressionContext {
		let localctx: AndExpressionContext = new AndExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, CParser.RULE_andExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 345;
			this.equalityExpression();
			this.state = 350;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===83) {
				{
				{
				this.state = 346;
				this.match(CParser.And);
				this.state = 347;
				this.equalityExpression();
				}
				}
				this.state = 352;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public exclusiveOrExpression(): ExclusiveOrExpressionContext {
		let localctx: ExclusiveOrExpressionContext = new ExclusiveOrExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, CParser.RULE_exclusiveOrExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 353;
			this.andExpression();
			this.state = 356;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===87) {
				{
				this.state = 354;
				this.match(CParser.Caret);
				this.state = 355;
				this.andExpression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public inclusiveOrExpression(): InclusiveOrExpressionContext {
		let localctx: InclusiveOrExpressionContext = new InclusiveOrExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, CParser.RULE_inclusiveOrExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 358;
			this.exclusiveOrExpression();
			this.state = 361;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===84) {
				{
				this.state = 359;
				this.match(CParser.Or);
				this.state = 360;
				this.inclusiveOrExpression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public logicalAndExpression(): LogicalAndExpressionContext {
		let localctx: LogicalAndExpressionContext = new LogicalAndExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, CParser.RULE_logicalAndExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 363;
			this.inclusiveOrExpression();
			this.state = 366;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===85) {
				{
				this.state = 364;
				this.match(CParser.AndAnd);
				this.state = 365;
				this.logicalAndExpression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public logicalOrExpression(): LogicalOrExpressionContext {
		let localctx: LogicalOrExpressionContext = new LogicalOrExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, CParser.RULE_logicalOrExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 368;
			this.logicalAndExpression();
			this.state = 371;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===86) {
				{
				this.state = 369;
				this.match(CParser.OrOr);
				this.state = 370;
				this.logicalOrExpression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public conditionalExpression(): ConditionalExpressionContext {
		let localctx: ConditionalExpressionContext = new ConditionalExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, CParser.RULE_conditionalExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 373;
			this.logicalOrExpression();
			this.state = 379;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===90) {
				{
				this.state = 374;
				this.match(CParser.Question);
				this.state = 375;
				this.expression();
				this.state = 376;
				this.match(CParser.Colon);
				this.state = 377;
				this.conditionalExpression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignmentExpression(): AssignmentExpressionContext {
		let localctx: AssignmentExpressionContext = new AssignmentExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, CParser.RULE_assignmentExpression);
		try {
			this.state = 387;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 27, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 381;
				this.conditionalExpression();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 382;
				this.unaryExpression();
				this.state = 383;
				this.assignmentOperator();
				this.state = 384;
				this.assignmentExpression();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 386;
				this.match(CParser.DigitSequence);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignmentOperator(): AssignmentOperatorContext {
		let localctx: AssignmentOperatorContext = new AssignmentOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, CParser.RULE_assignmentOperator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 389;
			_la = this._input.LA(1);
			if(!(((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 2047) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, CParser.RULE_expression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 391;
			this.assignmentExpression();
			this.state = 396;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===93) {
				{
				{
				this.state = 392;
				this.match(CParser.Comma);
				this.state = 393;
				this.assignmentExpression();
				}
				}
				this.state = 398;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public constantExpression(): ConstantExpressionContext {
		let localctx: ConstantExpressionContext = new ConstantExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, CParser.RULE_constantExpression);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 399;
			this.conditionalExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declaration(): DeclarationContext {
		let localctx: DeclarationContext = new DeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, CParser.RULE_declaration);
		try {
			this.state = 406;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 17:
			case 20:
			case 23:
			case 24:
			case 28:
			case 30:
			case 31:
			case 32:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 42:
			case 43:
			case 45:
			case 46:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 54:
			case 56:
			case 57:
			case 58:
			case 61:
			case 63:
			case 110:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 401;
				this.declarationSpecifiers();
				this.state = 402;
				this.initDeclaratorList();
				this.state = 403;
				this.match(CParser.Semi);
				}
				break;
			case 62:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 405;
				this.staticAssertDeclaration();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declarationSpecifiers(): DeclarationSpecifiersContext {
		let localctx: DeclarationSpecifiersContext = new DeclarationSpecifiersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, CParser.RULE_declarationSpecifiers);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 409;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 408;
					this.declarationSpecifier();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 411;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 30, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declarationSpecifiers2(): DeclarationSpecifiers2Context {
		let localctx: DeclarationSpecifiers2Context = new DeclarationSpecifiers2Context(this, this._ctx, this.state);
		this.enterRule(localctx, 52, CParser.RULE_declarationSpecifiers2);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 414;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 413;
				this.declarationSpecifier();
				}
				}
				this.state = 416;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3516008434) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 2808049137) !== 0) || _la===110);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declarationSpecifier(): DeclarationSpecifierContext {
		let localctx: DeclarationSpecifierContext = new DeclarationSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, CParser.RULE_declarationSpecifier);
		try {
			this.state = 423;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 418;
				this.storageClassSpecifier();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 419;
				this.typeSpecifier();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 420;
				this.typeQualifier();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 421;
				this.functionSpecifier();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 422;
				this.alignmentSpecifier();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public initDeclaratorList(): InitDeclaratorListContext {
		let localctx: InitDeclaratorListContext = new InitDeclaratorListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, CParser.RULE_initDeclaratorList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 425;
			this.initDeclarator();
			this.state = 430;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===93) {
				{
				{
				this.state = 426;
				this.match(CParser.Comma);
				this.state = 427;
				this.initDeclarator();
				}
				}
				this.state = 432;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public initDeclarator(): InitDeclaratorContext {
		let localctx: InitDeclaratorContext = new InitDeclaratorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, CParser.RULE_initDeclarator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 433;
			this.declarator();
			this.state = 436;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===94) {
				{
				this.state = 434;
				this.match(CParser.Assign);
				this.state = 435;
				this.initialiser();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public storageClassSpecifier(): StorageClassSpecifierContext {
		let localctx: StorageClassSpecifierContext = new StorageClassSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, CParser.RULE_storageClassSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 438;
			_la = this._input.LA(1);
			if(!(_la===20 || _la===31 || ((((_la - 39)) & ~0x1F) === 0 && ((1 << (_la - 39)) & 16777793) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeSpecifier(): TypeSpecifierContext {
		let localctx: TypeSpecifierContext = new TypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, CParser.RULE_typeSpecifier);
		let _la: number;
		try {
			this.state = 454;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 5:
			case 6:
			case 23:
			case 28:
			case 32:
			case 37:
			case 38:
			case 42:
			case 43:
			case 50:
			case 51:
			case 57:
			case 58:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 440;
				_la = this._input.LA(1);
				if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 276824176) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 101452897) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 1:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 441;
				this.match(CParser.T__0);
				this.state = 442;
				this.match(CParser.LeftParen);
				this.state = 443;
				_la = this._input.LA(1);
				if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 112) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 444;
				this.match(CParser.RightParen);
				}
				break;
			case 56:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 445;
				this.atomicTypeSpecifier();
				}
				break;
			case 46:
			case 49:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 446;
				this.structOrUnionSpecifier();
				}
				break;
			case 30:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 447;
				this.enumSpecifier();
				}
				break;
			case 110:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 448;
				this.typedefName();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 449;
				this.match(CParser.T__6);
				this.state = 450;
				this.match(CParser.LeftParen);
				this.state = 451;
				this.constantExpression();
				this.state = 452;
				this.match(CParser.RightParen);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public structOrUnionSpecifier(): StructOrUnionSpecifierContext {
		let localctx: StructOrUnionSpecifierContext = new StructOrUnionSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, CParser.RULE_structOrUnionSpecifier);
		let _la: number;
		try {
			this.state = 467;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 456;
				this.structOrUnion();
				this.state = 458;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===110) {
					{
					this.state = 457;
					this.match(CParser.Identifier);
					}
				}

				this.state = 460;
				this.match(CParser.LeftBrace);
				this.state = 461;
				this.structDeclarationList();
				this.state = 462;
				this.match(CParser.RightBrace);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 464;
				this.structOrUnion();
				this.state = 465;
				this.match(CParser.Identifier);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public structOrUnion(): StructOrUnionContext {
		let localctx: StructOrUnionContext = new StructOrUnionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, CParser.RULE_structOrUnion);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 469;
			_la = this._input.LA(1);
			if(!(_la===46 || _la===49)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public structDeclarationList(): StructDeclarationListContext {
		let localctx: StructDeclarationListContext = new StructDeclarationListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, CParser.RULE_structDeclarationList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 472;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 471;
				this.structDeclaration();
				}
				}
				this.state = 474;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1367343346) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1193168225) !== 0) || _la===110);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public structDeclaration(): StructDeclarationContext {
		let localctx: StructDeclarationContext = new StructDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, CParser.RULE_structDeclaration);
		try {
			this.state = 484;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 476;
				this.specifierQualifierList();
				this.state = 477;
				this.structDeclaratorList();
				this.state = 478;
				this.match(CParser.Semi);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 480;
				this.specifierQualifierList();
				this.state = 481;
				this.match(CParser.Semi);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 483;
				this.staticAssertDeclaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public specifierQualifierList(): SpecifierQualifierListContext {
		let localctx: SpecifierQualifierListContext = new SpecifierQualifierListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, CParser.RULE_specifierQualifierList);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 488;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 40, this._ctx) ) {
			case 1:
				{
				this.state = 486;
				this.typeSpecifier();
				}
				break;
			case 2:
				{
				this.state = 487;
				this.typeQualifier();
				}
				break;
			}
			this.state = 491;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 41, this._ctx) ) {
			case 1:
				{
				this.state = 490;
				this.specifierQualifierList();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public structDeclaratorList(): StructDeclaratorListContext {
		let localctx: StructDeclaratorListContext = new StructDeclaratorListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, CParser.RULE_structDeclaratorList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 493;
			this.structDeclarator();
			this.state = 498;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===93) {
				{
				{
				this.state = 494;
				this.match(CParser.Comma);
				this.state = 495;
				this.structDeclarator();
				}
				}
				this.state = 500;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public structDeclarator(): StructDeclaratorContext {
		let localctx: StructDeclaratorContext = new StructDeclaratorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, CParser.RULE_structDeclarator);
		let _la: number;
		try {
			this.state = 507;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 44, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 501;
				this.declarator();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 503;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 64000) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 8454145) !== 0) || _la===110) {
					{
					this.state = 502;
					this.declarator();
					}
				}

				this.state = 505;
				this.match(CParser.Colon);
				this.state = 506;
				this.constantExpression();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public enumSpecifier(): EnumSpecifierContext {
		let localctx: EnumSpecifierContext = new EnumSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 78, CParser.RULE_enumSpecifier);
		let _la: number;
		try {
			this.state = 522;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 47, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 509;
				this.match(CParser.Enum);
				this.state = 511;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===110) {
					{
					this.state = 510;
					this.match(CParser.Identifier);
					}
				}

				this.state = 513;
				this.match(CParser.LeftBrace);
				this.state = 514;
				this.enumeratorList();
				this.state = 516;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===93) {
					{
					this.state = 515;
					this.match(CParser.Comma);
					}
				}

				this.state = 518;
				this.match(CParser.RightBrace);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 520;
				this.match(CParser.Enum);
				this.state = 521;
				this.match(CParser.Identifier);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public enumeratorList(): EnumeratorListContext {
		let localctx: EnumeratorListContext = new EnumeratorListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, CParser.RULE_enumeratorList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 524;
			this.enumerator();
			this.state = 529;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 48, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 525;
					this.match(CParser.Comma);
					this.state = 526;
					this.enumerator();
					}
					}
				}
				this.state = 531;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 48, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public enumerator(): EnumeratorContext {
		let localctx: EnumeratorContext = new EnumeratorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, CParser.RULE_enumerator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 532;
			this.enumerationConstant();
			this.state = 535;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===94) {
				{
				this.state = 533;
				this.match(CParser.Assign);
				this.state = 534;
				this.constantExpression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public enumerationConstant(): EnumerationConstantContext {
		let localctx: EnumerationConstantContext = new EnumerationConstantContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, CParser.RULE_enumerationConstant);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 537;
			this.match(CParser.Identifier);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public atomicTypeSpecifier(): AtomicTypeSpecifierContext {
		let localctx: AtomicTypeSpecifierContext = new AtomicTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, CParser.RULE_atomicTypeSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 539;
			this.match(CParser.Atomic);
			this.state = 540;
			this.match(CParser.LeftParen);
			this.state = 541;
			this.typeName();
			this.state = 542;
			this.match(CParser.RightParen);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeQualifier(): TypeQualifierContext {
		let localctx: TypeQualifierContext = new TypeQualifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, CParser.RULE_typeQualifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 544;
			_la = this._input.LA(1);
			if(!(_la===24 || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 69633) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionSpecifier(): FunctionSpecifierContext {
		let localctx: FunctionSpecifierContext = new FunctionSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, CParser.RULE_functionSpecifier);
		let _la: number;
		try {
			this.state = 552;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 8:
			case 9:
			case 36:
			case 61:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 546;
				_la = this._input.LA(1);
				if(!(_la===8 || _la===9 || _la===36 || _la===61)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 17:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 547;
				this.gccAttributeSpecifier();
				}
				break;
			case 10:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 548;
				this.match(CParser.T__9);
				this.state = 549;
				this.match(CParser.LeftParen);
				this.state = 550;
				this.match(CParser.Identifier);
				this.state = 551;
				this.match(CParser.RightParen);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public alignmentSpecifier(): AlignmentSpecifierContext {
		let localctx: AlignmentSpecifierContext = new AlignmentSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 92, CParser.RULE_alignmentSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 554;
			this.match(CParser.Alignas);
			this.state = 555;
			this.match(CParser.LeftParen);
			this.state = 558;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 51, this._ctx) ) {
			case 1:
				{
				this.state = 556;
				this.typeName();
				}
				break;
			case 2:
				{
				this.state = 557;
				this.constantExpression();
				}
				break;
			}
			this.state = 560;
			this.match(CParser.RightParen);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declarator(): DeclaratorContext {
		let localctx: DeclaratorContext = new DeclaratorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, CParser.RULE_declarator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 563;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===80 || _la===87) {
				{
				this.state = 562;
				this.pointer();
				}
			}

			this.state = 565;
			this.directDeclarator(0);
			this.state = 569;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===16 || _la===17) {
				{
				{
				this.state = 566;
				this.gccDeclaratorExtension();
				}
				}
				this.state = 571;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public directDeclarator(): DirectDeclaratorContext;
	public directDeclarator(_p: number): DirectDeclaratorContext;
	// @RuleVersion(0)
	public directDeclarator(_p?: number): DirectDeclaratorContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: DirectDeclaratorContext = new DirectDeclaratorContext(this, this._ctx, _parentState);
		let _prevctx: DirectDeclaratorContext = localctx;
		let _startState: number = 96;
		this.enterRecursionRule(localctx, 96, CParser.RULE_directDeclarator, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 589;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 54, this._ctx) ) {
			case 1:
				{
				this.state = 573;
				this.match(CParser.Identifier);
				}
				break;
			case 2:
				{
				this.state = 574;
				this.match(CParser.LeftParen);
				this.state = 575;
				this.declarator();
				this.state = 576;
				this.match(CParser.RightParen);
				}
				break;
			case 3:
				{
				this.state = 578;
				this.match(CParser.Identifier);
				this.state = 579;
				this.match(CParser.Colon);
				this.state = 580;
				this.match(CParser.DigitSequence);
				}
				break;
			case 4:
				{
				this.state = 581;
				this.vcSpecificModifer();
				this.state = 582;
				this.match(CParser.Identifier);
				}
				break;
			case 5:
				{
				this.state = 584;
				this.match(CParser.LeftParen);
				this.state = 585;
				this.vcSpecificModifer();
				this.state = 586;
				this.declarator();
				this.state = 587;
				this.match(CParser.RightParen);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 636;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 61, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 634;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 60, this._ctx) ) {
					case 1:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directDeclarator);
						this.state = 591;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 592;
						this.match(CParser.LeftBracket);
						this.state = 594;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===24 || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 69633) !== 0)) {
							{
							this.state = 593;
							this.typeQualifierList();
							}
						}

						this.state = 597;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 1083393) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12959) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0)) {
							{
							this.state = 596;
							this.assignmentExpression();
							}
						}

						this.state = 599;
						this.match(CParser.RightBracket);
						}
						break;
					case 2:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directDeclarator);
						this.state = 600;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 601;
						this.match(CParser.LeftBracket);
						this.state = 602;
						this.match(CParser.Static);
						this.state = 604;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===24 || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 69633) !== 0)) {
							{
							this.state = 603;
							this.typeQualifierList();
							}
						}

						this.state = 606;
						this.assignmentExpression();
						this.state = 607;
						this.match(CParser.RightBracket);
						}
						break;
					case 3:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directDeclarator);
						this.state = 609;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 610;
						this.match(CParser.LeftBracket);
						this.state = 611;
						this.typeQualifierList();
						this.state = 612;
						this.match(CParser.Static);
						this.state = 613;
						this.assignmentExpression();
						this.state = 614;
						this.match(CParser.RightBracket);
						}
						break;
					case 4:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directDeclarator);
						this.state = 616;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 617;
						this.match(CParser.LeftBracket);
						this.state = 619;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===24 || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 69633) !== 0)) {
							{
							this.state = 618;
							this.typeQualifierList();
							}
						}

						this.state = 621;
						this.match(CParser.Star);
						this.state = 622;
						this.match(CParser.RightBracket);
						}
						break;
					case 5:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directDeclarator);
						this.state = 623;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 624;
						this.match(CParser.LeftParen);
						this.state = 625;
						this.parameterTypeList();
						this.state = 626;
						this.match(CParser.RightParen);
						}
						break;
					case 6:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directDeclarator);
						this.state = 628;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 629;
						this.match(CParser.LeftParen);
						this.state = 631;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===110) {
							{
							this.state = 630;
							this.identifierList();
							}
						}

						this.state = 633;
						this.match(CParser.RightParen);
						}
						break;
					}
					}
				}
				this.state = 638;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 61, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public vcSpecificModifer(): VcSpecificModiferContext {
		let localctx: VcSpecificModiferContext = new VcSpecificModiferContext(this, this._ctx, this.state);
		this.enterRule(localctx, 98, CParser.RULE_vcSpecificModifer);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 639;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 64000) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public gccDeclaratorExtension(): GccDeclaratorExtensionContext {
		let localctx: GccDeclaratorExtensionContext = new GccDeclaratorExtensionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 100, CParser.RULE_gccDeclaratorExtension);
		let _la: number;
		try {
			this.state = 650;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 641;
				this.match(CParser.T__15);
				this.state = 642;
				this.match(CParser.LeftParen);
				this.state = 644;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 643;
					this.match(CParser.StringLiteral);
					}
					}
					this.state = 646;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===113);
				this.state = 648;
				this.match(CParser.RightParen);
				}
				break;
			case 17:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 649;
				this.gccAttributeSpecifier();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public gccAttributeSpecifier(): GccAttributeSpecifierContext {
		let localctx: GccAttributeSpecifierContext = new GccAttributeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 102, CParser.RULE_gccAttributeSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 652;
			this.match(CParser.T__16);
			this.state = 653;
			this.match(CParser.LeftParen);
			this.state = 654;
			this.match(CParser.LeftParen);
			this.state = 655;
			this.gccAttributeList();
			this.state = 656;
			this.match(CParser.RightParen);
			this.state = 657;
			this.match(CParser.RightParen);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public gccAttributeList(): GccAttributeListContext {
		let localctx: GccAttributeListContext = new GccAttributeListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 104, CParser.RULE_gccAttributeList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 660;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 4160749567) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 67108863) !== 0)) {
				{
				this.state = 659;
				this.gccAttribute();
				}
			}

			this.state = 668;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===93) {
				{
				{
				this.state = 662;
				this.match(CParser.Comma);
				this.state = 664;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & 4160749567) !== 0) || ((((_la - 98)) & ~0x1F) === 0 && ((1 << (_la - 98)) & 67108863) !== 0)) {
					{
					this.state = 663;
					this.gccAttribute();
					}
				}

				}
				}
				this.state = 670;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public gccAttribute(): GccAttributeContext {
		let localctx: GccAttributeContext = new GccAttributeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 106, CParser.RULE_gccAttribute);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 671;
			_la = this._input.LA(1);
			if(_la<=0 || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 536870915) !== 0)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 677;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===64) {
				{
				this.state = 672;
				this.match(CParser.LeftParen);
				this.state = 674;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 1083393) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12959) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0)) {
					{
					this.state = 673;
					this.argumentExpressionList();
					}
				}

				this.state = 676;
				this.match(CParser.RightParen);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public nestedParenthesesBlock(): NestedParenthesesBlockContext {
		let localctx: NestedParenthesesBlockContext = new NestedParenthesesBlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 108, CParser.RULE_nestedParenthesesBlock);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 686;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967293) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 268435455) !== 0)) {
				{
				this.state = 684;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
				case 12:
				case 13:
				case 14:
				case 15:
				case 16:
				case 17:
				case 18:
				case 19:
				case 20:
				case 21:
				case 22:
				case 23:
				case 24:
				case 25:
				case 26:
				case 27:
				case 28:
				case 29:
				case 30:
				case 31:
				case 32:
				case 33:
				case 34:
				case 35:
				case 36:
				case 37:
				case 38:
				case 39:
				case 40:
				case 41:
				case 42:
				case 43:
				case 44:
				case 45:
				case 46:
				case 47:
				case 48:
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57:
				case 58:
				case 59:
				case 60:
				case 61:
				case 62:
				case 63:
				case 66:
				case 67:
				case 68:
				case 69:
				case 70:
				case 71:
				case 72:
				case 73:
				case 74:
				case 75:
				case 76:
				case 77:
				case 78:
				case 79:
				case 80:
				case 81:
				case 82:
				case 83:
				case 84:
				case 85:
				case 86:
				case 87:
				case 88:
				case 89:
				case 90:
				case 91:
				case 92:
				case 93:
				case 94:
				case 95:
				case 96:
				case 97:
				case 98:
				case 99:
				case 100:
				case 101:
				case 102:
				case 103:
				case 104:
				case 105:
				case 106:
				case 107:
				case 108:
				case 109:
				case 110:
				case 111:
				case 112:
				case 113:
				case 114:
				case 115:
				case 116:
				case 117:
				case 118:
				case 119:
				case 120:
				case 121:
				case 122:
				case 123:
					{
					this.state = 679;
					_la = this._input.LA(1);
					if(_la<=0 || _la===64 || _la===65) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					break;
				case 64:
					{
					this.state = 680;
					this.match(CParser.LeftParen);
					this.state = 681;
					this.nestedParenthesesBlock();
					this.state = 682;
					this.match(CParser.RightParen);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 688;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public pointer(): PointerContext {
		let localctx: PointerContext = new PointerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 110, CParser.RULE_pointer);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 689;
			_la = this._input.LA(1);
			if(!(_la===80 || _la===87)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 691;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===24 || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 69633) !== 0)) {
				{
				this.state = 690;
				this.typeQualifierList();
				}
			}

			this.state = 694;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===80 || _la===87) {
				{
				this.state = 693;
				this.pointer();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeQualifierList(): TypeQualifierListContext {
		let localctx: TypeQualifierListContext = new TypeQualifierListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 112, CParser.RULE_typeQualifierList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 697;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 696;
				this.typeQualifier();
				}
				}
				this.state = 699;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===24 || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 69633) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameterTypeList(): ParameterTypeListContext {
		let localctx: ParameterTypeListContext = new ParameterTypeListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 114, CParser.RULE_parameterTypeList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 701;
			this.parameterList();
			this.state = 704;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===93) {
				{
				this.state = 702;
				this.match(CParser.Comma);
				this.state = 703;
				this.match(CParser.Ellipsis);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameterList(): ParameterListContext {
		let localctx: ParameterListContext = new ParameterListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 116, CParser.RULE_parameterList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 706;
			this.parameterDeclaration();
			this.state = 711;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 75, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 707;
					this.match(CParser.Comma);
					this.state = 708;
					this.parameterDeclaration();
					}
					}
				}
				this.state = 713;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 75, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameterDeclaration(): ParameterDeclarationContext {
		let localctx: ParameterDeclarationContext = new ParameterDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 118, CParser.RULE_parameterDeclaration);
		let _la: number;
		try {
			this.state = 721;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 77, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 714;
				this.declarationSpecifiers();
				this.state = 715;
				this.declarator();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 717;
				this.declarationSpecifiers2();
				this.state = 719;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 8454149) !== 0)) {
					{
					this.state = 718;
					this.abstractDeclarator();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public identifierList(): IdentifierListContext {
		let localctx: IdentifierListContext = new IdentifierListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 120, CParser.RULE_identifierList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 723;
			this.match(CParser.Identifier);
			this.state = 728;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===93) {
				{
				{
				this.state = 724;
				this.match(CParser.Comma);
				this.state = 725;
				this.match(CParser.Identifier);
				}
				}
				this.state = 730;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeName(): TypeNameContext {
		let localctx: TypeNameContext = new TypeNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 122, CParser.RULE_typeName);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 731;
			this.specifierQualifierList();
			this.state = 733;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 8454149) !== 0)) {
				{
				this.state = 732;
				this.abstractDeclarator();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public abstractDeclarator(): AbstractDeclaratorContext {
		let localctx: AbstractDeclaratorContext = new AbstractDeclaratorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 124, CParser.RULE_abstractDeclarator);
		let _la: number;
		try {
			this.state = 746;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 82, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 735;
				this.pointer();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 737;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===80 || _la===87) {
					{
					this.state = 736;
					this.pointer();
					}
				}

				this.state = 739;
				this.directAbstractDeclarator(0);
				this.state = 743;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===16 || _la===17) {
					{
					{
					this.state = 740;
					this.gccDeclaratorExtension();
					}
					}
					this.state = 745;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public directAbstractDeclarator(): DirectAbstractDeclaratorContext;
	public directAbstractDeclarator(_p: number): DirectAbstractDeclaratorContext;
	// @RuleVersion(0)
	public directAbstractDeclarator(_p?: number): DirectAbstractDeclaratorContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: DirectAbstractDeclaratorContext = new DirectAbstractDeclaratorContext(this, this._ctx, _parentState);
		let _prevctx: DirectAbstractDeclaratorContext = localctx;
		let _startState: number = 126;
		this.enterRecursionRule(localctx, 126, CParser.RULE_directAbstractDeclarator, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 794;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 89, this._ctx) ) {
			case 1:
				{
				this.state = 749;
				this.match(CParser.LeftParen);
				this.state = 750;
				this.abstractDeclarator();
				this.state = 751;
				this.match(CParser.RightParen);
				this.state = 755;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 83, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 752;
						this.gccDeclaratorExtension();
						}
						}
					}
					this.state = 757;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 83, this._ctx);
				}
				}
				break;
			case 2:
				{
				this.state = 758;
				this.match(CParser.LeftBracket);
				this.state = 760;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===24 || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 69633) !== 0)) {
					{
					this.state = 759;
					this.typeQualifierList();
					}
				}

				this.state = 763;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 1083393) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12959) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0)) {
					{
					this.state = 762;
					this.assignmentExpression();
					}
				}

				this.state = 765;
				this.match(CParser.RightBracket);
				}
				break;
			case 3:
				{
				this.state = 766;
				this.match(CParser.LeftBracket);
				this.state = 767;
				this.match(CParser.Static);
				this.state = 769;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===24 || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 69633) !== 0)) {
					{
					this.state = 768;
					this.typeQualifierList();
					}
				}

				this.state = 771;
				this.assignmentExpression();
				this.state = 772;
				this.match(CParser.RightBracket);
				}
				break;
			case 4:
				{
				this.state = 774;
				this.match(CParser.LeftBracket);
				this.state = 775;
				this.typeQualifierList();
				this.state = 776;
				this.match(CParser.Static);
				this.state = 777;
				this.assignmentExpression();
				this.state = 778;
				this.match(CParser.RightBracket);
				}
				break;
			case 5:
				{
				this.state = 780;
				this.match(CParser.LeftBracket);
				this.state = 781;
				this.match(CParser.Star);
				this.state = 782;
				this.match(CParser.RightBracket);
				}
				break;
			case 6:
				{
				this.state = 783;
				this.match(CParser.LeftParen);
				this.state = 785;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3516008434) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 2808049137) !== 0) || _la===110) {
					{
					this.state = 784;
					this.parameterTypeList();
					}
				}

				this.state = 787;
				this.match(CParser.RightParen);
				this.state = 791;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 88, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 788;
						this.gccDeclaratorExtension();
						}
						}
					}
					this.state = 793;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 88, this._ctx);
				}
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 839;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 96, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 837;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 95, this._ctx) ) {
					case 1:
						{
						localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directAbstractDeclarator);
						this.state = 796;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 797;
						this.match(CParser.LeftBracket);
						this.state = 799;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===24 || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 69633) !== 0)) {
							{
							this.state = 798;
							this.typeQualifierList();
							}
						}

						this.state = 802;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 1083393) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12959) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0)) {
							{
							this.state = 801;
							this.assignmentExpression();
							}
						}

						this.state = 804;
						this.match(CParser.RightBracket);
						}
						break;
					case 2:
						{
						localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directAbstractDeclarator);
						this.state = 805;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 806;
						this.match(CParser.LeftBracket);
						this.state = 807;
						this.match(CParser.Static);
						this.state = 809;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===24 || ((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & 69633) !== 0)) {
							{
							this.state = 808;
							this.typeQualifierList();
							}
						}

						this.state = 811;
						this.assignmentExpression();
						this.state = 812;
						this.match(CParser.RightBracket);
						}
						break;
					case 3:
						{
						localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directAbstractDeclarator);
						this.state = 814;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 815;
						this.match(CParser.LeftBracket);
						this.state = 816;
						this.typeQualifierList();
						this.state = 817;
						this.match(CParser.Static);
						this.state = 818;
						this.assignmentExpression();
						this.state = 819;
						this.match(CParser.RightBracket);
						}
						break;
					case 4:
						{
						localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directAbstractDeclarator);
						this.state = 821;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 822;
						this.match(CParser.LeftBracket);
						this.state = 823;
						this.match(CParser.Star);
						this.state = 824;
						this.match(CParser.RightBracket);
						}
						break;
					case 5:
						{
						localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directAbstractDeclarator);
						this.state = 825;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 826;
						this.match(CParser.LeftParen);
						this.state = 828;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3516008434) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 2808049137) !== 0) || _la===110) {
							{
							this.state = 827;
							this.parameterTypeList();
							}
						}

						this.state = 830;
						this.match(CParser.RightParen);
						this.state = 834;
						this._errHandler.sync(this);
						_alt = this._interp.adaptivePredict(this._input, 94, this._ctx);
						while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
							if (_alt === 1) {
								{
								{
								this.state = 831;
								this.gccDeclaratorExtension();
								}
								}
							}
							this.state = 836;
							this._errHandler.sync(this);
							_alt = this._interp.adaptivePredict(this._input, 94, this._ctx);
						}
						}
						break;
					}
					}
				}
				this.state = 841;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 96, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typedefName(): TypedefNameContext {
		let localctx: TypedefNameContext = new TypedefNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 128, CParser.RULE_typedefName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 842;
			this.match(CParser.Identifier);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public initialiser(): InitialiserContext {
		let localctx: InitialiserContext = new InitialiserContext(this, this._ctx, this.state);
		this.enterRule(localctx, 130, CParser.RULE_initialiser);
		let _la: number;
		try {
			this.state = 852;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 2:
			case 3:
			case 44:
			case 55:
			case 59:
			case 64:
			case 76:
			case 77:
			case 78:
			case 79:
			case 80:
			case 83:
			case 85:
			case 88:
			case 89:
			case 110:
			case 111:
			case 112:
			case 113:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 844;
				this.assignmentExpression();
				}
				break;
			case 68:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 845;
				this.match(CParser.LeftBrace);
				this.state = 846;
				this.initialiserList();
				this.state = 848;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===93) {
					{
					this.state = 847;
					this.match(CParser.Comma);
					}
				}

				this.state = 850;
				this.match(CParser.RightBrace);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public initialiserList(): InitialiserListContext {
		let localctx: InitialiserListContext = new InitialiserListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 132, CParser.RULE_initialiserList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 855;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===66 || _la===108) {
				{
				this.state = 854;
				this.designation();
				}
			}

			this.state = 857;
			this.initialiser();
			this.state = 865;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 101, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 858;
					this.match(CParser.Comma);
					this.state = 860;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===66 || _la===108) {
						{
						this.state = 859;
						this.designation();
						}
					}

					this.state = 862;
					this.initialiser();
					}
					}
				}
				this.state = 867;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 101, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public designation(): DesignationContext {
		let localctx: DesignationContext = new DesignationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 134, CParser.RULE_designation);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 868;
			this.designatorList();
			this.state = 869;
			this.match(CParser.Assign);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public designatorList(): DesignatorListContext {
		let localctx: DesignatorListContext = new DesignatorListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 136, CParser.RULE_designatorList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 872;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 871;
				this.designator();
				}
				}
				this.state = 874;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===66 || _la===108);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public designator(): DesignatorContext {
		let localctx: DesignatorContext = new DesignatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 138, CParser.RULE_designator);
		try {
			this.state = 882;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 66:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 876;
				this.match(CParser.LeftBracket);
				this.state = 877;
				this.constantExpression();
				this.state = 878;
				this.match(CParser.RightBracket);
				}
				break;
			case 108:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 880;
				this.match(CParser.Dot);
				this.state = 881;
				this.match(CParser.Identifier);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public staticAssertDeclaration(): StaticAssertDeclarationContext {
		let localctx: StaticAssertDeclarationContext = new StaticAssertDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 140, CParser.RULE_staticAssertDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 884;
			this.match(CParser.StaticAssert);
			this.state = 885;
			this.match(CParser.LeftParen);
			this.state = 886;
			this.constantExpression();
			this.state = 887;
			this.match(CParser.Comma);
			this.state = 889;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 888;
				this.match(CParser.StringLiteral);
				}
				}
				this.state = 891;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===113);
			this.state = 893;
			this.match(CParser.RightParen);
			this.state = 894;
			this.match(CParser.Semi);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 142, CParser.RULE_statement);
		let _la: number;
		try {
			this.state = 933;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 110, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 896;
				this.labeledStatement();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 897;
				this.compoundStatement();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 898;
				this.expressionStatement();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 899;
				this.selectionStatement();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 900;
				this.iterationStatement();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 901;
				this.jumpStatement();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 902;
				_la = this._input.LA(1);
				if(!(_la===16 || _la===18)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 903;
				_la = this._input.LA(1);
				if(!(_la===19 || _la===52)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 904;
				this.match(CParser.LeftParen);
				this.state = 913;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 1083393) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12959) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0)) {
					{
					this.state = 905;
					this.logicalOrExpression();
					this.state = 910;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===93) {
						{
						{
						this.state = 906;
						this.match(CParser.Comma);
						this.state = 907;
						this.logicalOrExpression();
						}
						}
						this.state = 912;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 928;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===91) {
					{
					{
					this.state = 915;
					this.match(CParser.Colon);
					this.state = 924;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 1083393) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12959) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0)) {
						{
						this.state = 916;
						this.logicalOrExpression();
						this.state = 921;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la===93) {
							{
							{
							this.state = 917;
							this.match(CParser.Comma);
							this.state = 918;
							this.logicalOrExpression();
							}
							}
							this.state = 923;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						}
					}

					}
					}
					this.state = 930;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 931;
				this.match(CParser.RightParen);
				this.state = 932;
				this.match(CParser.Semi);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public labeledStatement(): LabeledStatementContext {
		let localctx: LabeledStatementContext = new LabeledStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 144, CParser.RULE_labeledStatement);
		try {
			this.state = 946;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 110:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 935;
				this.match(CParser.Identifier);
				this.state = 936;
				this.match(CParser.Colon);
				this.state = 937;
				this.statement();
				}
				break;
			case 22:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 938;
				this.match(CParser.Case);
				this.state = 939;
				this.constantExpression();
				this.state = 940;
				this.match(CParser.Colon);
				this.state = 941;
				this.statement();
				}
				break;
			case 26:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 943;
				this.match(CParser.Default);
				this.state = 944;
				this.match(CParser.Colon);
				this.state = 945;
				this.statement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public compoundStatement(): CompoundStatementContext {
		let localctx: CompoundStatementContext = new CompoundStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 146, CParser.RULE_compoundStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 948;
			this.match(CParser.LeftBrace);
			this.state = 950;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3757508606) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4026531839) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 321515537) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0)) {
				{
				this.state = 949;
				this.blockItemList();
				}
			}

			this.state = 952;
			this.match(CParser.RightBrace);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public blockItemList(): BlockItemListContext {
		let localctx: BlockItemListContext = new BlockItemListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 148, CParser.RULE_blockItemList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 955;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 954;
				this.blockItem();
				}
				}
				this.state = 957;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3757508606) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4026531839) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 321515537) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public blockItem(): BlockItemContext {
		let localctx: BlockItemContext = new BlockItemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 150, CParser.RULE_blockItem);
		try {
			this.state = 961;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 114, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 959;
				this.statement();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 960;
				this.declaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expressionStatement(): ExpressionStatementContext {
		let localctx: ExpressionStatementContext = new ExpressionStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 152, CParser.RULE_expressionStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 964;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 1083393) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12959) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0)) {
				{
				this.state = 963;
				this.expression();
				}
			}

			this.state = 966;
			this.match(CParser.Semi);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public selectionStatement(): SelectionStatementContext {
		let localctx: SelectionStatementContext = new SelectionStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 154, CParser.RULE_selectionStatement);
		try {
			this.state = 983;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 35:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 968;
				this.match(CParser.If);
				this.state = 969;
				this.match(CParser.LeftParen);
				this.state = 970;
				this.expression();
				this.state = 971;
				this.match(CParser.RightParen);
				this.state = 972;
				this.statement();
				this.state = 975;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 116, this._ctx) ) {
				case 1:
					{
					this.state = 973;
					this.match(CParser.Else);
					this.state = 974;
					this.statement();
					}
					break;
				}
				}
				break;
			case 47:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 977;
				this.match(CParser.Switch);
				this.state = 978;
				this.match(CParser.LeftParen);
				this.state = 979;
				this.expression();
				this.state = 980;
				this.match(CParser.RightParen);
				this.state = 981;
				this.statement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public iterationStatement(): IterationStatementContext {
		let localctx: IterationStatementContext = new IterationStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 156, CParser.RULE_iterationStatement);
		try {
			this.state = 1005;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 53:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 985;
				this.match(CParser.While);
				this.state = 986;
				this.match(CParser.LeftParen);
				this.state = 987;
				this.expression();
				this.state = 988;
				this.match(CParser.RightParen);
				this.state = 989;
				this.statement();
				}
				break;
			case 27:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 991;
				this.match(CParser.Do);
				this.state = 992;
				this.statement();
				this.state = 993;
				this.match(CParser.While);
				this.state = 994;
				this.match(CParser.LeftParen);
				this.state = 995;
				this.expression();
				this.state = 996;
				this.match(CParser.RightParen);
				this.state = 997;
				this.match(CParser.Semi);
				}
				break;
			case 33:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 999;
				this.match(CParser.For);
				this.state = 1000;
				this.match(CParser.LeftParen);
				this.state = 1001;
				this.forCondition();
				this.state = 1002;
				this.match(CParser.RightParen);
				this.state = 1003;
				this.statement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forCondition(): ForConditionContext {
		let localctx: ForConditionContext = new ForConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 158, CParser.RULE_forCondition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1011;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 120, this._ctx) ) {
			case 1:
				{
				this.state = 1007;
				this.forDeclaration();
				}
				break;
			case 2:
				{
				this.state = 1009;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 1083393) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12959) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0)) {
					{
					this.state = 1008;
					this.expression();
					}
				}

				}
				break;
			}
			this.state = 1013;
			this.match(CParser.Semi);
			this.state = 1015;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 1083393) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12959) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0)) {
				{
				this.state = 1014;
				this.forExpression();
				}
			}

			this.state = 1017;
			this.match(CParser.Semi);
			this.state = 1019;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 1083393) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12959) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0)) {
				{
				this.state = 1018;
				this.forExpression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forDeclaration(): ForDeclarationContext {
		let localctx: ForDeclarationContext = new ForDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 160, CParser.RULE_forDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1021;
			this.declarationSpecifiers();
			this.state = 1023;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 64000) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 8454145) !== 0) || _la===110) {
				{
				this.state = 1022;
				this.initDeclaratorList();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forExpression(): ForExpressionContext {
		let localctx: ForExpressionContext = new ForExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 162, CParser.RULE_forExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1025;
			this.assignmentExpression();
			this.state = 1030;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===93) {
				{
				{
				this.state = 1026;
				this.match(CParser.Comma);
				this.state = 1027;
				this.assignmentExpression();
				}
				}
				this.state = 1032;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public jumpStatement(): JumpStatementContext {
		let localctx: JumpStatementContext = new JumpStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 164, CParser.RULE_jumpStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1042;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 126, this._ctx) ) {
			case 1:
				{
				this.state = 1033;
				this.match(CParser.Goto);
				this.state = 1034;
				this.match(CParser.Identifier);
				}
				break;
			case 2:
				{
				this.state = 1035;
				_la = this._input.LA(1);
				if(!(_la===21 || _la===25)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 3:
				{
				this.state = 1036;
				this.match(CParser.Return);
				this.state = 1038;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 1083393) !== 0) || ((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & 12959) !== 0) || ((((_la - 110)) & ~0x1F) === 0 && ((1 << (_la - 110)) & 15) !== 0)) {
					{
					this.state = 1037;
					this.expression();
					}
				}

				}
				break;
			case 4:
				{
				this.state = 1040;
				this.match(CParser.Goto);
				this.state = 1041;
				this.unaryExpression();
				}
				break;
			}
			this.state = 1044;
			this.match(CParser.Semi);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public compilationUnit(): CompilationUnitContext {
		let localctx: CompilationUnitContext = new CompilationUnitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 166, CParser.RULE_compilationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1047;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 1)) & ~0x1F) === 0 && ((1 << (_la - 1)) & 3905519609) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 511047391) !== 0) || ((((_la - 80)) & ~0x1F) === 0 && ((1 << (_la - 80)) & 1073746049) !== 0)) {
				{
				this.state = 1046;
				this.translationUnit();
				}
			}

			this.state = 1049;
			this.match(CParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public translationUnit(): TranslationUnitContext {
		let localctx: TranslationUnitContext = new TranslationUnitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 168, CParser.RULE_translationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1052;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 1051;
				this.externalDeclaration();
				}
				}
				this.state = 1054;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 1)) & ~0x1F) === 0 && ((1 << (_la - 1)) & 3905519609) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 511047391) !== 0) || ((((_la - 80)) & ~0x1F) === 0 && ((1 << (_la - 80)) & 1073746049) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public externalDeclaration(): ExternalDeclarationContext {
		let localctx: ExternalDeclarationContext = new ExternalDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 170, CParser.RULE_externalDeclaration);
		try {
			this.state = 1059;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 129, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1056;
				this.functionDefinition();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1057;
				this.declaration();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 1058;
				this.match(CParser.Semi);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionDefinition(): FunctionDefinitionContext {
		let localctx: FunctionDefinitionContext = new FunctionDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 172, CParser.RULE_functionDefinition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1062;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 130, this._ctx) ) {
			case 1:
				{
				this.state = 1061;
				this.declarationSpecifiers();
				}
				break;
			}
			this.state = 1064;
			this.declarator();
			this.state = 1065;
			this.compoundStatement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 48:
			return this.directDeclarator_sempred(localctx as DirectDeclaratorContext, predIndex);
		case 63:
			return this.directAbstractDeclarator_sempred(localctx as DirectAbstractDeclaratorContext, predIndex);
		}
		return true;
	}
	private directDeclarator_sempred(localctx: DirectDeclaratorContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 9);
		case 1:
			return this.precpred(this._ctx, 8);
		case 2:
			return this.precpred(this._ctx, 7);
		case 3:
			return this.precpred(this._ctx, 6);
		case 4:
			return this.precpred(this._ctx, 5);
		case 5:
			return this.precpred(this._ctx, 4);
		}
		return true;
	}
	private directAbstractDeclarator_sempred(localctx: DirectAbstractDeclaratorContext, predIndex: number): boolean {
		switch (predIndex) {
		case 6:
			return this.precpred(this._ctx, 5);
		case 7:
			return this.precpred(this._ctx, 4);
		case 8:
			return this.precpred(this._ctx, 3);
		case 9:
			return this.precpred(this._ctx, 2);
		case 10:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,123,1068,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
	46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,
	7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,
	60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,2,66,7,66,2,67,7,67,
	2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,7,72,2,73,7,73,2,74,7,74,2,
	75,7,75,2,76,7,76,2,77,7,77,2,78,7,78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,
	7,82,2,83,7,83,2,84,7,84,2,85,7,85,2,86,7,86,1,0,1,0,1,0,4,0,178,8,0,11,
	0,12,0,179,1,0,1,0,1,0,1,0,1,0,1,0,3,0,188,8,0,1,0,1,0,1,0,1,0,1,0,1,0,
	1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,3,0,208,8,0,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,2,1,2,1,2,5,2,220,8,2,10,2,12,2,223,9,2,1,3,1,3,3,3,227,
	8,3,1,3,1,3,1,3,1,4,1,4,3,4,234,8,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,242,8,4,
	1,4,1,4,3,4,246,8,4,1,4,1,4,1,4,1,4,1,4,1,4,3,4,254,8,4,1,4,1,4,1,4,1,4,
	5,4,260,8,4,10,4,12,4,263,9,4,1,5,1,5,1,5,5,5,268,8,5,10,5,12,5,271,9,5,
	1,6,5,6,274,8,6,10,6,12,6,277,9,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,
	6,1,6,3,6,290,8,6,1,7,1,7,1,8,3,8,295,8,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,3,
	8,304,8,8,1,9,1,9,1,9,5,9,309,8,9,10,9,12,9,312,9,9,1,10,1,10,1,10,5,10,
	317,8,10,10,10,12,10,320,9,10,1,11,1,11,1,11,5,11,325,8,11,10,11,12,11,
	328,9,11,1,12,1,12,1,12,5,12,333,8,12,10,12,12,12,336,9,12,1,13,1,13,1,
	13,5,13,341,8,13,10,13,12,13,344,9,13,1,14,1,14,1,14,5,14,349,8,14,10,14,
	12,14,352,9,14,1,15,1,15,1,15,3,15,357,8,15,1,16,1,16,1,16,3,16,362,8,16,
	1,17,1,17,1,17,3,17,367,8,17,1,18,1,18,1,18,3,18,372,8,18,1,19,1,19,1,19,
	1,19,1,19,1,19,3,19,380,8,19,1,20,1,20,1,20,1,20,1,20,1,20,3,20,388,8,20,
	1,21,1,21,1,22,1,22,1,22,5,22,395,8,22,10,22,12,22,398,9,22,1,23,1,23,1,
	24,1,24,1,24,1,24,1,24,3,24,407,8,24,1,25,4,25,410,8,25,11,25,12,25,411,
	1,26,4,26,415,8,26,11,26,12,26,416,1,27,1,27,1,27,1,27,1,27,3,27,424,8,
	27,1,28,1,28,1,28,5,28,429,8,28,10,28,12,28,432,9,28,1,29,1,29,1,29,3,29,
	437,8,29,1,30,1,30,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,31,1,
	31,1,31,1,31,1,31,3,31,455,8,31,1,32,1,32,3,32,459,8,32,1,32,1,32,1,32,
	1,32,1,32,1,32,1,32,3,32,468,8,32,1,33,1,33,1,34,4,34,473,8,34,11,34,12,
	34,474,1,35,1,35,1,35,1,35,1,35,1,35,1,35,1,35,3,35,485,8,35,1,36,1,36,
	3,36,489,8,36,1,36,3,36,492,8,36,1,37,1,37,1,37,5,37,497,8,37,10,37,12,
	37,500,9,37,1,38,1,38,3,38,504,8,38,1,38,1,38,3,38,508,8,38,1,39,1,39,3,
	39,512,8,39,1,39,1,39,1,39,3,39,517,8,39,1,39,1,39,1,39,1,39,3,39,523,8,
	39,1,40,1,40,1,40,5,40,528,8,40,10,40,12,40,531,9,40,1,41,1,41,1,41,3,41,
	536,8,41,1,42,1,42,1,43,1,43,1,43,1,43,1,43,1,44,1,44,1,45,1,45,1,45,1,
	45,1,45,1,45,3,45,553,8,45,1,46,1,46,1,46,1,46,3,46,559,8,46,1,46,1,46,
	1,47,3,47,564,8,47,1,47,1,47,5,47,568,8,47,10,47,12,47,571,9,47,1,48,1,
	48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,
	1,48,3,48,590,8,48,1,48,1,48,1,48,3,48,595,8,48,1,48,3,48,598,8,48,1,48,
	1,48,1,48,1,48,1,48,3,48,605,8,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,
	48,1,48,1,48,1,48,1,48,1,48,3,48,620,8,48,1,48,1,48,1,48,1,48,1,48,1,48,
	1,48,1,48,1,48,1,48,3,48,632,8,48,1,48,5,48,635,8,48,10,48,12,48,638,9,
	48,1,49,1,49,1,50,1,50,1,50,4,50,645,8,50,11,50,12,50,646,1,50,1,50,3,50,
	651,8,50,1,51,1,51,1,51,1,51,1,51,1,51,1,51,1,52,3,52,661,8,52,1,52,1,52,
	3,52,665,8,52,5,52,667,8,52,10,52,12,52,670,9,52,1,53,1,53,1,53,3,53,675,
	8,53,1,53,3,53,678,8,53,1,54,1,54,1,54,1,54,1,54,5,54,685,8,54,10,54,12,
	54,688,9,54,1,55,1,55,3,55,692,8,55,1,55,3,55,695,8,55,1,56,4,56,698,8,
	56,11,56,12,56,699,1,57,1,57,1,57,3,57,705,8,57,1,58,1,58,1,58,5,58,710,
	8,58,10,58,12,58,713,9,58,1,59,1,59,1,59,1,59,1,59,3,59,720,8,59,3,59,722,
	8,59,1,60,1,60,1,60,5,60,727,8,60,10,60,12,60,730,9,60,1,61,1,61,3,61,734,
	8,61,1,62,1,62,3,62,738,8,62,1,62,1,62,5,62,742,8,62,10,62,12,62,745,9,
	62,3,62,747,8,62,1,63,1,63,1,63,1,63,1,63,5,63,754,8,63,10,63,12,63,757,
	9,63,1,63,1,63,3,63,761,8,63,1,63,3,63,764,8,63,1,63,1,63,1,63,1,63,3,63,
	770,8,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,
	63,1,63,3,63,786,8,63,1,63,1,63,5,63,790,8,63,10,63,12,63,793,9,63,3,63,
	795,8,63,1,63,1,63,1,63,3,63,800,8,63,1,63,3,63,803,8,63,1,63,1,63,1,63,
	1,63,1,63,3,63,810,8,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,1,
	63,1,63,1,63,1,63,1,63,1,63,1,63,1,63,3,63,829,8,63,1,63,1,63,5,63,833,
	8,63,10,63,12,63,836,9,63,5,63,838,8,63,10,63,12,63,841,9,63,1,64,1,64,
	1,65,1,65,1,65,1,65,3,65,849,8,65,1,65,1,65,3,65,853,8,65,1,66,3,66,856,
	8,66,1,66,1,66,1,66,3,66,861,8,66,1,66,5,66,864,8,66,10,66,12,66,867,9,
	66,1,67,1,67,1,67,1,68,4,68,873,8,68,11,68,12,68,874,1,69,1,69,1,69,1,69,
	1,69,1,69,3,69,883,8,69,1,70,1,70,1,70,1,70,1,70,4,70,890,8,70,11,70,12,
	70,891,1,70,1,70,1,70,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,1,71,
	1,71,1,71,5,71,909,8,71,10,71,12,71,912,9,71,3,71,914,8,71,1,71,1,71,1,
	71,1,71,5,71,920,8,71,10,71,12,71,923,9,71,3,71,925,8,71,5,71,927,8,71,
	10,71,12,71,930,9,71,1,71,1,71,3,71,934,8,71,1,72,1,72,1,72,1,72,1,72,1,
	72,1,72,1,72,1,72,1,72,1,72,3,72,947,8,72,1,73,1,73,3,73,951,8,73,1,73,
	1,73,1,74,4,74,956,8,74,11,74,12,74,957,1,75,1,75,3,75,962,8,75,1,76,3,
	76,965,8,76,1,76,1,76,1,77,1,77,1,77,1,77,1,77,1,77,1,77,3,77,976,8,77,
	1,77,1,77,1,77,1,77,1,77,1,77,3,77,984,8,77,1,78,1,78,1,78,1,78,1,78,1,
	78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,1,78,
	3,78,1006,8,78,1,79,1,79,3,79,1010,8,79,3,79,1012,8,79,1,79,1,79,3,79,1016,
	8,79,1,79,1,79,3,79,1020,8,79,1,80,1,80,3,80,1024,8,80,1,81,1,81,1,81,5,
	81,1029,8,81,10,81,12,81,1032,9,81,1,82,1,82,1,82,1,82,1,82,3,82,1039,8,
	82,1,82,1,82,3,82,1043,8,82,1,82,1,82,1,83,3,83,1048,8,83,1,83,1,83,1,84,
	4,84,1053,8,84,11,84,12,84,1054,1,85,1,85,1,85,3,85,1060,8,85,1,86,3,86,
	1063,8,86,1,86,1,86,1,86,1,86,0,2,96,126,87,0,2,4,6,8,10,12,14,16,18,20,
	22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,
	70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,
	114,116,118,120,122,124,126,128,130,132,134,136,138,140,142,144,146,148,
	150,152,154,156,158,160,162,164,166,168,170,172,0,24,1,0,107,108,2,0,77,
	77,79,79,3,0,44,44,77,77,79,79,2,0,44,44,55,55,5,0,76,76,78,78,80,80,83,
	83,88,89,1,0,80,82,2,0,76,76,78,78,1,0,74,75,1,0,70,73,1,0,105,106,1,0,
	94,104,6,0,20,20,31,31,39,39,45,45,48,48,63,63,8,0,4,6,23,23,28,28,32,32,
	37,38,42,43,50,51,57,58,1,0,4,6,2,0,46,46,49,49,4,0,24,24,40,40,52,52,56,
	56,3,0,8,9,36,36,61,61,2,0,9,9,11,15,2,0,64,65,93,93,1,0,64,65,2,0,80,80,
	87,87,2,0,16,16,18,18,2,0,19,19,52,52,2,0,21,21,25,25,1157,0,207,1,0,0,
	0,2,209,1,0,0,0,4,216,1,0,0,0,6,226,1,0,0,0,8,245,1,0,0,0,10,264,1,0,0,
	0,12,275,1,0,0,0,14,291,1,0,0,0,16,303,1,0,0,0,18,305,1,0,0,0,20,313,1,
	0,0,0,22,321,1,0,0,0,24,329,1,0,0,0,26,337,1,0,0,0,28,345,1,0,0,0,30,353,
	1,0,0,0,32,358,1,0,0,0,34,363,1,0,0,0,36,368,1,0,0,0,38,373,1,0,0,0,40,
	387,1,0,0,0,42,389,1,0,0,0,44,391,1,0,0,0,46,399,1,0,0,0,48,406,1,0,0,0,
	50,409,1,0,0,0,52,414,1,0,0,0,54,423,1,0,0,0,56,425,1,0,0,0,58,433,1,0,
	0,0,60,438,1,0,0,0,62,454,1,0,0,0,64,467,1,0,0,0,66,469,1,0,0,0,68,472,
	1,0,0,0,70,484,1,0,0,0,72,488,1,0,0,0,74,493,1,0,0,0,76,507,1,0,0,0,78,
	522,1,0,0,0,80,524,1,0,0,0,82,532,1,0,0,0,84,537,1,0,0,0,86,539,1,0,0,0,
	88,544,1,0,0,0,90,552,1,0,0,0,92,554,1,0,0,0,94,563,1,0,0,0,96,589,1,0,
	0,0,98,639,1,0,0,0,100,650,1,0,0,0,102,652,1,0,0,0,104,660,1,0,0,0,106,
	671,1,0,0,0,108,686,1,0,0,0,110,689,1,0,0,0,112,697,1,0,0,0,114,701,1,0,
	0,0,116,706,1,0,0,0,118,721,1,0,0,0,120,723,1,0,0,0,122,731,1,0,0,0,124,
	746,1,0,0,0,126,794,1,0,0,0,128,842,1,0,0,0,130,852,1,0,0,0,132,855,1,0,
	0,0,134,868,1,0,0,0,136,872,1,0,0,0,138,882,1,0,0,0,140,884,1,0,0,0,142,
	933,1,0,0,0,144,946,1,0,0,0,146,948,1,0,0,0,148,955,1,0,0,0,150,961,1,0,
	0,0,152,964,1,0,0,0,154,983,1,0,0,0,156,1005,1,0,0,0,158,1011,1,0,0,0,160,
	1021,1,0,0,0,162,1025,1,0,0,0,164,1042,1,0,0,0,166,1047,1,0,0,0,168,1052,
	1,0,0,0,170,1059,1,0,0,0,172,1062,1,0,0,0,174,208,5,110,0,0,175,208,5,111,
	0,0,176,178,5,113,0,0,177,176,1,0,0,0,178,179,1,0,0,0,179,177,1,0,0,0,179,
	180,1,0,0,0,180,208,1,0,0,0,181,182,5,64,0,0,182,183,3,44,22,0,183,184,
	5,65,0,0,184,208,1,0,0,0,185,208,3,2,1,0,186,188,5,1,0,0,187,186,1,0,0,
	0,187,188,1,0,0,0,188,189,1,0,0,0,189,190,5,64,0,0,190,191,3,146,73,0,191,
	192,5,65,0,0,192,208,1,0,0,0,193,194,5,2,0,0,194,195,5,64,0,0,195,196,3,
	12,6,0,196,197,5,93,0,0,197,198,3,122,61,0,198,199,5,65,0,0,199,208,1,0,
	0,0,200,201,5,3,0,0,201,202,5,64,0,0,202,203,3,122,61,0,203,204,5,93,0,
	0,204,205,3,12,6,0,205,206,5,65,0,0,206,208,1,0,0,0,207,174,1,0,0,0,207,
	175,1,0,0,0,207,177,1,0,0,0,207,181,1,0,0,0,207,185,1,0,0,0,207,187,1,0,
	0,0,207,193,1,0,0,0,207,200,1,0,0,0,208,1,1,0,0,0,209,210,5,59,0,0,210,
	211,5,64,0,0,211,212,3,40,20,0,212,213,5,93,0,0,213,214,3,4,2,0,214,215,
	5,65,0,0,215,3,1,0,0,0,216,221,3,6,3,0,217,218,5,93,0,0,218,220,3,6,3,0,
	219,217,1,0,0,0,220,223,1,0,0,0,221,219,1,0,0,0,221,222,1,0,0,0,222,5,1,
	0,0,0,223,221,1,0,0,0,224,227,3,122,61,0,225,227,5,26,0,0,226,224,1,0,0,
	0,226,225,1,0,0,0,227,228,1,0,0,0,228,229,5,91,0,0,229,230,3,40,20,0,230,
	7,1,0,0,0,231,246,3,0,0,0,232,234,5,1,0,0,233,232,1,0,0,0,233,234,1,0,0,
	0,234,235,1,0,0,0,235,236,5,64,0,0,236,237,3,122,61,0,237,238,5,65,0,0,
	238,239,5,68,0,0,239,241,3,132,66,0,240,242,5,93,0,0,241,240,1,0,0,0,241,
	242,1,0,0,0,242,243,1,0,0,0,243,244,5,69,0,0,244,246,1,0,0,0,245,231,1,
	0,0,0,245,233,1,0,0,0,246,261,1,0,0,0,247,248,5,66,0,0,248,249,3,44,22,
	0,249,250,5,67,0,0,250,260,1,0,0,0,251,253,5,64,0,0,252,254,3,10,5,0,253,
	252,1,0,0,0,253,254,1,0,0,0,254,255,1,0,0,0,255,260,5,65,0,0,256,257,7,
	0,0,0,257,260,5,110,0,0,258,260,7,1,0,0,259,247,1,0,0,0,259,251,1,0,0,0,
	259,256,1,0,0,0,259,258,1,0,0,0,260,263,1,0,0,0,261,259,1,0,0,0,261,262,
	1,0,0,0,262,9,1,0,0,0,263,261,1,0,0,0,264,269,3,40,20,0,265,266,5,93,0,
	0,266,268,3,40,20,0,267,265,1,0,0,0,268,271,1,0,0,0,269,267,1,0,0,0,269,
	270,1,0,0,0,270,11,1,0,0,0,271,269,1,0,0,0,272,274,7,2,0,0,273,272,1,0,
	0,0,274,277,1,0,0,0,275,273,1,0,0,0,275,276,1,0,0,0,276,289,1,0,0,0,277,
	275,1,0,0,0,278,290,3,8,4,0,279,280,3,14,7,0,280,281,3,16,8,0,281,290,1,
	0,0,0,282,283,7,3,0,0,283,284,5,64,0,0,284,285,3,122,61,0,285,286,5,65,
	0,0,286,290,1,0,0,0,287,288,5,85,0,0,288,290,5,110,0,0,289,278,1,0,0,0,
	289,279,1,0,0,0,289,282,1,0,0,0,289,287,1,0,0,0,290,13,1,0,0,0,291,292,
	7,4,0,0,292,15,1,0,0,0,293,295,5,1,0,0,294,293,1,0,0,0,294,295,1,0,0,0,
	295,296,1,0,0,0,296,297,5,64,0,0,297,298,3,122,61,0,298,299,5,65,0,0,299,
	300,3,16,8,0,300,304,1,0,0,0,301,304,3,12,6,0,302,304,5,112,0,0,303,294,
	1,0,0,0,303,301,1,0,0,0,303,302,1,0,0,0,304,17,1,0,0,0,305,310,3,16,8,0,
	306,307,7,5,0,0,307,309,3,16,8,0,308,306,1,0,0,0,309,312,1,0,0,0,310,308,
	1,0,0,0,310,311,1,0,0,0,311,19,1,0,0,0,312,310,1,0,0,0,313,318,3,18,9,0,
	314,315,7,6,0,0,315,317,3,18,9,0,316,314,1,0,0,0,317,320,1,0,0,0,318,316,
	1,0,0,0,318,319,1,0,0,0,319,21,1,0,0,0,320,318,1,0,0,0,321,326,3,20,10,
	0,322,323,7,7,0,0,323,325,3,20,10,0,324,322,1,0,0,0,325,328,1,0,0,0,326,
	324,1,0,0,0,326,327,1,0,0,0,327,23,1,0,0,0,328,326,1,0,0,0,329,334,3,22,
	11,0,330,331,7,8,0,0,331,333,3,22,11,0,332,330,1,0,0,0,333,336,1,0,0,0,
	334,332,1,0,0,0,334,335,1,0,0,0,335,25,1,0,0,0,336,334,1,0,0,0,337,342,
	3,24,12,0,338,339,7,9,0,0,339,341,3,24,12,0,340,338,1,0,0,0,341,344,1,0,
	0,0,342,340,1,0,0,0,342,343,1,0,0,0,343,27,1,0,0,0,344,342,1,0,0,0,345,
	350,3,26,13,0,346,347,5,83,0,0,347,349,3,26,13,0,348,346,1,0,0,0,349,352,
	1,0,0,0,350,348,1,0,0,0,350,351,1,0,0,0,351,29,1,0,0,0,352,350,1,0,0,0,
	353,356,3,28,14,0,354,355,5,87,0,0,355,357,3,28,14,0,356,354,1,0,0,0,356,
	357,1,0,0,0,357,31,1,0,0,0,358,361,3,30,15,0,359,360,5,84,0,0,360,362,3,
	32,16,0,361,359,1,0,0,0,361,362,1,0,0,0,362,33,1,0,0,0,363,366,3,32,16,
	0,364,365,5,85,0,0,365,367,3,34,17,0,366,364,1,0,0,0,366,367,1,0,0,0,367,
	35,1,0,0,0,368,371,3,34,17,0,369,370,5,86,0,0,370,372,3,36,18,0,371,369,
	1,0,0,0,371,372,1,0,0,0,372,37,1,0,0,0,373,379,3,36,18,0,374,375,5,90,0,
	0,375,376,3,44,22,0,376,377,5,91,0,0,377,378,3,38,19,0,378,380,1,0,0,0,
	379,374,1,0,0,0,379,380,1,0,0,0,380,39,1,0,0,0,381,388,3,38,19,0,382,383,
	3,12,6,0,383,384,3,42,21,0,384,385,3,40,20,0,385,388,1,0,0,0,386,388,5,
	112,0,0,387,381,1,0,0,0,387,382,1,0,0,0,387,386,1,0,0,0,388,41,1,0,0,0,
	389,390,7,10,0,0,390,43,1,0,0,0,391,396,3,40,20,0,392,393,5,93,0,0,393,
	395,3,40,20,0,394,392,1,0,0,0,395,398,1,0,0,0,396,394,1,0,0,0,396,397,1,
	0,0,0,397,45,1,0,0,0,398,396,1,0,0,0,399,400,3,38,19,0,400,47,1,0,0,0,401,
	402,3,50,25,0,402,403,3,56,28,0,403,404,5,92,0,0,404,407,1,0,0,0,405,407,
	3,140,70,0,406,401,1,0,0,0,406,405,1,0,0,0,407,49,1,0,0,0,408,410,3,54,
	27,0,409,408,1,0,0,0,410,411,1,0,0,0,411,409,1,0,0,0,411,412,1,0,0,0,412,
	51,1,0,0,0,413,415,3,54,27,0,414,413,1,0,0,0,415,416,1,0,0,0,416,414,1,
	0,0,0,416,417,1,0,0,0,417,53,1,0,0,0,418,424,3,60,30,0,419,424,3,62,31,
	0,420,424,3,88,44,0,421,424,3,90,45,0,422,424,3,92,46,0,423,418,1,0,0,0,
	423,419,1,0,0,0,423,420,1,0,0,0,423,421,1,0,0,0,423,422,1,0,0,0,424,55,
	1,0,0,0,425,430,3,58,29,0,426,427,5,93,0,0,427,429,3,58,29,0,428,426,1,
	0,0,0,429,432,1,0,0,0,430,428,1,0,0,0,430,431,1,0,0,0,431,57,1,0,0,0,432,
	430,1,0,0,0,433,436,3,94,47,0,434,435,5,94,0,0,435,437,3,130,65,0,436,434,
	1,0,0,0,436,437,1,0,0,0,437,59,1,0,0,0,438,439,7,11,0,0,439,61,1,0,0,0,
	440,455,7,12,0,0,441,442,5,1,0,0,442,443,5,64,0,0,443,444,7,13,0,0,444,
	455,5,65,0,0,445,455,3,86,43,0,446,455,3,64,32,0,447,455,3,78,39,0,448,
	455,3,128,64,0,449,450,5,7,0,0,450,451,5,64,0,0,451,452,3,46,23,0,452,453,
	5,65,0,0,453,455,1,0,0,0,454,440,1,0,0,0,454,441,1,0,0,0,454,445,1,0,0,
	0,454,446,1,0,0,0,454,447,1,0,0,0,454,448,1,0,0,0,454,449,1,0,0,0,455,63,
	1,0,0,0,456,458,3,66,33,0,457,459,5,110,0,0,458,457,1,0,0,0,458,459,1,0,
	0,0,459,460,1,0,0,0,460,461,5,68,0,0,461,462,3,68,34,0,462,463,5,69,0,0,
	463,468,1,0,0,0,464,465,3,66,33,0,465,466,5,110,0,0,466,468,1,0,0,0,467,
	456,1,0,0,0,467,464,1,0,0,0,468,65,1,0,0,0,469,470,7,14,0,0,470,67,1,0,
	0,0,471,473,3,70,35,0,472,471,1,0,0,0,473,474,1,0,0,0,474,472,1,0,0,0,474,
	475,1,0,0,0,475,69,1,0,0,0,476,477,3,72,36,0,477,478,3,74,37,0,478,479,
	5,92,0,0,479,485,1,0,0,0,480,481,3,72,36,0,481,482,5,92,0,0,482,485,1,0,
	0,0,483,485,3,140,70,0,484,476,1,0,0,0,484,480,1,0,0,0,484,483,1,0,0,0,
	485,71,1,0,0,0,486,489,3,62,31,0,487,489,3,88,44,0,488,486,1,0,0,0,488,
	487,1,0,0,0,489,491,1,0,0,0,490,492,3,72,36,0,491,490,1,0,0,0,491,492,1,
	0,0,0,492,73,1,0,0,0,493,498,3,76,38,0,494,495,5,93,0,0,495,497,3,76,38,
	0,496,494,1,0,0,0,497,500,1,0,0,0,498,496,1,0,0,0,498,499,1,0,0,0,499,75,
	1,0,0,0,500,498,1,0,0,0,501,508,3,94,47,0,502,504,3,94,47,0,503,502,1,0,
	0,0,503,504,1,0,0,0,504,505,1,0,0,0,505,506,5,91,0,0,506,508,3,46,23,0,
	507,501,1,0,0,0,507,503,1,0,0,0,508,77,1,0,0,0,509,511,5,30,0,0,510,512,
	5,110,0,0,511,510,1,0,0,0,511,512,1,0,0,0,512,513,1,0,0,0,513,514,5,68,
	0,0,514,516,3,80,40,0,515,517,5,93,0,0,516,515,1,0,0,0,516,517,1,0,0,0,
	517,518,1,0,0,0,518,519,5,69,0,0,519,523,1,0,0,0,520,521,5,30,0,0,521,523,
	5,110,0,0,522,509,1,0,0,0,522,520,1,0,0,0,523,79,1,0,0,0,524,529,3,82,41,
	0,525,526,5,93,0,0,526,528,3,82,41,0,527,525,1,0,0,0,528,531,1,0,0,0,529,
	527,1,0,0,0,529,530,1,0,0,0,530,81,1,0,0,0,531,529,1,0,0,0,532,535,3,84,
	42,0,533,534,5,94,0,0,534,536,3,46,23,0,535,533,1,0,0,0,535,536,1,0,0,0,
	536,83,1,0,0,0,537,538,5,110,0,0,538,85,1,0,0,0,539,540,5,56,0,0,540,541,
	5,64,0,0,541,542,3,122,61,0,542,543,5,65,0,0,543,87,1,0,0,0,544,545,7,15,
	0,0,545,89,1,0,0,0,546,553,7,16,0,0,547,553,3,102,51,0,548,549,5,10,0,0,
	549,550,5,64,0,0,550,551,5,110,0,0,551,553,5,65,0,0,552,546,1,0,0,0,552,
	547,1,0,0,0,552,548,1,0,0,0,553,91,1,0,0,0,554,555,5,54,0,0,555,558,5,64,
	0,0,556,559,3,122,61,0,557,559,3,46,23,0,558,556,1,0,0,0,558,557,1,0,0,
	0,559,560,1,0,0,0,560,561,5,65,0,0,561,93,1,0,0,0,562,564,3,110,55,0,563,
	562,1,0,0,0,563,564,1,0,0,0,564,565,1,0,0,0,565,569,3,96,48,0,566,568,3,
	100,50,0,567,566,1,0,0,0,568,571,1,0,0,0,569,567,1,0,0,0,569,570,1,0,0,
	0,570,95,1,0,0,0,571,569,1,0,0,0,572,573,6,48,-1,0,573,590,5,110,0,0,574,
	575,5,64,0,0,575,576,3,94,47,0,576,577,5,65,0,0,577,590,1,0,0,0,578,579,
	5,110,0,0,579,580,5,91,0,0,580,590,5,112,0,0,581,582,3,98,49,0,582,583,
	5,110,0,0,583,590,1,0,0,0,584,585,5,64,0,0,585,586,3,98,49,0,586,587,3,
	94,47,0,587,588,5,65,0,0,588,590,1,0,0,0,589,572,1,0,0,0,589,574,1,0,0,
	0,589,578,1,0,0,0,589,581,1,0,0,0,589,584,1,0,0,0,590,636,1,0,0,0,591,592,
	10,9,0,0,592,594,5,66,0,0,593,595,3,112,56,0,594,593,1,0,0,0,594,595,1,
	0,0,0,595,597,1,0,0,0,596,598,3,40,20,0,597,596,1,0,0,0,597,598,1,0,0,0,
	598,599,1,0,0,0,599,635,5,67,0,0,600,601,10,8,0,0,601,602,5,66,0,0,602,
	604,5,45,0,0,603,605,3,112,56,0,604,603,1,0,0,0,604,605,1,0,0,0,605,606,
	1,0,0,0,606,607,3,40,20,0,607,608,5,67,0,0,608,635,1,0,0,0,609,610,10,7,
	0,0,610,611,5,66,0,0,611,612,3,112,56,0,612,613,5,45,0,0,613,614,3,40,20,
	0,614,615,5,67,0,0,615,635,1,0,0,0,616,617,10,6,0,0,617,619,5,66,0,0,618,
	620,3,112,56,0,619,618,1,0,0,0,619,620,1,0,0,0,620,621,1,0,0,0,621,622,
	5,80,0,0,622,635,5,67,0,0,623,624,10,5,0,0,624,625,5,64,0,0,625,626,3,114,
	57,0,626,627,5,65,0,0,627,635,1,0,0,0,628,629,10,4,0,0,629,631,5,64,0,0,
	630,632,3,120,60,0,631,630,1,0,0,0,631,632,1,0,0,0,632,633,1,0,0,0,633,
	635,5,65,0,0,634,591,1,0,0,0,634,600,1,0,0,0,634,609,1,0,0,0,634,616,1,
	0,0,0,634,623,1,0,0,0,634,628,1,0,0,0,635,638,1,0,0,0,636,634,1,0,0,0,636,
	637,1,0,0,0,637,97,1,0,0,0,638,636,1,0,0,0,639,640,7,17,0,0,640,99,1,0,
	0,0,641,642,5,16,0,0,642,644,5,64,0,0,643,645,5,113,0,0,644,643,1,0,0,0,
	645,646,1,0,0,0,646,644,1,0,0,0,646,647,1,0,0,0,647,648,1,0,0,0,648,651,
	5,65,0,0,649,651,3,102,51,0,650,641,1,0,0,0,650,649,1,0,0,0,651,101,1,0,
	0,0,652,653,5,17,0,0,653,654,5,64,0,0,654,655,5,64,0,0,655,656,3,104,52,
	0,656,657,5,65,0,0,657,658,5,65,0,0,658,103,1,0,0,0,659,661,3,106,53,0,
	660,659,1,0,0,0,660,661,1,0,0,0,661,668,1,0,0,0,662,664,5,93,0,0,663,665,
	3,106,53,0,664,663,1,0,0,0,664,665,1,0,0,0,665,667,1,0,0,0,666,662,1,0,
	0,0,667,670,1,0,0,0,668,666,1,0,0,0,668,669,1,0,0,0,669,105,1,0,0,0,670,
	668,1,0,0,0,671,677,8,18,0,0,672,674,5,64,0,0,673,675,3,10,5,0,674,673,
	1,0,0,0,674,675,1,0,0,0,675,676,1,0,0,0,676,678,5,65,0,0,677,672,1,0,0,
	0,677,678,1,0,0,0,678,107,1,0,0,0,679,685,8,19,0,0,680,681,5,64,0,0,681,
	682,3,108,54,0,682,683,5,65,0,0,683,685,1,0,0,0,684,679,1,0,0,0,684,680,
	1,0,0,0,685,688,1,0,0,0,686,684,1,0,0,0,686,687,1,0,0,0,687,109,1,0,0,0,
	688,686,1,0,0,0,689,691,7,20,0,0,690,692,3,112,56,0,691,690,1,0,0,0,691,
	692,1,0,0,0,692,694,1,0,0,0,693,695,3,110,55,0,694,693,1,0,0,0,694,695,
	1,0,0,0,695,111,1,0,0,0,696,698,3,88,44,0,697,696,1,0,0,0,698,699,1,0,0,
	0,699,697,1,0,0,0,699,700,1,0,0,0,700,113,1,0,0,0,701,704,3,116,58,0,702,
	703,5,93,0,0,703,705,5,109,0,0,704,702,1,0,0,0,704,705,1,0,0,0,705,115,
	1,0,0,0,706,711,3,118,59,0,707,708,5,93,0,0,708,710,3,118,59,0,709,707,
	1,0,0,0,710,713,1,0,0,0,711,709,1,0,0,0,711,712,1,0,0,0,712,117,1,0,0,0,
	713,711,1,0,0,0,714,715,3,50,25,0,715,716,3,94,47,0,716,722,1,0,0,0,717,
	719,3,52,26,0,718,720,3,124,62,0,719,718,1,0,0,0,719,720,1,0,0,0,720,722,
	1,0,0,0,721,714,1,0,0,0,721,717,1,0,0,0,722,119,1,0,0,0,723,728,5,110,0,
	0,724,725,5,93,0,0,725,727,5,110,0,0,726,724,1,0,0,0,727,730,1,0,0,0,728,
	726,1,0,0,0,728,729,1,0,0,0,729,121,1,0,0,0,730,728,1,0,0,0,731,733,3,72,
	36,0,732,734,3,124,62,0,733,732,1,0,0,0,733,734,1,0,0,0,734,123,1,0,0,0,
	735,747,3,110,55,0,736,738,3,110,55,0,737,736,1,0,0,0,737,738,1,0,0,0,738,
	739,1,0,0,0,739,743,3,126,63,0,740,742,3,100,50,0,741,740,1,0,0,0,742,745,
	1,0,0,0,743,741,1,0,0,0,743,744,1,0,0,0,744,747,1,0,0,0,745,743,1,0,0,0,
	746,735,1,0,0,0,746,737,1,0,0,0,747,125,1,0,0,0,748,749,6,63,-1,0,749,750,
	5,64,0,0,750,751,3,124,62,0,751,755,5,65,0,0,752,754,3,100,50,0,753,752,
	1,0,0,0,754,757,1,0,0,0,755,753,1,0,0,0,755,756,1,0,0,0,756,795,1,0,0,0,
	757,755,1,0,0,0,758,760,5,66,0,0,759,761,3,112,56,0,760,759,1,0,0,0,760,
	761,1,0,0,0,761,763,1,0,0,0,762,764,3,40,20,0,763,762,1,0,0,0,763,764,1,
	0,0,0,764,765,1,0,0,0,765,795,5,67,0,0,766,767,5,66,0,0,767,769,5,45,0,
	0,768,770,3,112,56,0,769,768,1,0,0,0,769,770,1,0,0,0,770,771,1,0,0,0,771,
	772,3,40,20,0,772,773,5,67,0,0,773,795,1,0,0,0,774,775,5,66,0,0,775,776,
	3,112,56,0,776,777,5,45,0,0,777,778,3,40,20,0,778,779,5,67,0,0,779,795,
	1,0,0,0,780,781,5,66,0,0,781,782,5,80,0,0,782,795,5,67,0,0,783,785,5,64,
	0,0,784,786,3,114,57,0,785,784,1,0,0,0,785,786,1,0,0,0,786,787,1,0,0,0,
	787,791,5,65,0,0,788,790,3,100,50,0,789,788,1,0,0,0,790,793,1,0,0,0,791,
	789,1,0,0,0,791,792,1,0,0,0,792,795,1,0,0,0,793,791,1,0,0,0,794,748,1,0,
	0,0,794,758,1,0,0,0,794,766,1,0,0,0,794,774,1,0,0,0,794,780,1,0,0,0,794,
	783,1,0,0,0,795,839,1,0,0,0,796,797,10,5,0,0,797,799,5,66,0,0,798,800,3,
	112,56,0,799,798,1,0,0,0,799,800,1,0,0,0,800,802,1,0,0,0,801,803,3,40,20,
	0,802,801,1,0,0,0,802,803,1,0,0,0,803,804,1,0,0,0,804,838,5,67,0,0,805,
	806,10,4,0,0,806,807,5,66,0,0,807,809,5,45,0,0,808,810,3,112,56,0,809,808,
	1,0,0,0,809,810,1,0,0,0,810,811,1,0,0,0,811,812,3,40,20,0,812,813,5,67,
	0,0,813,838,1,0,0,0,814,815,10,3,0,0,815,816,5,66,0,0,816,817,3,112,56,
	0,817,818,5,45,0,0,818,819,3,40,20,0,819,820,5,67,0,0,820,838,1,0,0,0,821,
	822,10,2,0,0,822,823,5,66,0,0,823,824,5,80,0,0,824,838,5,67,0,0,825,826,
	10,1,0,0,826,828,5,64,0,0,827,829,3,114,57,0,828,827,1,0,0,0,828,829,1,
	0,0,0,829,830,1,0,0,0,830,834,5,65,0,0,831,833,3,100,50,0,832,831,1,0,0,
	0,833,836,1,0,0,0,834,832,1,0,0,0,834,835,1,0,0,0,835,838,1,0,0,0,836,834,
	1,0,0,0,837,796,1,0,0,0,837,805,1,0,0,0,837,814,1,0,0,0,837,821,1,0,0,0,
	837,825,1,0,0,0,838,841,1,0,0,0,839,837,1,0,0,0,839,840,1,0,0,0,840,127,
	1,0,0,0,841,839,1,0,0,0,842,843,5,110,0,0,843,129,1,0,0,0,844,853,3,40,
	20,0,845,846,5,68,0,0,846,848,3,132,66,0,847,849,5,93,0,0,848,847,1,0,0,
	0,848,849,1,0,0,0,849,850,1,0,0,0,850,851,5,69,0,0,851,853,1,0,0,0,852,
	844,1,0,0,0,852,845,1,0,0,0,853,131,1,0,0,0,854,856,3,134,67,0,855,854,
	1,0,0,0,855,856,1,0,0,0,856,857,1,0,0,0,857,865,3,130,65,0,858,860,5,93,
	0,0,859,861,3,134,67,0,860,859,1,0,0,0,860,861,1,0,0,0,861,862,1,0,0,0,
	862,864,3,130,65,0,863,858,1,0,0,0,864,867,1,0,0,0,865,863,1,0,0,0,865,
	866,1,0,0,0,866,133,1,0,0,0,867,865,1,0,0,0,868,869,3,136,68,0,869,870,
	5,94,0,0,870,135,1,0,0,0,871,873,3,138,69,0,872,871,1,0,0,0,873,874,1,0,
	0,0,874,872,1,0,0,0,874,875,1,0,0,0,875,137,1,0,0,0,876,877,5,66,0,0,877,
	878,3,46,23,0,878,879,5,67,0,0,879,883,1,0,0,0,880,881,5,108,0,0,881,883,
	5,110,0,0,882,876,1,0,0,0,882,880,1,0,0,0,883,139,1,0,0,0,884,885,5,62,
	0,0,885,886,5,64,0,0,886,887,3,46,23,0,887,889,5,93,0,0,888,890,5,113,0,
	0,889,888,1,0,0,0,890,891,1,0,0,0,891,889,1,0,0,0,891,892,1,0,0,0,892,893,
	1,0,0,0,893,894,5,65,0,0,894,895,5,92,0,0,895,141,1,0,0,0,896,934,3,144,
	72,0,897,934,3,146,73,0,898,934,3,152,76,0,899,934,3,154,77,0,900,934,3,
	156,78,0,901,934,3,164,82,0,902,903,7,21,0,0,903,904,7,22,0,0,904,913,5,
	64,0,0,905,910,3,36,18,0,906,907,5,93,0,0,907,909,3,36,18,0,908,906,1,0,
	0,0,909,912,1,0,0,0,910,908,1,0,0,0,910,911,1,0,0,0,911,914,1,0,0,0,912,
	910,1,0,0,0,913,905,1,0,0,0,913,914,1,0,0,0,914,928,1,0,0,0,915,924,5,91,
	0,0,916,921,3,36,18,0,917,918,5,93,0,0,918,920,3,36,18,0,919,917,1,0,0,
	0,920,923,1,0,0,0,921,919,1,0,0,0,921,922,1,0,0,0,922,925,1,0,0,0,923,921,
	1,0,0,0,924,916,1,0,0,0,924,925,1,0,0,0,925,927,1,0,0,0,926,915,1,0,0,0,
	927,930,1,0,0,0,928,926,1,0,0,0,928,929,1,0,0,0,929,931,1,0,0,0,930,928,
	1,0,0,0,931,932,5,65,0,0,932,934,5,92,0,0,933,896,1,0,0,0,933,897,1,0,0,
	0,933,898,1,0,0,0,933,899,1,0,0,0,933,900,1,0,0,0,933,901,1,0,0,0,933,902,
	1,0,0,0,934,143,1,0,0,0,935,936,5,110,0,0,936,937,5,91,0,0,937,947,3,142,
	71,0,938,939,5,22,0,0,939,940,3,46,23,0,940,941,5,91,0,0,941,942,3,142,
	71,0,942,947,1,0,0,0,943,944,5,26,0,0,944,945,5,91,0,0,945,947,3,142,71,
	0,946,935,1,0,0,0,946,938,1,0,0,0,946,943,1,0,0,0,947,145,1,0,0,0,948,950,
	5,68,0,0,949,951,3,148,74,0,950,949,1,0,0,0,950,951,1,0,0,0,951,952,1,0,
	0,0,952,953,5,69,0,0,953,147,1,0,0,0,954,956,3,150,75,0,955,954,1,0,0,0,
	956,957,1,0,0,0,957,955,1,0,0,0,957,958,1,0,0,0,958,149,1,0,0,0,959,962,
	3,142,71,0,960,962,3,48,24,0,961,959,1,0,0,0,961,960,1,0,0,0,962,151,1,
	0,0,0,963,965,3,44,22,0,964,963,1,0,0,0,964,965,1,0,0,0,965,966,1,0,0,0,
	966,967,5,92,0,0,967,153,1,0,0,0,968,969,5,35,0,0,969,970,5,64,0,0,970,
	971,3,44,22,0,971,972,5,65,0,0,972,975,3,142,71,0,973,974,5,29,0,0,974,
	976,3,142,71,0,975,973,1,0,0,0,975,976,1,0,0,0,976,984,1,0,0,0,977,978,
	5,47,0,0,978,979,5,64,0,0,979,980,3,44,22,0,980,981,5,65,0,0,981,982,3,
	142,71,0,982,984,1,0,0,0,983,968,1,0,0,0,983,977,1,0,0,0,984,155,1,0,0,
	0,985,986,5,53,0,0,986,987,5,64,0,0,987,988,3,44,22,0,988,989,5,65,0,0,
	989,990,3,142,71,0,990,1006,1,0,0,0,991,992,5,27,0,0,992,993,3,142,71,0,
	993,994,5,53,0,0,994,995,5,64,0,0,995,996,3,44,22,0,996,997,5,65,0,0,997,
	998,5,92,0,0,998,1006,1,0,0,0,999,1000,5,33,0,0,1000,1001,5,64,0,0,1001,
	1002,3,158,79,0,1002,1003,5,65,0,0,1003,1004,3,142,71,0,1004,1006,1,0,0,
	0,1005,985,1,0,0,0,1005,991,1,0,0,0,1005,999,1,0,0,0,1006,157,1,0,0,0,1007,
	1012,3,160,80,0,1008,1010,3,44,22,0,1009,1008,1,0,0,0,1009,1010,1,0,0,0,
	1010,1012,1,0,0,0,1011,1007,1,0,0,0,1011,1009,1,0,0,0,1012,1013,1,0,0,0,
	1013,1015,5,92,0,0,1014,1016,3,162,81,0,1015,1014,1,0,0,0,1015,1016,1,0,
	0,0,1016,1017,1,0,0,0,1017,1019,5,92,0,0,1018,1020,3,162,81,0,1019,1018,
	1,0,0,0,1019,1020,1,0,0,0,1020,159,1,0,0,0,1021,1023,3,50,25,0,1022,1024,
	3,56,28,0,1023,1022,1,0,0,0,1023,1024,1,0,0,0,1024,161,1,0,0,0,1025,1030,
	3,40,20,0,1026,1027,5,93,0,0,1027,1029,3,40,20,0,1028,1026,1,0,0,0,1029,
	1032,1,0,0,0,1030,1028,1,0,0,0,1030,1031,1,0,0,0,1031,163,1,0,0,0,1032,
	1030,1,0,0,0,1033,1034,5,34,0,0,1034,1043,5,110,0,0,1035,1043,7,23,0,0,
	1036,1038,5,41,0,0,1037,1039,3,44,22,0,1038,1037,1,0,0,0,1038,1039,1,0,
	0,0,1039,1043,1,0,0,0,1040,1041,5,34,0,0,1041,1043,3,12,6,0,1042,1033,1,
	0,0,0,1042,1035,1,0,0,0,1042,1036,1,0,0,0,1042,1040,1,0,0,0,1043,1044,1,
	0,0,0,1044,1045,5,92,0,0,1045,165,1,0,0,0,1046,1048,3,168,84,0,1047,1046,
	1,0,0,0,1047,1048,1,0,0,0,1048,1049,1,0,0,0,1049,1050,5,0,0,1,1050,167,
	1,0,0,0,1051,1053,3,170,85,0,1052,1051,1,0,0,0,1053,1054,1,0,0,0,1054,1052,
	1,0,0,0,1054,1055,1,0,0,0,1055,169,1,0,0,0,1056,1060,3,172,86,0,1057,1060,
	3,48,24,0,1058,1060,5,92,0,0,1059,1056,1,0,0,0,1059,1057,1,0,0,0,1059,1058,
	1,0,0,0,1060,171,1,0,0,0,1061,1063,3,50,25,0,1062,1061,1,0,0,0,1062,1063,
	1,0,0,0,1063,1064,1,0,0,0,1064,1065,3,94,47,0,1065,1066,3,146,73,0,1066,
	173,1,0,0,0,131,179,187,207,221,226,233,241,245,253,259,261,269,275,289,
	294,303,310,318,326,334,342,350,356,361,366,371,379,387,396,406,411,416,
	423,430,436,454,458,467,474,484,488,491,498,503,507,511,516,522,529,535,
	552,558,563,569,589,594,597,604,619,631,634,636,646,650,660,664,668,674,
	677,684,686,691,694,699,704,711,719,721,728,733,737,743,746,755,760,763,
	769,785,791,794,799,802,809,828,834,837,839,848,852,855,860,865,874,882,
	891,910,913,921,924,928,933,946,950,957,961,964,975,983,1005,1009,1011,
	1015,1019,1023,1030,1038,1042,1047,1054,1059,1062];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CParser.__ATN) {
			CParser.__ATN = new ATNDeserializer().deserialize(CParser._serializedATN);
		}

		return CParser.__ATN;
	}


	static DecisionsToDFA = CParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class PrimaryExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Identifier(): TerminalNode {
		return this.getToken(CParser.Identifier, 0);
	}
	public Constant(): TerminalNode {
		return this.getToken(CParser.Constant, 0);
	}
	public StringLiteral_list(): TerminalNode[] {
	    	return this.getTokens(CParser.StringLiteral);
	}
	public StringLiteral(i: number): TerminalNode {
		return this.getToken(CParser.StringLiteral, i);
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
	public genericSelection(): GenericSelectionContext {
		return this.getTypedRuleContext(GenericSelectionContext, 0) as GenericSelectionContext;
	}
	public compoundStatement(): CompoundStatementContext {
		return this.getTypedRuleContext(CompoundStatementContext, 0) as CompoundStatementContext;
	}
	public unaryExpression(): UnaryExpressionContext {
		return this.getTypedRuleContext(UnaryExpressionContext, 0) as UnaryExpressionContext;
	}
	public Comma(): TerminalNode {
		return this.getToken(CParser.Comma, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_primaryExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterPrimaryExpression) {
	 		listener.enterPrimaryExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitPrimaryExpression) {
	 		listener.exitPrimaryExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitPrimaryExpression) {
			return visitor.visitPrimaryExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GenericSelectionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Generic(): TerminalNode {
		return this.getToken(CParser.Generic, 0);
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public assignmentExpression(): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, 0) as AssignmentExpressionContext;
	}
	public Comma(): TerminalNode {
		return this.getToken(CParser.Comma, 0);
	}
	public genericAssocList(): GenericAssocListContext {
		return this.getTypedRuleContext(GenericAssocListContext, 0) as GenericAssocListContext;
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_genericSelection;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterGenericSelection) {
	 		listener.enterGenericSelection(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitGenericSelection) {
	 		listener.exitGenericSelection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitGenericSelection) {
			return visitor.visitGenericSelection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GenericAssocListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public genericAssociation_list(): GenericAssociationContext[] {
		return this.getTypedRuleContexts(GenericAssociationContext) as GenericAssociationContext[];
	}
	public genericAssociation(i: number): GenericAssociationContext {
		return this.getTypedRuleContext(GenericAssociationContext, i) as GenericAssociationContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(CParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_genericAssocList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterGenericAssocList) {
	 		listener.enterGenericAssocList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitGenericAssocList) {
	 		listener.exitGenericAssocList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitGenericAssocList) {
			return visitor.visitGenericAssocList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GenericAssociationContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Colon(): TerminalNode {
		return this.getToken(CParser.Colon, 0);
	}
	public assignmentExpression(): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, 0) as AssignmentExpressionContext;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public Default(): TerminalNode {
		return this.getToken(CParser.Default, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_genericAssociation;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterGenericAssociation) {
	 		listener.enterGenericAssociation(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitGenericAssociation) {
	 		listener.exitGenericAssociation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitGenericAssociation) {
			return visitor.visitGenericAssociation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PostfixExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primaryExpression(): PrimaryExpressionContext {
		return this.getTypedRuleContext(PrimaryExpressionContext, 0) as PrimaryExpressionContext;
	}
	public LeftParen_list(): TerminalNode[] {
	    	return this.getTokens(CParser.LeftParen);
	}
	public LeftParen(i: number): TerminalNode {
		return this.getToken(CParser.LeftParen, i);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public RightParen_list(): TerminalNode[] {
	    	return this.getTokens(CParser.RightParen);
	}
	public RightParen(i: number): TerminalNode {
		return this.getToken(CParser.RightParen, i);
	}
	public LeftBrace(): TerminalNode {
		return this.getToken(CParser.LeftBrace, 0);
	}
	public initialiserList(): InitialiserListContext {
		return this.getTypedRuleContext(InitialiserListContext, 0) as InitialiserListContext;
	}
	public RightBrace(): TerminalNode {
		return this.getToken(CParser.RightBrace, 0);
	}
	public LeftBracket_list(): TerminalNode[] {
	    	return this.getTokens(CParser.LeftBracket);
	}
	public LeftBracket(i: number): TerminalNode {
		return this.getToken(CParser.LeftBracket, i);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public RightBracket_list(): TerminalNode[] {
	    	return this.getTokens(CParser.RightBracket);
	}
	public RightBracket(i: number): TerminalNode {
		return this.getToken(CParser.RightBracket, i);
	}
	public Identifier_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Identifier);
	}
	public Identifier(i: number): TerminalNode {
		return this.getToken(CParser.Identifier, i);
	}
	public Dot_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Dot);
	}
	public Dot(i: number): TerminalNode {
		return this.getToken(CParser.Dot, i);
	}
	public Arrow_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Arrow);
	}
	public Arrow(i: number): TerminalNode {
		return this.getToken(CParser.Arrow, i);
	}
	public PlusPlus_list(): TerminalNode[] {
	    	return this.getTokens(CParser.PlusPlus);
	}
	public PlusPlus(i: number): TerminalNode {
		return this.getToken(CParser.PlusPlus, i);
	}
	public MinusMinus_list(): TerminalNode[] {
	    	return this.getTokens(CParser.MinusMinus);
	}
	public MinusMinus(i: number): TerminalNode {
		return this.getToken(CParser.MinusMinus, i);
	}
	public Comma(): TerminalNode {
		return this.getToken(CParser.Comma, 0);
	}
	public argumentExpressionList_list(): ArgumentExpressionListContext[] {
		return this.getTypedRuleContexts(ArgumentExpressionListContext) as ArgumentExpressionListContext[];
	}
	public argumentExpressionList(i: number): ArgumentExpressionListContext {
		return this.getTypedRuleContext(ArgumentExpressionListContext, i) as ArgumentExpressionListContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_postfixExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterPostfixExpression) {
	 		listener.enterPostfixExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitPostfixExpression) {
	 		listener.exitPostfixExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitPostfixExpression) {
			return visitor.visitPostfixExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentExpressionListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public assignmentExpression_list(): AssignmentExpressionContext[] {
		return this.getTypedRuleContexts(AssignmentExpressionContext) as AssignmentExpressionContext[];
	}
	public assignmentExpression(i: number): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, i) as AssignmentExpressionContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(CParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_argumentExpressionList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterArgumentExpressionList) {
	 		listener.enterArgumentExpressionList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitArgumentExpressionList) {
	 		listener.exitArgumentExpressionList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitArgumentExpressionList) {
			return visitor.visitArgumentExpressionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnaryExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public postfixExpression(): PostfixExpressionContext {
		return this.getTypedRuleContext(PostfixExpressionContext, 0) as PostfixExpressionContext;
	}
	public unaryOperator(): UnaryOperatorContext {
		return this.getTypedRuleContext(UnaryOperatorContext, 0) as UnaryOperatorContext;
	}
	public castExpression(): CastExpressionContext {
		return this.getTypedRuleContext(CastExpressionContext, 0) as CastExpressionContext;
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
	public AndAnd(): TerminalNode {
		return this.getToken(CParser.AndAnd, 0);
	}
	public Identifier(): TerminalNode {
		return this.getToken(CParser.Identifier, 0);
	}
	public Sizeof_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Sizeof);
	}
	public Sizeof(i: number): TerminalNode {
		return this.getToken(CParser.Sizeof, i);
	}
	public Alignof(): TerminalNode {
		return this.getToken(CParser.Alignof, 0);
	}
	public PlusPlus_list(): TerminalNode[] {
	    	return this.getTokens(CParser.PlusPlus);
	}
	public PlusPlus(i: number): TerminalNode {
		return this.getToken(CParser.PlusPlus, i);
	}
	public MinusMinus_list(): TerminalNode[] {
	    	return this.getTokens(CParser.MinusMinus);
	}
	public MinusMinus(i: number): TerminalNode {
		return this.getToken(CParser.MinusMinus, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_unaryExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterUnaryExpression) {
	 		listener.enterUnaryExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitUnaryExpression) {
	 		listener.exitUnaryExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitUnaryExpression) {
			return visitor.visitUnaryExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnaryOperatorContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public And(): TerminalNode {
		return this.getToken(CParser.And, 0);
	}
	public Star(): TerminalNode {
		return this.getToken(CParser.Star, 0);
	}
	public Plus(): TerminalNode {
		return this.getToken(CParser.Plus, 0);
	}
	public Minus(): TerminalNode {
		return this.getToken(CParser.Minus, 0);
	}
	public Tilde(): TerminalNode {
		return this.getToken(CParser.Tilde, 0);
	}
	public Not(): TerminalNode {
		return this.getToken(CParser.Not, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_unaryOperator;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterUnaryOperator) {
	 		listener.enterUnaryOperator(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitUnaryOperator) {
	 		listener.exitUnaryOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitUnaryOperator) {
			return visitor.visitUnaryOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CastExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
	public castExpression(): CastExpressionContext {
		return this.getTypedRuleContext(CastExpressionContext, 0) as CastExpressionContext;
	}
	public unaryExpression(): UnaryExpressionContext {
		return this.getTypedRuleContext(UnaryExpressionContext, 0) as UnaryExpressionContext;
	}
	public DigitSequence(): TerminalNode {
		return this.getToken(CParser.DigitSequence, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_castExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterCastExpression) {
	 		listener.enterCastExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitCastExpression) {
	 		listener.exitCastExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitCastExpression) {
			return visitor.visitCastExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MultiplicativeExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public castExpression_list(): CastExpressionContext[] {
		return this.getTypedRuleContexts(CastExpressionContext) as CastExpressionContext[];
	}
	public castExpression(i: number): CastExpressionContext {
		return this.getTypedRuleContext(CastExpressionContext, i) as CastExpressionContext;
	}
	public Star_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Star);
	}
	public Star(i: number): TerminalNode {
		return this.getToken(CParser.Star, i);
	}
	public Div_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Div);
	}
	public Div(i: number): TerminalNode {
		return this.getToken(CParser.Div, i);
	}
	public Mod_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Mod);
	}
	public Mod(i: number): TerminalNode {
		return this.getToken(CParser.Mod, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_multiplicativeExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterMultiplicativeExpression) {
	 		listener.enterMultiplicativeExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitMultiplicativeExpression) {
	 		listener.exitMultiplicativeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitMultiplicativeExpression) {
			return visitor.visitMultiplicativeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AdditiveExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public multiplicativeExpression_list(): MultiplicativeExpressionContext[] {
		return this.getTypedRuleContexts(MultiplicativeExpressionContext) as MultiplicativeExpressionContext[];
	}
	public multiplicativeExpression(i: number): MultiplicativeExpressionContext {
		return this.getTypedRuleContext(MultiplicativeExpressionContext, i) as MultiplicativeExpressionContext;
	}
	public Plus_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Plus);
	}
	public Plus(i: number): TerminalNode {
		return this.getToken(CParser.Plus, i);
	}
	public Minus_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Minus);
	}
	public Minus(i: number): TerminalNode {
		return this.getToken(CParser.Minus, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_additiveExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterAdditiveExpression) {
	 		listener.enterAdditiveExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitAdditiveExpression) {
	 		listener.exitAdditiveExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitAdditiveExpression) {
			return visitor.visitAdditiveExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ShiftExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public additiveExpression_list(): AdditiveExpressionContext[] {
		return this.getTypedRuleContexts(AdditiveExpressionContext) as AdditiveExpressionContext[];
	}
	public additiveExpression(i: number): AdditiveExpressionContext {
		return this.getTypedRuleContext(AdditiveExpressionContext, i) as AdditiveExpressionContext;
	}
	public LeftShift_list(): TerminalNode[] {
	    	return this.getTokens(CParser.LeftShift);
	}
	public LeftShift(i: number): TerminalNode {
		return this.getToken(CParser.LeftShift, i);
	}
	public RightShift_list(): TerminalNode[] {
	    	return this.getTokens(CParser.RightShift);
	}
	public RightShift(i: number): TerminalNode {
		return this.getToken(CParser.RightShift, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_shiftExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterShiftExpression) {
	 		listener.enterShiftExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitShiftExpression) {
	 		listener.exitShiftExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitShiftExpression) {
			return visitor.visitShiftExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelationalExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public shiftExpression_list(): ShiftExpressionContext[] {
		return this.getTypedRuleContexts(ShiftExpressionContext) as ShiftExpressionContext[];
	}
	public shiftExpression(i: number): ShiftExpressionContext {
		return this.getTypedRuleContext(ShiftExpressionContext, i) as ShiftExpressionContext;
	}
	public Less_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Less);
	}
	public Less(i: number): TerminalNode {
		return this.getToken(CParser.Less, i);
	}
	public Greater_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Greater);
	}
	public Greater(i: number): TerminalNode {
		return this.getToken(CParser.Greater, i);
	}
	public LessEqual_list(): TerminalNode[] {
	    	return this.getTokens(CParser.LessEqual);
	}
	public LessEqual(i: number): TerminalNode {
		return this.getToken(CParser.LessEqual, i);
	}
	public GreaterEqual_list(): TerminalNode[] {
	    	return this.getTokens(CParser.GreaterEqual);
	}
	public GreaterEqual(i: number): TerminalNode {
		return this.getToken(CParser.GreaterEqual, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_relationalExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterRelationalExpression) {
	 		listener.enterRelationalExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitRelationalExpression) {
	 		listener.exitRelationalExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitRelationalExpression) {
			return visitor.visitRelationalExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EqualityExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public relationalExpression_list(): RelationalExpressionContext[] {
		return this.getTypedRuleContexts(RelationalExpressionContext) as RelationalExpressionContext[];
	}
	public relationalExpression(i: number): RelationalExpressionContext {
		return this.getTypedRuleContext(RelationalExpressionContext, i) as RelationalExpressionContext;
	}
	public Equal_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Equal);
	}
	public Equal(i: number): TerminalNode {
		return this.getToken(CParser.Equal, i);
	}
	public NotEqual_list(): TerminalNode[] {
	    	return this.getTokens(CParser.NotEqual);
	}
	public NotEqual(i: number): TerminalNode {
		return this.getToken(CParser.NotEqual, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_equalityExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterEqualityExpression) {
	 		listener.enterEqualityExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitEqualityExpression) {
	 		listener.exitEqualityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitEqualityExpression) {
			return visitor.visitEqualityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AndExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public equalityExpression_list(): EqualityExpressionContext[] {
		return this.getTypedRuleContexts(EqualityExpressionContext) as EqualityExpressionContext[];
	}
	public equalityExpression(i: number): EqualityExpressionContext {
		return this.getTypedRuleContext(EqualityExpressionContext, i) as EqualityExpressionContext;
	}
	public And_list(): TerminalNode[] {
	    	return this.getTokens(CParser.And);
	}
	public And(i: number): TerminalNode {
		return this.getToken(CParser.And, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_andExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterAndExpression) {
	 		listener.enterAndExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitAndExpression) {
	 		listener.exitAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitAndExpression) {
			return visitor.visitAndExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExclusiveOrExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public andExpression_list(): AndExpressionContext[] {
		return this.getTypedRuleContexts(AndExpressionContext) as AndExpressionContext[];
	}
	public andExpression(i: number): AndExpressionContext {
		return this.getTypedRuleContext(AndExpressionContext, i) as AndExpressionContext;
	}
	public Caret(): TerminalNode {
		return this.getToken(CParser.Caret, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_exclusiveOrExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterExclusiveOrExpression) {
	 		listener.enterExclusiveOrExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitExclusiveOrExpression) {
	 		listener.exitExclusiveOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitExclusiveOrExpression) {
			return visitor.visitExclusiveOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InclusiveOrExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public exclusiveOrExpression(): ExclusiveOrExpressionContext {
		return this.getTypedRuleContext(ExclusiveOrExpressionContext, 0) as ExclusiveOrExpressionContext;
	}
	public Or(): TerminalNode {
		return this.getToken(CParser.Or, 0);
	}
	public inclusiveOrExpression(): InclusiveOrExpressionContext {
		return this.getTypedRuleContext(InclusiveOrExpressionContext, 0) as InclusiveOrExpressionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_inclusiveOrExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterInclusiveOrExpression) {
	 		listener.enterInclusiveOrExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitInclusiveOrExpression) {
	 		listener.exitInclusiveOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitInclusiveOrExpression) {
			return visitor.visitInclusiveOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LogicalAndExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public inclusiveOrExpression(): InclusiveOrExpressionContext {
		return this.getTypedRuleContext(InclusiveOrExpressionContext, 0) as InclusiveOrExpressionContext;
	}
	public AndAnd(): TerminalNode {
		return this.getToken(CParser.AndAnd, 0);
	}
	public logicalAndExpression(): LogicalAndExpressionContext {
		return this.getTypedRuleContext(LogicalAndExpressionContext, 0) as LogicalAndExpressionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_logicalAndExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterLogicalAndExpression) {
	 		listener.enterLogicalAndExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitLogicalAndExpression) {
	 		listener.exitLogicalAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitLogicalAndExpression) {
			return visitor.visitLogicalAndExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LogicalOrExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public logicalAndExpression(): LogicalAndExpressionContext {
		return this.getTypedRuleContext(LogicalAndExpressionContext, 0) as LogicalAndExpressionContext;
	}
	public OrOr(): TerminalNode {
		return this.getToken(CParser.OrOr, 0);
	}
	public logicalOrExpression(): LogicalOrExpressionContext {
		return this.getTypedRuleContext(LogicalOrExpressionContext, 0) as LogicalOrExpressionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_logicalOrExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterLogicalOrExpression) {
	 		listener.enterLogicalOrExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitLogicalOrExpression) {
	 		listener.exitLogicalOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitLogicalOrExpression) {
			return visitor.visitLogicalOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionalExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public logicalOrExpression(): LogicalOrExpressionContext {
		return this.getTypedRuleContext(LogicalOrExpressionContext, 0) as LogicalOrExpressionContext;
	}
	public Question(): TerminalNode {
		return this.getToken(CParser.Question, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public Colon(): TerminalNode {
		return this.getToken(CParser.Colon, 0);
	}
	public conditionalExpression(): ConditionalExpressionContext {
		return this.getTypedRuleContext(ConditionalExpressionContext, 0) as ConditionalExpressionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_conditionalExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterConditionalExpression) {
	 		listener.enterConditionalExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitConditionalExpression) {
	 		listener.exitConditionalExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitConditionalExpression) {
			return visitor.visitConditionalExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public conditionalExpression(): ConditionalExpressionContext {
		return this.getTypedRuleContext(ConditionalExpressionContext, 0) as ConditionalExpressionContext;
	}
	public unaryExpression(): UnaryExpressionContext {
		return this.getTypedRuleContext(UnaryExpressionContext, 0) as UnaryExpressionContext;
	}
	public assignmentOperator(): AssignmentOperatorContext {
		return this.getTypedRuleContext(AssignmentOperatorContext, 0) as AssignmentOperatorContext;
	}
	public assignmentExpression(): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, 0) as AssignmentExpressionContext;
	}
	public DigitSequence(): TerminalNode {
		return this.getToken(CParser.DigitSequence, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_assignmentExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterAssignmentExpression) {
	 		listener.enterAssignmentExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitAssignmentExpression) {
	 		listener.exitAssignmentExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitAssignmentExpression) {
			return visitor.visitAssignmentExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentOperatorContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Assign(): TerminalNode {
		return this.getToken(CParser.Assign, 0);
	}
	public StarAssign(): TerminalNode {
		return this.getToken(CParser.StarAssign, 0);
	}
	public DivAssign(): TerminalNode {
		return this.getToken(CParser.DivAssign, 0);
	}
	public ModAssign(): TerminalNode {
		return this.getToken(CParser.ModAssign, 0);
	}
	public PlusAssign(): TerminalNode {
		return this.getToken(CParser.PlusAssign, 0);
	}
	public MinusAssign(): TerminalNode {
		return this.getToken(CParser.MinusAssign, 0);
	}
	public LeftShiftAssign(): TerminalNode {
		return this.getToken(CParser.LeftShiftAssign, 0);
	}
	public RightShiftAssign(): TerminalNode {
		return this.getToken(CParser.RightShiftAssign, 0);
	}
	public AndAssign(): TerminalNode {
		return this.getToken(CParser.AndAssign, 0);
	}
	public XorAssign(): TerminalNode {
		return this.getToken(CParser.XorAssign, 0);
	}
	public OrAssign(): TerminalNode {
		return this.getToken(CParser.OrAssign, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_assignmentOperator;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterAssignmentOperator) {
	 		listener.enterAssignmentOperator(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitAssignmentOperator) {
	 		listener.exitAssignmentOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitAssignmentOperator) {
			return visitor.visitAssignmentOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public assignmentExpression_list(): AssignmentExpressionContext[] {
		return this.getTypedRuleContexts(AssignmentExpressionContext) as AssignmentExpressionContext[];
	}
	public assignmentExpression(i: number): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, i) as AssignmentExpressionContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(CParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_expression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterExpression) {
	 		listener.enterExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitExpression) {
	 		listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstantExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public conditionalExpression(): ConditionalExpressionContext {
		return this.getTypedRuleContext(ConditionalExpressionContext, 0) as ConditionalExpressionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_constantExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterConstantExpression) {
	 		listener.enterConstantExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitConstantExpression) {
	 		listener.exitConstantExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitConstantExpression) {
			return visitor.visitConstantExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarationSpecifiers(): DeclarationSpecifiersContext {
		return this.getTypedRuleContext(DeclarationSpecifiersContext, 0) as DeclarationSpecifiersContext;
	}
	public initDeclaratorList(): InitDeclaratorListContext {
		return this.getTypedRuleContext(InitDeclaratorListContext, 0) as InitDeclaratorListContext;
	}
	public Semi(): TerminalNode {
		return this.getToken(CParser.Semi, 0);
	}
	public staticAssertDeclaration(): StaticAssertDeclarationContext {
		return this.getTypedRuleContext(StaticAssertDeclarationContext, 0) as StaticAssertDeclarationContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_declaration;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterDeclaration) {
	 		listener.enterDeclaration(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitDeclaration) {
	 		listener.exitDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitDeclaration) {
			return visitor.visitDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationSpecifiersContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarationSpecifier_list(): DeclarationSpecifierContext[] {
		return this.getTypedRuleContexts(DeclarationSpecifierContext) as DeclarationSpecifierContext[];
	}
	public declarationSpecifier(i: number): DeclarationSpecifierContext {
		return this.getTypedRuleContext(DeclarationSpecifierContext, i) as DeclarationSpecifierContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_declarationSpecifiers;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterDeclarationSpecifiers) {
	 		listener.enterDeclarationSpecifiers(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitDeclarationSpecifiers) {
	 		listener.exitDeclarationSpecifiers(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitDeclarationSpecifiers) {
			return visitor.visitDeclarationSpecifiers(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationSpecifiers2Context extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarationSpecifier_list(): DeclarationSpecifierContext[] {
		return this.getTypedRuleContexts(DeclarationSpecifierContext) as DeclarationSpecifierContext[];
	}
	public declarationSpecifier(i: number): DeclarationSpecifierContext {
		return this.getTypedRuleContext(DeclarationSpecifierContext, i) as DeclarationSpecifierContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_declarationSpecifiers2;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterDeclarationSpecifiers2) {
	 		listener.enterDeclarationSpecifiers2(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitDeclarationSpecifiers2) {
	 		listener.exitDeclarationSpecifiers2(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitDeclarationSpecifiers2) {
			return visitor.visitDeclarationSpecifiers2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationSpecifierContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public storageClassSpecifier(): StorageClassSpecifierContext {
		return this.getTypedRuleContext(StorageClassSpecifierContext, 0) as StorageClassSpecifierContext;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
	public typeQualifier(): TypeQualifierContext {
		return this.getTypedRuleContext(TypeQualifierContext, 0) as TypeQualifierContext;
	}
	public functionSpecifier(): FunctionSpecifierContext {
		return this.getTypedRuleContext(FunctionSpecifierContext, 0) as FunctionSpecifierContext;
	}
	public alignmentSpecifier(): AlignmentSpecifierContext {
		return this.getTypedRuleContext(AlignmentSpecifierContext, 0) as AlignmentSpecifierContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_declarationSpecifier;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterDeclarationSpecifier) {
	 		listener.enterDeclarationSpecifier(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitDeclarationSpecifier) {
	 		listener.exitDeclarationSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitDeclarationSpecifier) {
			return visitor.visitDeclarationSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InitDeclaratorListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public initDeclarator_list(): InitDeclaratorContext[] {
		return this.getTypedRuleContexts(InitDeclaratorContext) as InitDeclaratorContext[];
	}
	public initDeclarator(i: number): InitDeclaratorContext {
		return this.getTypedRuleContext(InitDeclaratorContext, i) as InitDeclaratorContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(CParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_initDeclaratorList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterInitDeclaratorList) {
	 		listener.enterInitDeclaratorList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitInitDeclaratorList) {
	 		listener.exitInitDeclaratorList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitInitDeclaratorList) {
			return visitor.visitInitDeclaratorList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InitDeclaratorContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarator(): DeclaratorContext {
		return this.getTypedRuleContext(DeclaratorContext, 0) as DeclaratorContext;
	}
	public Assign(): TerminalNode {
		return this.getToken(CParser.Assign, 0);
	}
	public initialiser(): InitialiserContext {
		return this.getTypedRuleContext(InitialiserContext, 0) as InitialiserContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_initDeclarator;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterInitDeclarator) {
	 		listener.enterInitDeclarator(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitInitDeclarator) {
	 		listener.exitInitDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitInitDeclarator) {
			return visitor.visitInitDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StorageClassSpecifierContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Typedef(): TerminalNode {
		return this.getToken(CParser.Typedef, 0);
	}
	public Extern(): TerminalNode {
		return this.getToken(CParser.Extern, 0);
	}
	public Static(): TerminalNode {
		return this.getToken(CParser.Static, 0);
	}
	public ThreadLocal(): TerminalNode {
		return this.getToken(CParser.ThreadLocal, 0);
	}
	public Auto(): TerminalNode {
		return this.getToken(CParser.Auto, 0);
	}
	public Register(): TerminalNode {
		return this.getToken(CParser.Register, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_storageClassSpecifier;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterStorageClassSpecifier) {
	 		listener.enterStorageClassSpecifier(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitStorageClassSpecifier) {
	 		listener.exitStorageClassSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitStorageClassSpecifier) {
			return visitor.visitStorageClassSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Void(): TerminalNode {
		return this.getToken(CParser.Void, 0);
	}
	public Char(): TerminalNode {
		return this.getToken(CParser.Char, 0);
	}
	public Short(): TerminalNode {
		return this.getToken(CParser.Short, 0);
	}
	public Int(): TerminalNode {
		return this.getToken(CParser.Int, 0);
	}
	public Long(): TerminalNode {
		return this.getToken(CParser.Long, 0);
	}
	public Float(): TerminalNode {
		return this.getToken(CParser.Float, 0);
	}
	public Double(): TerminalNode {
		return this.getToken(CParser.Double, 0);
	}
	public Signed(): TerminalNode {
		return this.getToken(CParser.Signed, 0);
	}
	public Unsigned(): TerminalNode {
		return this.getToken(CParser.Unsigned, 0);
	}
	public Bool(): TerminalNode {
		return this.getToken(CParser.Bool, 0);
	}
	public Complex(): TerminalNode {
		return this.getToken(CParser.Complex, 0);
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
	public atomicTypeSpecifier(): AtomicTypeSpecifierContext {
		return this.getTypedRuleContext(AtomicTypeSpecifierContext, 0) as AtomicTypeSpecifierContext;
	}
	public structOrUnionSpecifier(): StructOrUnionSpecifierContext {
		return this.getTypedRuleContext(StructOrUnionSpecifierContext, 0) as StructOrUnionSpecifierContext;
	}
	public enumSpecifier(): EnumSpecifierContext {
		return this.getTypedRuleContext(EnumSpecifierContext, 0) as EnumSpecifierContext;
	}
	public typedefName(): TypedefNameContext {
		return this.getTypedRuleContext(TypedefNameContext, 0) as TypedefNameContext;
	}
	public constantExpression(): ConstantExpressionContext {
		return this.getTypedRuleContext(ConstantExpressionContext, 0) as ConstantExpressionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_typeSpecifier;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterTypeSpecifier) {
	 		listener.enterTypeSpecifier(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitTypeSpecifier) {
	 		listener.exitTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitTypeSpecifier) {
			return visitor.visitTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructOrUnionSpecifierContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public structOrUnion(): StructOrUnionContext {
		return this.getTypedRuleContext(StructOrUnionContext, 0) as StructOrUnionContext;
	}
	public LeftBrace(): TerminalNode {
		return this.getToken(CParser.LeftBrace, 0);
	}
	public structDeclarationList(): StructDeclarationListContext {
		return this.getTypedRuleContext(StructDeclarationListContext, 0) as StructDeclarationListContext;
	}
	public RightBrace(): TerminalNode {
		return this.getToken(CParser.RightBrace, 0);
	}
	public Identifier(): TerminalNode {
		return this.getToken(CParser.Identifier, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_structOrUnionSpecifier;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterStructOrUnionSpecifier) {
	 		listener.enterStructOrUnionSpecifier(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitStructOrUnionSpecifier) {
	 		listener.exitStructOrUnionSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitStructOrUnionSpecifier) {
			return visitor.visitStructOrUnionSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructOrUnionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Struct(): TerminalNode {
		return this.getToken(CParser.Struct, 0);
	}
	public Union(): TerminalNode {
		return this.getToken(CParser.Union, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_structOrUnion;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterStructOrUnion) {
	 		listener.enterStructOrUnion(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitStructOrUnion) {
	 		listener.exitStructOrUnion(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitStructOrUnion) {
			return visitor.visitStructOrUnion(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructDeclarationListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public structDeclaration_list(): StructDeclarationContext[] {
		return this.getTypedRuleContexts(StructDeclarationContext) as StructDeclarationContext[];
	}
	public structDeclaration(i: number): StructDeclarationContext {
		return this.getTypedRuleContext(StructDeclarationContext, i) as StructDeclarationContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_structDeclarationList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterStructDeclarationList) {
	 		listener.enterStructDeclarationList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitStructDeclarationList) {
	 		listener.exitStructDeclarationList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitStructDeclarationList) {
			return visitor.visitStructDeclarationList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructDeclarationContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public specifierQualifierList(): SpecifierQualifierListContext {
		return this.getTypedRuleContext(SpecifierQualifierListContext, 0) as SpecifierQualifierListContext;
	}
	public structDeclaratorList(): StructDeclaratorListContext {
		return this.getTypedRuleContext(StructDeclaratorListContext, 0) as StructDeclaratorListContext;
	}
	public Semi(): TerminalNode {
		return this.getToken(CParser.Semi, 0);
	}
	public staticAssertDeclaration(): StaticAssertDeclarationContext {
		return this.getTypedRuleContext(StaticAssertDeclarationContext, 0) as StaticAssertDeclarationContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_structDeclaration;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterStructDeclaration) {
	 		listener.enterStructDeclaration(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitStructDeclaration) {
	 		listener.exitStructDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitStructDeclaration) {
			return visitor.visitStructDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SpecifierQualifierListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
	public typeQualifier(): TypeQualifierContext {
		return this.getTypedRuleContext(TypeQualifierContext, 0) as TypeQualifierContext;
	}
	public specifierQualifierList(): SpecifierQualifierListContext {
		return this.getTypedRuleContext(SpecifierQualifierListContext, 0) as SpecifierQualifierListContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_specifierQualifierList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterSpecifierQualifierList) {
	 		listener.enterSpecifierQualifierList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitSpecifierQualifierList) {
	 		listener.exitSpecifierQualifierList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitSpecifierQualifierList) {
			return visitor.visitSpecifierQualifierList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructDeclaratorListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public structDeclarator_list(): StructDeclaratorContext[] {
		return this.getTypedRuleContexts(StructDeclaratorContext) as StructDeclaratorContext[];
	}
	public structDeclarator(i: number): StructDeclaratorContext {
		return this.getTypedRuleContext(StructDeclaratorContext, i) as StructDeclaratorContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(CParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_structDeclaratorList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterStructDeclaratorList) {
	 		listener.enterStructDeclaratorList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitStructDeclaratorList) {
	 		listener.exitStructDeclaratorList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitStructDeclaratorList) {
			return visitor.visitStructDeclaratorList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructDeclaratorContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarator(): DeclaratorContext {
		return this.getTypedRuleContext(DeclaratorContext, 0) as DeclaratorContext;
	}
	public Colon(): TerminalNode {
		return this.getToken(CParser.Colon, 0);
	}
	public constantExpression(): ConstantExpressionContext {
		return this.getTypedRuleContext(ConstantExpressionContext, 0) as ConstantExpressionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_structDeclarator;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterStructDeclarator) {
	 		listener.enterStructDeclarator(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitStructDeclarator) {
	 		listener.exitStructDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitStructDeclarator) {
			return visitor.visitStructDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumSpecifierContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Enum(): TerminalNode {
		return this.getToken(CParser.Enum, 0);
	}
	public LeftBrace(): TerminalNode {
		return this.getToken(CParser.LeftBrace, 0);
	}
	public enumeratorList(): EnumeratorListContext {
		return this.getTypedRuleContext(EnumeratorListContext, 0) as EnumeratorListContext;
	}
	public RightBrace(): TerminalNode {
		return this.getToken(CParser.RightBrace, 0);
	}
	public Identifier(): TerminalNode {
		return this.getToken(CParser.Identifier, 0);
	}
	public Comma(): TerminalNode {
		return this.getToken(CParser.Comma, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_enumSpecifier;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterEnumSpecifier) {
	 		listener.enterEnumSpecifier(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitEnumSpecifier) {
	 		listener.exitEnumSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitEnumSpecifier) {
			return visitor.visitEnumSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumeratorListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public enumerator_list(): EnumeratorContext[] {
		return this.getTypedRuleContexts(EnumeratorContext) as EnumeratorContext[];
	}
	public enumerator(i: number): EnumeratorContext {
		return this.getTypedRuleContext(EnumeratorContext, i) as EnumeratorContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(CParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_enumeratorList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterEnumeratorList) {
	 		listener.enterEnumeratorList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitEnumeratorList) {
	 		listener.exitEnumeratorList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitEnumeratorList) {
			return visitor.visitEnumeratorList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumeratorContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public enumerationConstant(): EnumerationConstantContext {
		return this.getTypedRuleContext(EnumerationConstantContext, 0) as EnumerationConstantContext;
	}
	public Assign(): TerminalNode {
		return this.getToken(CParser.Assign, 0);
	}
	public constantExpression(): ConstantExpressionContext {
		return this.getTypedRuleContext(ConstantExpressionContext, 0) as ConstantExpressionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_enumerator;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterEnumerator) {
	 		listener.enterEnumerator(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitEnumerator) {
	 		listener.exitEnumerator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitEnumerator) {
			return visitor.visitEnumerator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumerationConstantContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Identifier(): TerminalNode {
		return this.getToken(CParser.Identifier, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_enumerationConstant;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterEnumerationConstant) {
	 		listener.enterEnumerationConstant(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitEnumerationConstant) {
	 		listener.exitEnumerationConstant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitEnumerationConstant) {
			return visitor.visitEnumerationConstant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AtomicTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Atomic(): TerminalNode {
		return this.getToken(CParser.Atomic, 0);
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_atomicTypeSpecifier;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterAtomicTypeSpecifier) {
	 		listener.enterAtomicTypeSpecifier(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitAtomicTypeSpecifier) {
	 		listener.exitAtomicTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitAtomicTypeSpecifier) {
			return visitor.visitAtomicTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeQualifierContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Const(): TerminalNode {
		return this.getToken(CParser.Const, 0);
	}
	public Restrict(): TerminalNode {
		return this.getToken(CParser.Restrict, 0);
	}
	public Volatile(): TerminalNode {
		return this.getToken(CParser.Volatile, 0);
	}
	public Atomic(): TerminalNode {
		return this.getToken(CParser.Atomic, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_typeQualifier;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterTypeQualifier) {
	 		listener.enterTypeQualifier(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitTypeQualifier) {
	 		listener.exitTypeQualifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitTypeQualifier) {
			return visitor.visitTypeQualifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionSpecifierContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Inline(): TerminalNode {
		return this.getToken(CParser.Inline, 0);
	}
	public Noreturn(): TerminalNode {
		return this.getToken(CParser.Noreturn, 0);
	}
	public gccAttributeSpecifier(): GccAttributeSpecifierContext {
		return this.getTypedRuleContext(GccAttributeSpecifierContext, 0) as GccAttributeSpecifierContext;
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public Identifier(): TerminalNode {
		return this.getToken(CParser.Identifier, 0);
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_functionSpecifier;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterFunctionSpecifier) {
	 		listener.enterFunctionSpecifier(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitFunctionSpecifier) {
	 		listener.exitFunctionSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitFunctionSpecifier) {
			return visitor.visitFunctionSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AlignmentSpecifierContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Alignas(): TerminalNode {
		return this.getToken(CParser.Alignas, 0);
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public constantExpression(): ConstantExpressionContext {
		return this.getTypedRuleContext(ConstantExpressionContext, 0) as ConstantExpressionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_alignmentSpecifier;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterAlignmentSpecifier) {
	 		listener.enterAlignmentSpecifier(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitAlignmentSpecifier) {
	 		listener.exitAlignmentSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitAlignmentSpecifier) {
			return visitor.visitAlignmentSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclaratorContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public directDeclarator(): DirectDeclaratorContext {
		return this.getTypedRuleContext(DirectDeclaratorContext, 0) as DirectDeclaratorContext;
	}
	public pointer(): PointerContext {
		return this.getTypedRuleContext(PointerContext, 0) as PointerContext;
	}
	public gccDeclaratorExtension_list(): GccDeclaratorExtensionContext[] {
		return this.getTypedRuleContexts(GccDeclaratorExtensionContext) as GccDeclaratorExtensionContext[];
	}
	public gccDeclaratorExtension(i: number): GccDeclaratorExtensionContext {
		return this.getTypedRuleContext(GccDeclaratorExtensionContext, i) as GccDeclaratorExtensionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_declarator;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterDeclarator) {
	 		listener.enterDeclarator(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitDeclarator) {
	 		listener.exitDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitDeclarator) {
			return visitor.visitDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DirectDeclaratorContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Identifier(): TerminalNode {
		return this.getToken(CParser.Identifier, 0);
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public declarator(): DeclaratorContext {
		return this.getTypedRuleContext(DeclaratorContext, 0) as DeclaratorContext;
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
	public Colon(): TerminalNode {
		return this.getToken(CParser.Colon, 0);
	}
	public DigitSequence(): TerminalNode {
		return this.getToken(CParser.DigitSequence, 0);
	}
	public vcSpecificModifer(): VcSpecificModiferContext {
		return this.getTypedRuleContext(VcSpecificModiferContext, 0) as VcSpecificModiferContext;
	}
	public directDeclarator(): DirectDeclaratorContext {
		return this.getTypedRuleContext(DirectDeclaratorContext, 0) as DirectDeclaratorContext;
	}
	public LeftBracket(): TerminalNode {
		return this.getToken(CParser.LeftBracket, 0);
	}
	public RightBracket(): TerminalNode {
		return this.getToken(CParser.RightBracket, 0);
	}
	public typeQualifierList(): TypeQualifierListContext {
		return this.getTypedRuleContext(TypeQualifierListContext, 0) as TypeQualifierListContext;
	}
	public assignmentExpression(): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, 0) as AssignmentExpressionContext;
	}
	public Static(): TerminalNode {
		return this.getToken(CParser.Static, 0);
	}
	public Star(): TerminalNode {
		return this.getToken(CParser.Star, 0);
	}
	public parameterTypeList(): ParameterTypeListContext {
		return this.getTypedRuleContext(ParameterTypeListContext, 0) as ParameterTypeListContext;
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_directDeclarator;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterDirectDeclarator) {
	 		listener.enterDirectDeclarator(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitDirectDeclarator) {
	 		listener.exitDirectDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitDirectDeclarator) {
			return visitor.visitDirectDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VcSpecificModiferContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_vcSpecificModifer;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterVcSpecificModifer) {
	 		listener.enterVcSpecificModifer(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitVcSpecificModifer) {
	 		listener.exitVcSpecificModifer(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitVcSpecificModifer) {
			return visitor.visitVcSpecificModifer(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GccDeclaratorExtensionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
	public StringLiteral_list(): TerminalNode[] {
	    	return this.getTokens(CParser.StringLiteral);
	}
	public StringLiteral(i: number): TerminalNode {
		return this.getToken(CParser.StringLiteral, i);
	}
	public gccAttributeSpecifier(): GccAttributeSpecifierContext {
		return this.getTypedRuleContext(GccAttributeSpecifierContext, 0) as GccAttributeSpecifierContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_gccDeclaratorExtension;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterGccDeclaratorExtension) {
	 		listener.enterGccDeclaratorExtension(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitGccDeclaratorExtension) {
	 		listener.exitGccDeclaratorExtension(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitGccDeclaratorExtension) {
			return visitor.visitGccDeclaratorExtension(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GccAttributeSpecifierContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LeftParen_list(): TerminalNode[] {
	    	return this.getTokens(CParser.LeftParen);
	}
	public LeftParen(i: number): TerminalNode {
		return this.getToken(CParser.LeftParen, i);
	}
	public gccAttributeList(): GccAttributeListContext {
		return this.getTypedRuleContext(GccAttributeListContext, 0) as GccAttributeListContext;
	}
	public RightParen_list(): TerminalNode[] {
	    	return this.getTokens(CParser.RightParen);
	}
	public RightParen(i: number): TerminalNode {
		return this.getToken(CParser.RightParen, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_gccAttributeSpecifier;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterGccAttributeSpecifier) {
	 		listener.enterGccAttributeSpecifier(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitGccAttributeSpecifier) {
	 		listener.exitGccAttributeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitGccAttributeSpecifier) {
			return visitor.visitGccAttributeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GccAttributeListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public gccAttribute_list(): GccAttributeContext[] {
		return this.getTypedRuleContexts(GccAttributeContext) as GccAttributeContext[];
	}
	public gccAttribute(i: number): GccAttributeContext {
		return this.getTypedRuleContext(GccAttributeContext, i) as GccAttributeContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(CParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_gccAttributeList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterGccAttributeList) {
	 		listener.enterGccAttributeList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitGccAttributeList) {
	 		listener.exitGccAttributeList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitGccAttributeList) {
			return visitor.visitGccAttributeList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GccAttributeContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Comma(): TerminalNode {
		return this.getToken(CParser.Comma, 0);
	}
	public LeftParen_list(): TerminalNode[] {
	    	return this.getTokens(CParser.LeftParen);
	}
	public LeftParen(i: number): TerminalNode {
		return this.getToken(CParser.LeftParen, i);
	}
	public RightParen_list(): TerminalNode[] {
	    	return this.getTokens(CParser.RightParen);
	}
	public RightParen(i: number): TerminalNode {
		return this.getToken(CParser.RightParen, i);
	}
	public argumentExpressionList(): ArgumentExpressionListContext {
		return this.getTypedRuleContext(ArgumentExpressionListContext, 0) as ArgumentExpressionListContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_gccAttribute;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterGccAttribute) {
	 		listener.enterGccAttribute(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitGccAttribute) {
	 		listener.exitGccAttribute(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitGccAttribute) {
			return visitor.visitGccAttribute(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NestedParenthesesBlockContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LeftParen_list(): TerminalNode[] {
	    	return this.getTokens(CParser.LeftParen);
	}
	public LeftParen(i: number): TerminalNode {
		return this.getToken(CParser.LeftParen, i);
	}
	public nestedParenthesesBlock_list(): NestedParenthesesBlockContext[] {
		return this.getTypedRuleContexts(NestedParenthesesBlockContext) as NestedParenthesesBlockContext[];
	}
	public nestedParenthesesBlock(i: number): NestedParenthesesBlockContext {
		return this.getTypedRuleContext(NestedParenthesesBlockContext, i) as NestedParenthesesBlockContext;
	}
	public RightParen_list(): TerminalNode[] {
	    	return this.getTokens(CParser.RightParen);
	}
	public RightParen(i: number): TerminalNode {
		return this.getToken(CParser.RightParen, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_nestedParenthesesBlock;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterNestedParenthesesBlock) {
	 		listener.enterNestedParenthesesBlock(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitNestedParenthesesBlock) {
	 		listener.exitNestedParenthesesBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitNestedParenthesesBlock) {
			return visitor.visitNestedParenthesesBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PointerContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Star(): TerminalNode {
		return this.getToken(CParser.Star, 0);
	}
	public Caret(): TerminalNode {
		return this.getToken(CParser.Caret, 0);
	}
	public typeQualifierList(): TypeQualifierListContext {
		return this.getTypedRuleContext(TypeQualifierListContext, 0) as TypeQualifierListContext;
	}
	public pointer(): PointerContext {
		return this.getTypedRuleContext(PointerContext, 0) as PointerContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_pointer;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterPointer) {
	 		listener.enterPointer(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitPointer) {
	 		listener.exitPointer(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitPointer) {
			return visitor.visitPointer(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeQualifierListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeQualifier_list(): TypeQualifierContext[] {
		return this.getTypedRuleContexts(TypeQualifierContext) as TypeQualifierContext[];
	}
	public typeQualifier(i: number): TypeQualifierContext {
		return this.getTypedRuleContext(TypeQualifierContext, i) as TypeQualifierContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_typeQualifierList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterTypeQualifierList) {
	 		listener.enterTypeQualifierList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitTypeQualifierList) {
	 		listener.exitTypeQualifierList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitTypeQualifierList) {
			return visitor.visitTypeQualifierList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterTypeListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parameterList(): ParameterListContext {
		return this.getTypedRuleContext(ParameterListContext, 0) as ParameterListContext;
	}
	public Comma(): TerminalNode {
		return this.getToken(CParser.Comma, 0);
	}
	public Ellipsis(): TerminalNode {
		return this.getToken(CParser.Ellipsis, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_parameterTypeList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterParameterTypeList) {
	 		listener.enterParameterTypeList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitParameterTypeList) {
	 		listener.exitParameterTypeList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitParameterTypeList) {
			return visitor.visitParameterTypeList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parameterDeclaration_list(): ParameterDeclarationContext[] {
		return this.getTypedRuleContexts(ParameterDeclarationContext) as ParameterDeclarationContext[];
	}
	public parameterDeclaration(i: number): ParameterDeclarationContext {
		return this.getTypedRuleContext(ParameterDeclarationContext, i) as ParameterDeclarationContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(CParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_parameterList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterParameterList) {
	 		listener.enterParameterList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitParameterList) {
	 		listener.exitParameterList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitParameterList) {
			return visitor.visitParameterList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterDeclarationContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarationSpecifiers(): DeclarationSpecifiersContext {
		return this.getTypedRuleContext(DeclarationSpecifiersContext, 0) as DeclarationSpecifiersContext;
	}
	public declarator(): DeclaratorContext {
		return this.getTypedRuleContext(DeclaratorContext, 0) as DeclaratorContext;
	}
	public declarationSpecifiers2(): DeclarationSpecifiers2Context {
		return this.getTypedRuleContext(DeclarationSpecifiers2Context, 0) as DeclarationSpecifiers2Context;
	}
	public abstractDeclarator(): AbstractDeclaratorContext {
		return this.getTypedRuleContext(AbstractDeclaratorContext, 0) as AbstractDeclaratorContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_parameterDeclaration;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterParameterDeclaration) {
	 		listener.enterParameterDeclaration(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitParameterDeclaration) {
	 		listener.exitParameterDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitParameterDeclaration) {
			return visitor.visitParameterDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Identifier_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Identifier);
	}
	public Identifier(i: number): TerminalNode {
		return this.getToken(CParser.Identifier, i);
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(CParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_identifierList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterIdentifierList) {
	 		listener.enterIdentifierList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitIdentifierList) {
	 		listener.exitIdentifierList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitIdentifierList) {
			return visitor.visitIdentifierList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeNameContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public specifierQualifierList(): SpecifierQualifierListContext {
		return this.getTypedRuleContext(SpecifierQualifierListContext, 0) as SpecifierQualifierListContext;
	}
	public abstractDeclarator(): AbstractDeclaratorContext {
		return this.getTypedRuleContext(AbstractDeclaratorContext, 0) as AbstractDeclaratorContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_typeName;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterTypeName) {
	 		listener.enterTypeName(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitTypeName) {
	 		listener.exitTypeName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitTypeName) {
			return visitor.visitTypeName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AbstractDeclaratorContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public pointer(): PointerContext {
		return this.getTypedRuleContext(PointerContext, 0) as PointerContext;
	}
	public directAbstractDeclarator(): DirectAbstractDeclaratorContext {
		return this.getTypedRuleContext(DirectAbstractDeclaratorContext, 0) as DirectAbstractDeclaratorContext;
	}
	public gccDeclaratorExtension_list(): GccDeclaratorExtensionContext[] {
		return this.getTypedRuleContexts(GccDeclaratorExtensionContext) as GccDeclaratorExtensionContext[];
	}
	public gccDeclaratorExtension(i: number): GccDeclaratorExtensionContext {
		return this.getTypedRuleContext(GccDeclaratorExtensionContext, i) as GccDeclaratorExtensionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_abstractDeclarator;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterAbstractDeclarator) {
	 		listener.enterAbstractDeclarator(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitAbstractDeclarator) {
	 		listener.exitAbstractDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitAbstractDeclarator) {
			return visitor.visitAbstractDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DirectAbstractDeclaratorContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public abstractDeclarator(): AbstractDeclaratorContext {
		return this.getTypedRuleContext(AbstractDeclaratorContext, 0) as AbstractDeclaratorContext;
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
	public gccDeclaratorExtension_list(): GccDeclaratorExtensionContext[] {
		return this.getTypedRuleContexts(GccDeclaratorExtensionContext) as GccDeclaratorExtensionContext[];
	}
	public gccDeclaratorExtension(i: number): GccDeclaratorExtensionContext {
		return this.getTypedRuleContext(GccDeclaratorExtensionContext, i) as GccDeclaratorExtensionContext;
	}
	public LeftBracket(): TerminalNode {
		return this.getToken(CParser.LeftBracket, 0);
	}
	public RightBracket(): TerminalNode {
		return this.getToken(CParser.RightBracket, 0);
	}
	public typeQualifierList(): TypeQualifierListContext {
		return this.getTypedRuleContext(TypeQualifierListContext, 0) as TypeQualifierListContext;
	}
	public assignmentExpression(): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, 0) as AssignmentExpressionContext;
	}
	public Static(): TerminalNode {
		return this.getToken(CParser.Static, 0);
	}
	public Star(): TerminalNode {
		return this.getToken(CParser.Star, 0);
	}
	public parameterTypeList(): ParameterTypeListContext {
		return this.getTypedRuleContext(ParameterTypeListContext, 0) as ParameterTypeListContext;
	}
	public directAbstractDeclarator(): DirectAbstractDeclaratorContext {
		return this.getTypedRuleContext(DirectAbstractDeclaratorContext, 0) as DirectAbstractDeclaratorContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_directAbstractDeclarator;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterDirectAbstractDeclarator) {
	 		listener.enterDirectAbstractDeclarator(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitDirectAbstractDeclarator) {
	 		listener.exitDirectAbstractDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitDirectAbstractDeclarator) {
			return visitor.visitDirectAbstractDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypedefNameContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Identifier(): TerminalNode {
		return this.getToken(CParser.Identifier, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_typedefName;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterTypedefName) {
	 		listener.enterTypedefName(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitTypedefName) {
	 		listener.exitTypedefName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitTypedefName) {
			return visitor.visitTypedefName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InitialiserContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public assignmentExpression(): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, 0) as AssignmentExpressionContext;
	}
	public LeftBrace(): TerminalNode {
		return this.getToken(CParser.LeftBrace, 0);
	}
	public initialiserList(): InitialiserListContext {
		return this.getTypedRuleContext(InitialiserListContext, 0) as InitialiserListContext;
	}
	public RightBrace(): TerminalNode {
		return this.getToken(CParser.RightBrace, 0);
	}
	public Comma(): TerminalNode {
		return this.getToken(CParser.Comma, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_initialiser;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterInitialiser) {
	 		listener.enterInitialiser(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitInitialiser) {
	 		listener.exitInitialiser(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitInitialiser) {
			return visitor.visitInitialiser(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InitialiserListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public initialiser_list(): InitialiserContext[] {
		return this.getTypedRuleContexts(InitialiserContext) as InitialiserContext[];
	}
	public initialiser(i: number): InitialiserContext {
		return this.getTypedRuleContext(InitialiserContext, i) as InitialiserContext;
	}
	public designation_list(): DesignationContext[] {
		return this.getTypedRuleContexts(DesignationContext) as DesignationContext[];
	}
	public designation(i: number): DesignationContext {
		return this.getTypedRuleContext(DesignationContext, i) as DesignationContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(CParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_initialiserList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterInitialiserList) {
	 		listener.enterInitialiserList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitInitialiserList) {
	 		listener.exitInitialiserList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitInitialiserList) {
			return visitor.visitInitialiserList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DesignationContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public designatorList(): DesignatorListContext {
		return this.getTypedRuleContext(DesignatorListContext, 0) as DesignatorListContext;
	}
	public Assign(): TerminalNode {
		return this.getToken(CParser.Assign, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_designation;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterDesignation) {
	 		listener.enterDesignation(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitDesignation) {
	 		listener.exitDesignation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitDesignation) {
			return visitor.visitDesignation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DesignatorListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public designator_list(): DesignatorContext[] {
		return this.getTypedRuleContexts(DesignatorContext) as DesignatorContext[];
	}
	public designator(i: number): DesignatorContext {
		return this.getTypedRuleContext(DesignatorContext, i) as DesignatorContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_designatorList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterDesignatorList) {
	 		listener.enterDesignatorList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitDesignatorList) {
	 		listener.exitDesignatorList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitDesignatorList) {
			return visitor.visitDesignatorList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DesignatorContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LeftBracket(): TerminalNode {
		return this.getToken(CParser.LeftBracket, 0);
	}
	public constantExpression(): ConstantExpressionContext {
		return this.getTypedRuleContext(ConstantExpressionContext, 0) as ConstantExpressionContext;
	}
	public RightBracket(): TerminalNode {
		return this.getToken(CParser.RightBracket, 0);
	}
	public Dot(): TerminalNode {
		return this.getToken(CParser.Dot, 0);
	}
	public Identifier(): TerminalNode {
		return this.getToken(CParser.Identifier, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_designator;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterDesignator) {
	 		listener.enterDesignator(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitDesignator) {
	 		listener.exitDesignator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitDesignator) {
			return visitor.visitDesignator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StaticAssertDeclarationContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public StaticAssert(): TerminalNode {
		return this.getToken(CParser.StaticAssert, 0);
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public constantExpression(): ConstantExpressionContext {
		return this.getTypedRuleContext(ConstantExpressionContext, 0) as ConstantExpressionContext;
	}
	public Comma(): TerminalNode {
		return this.getToken(CParser.Comma, 0);
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
	public Semi(): TerminalNode {
		return this.getToken(CParser.Semi, 0);
	}
	public StringLiteral_list(): TerminalNode[] {
	    	return this.getTokens(CParser.StringLiteral);
	}
	public StringLiteral(i: number): TerminalNode {
		return this.getToken(CParser.StringLiteral, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_staticAssertDeclaration;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterStaticAssertDeclaration) {
	 		listener.enterStaticAssertDeclaration(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitStaticAssertDeclaration) {
	 		listener.exitStaticAssertDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitStaticAssertDeclaration) {
			return visitor.visitStaticAssertDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public labeledStatement(): LabeledStatementContext {
		return this.getTypedRuleContext(LabeledStatementContext, 0) as LabeledStatementContext;
	}
	public compoundStatement(): CompoundStatementContext {
		return this.getTypedRuleContext(CompoundStatementContext, 0) as CompoundStatementContext;
	}
	public expressionStatement(): ExpressionStatementContext {
		return this.getTypedRuleContext(ExpressionStatementContext, 0) as ExpressionStatementContext;
	}
	public selectionStatement(): SelectionStatementContext {
		return this.getTypedRuleContext(SelectionStatementContext, 0) as SelectionStatementContext;
	}
	public iterationStatement(): IterationStatementContext {
		return this.getTypedRuleContext(IterationStatementContext, 0) as IterationStatementContext;
	}
	public jumpStatement(): JumpStatementContext {
		return this.getTypedRuleContext(JumpStatementContext, 0) as JumpStatementContext;
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
	public Semi(): TerminalNode {
		return this.getToken(CParser.Semi, 0);
	}
	public Volatile(): TerminalNode {
		return this.getToken(CParser.Volatile, 0);
	}
	public logicalOrExpression_list(): LogicalOrExpressionContext[] {
		return this.getTypedRuleContexts(LogicalOrExpressionContext) as LogicalOrExpressionContext[];
	}
	public logicalOrExpression(i: number): LogicalOrExpressionContext {
		return this.getTypedRuleContext(LogicalOrExpressionContext, i) as LogicalOrExpressionContext;
	}
	public Colon_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Colon);
	}
	public Colon(i: number): TerminalNode {
		return this.getToken(CParser.Colon, i);
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(CParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_statement;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterStatement) {
	 		listener.enterStatement(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitStatement) {
	 		listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LabeledStatementContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Identifier(): TerminalNode {
		return this.getToken(CParser.Identifier, 0);
	}
	public Colon(): TerminalNode {
		return this.getToken(CParser.Colon, 0);
	}
	public statement(): StatementContext {
		return this.getTypedRuleContext(StatementContext, 0) as StatementContext;
	}
	public Case(): TerminalNode {
		return this.getToken(CParser.Case, 0);
	}
	public constantExpression(): ConstantExpressionContext {
		return this.getTypedRuleContext(ConstantExpressionContext, 0) as ConstantExpressionContext;
	}
	public Default(): TerminalNode {
		return this.getToken(CParser.Default, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_labeledStatement;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterLabeledStatement) {
	 		listener.enterLabeledStatement(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitLabeledStatement) {
	 		listener.exitLabeledStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitLabeledStatement) {
			return visitor.visitLabeledStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CompoundStatementContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LeftBrace(): TerminalNode {
		return this.getToken(CParser.LeftBrace, 0);
	}
	public RightBrace(): TerminalNode {
		return this.getToken(CParser.RightBrace, 0);
	}
	public blockItemList(): BlockItemListContext {
		return this.getTypedRuleContext(BlockItemListContext, 0) as BlockItemListContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_compoundStatement;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterCompoundStatement) {
	 		listener.enterCompoundStatement(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitCompoundStatement) {
	 		listener.exitCompoundStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitCompoundStatement) {
			return visitor.visitCompoundStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockItemListContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public blockItem_list(): BlockItemContext[] {
		return this.getTypedRuleContexts(BlockItemContext) as BlockItemContext[];
	}
	public blockItem(i: number): BlockItemContext {
		return this.getTypedRuleContext(BlockItemContext, i) as BlockItemContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_blockItemList;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterBlockItemList) {
	 		listener.enterBlockItemList(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitBlockItemList) {
	 		listener.exitBlockItemList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitBlockItemList) {
			return visitor.visitBlockItemList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockItemContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public statement(): StatementContext {
		return this.getTypedRuleContext(StatementContext, 0) as StatementContext;
	}
	public declaration(): DeclarationContext {
		return this.getTypedRuleContext(DeclarationContext, 0) as DeclarationContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_blockItem;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterBlockItem) {
	 		listener.enterBlockItem(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitBlockItem) {
	 		listener.exitBlockItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitBlockItem) {
			return visitor.visitBlockItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionStatementContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Semi(): TerminalNode {
		return this.getToken(CParser.Semi, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_expressionStatement;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterExpressionStatement) {
	 		listener.enterExpressionStatement(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitExpressionStatement) {
	 		listener.exitExpressionStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitExpressionStatement) {
			return visitor.visitExpressionStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectionStatementContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public If(): TerminalNode {
		return this.getToken(CParser.If, 0);
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
	public Else(): TerminalNode {
		return this.getToken(CParser.Else, 0);
	}
	public Switch(): TerminalNode {
		return this.getToken(CParser.Switch, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_selectionStatement;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterSelectionStatement) {
	 		listener.enterSelectionStatement(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitSelectionStatement) {
	 		listener.exitSelectionStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitSelectionStatement) {
			return visitor.visitSelectionStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IterationStatementContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public While(): TerminalNode {
		return this.getToken(CParser.While, 0);
	}
	public LeftParen(): TerminalNode {
		return this.getToken(CParser.LeftParen, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RightParen(): TerminalNode {
		return this.getToken(CParser.RightParen, 0);
	}
	public statement(): StatementContext {
		return this.getTypedRuleContext(StatementContext, 0) as StatementContext;
	}
	public Do(): TerminalNode {
		return this.getToken(CParser.Do, 0);
	}
	public Semi(): TerminalNode {
		return this.getToken(CParser.Semi, 0);
	}
	public For(): TerminalNode {
		return this.getToken(CParser.For, 0);
	}
	public forCondition(): ForConditionContext {
		return this.getTypedRuleContext(ForConditionContext, 0) as ForConditionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_iterationStatement;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterIterationStatement) {
	 		listener.enterIterationStatement(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitIterationStatement) {
	 		listener.exitIterationStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitIterationStatement) {
			return visitor.visitIterationStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForConditionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Semi_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Semi);
	}
	public Semi(i: number): TerminalNode {
		return this.getToken(CParser.Semi, i);
	}
	public forDeclaration(): ForDeclarationContext {
		return this.getTypedRuleContext(ForDeclarationContext, 0) as ForDeclarationContext;
	}
	public forExpression_list(): ForExpressionContext[] {
		return this.getTypedRuleContexts(ForExpressionContext) as ForExpressionContext[];
	}
	public forExpression(i: number): ForExpressionContext {
		return this.getTypedRuleContext(ForExpressionContext, i) as ForExpressionContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_forCondition;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterForCondition) {
	 		listener.enterForCondition(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitForCondition) {
	 		listener.exitForCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitForCondition) {
			return visitor.visitForCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForDeclarationContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarationSpecifiers(): DeclarationSpecifiersContext {
		return this.getTypedRuleContext(DeclarationSpecifiersContext, 0) as DeclarationSpecifiersContext;
	}
	public initDeclaratorList(): InitDeclaratorListContext {
		return this.getTypedRuleContext(InitDeclaratorListContext, 0) as InitDeclaratorListContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_forDeclaration;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterForDeclaration) {
	 		listener.enterForDeclaration(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitForDeclaration) {
	 		listener.exitForDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitForDeclaration) {
			return visitor.visitForDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForExpressionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public assignmentExpression_list(): AssignmentExpressionContext[] {
		return this.getTypedRuleContexts(AssignmentExpressionContext) as AssignmentExpressionContext[];
	}
	public assignmentExpression(i: number): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, i) as AssignmentExpressionContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(CParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(CParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_forExpression;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterForExpression) {
	 		listener.enterForExpression(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitForExpression) {
	 		listener.exitForExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitForExpression) {
			return visitor.visitForExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class JumpStatementContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Semi(): TerminalNode {
		return this.getToken(CParser.Semi, 0);
	}
	public Goto(): TerminalNode {
		return this.getToken(CParser.Goto, 0);
	}
	public Identifier(): TerminalNode {
		return this.getToken(CParser.Identifier, 0);
	}
	public Return(): TerminalNode {
		return this.getToken(CParser.Return, 0);
	}
	public unaryExpression(): UnaryExpressionContext {
		return this.getTypedRuleContext(UnaryExpressionContext, 0) as UnaryExpressionContext;
	}
	public Continue(): TerminalNode {
		return this.getToken(CParser.Continue, 0);
	}
	public Break(): TerminalNode {
		return this.getToken(CParser.Break, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_jumpStatement;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterJumpStatement) {
	 		listener.enterJumpStatement(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitJumpStatement) {
	 		listener.exitJumpStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitJumpStatement) {
			return visitor.visitJumpStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CompilationUnitContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(CParser.EOF, 0);
	}
	public translationUnit(): TranslationUnitContext {
		return this.getTypedRuleContext(TranslationUnitContext, 0) as TranslationUnitContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_compilationUnit;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterCompilationUnit) {
	 		listener.enterCompilationUnit(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitCompilationUnit) {
	 		listener.exitCompilationUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitCompilationUnit) {
			return visitor.visitCompilationUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TranslationUnitContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public externalDeclaration_list(): ExternalDeclarationContext[] {
		return this.getTypedRuleContexts(ExternalDeclarationContext) as ExternalDeclarationContext[];
	}
	public externalDeclaration(i: number): ExternalDeclarationContext {
		return this.getTypedRuleContext(ExternalDeclarationContext, i) as ExternalDeclarationContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_translationUnit;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterTranslationUnit) {
	 		listener.enterTranslationUnit(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitTranslationUnit) {
	 		listener.exitTranslationUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitTranslationUnit) {
			return visitor.visitTranslationUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExternalDeclarationContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public functionDefinition(): FunctionDefinitionContext {
		return this.getTypedRuleContext(FunctionDefinitionContext, 0) as FunctionDefinitionContext;
	}
	public declaration(): DeclarationContext {
		return this.getTypedRuleContext(DeclarationContext, 0) as DeclarationContext;
	}
	public Semi(): TerminalNode {
		return this.getToken(CParser.Semi, 0);
	}
    public get ruleIndex(): number {
    	return CParser.RULE_externalDeclaration;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterExternalDeclaration) {
	 		listener.enterExternalDeclaration(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitExternalDeclaration) {
	 		listener.exitExternalDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitExternalDeclaration) {
			return visitor.visitExternalDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionDefinitionContext extends ParserRuleContext {
	constructor(parser?: CParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarator(): DeclaratorContext {
		return this.getTypedRuleContext(DeclaratorContext, 0) as DeclaratorContext;
	}
	public compoundStatement(): CompoundStatementContext {
		return this.getTypedRuleContext(CompoundStatementContext, 0) as CompoundStatementContext;
	}
	public declarationSpecifiers(): DeclarationSpecifiersContext {
		return this.getTypedRuleContext(DeclarationSpecifiersContext, 0) as DeclarationSpecifiersContext;
	}
    public get ruleIndex(): number {
    	return CParser.RULE_functionDefinition;
	}
	public enterRule(listener: CListener): void {
	    if(listener.enterFunctionDefinition) {
	 		listener.enterFunctionDefinition(this);
		}
	}
	public exitRule(listener: CListener): void {
	    if(listener.exitFunctionDefinition) {
	 		listener.exitFunctionDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CVisitor<Result>): Result {
		if (visitor.visitFunctionDefinition) {
			return visitor.visitFunctionDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
