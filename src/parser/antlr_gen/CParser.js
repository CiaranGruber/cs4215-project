// Generated from src/parser/C.g4 by ANTLR 4.12.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import { ATN, ATNDeserializer, DFA, FailedPredicateException, RecognitionException, NoViableAltException, Parser, ParserATNSimulator, ParserRuleContext, PredictionContextCache, Token } from 'antlr4';
export default class CParser extends Parser {
    constructor(input) {
        super(input);
        this._interp = new ParserATNSimulator(this, CParser._ATN, CParser.DecisionsToDFA, new PredictionContextCache());
    }
    get grammarFileName() { return "C.g4"; }
    get literalNames() { return CParser.literalNames; }
    get symbolicNames() { return CParser.symbolicNames; }
    get ruleNames() { return CParser.ruleNames; }
    get serializedATN() { return CParser._serializedATN; }
    createFailedPredicateException(predicate, message) {
        return new FailedPredicateException(this, predicate, message);
    }
    // @RuleVersion(0)
    primaryExpression() {
        let localctx = new PrimaryExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 0, CParser.RULE_primaryExpression);
        let _la;
        try {
            this.state = 209;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 2, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 176;
                        this.match(CParser.Identifier);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 177;
                        this.match(CParser.Constant);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(localctx, 3);
                    {
                        this.state = 179;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        do {
                            {
                                {
                                    this.state = 178;
                                    this.match(CParser.StringLiteral);
                                }
                            }
                            this.state = 181;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        } while (_la === 114);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(localctx, 4);
                    {
                        this.state = 183;
                        this.match(CParser.LeftParen);
                        this.state = 184;
                        this.expression();
                        this.state = 185;
                        this.match(CParser.RightParen);
                    }
                    break;
                case 5:
                    this.enterOuterAlt(localctx, 5);
                    {
                        this.state = 187;
                        this.genericSelection();
                    }
                    break;
                case 6:
                    this.enterOuterAlt(localctx, 6);
                    {
                        this.state = 189;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === 1) {
                            {
                                this.state = 188;
                                this.match(CParser.T__0);
                            }
                        }
                        this.state = 191;
                        this.match(CParser.LeftParen);
                        this.state = 192;
                        this.compoundStatement();
                        this.state = 193;
                        this.match(CParser.RightParen);
                    }
                    break;
                case 7:
                    this.enterOuterAlt(localctx, 7);
                    {
                        this.state = 195;
                        this.match(CParser.T__1);
                        this.state = 196;
                        this.match(CParser.LeftParen);
                        this.state = 197;
                        this.unaryExpression();
                        this.state = 198;
                        this.match(CParser.Comma);
                        this.state = 199;
                        this.typeName();
                        this.state = 200;
                        this.match(CParser.RightParen);
                    }
                    break;
                case 8:
                    this.enterOuterAlt(localctx, 8);
                    {
                        this.state = 202;
                        this.match(CParser.T__2);
                        this.state = 203;
                        this.match(CParser.LeftParen);
                        this.state = 204;
                        this.typeName();
                        this.state = 205;
                        this.match(CParser.Comma);
                        this.state = 206;
                        this.unaryExpression();
                        this.state = 207;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    genericSelection() {
        let localctx = new GenericSelectionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 2, CParser.RULE_genericSelection);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 211;
                this.match(CParser.Generic);
                this.state = 212;
                this.match(CParser.LeftParen);
                this.state = 213;
                this.assignmentExpression();
                this.state = 214;
                this.match(CParser.Comma);
                this.state = 215;
                this.genericAssocList();
                this.state = 216;
                this.match(CParser.RightParen);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    genericAssocList() {
        let localctx = new GenericAssocListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 4, CParser.RULE_genericAssocList);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 218;
                this.genericAssociation();
                this.state = 223;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 94) {
                    {
                        {
                            this.state = 219;
                            this.match(CParser.Comma);
                            this.state = 220;
                            this.genericAssociation();
                        }
                    }
                    this.state = 225;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    genericAssociation() {
        let localctx = new GenericAssociationContext(this, this._ctx, this.state);
        this.enterRule(localctx, 6, CParser.RULE_genericAssociation);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 228;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 1:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 24:
                    case 25:
                    case 29:
                    case 31:
                    case 33:
                    case 38:
                    case 39:
                    case 41:
                    case 43:
                    case 44:
                    case 47:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                    case 57:
                    case 58:
                    case 59:
                    case 111:
                        {
                            this.state = 226;
                            this.typeName();
                        }
                        break;
                    case 27:
                        {
                            this.state = 227;
                            this.match(CParser.Default);
                        }
                        break;
                    default:
                        throw new NoViableAltException(this);
                }
                this.state = 230;
                this.match(CParser.Colon);
                this.state = 231;
                this.assignmentExpression();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    postfixExpression() {
        let localctx = new PostfixExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 8, CParser.RULE_postfixExpression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 247;
                this._errHandler.sync(this);
                switch (this._interp.adaptivePredict(this._input, 7, this._ctx)) {
                    case 1:
                        {
                            this.state = 233;
                            this.primaryExpression();
                        }
                        break;
                    case 2:
                        {
                            this.state = 235;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === 1) {
                                {
                                    this.state = 234;
                                    this.match(CParser.T__0);
                                }
                            }
                            this.state = 237;
                            this.match(CParser.LeftParen);
                            this.state = 238;
                            this.typeName();
                            this.state = 239;
                            this.match(CParser.RightParen);
                            this.state = 240;
                            this.match(CParser.LeftBrace);
                            this.state = 241;
                            this.initializerList();
                            this.state = 243;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === 94) {
                                {
                                    this.state = 242;
                                    this.match(CParser.Comma);
                                }
                            }
                            this.state = 245;
                            this.match(CParser.RightBrace);
                        }
                        break;
                }
                this.state = 263;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 40965) !== 0) || _la === 108 || _la === 109) {
                    {
                        this.state = 261;
                        this._errHandler.sync(this);
                        switch (this._input.LA(1)) {
                            case 67:
                                {
                                    this.state = 249;
                                    this.match(CParser.LeftBracket);
                                    this.state = 250;
                                    this.expression();
                                    this.state = 251;
                                    this.match(CParser.RightBracket);
                                }
                                break;
                            case 65:
                                {
                                    this.state = 253;
                                    this.match(CParser.LeftParen);
                                    this.state = 255;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                    if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1083393) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 12959) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0)) {
                                        {
                                            this.state = 254;
                                            this.argumentExpressionList();
                                        }
                                    }
                                    this.state = 257;
                                    this.match(CParser.RightParen);
                                }
                                break;
                            case 108:
                            case 109:
                                {
                                    this.state = 258;
                                    _la = this._input.LA(1);
                                    if (!(_la === 108 || _la === 109)) {
                                        this._errHandler.recoverInline(this);
                                    }
                                    else {
                                        this._errHandler.reportMatch(this);
                                        this.consume();
                                    }
                                    this.state = 259;
                                    this.match(CParser.Identifier);
                                }
                                break;
                            case 78:
                            case 80:
                                {
                                    this.state = 260;
                                    _la = this._input.LA(1);
                                    if (!(_la === 78 || _la === 80)) {
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
                    this.state = 265;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    argumentExpressionList() {
        let localctx = new ArgumentExpressionListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 10, CParser.RULE_argumentExpressionList);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 266;
                this.assignmentExpression();
                this.state = 271;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 94) {
                    {
                        {
                            this.state = 267;
                            this.match(CParser.Comma);
                            this.state = 268;
                            this.assignmentExpression();
                        }
                    }
                    this.state = 273;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    unaryExpression() {
        let localctx = new UnaryExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 12, CParser.RULE_unaryExpression);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 277;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 274;
                                _la = this._input.LA(1);
                                if (!(_la === 45 || _la === 78 || _la === 80)) {
                                    this._errHandler.recoverInline(this);
                                }
                                else {
                                    this._errHandler.reportMatch(this);
                                    this.consume();
                                }
                            }
                        }
                    }
                    this.state = 279;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
                }
                this.state = 291;
                this._errHandler.sync(this);
                switch (this._input.LA(1)) {
                    case 1:
                    case 2:
                    case 3:
                    case 60:
                    case 65:
                    case 111:
                    case 112:
                    case 114:
                        {
                            this.state = 280;
                            this.postfixExpression();
                        }
                        break;
                    case 77:
                    case 79:
                    case 81:
                    case 84:
                    case 89:
                    case 90:
                        {
                            this.state = 281;
                            this.unaryOperator();
                            this.state = 282;
                            this.castExpression();
                        }
                        break;
                    case 45:
                    case 56:
                        {
                            this.state = 284;
                            _la = this._input.LA(1);
                            if (!(_la === 45 || _la === 56)) {
                                this._errHandler.recoverInline(this);
                            }
                            else {
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 285;
                            this.match(CParser.LeftParen);
                            this.state = 286;
                            this.typeName();
                            this.state = 287;
                            this.match(CParser.RightParen);
                        }
                        break;
                    case 86:
                        {
                            this.state = 289;
                            this.match(CParser.AndAnd);
                            this.state = 290;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    unaryOperator() {
        let localctx = new UnaryOperatorContext(this, this._ctx, this.state);
        this.enterRule(localctx, 14, CParser.RULE_unaryOperator);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 293;
                _la = this._input.LA(1);
                if (!(((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 12437) !== 0))) {
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    castExpression() {
        let localctx = new CastExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 16, CParser.RULE_castExpression);
        let _la;
        try {
            this.state = 305;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 15, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 296;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === 1) {
                            {
                                this.state = 295;
                                this.match(CParser.T__0);
                            }
                        }
                        this.state = 298;
                        this.match(CParser.LeftParen);
                        this.state = 299;
                        this.typeName();
                        this.state = 300;
                        this.match(CParser.RightParen);
                        this.state = 301;
                        this.castExpression();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 303;
                        this.unaryExpression();
                    }
                    break;
                case 3:
                    this.enterOuterAlt(localctx, 3);
                    {
                        this.state = 304;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    multiplicativeExpression() {
        let localctx = new MultiplicativeExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 18, CParser.RULE_multiplicativeExpression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 307;
                this.castExpression();
                this.state = 312;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0)) {
                    {
                        {
                            this.state = 308;
                            _la = this._input.LA(1);
                            if (!(((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 7) !== 0))) {
                                this._errHandler.recoverInline(this);
                            }
                            else {
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 309;
                            this.castExpression();
                        }
                    }
                    this.state = 314;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    additiveExpression() {
        let localctx = new AdditiveExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 20, CParser.RULE_additiveExpression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 315;
                this.multiplicativeExpression();
                this.state = 320;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 77 || _la === 79) {
                    {
                        {
                            this.state = 316;
                            _la = this._input.LA(1);
                            if (!(_la === 77 || _la === 79)) {
                                this._errHandler.recoverInline(this);
                            }
                            else {
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 317;
                            this.multiplicativeExpression();
                        }
                    }
                    this.state = 322;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    shiftExpression() {
        let localctx = new ShiftExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 22, CParser.RULE_shiftExpression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 323;
                this.additiveExpression();
                this.state = 328;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 75 || _la === 76) {
                    {
                        {
                            this.state = 324;
                            _la = this._input.LA(1);
                            if (!(_la === 75 || _la === 76)) {
                                this._errHandler.recoverInline(this);
                            }
                            else {
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 325;
                            this.additiveExpression();
                        }
                    }
                    this.state = 330;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    relationalExpression() {
        let localctx = new RelationalExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 24, CParser.RULE_relationalExpression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 331;
                this.shiftExpression();
                this.state = 336;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 15) !== 0)) {
                    {
                        {
                            this.state = 332;
                            _la = this._input.LA(1);
                            if (!(((((_la - 71)) & ~0x1F) === 0 && ((1 << (_la - 71)) & 15) !== 0))) {
                                this._errHandler.recoverInline(this);
                            }
                            else {
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 333;
                            this.shiftExpression();
                        }
                    }
                    this.state = 338;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    equalityExpression() {
        let localctx = new EqualityExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 26, CParser.RULE_equalityExpression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 339;
                this.relationalExpression();
                this.state = 344;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 106 || _la === 107) {
                    {
                        {
                            this.state = 340;
                            _la = this._input.LA(1);
                            if (!(_la === 106 || _la === 107)) {
                                this._errHandler.recoverInline(this);
                            }
                            else {
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 341;
                            this.relationalExpression();
                        }
                    }
                    this.state = 346;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    andExpression() {
        let localctx = new AndExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 28, CParser.RULE_andExpression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 347;
                this.equalityExpression();
                this.state = 352;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 84) {
                    {
                        {
                            this.state = 348;
                            this.match(CParser.And);
                            this.state = 349;
                            this.equalityExpression();
                        }
                    }
                    this.state = 354;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    exclusiveOrExpression() {
        let localctx = new ExclusiveOrExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 30, CParser.RULE_exclusiveOrExpression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 355;
                this.andExpression();
                this.state = 360;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 88) {
                    {
                        {
                            this.state = 356;
                            this.match(CParser.Caret);
                            this.state = 357;
                            this.andExpression();
                        }
                    }
                    this.state = 362;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    inclusiveOrExpression() {
        let localctx = new InclusiveOrExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 32, CParser.RULE_inclusiveOrExpression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 363;
                this.exclusiveOrExpression();
                this.state = 368;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 85) {
                    {
                        {
                            this.state = 364;
                            this.match(CParser.Or);
                            this.state = 365;
                            this.exclusiveOrExpression();
                        }
                    }
                    this.state = 370;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    logicalAndExpression() {
        let localctx = new LogicalAndExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 34, CParser.RULE_logicalAndExpression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 371;
                this.inclusiveOrExpression();
                this.state = 376;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 86) {
                    {
                        {
                            this.state = 372;
                            this.match(CParser.AndAnd);
                            this.state = 373;
                            this.inclusiveOrExpression();
                        }
                    }
                    this.state = 378;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    logicalOrExpression() {
        let localctx = new LogicalOrExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 36, CParser.RULE_logicalOrExpression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 379;
                this.logicalAndExpression();
                this.state = 384;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 87) {
                    {
                        {
                            this.state = 380;
                            this.match(CParser.OrOr);
                            this.state = 381;
                            this.logicalAndExpression();
                        }
                    }
                    this.state = 386;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    conditionalExpression() {
        let localctx = new ConditionalExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 38, CParser.RULE_conditionalExpression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 387;
                this.logicalOrExpression();
                this.state = 393;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === 91) {
                    {
                        this.state = 388;
                        this.match(CParser.Question);
                        this.state = 389;
                        this.expression();
                        this.state = 390;
                        this.match(CParser.Colon);
                        this.state = 391;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    assignmentExpression() {
        let localctx = new AssignmentExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 40, CParser.RULE_assignmentExpression);
        try {
            this.state = 401;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 27, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 395;
                        this.conditionalExpression();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 396;
                        this.unaryExpression();
                        this.state = 397;
                        this.assignmentOperator();
                        this.state = 398;
                        this.assignmentExpression();
                    }
                    break;
                case 3:
                    this.enterOuterAlt(localctx, 3);
                    {
                        this.state = 400;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    assignmentOperator() {
        let localctx = new AssignmentOperatorContext(this, this._ctx, this.state);
        this.enterRule(localctx, 42, CParser.RULE_assignmentOperator);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 403;
                _la = this._input.LA(1);
                if (!(((((_la - 95)) & ~0x1F) === 0 && ((1 << (_la - 95)) & 2047) !== 0))) {
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    expression() {
        let localctx = new ExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 44, CParser.RULE_expression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 405;
                this.assignmentExpression();
                this.state = 410;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 94) {
                    {
                        {
                            this.state = 406;
                            this.match(CParser.Comma);
                            this.state = 407;
                            this.assignmentExpression();
                        }
                    }
                    this.state = 412;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    constantExpression() {
        let localctx = new ConstantExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 46, CParser.RULE_constantExpression);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 413;
                this.conditionalExpression();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    declaration() {
        let localctx = new DeclarationContext(this, this._ctx, this.state);
        this.enterRule(localctx, 48, CParser.RULE_declaration);
        let _la;
        try {
            this.state = 422;
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
                case 21:
                case 24:
                case 25:
                case 29:
                case 31:
                case 32:
                case 33:
                case 37:
                case 38:
                case 39:
                case 40:
                case 41:
                case 43:
                case 44:
                case 46:
                case 47:
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 55:
                case 57:
                case 58:
                case 59:
                case 62:
                case 64:
                case 111:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 415;
                        this.declarationSpecifiers();
                        this.state = 417;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 64000) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 8454145) !== 0) || _la === 111) {
                            {
                                this.state = 416;
                                this.initDeclaratorList();
                            }
                        }
                        this.state = 419;
                        this.match(CParser.Semi);
                    }
                    break;
                case 63:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 421;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    declarationSpecifiers() {
        let localctx = new DeclarationSpecifiersContext(this, this._ctx, this.state);
        this.enterRule(localctx, 50, CParser.RULE_declarationSpecifiers);
        try {
            let _alt;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 425;
                this._errHandler.sync(this);
                _alt = 1;
                do {
                    switch (_alt) {
                        case 1:
                            {
                                {
                                    this.state = 424;
                                    this.declarationSpecifier();
                                }
                            }
                            break;
                        default:
                            throw new NoViableAltException(this);
                    }
                    this.state = 427;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
                } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    declarationSpecifiers2() {
        let localctx = new DeclarationSpecifiers2Context(this, this._ctx, this.state);
        this.enterRule(localctx, 52, CParser.RULE_declarationSpecifiers2);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 430;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 429;
                            this.declarationSpecifier();
                        }
                    }
                    this.state = 432;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while (((((_la - 1)) & ~0x1F) === 0 && ((1 << (_la - 1)) & 3515941881) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2808049137) !== 0) || _la === 111);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    declarationSpecifier() {
        let localctx = new DeclarationSpecifierContext(this, this._ctx, this.state);
        this.enterRule(localctx, 54, CParser.RULE_declarationSpecifier);
        try {
            this.state = 439;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 33, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 434;
                        this.storageClassSpecifier();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 435;
                        this.typeSpecifier();
                    }
                    break;
                case 3:
                    this.enterOuterAlt(localctx, 3);
                    {
                        this.state = 436;
                        this.typeQualifier();
                    }
                    break;
                case 4:
                    this.enterOuterAlt(localctx, 4);
                    {
                        this.state = 437;
                        this.functionSpecifier();
                    }
                    break;
                case 5:
                    this.enterOuterAlt(localctx, 5);
                    {
                        this.state = 438;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    initDeclaratorList() {
        let localctx = new InitDeclaratorListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 56, CParser.RULE_initDeclaratorList);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 441;
                this.initDeclarator();
                this.state = 446;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 94) {
                    {
                        {
                            this.state = 442;
                            this.match(CParser.Comma);
                            this.state = 443;
                            this.initDeclarator();
                        }
                    }
                    this.state = 448;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    initDeclarator() {
        let localctx = new InitDeclaratorContext(this, this._ctx, this.state);
        this.enterRule(localctx, 58, CParser.RULE_initDeclarator);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 449;
                this.declarator();
                this.state = 452;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === 95) {
                    {
                        this.state = 450;
                        this.match(CParser.Assign);
                        this.state = 451;
                        this.initializer();
                    }
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    storageClassSpecifier() {
        let localctx = new StorageClassSpecifierContext(this, this._ctx, this.state);
        this.enterRule(localctx, 60, CParser.RULE_storageClassSpecifier);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 454;
                _la = this._input.LA(1);
                if (!(((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & 302516225) !== 0) || _la === 64)) {
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    typeSpecifier() {
        let localctx = new TypeSpecifierContext(this, this._ctx, this.state);
        this.enterRule(localctx, 62, CParser.RULE_typeSpecifier);
        let _la;
        try {
            this.state = 470;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case 4:
                case 5:
                case 6:
                case 24:
                case 29:
                case 33:
                case 38:
                case 39:
                case 43:
                case 44:
                case 51:
                case 52:
                case 58:
                case 59:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 456;
                        _la = this._input.LA(1);
                        if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & 553648240) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 101452897) !== 0))) {
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
                        this.state = 457;
                        this.match(CParser.T__0);
                        this.state = 458;
                        this.match(CParser.LeftParen);
                        this.state = 459;
                        _la = this._input.LA(1);
                        if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & 112) !== 0))) {
                            this._errHandler.recoverInline(this);
                        }
                        else {
                            this._errHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 460;
                        this.match(CParser.RightParen);
                    }
                    break;
                case 57:
                    this.enterOuterAlt(localctx, 3);
                    {
                        this.state = 461;
                        this.atomicTypeSpecifier();
                    }
                    break;
                case 47:
                case 50:
                    this.enterOuterAlt(localctx, 4);
                    {
                        this.state = 462;
                        this.structOrUnionSpecifier();
                    }
                    break;
                case 31:
                    this.enterOuterAlt(localctx, 5);
                    {
                        this.state = 463;
                        this.enumSpecifier();
                    }
                    break;
                case 111:
                    this.enterOuterAlt(localctx, 6);
                    {
                        this.state = 464;
                        this.typedefName();
                    }
                    break;
                case 7:
                    this.enterOuterAlt(localctx, 7);
                    {
                        this.state = 465;
                        this.match(CParser.T__6);
                        this.state = 466;
                        this.match(CParser.LeftParen);
                        this.state = 467;
                        this.constantExpression();
                        this.state = 468;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    structOrUnionSpecifier() {
        let localctx = new StructOrUnionSpecifierContext(this, this._ctx, this.state);
        this.enterRule(localctx, 64, CParser.RULE_structOrUnionSpecifier);
        let _la;
        try {
            this.state = 483;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 38, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 472;
                        this.structOrUnion();
                        this.state = 474;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === 111) {
                            {
                                this.state = 473;
                                this.match(CParser.Identifier);
                            }
                        }
                        this.state = 476;
                        this.match(CParser.LeftBrace);
                        this.state = 477;
                        this.structDeclarationList();
                        this.state = 478;
                        this.match(CParser.RightBrace);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 480;
                        this.structOrUnion();
                        this.state = 481;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    structOrUnion() {
        let localctx = new StructOrUnionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 66, CParser.RULE_structOrUnion);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 485;
                _la = this._input.LA(1);
                if (!(_la === 47 || _la === 50)) {
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    structDeclarationList() {
        let localctx = new StructDeclarationListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 68, CParser.RULE_structDeclarationList);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 488;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 487;
                            this.structDeclaration();
                        }
                    }
                    this.state = 490;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2734686450) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 1193168225) !== 0) || _la === 111);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    structDeclaration() {
        let localctx = new StructDeclarationContext(this, this._ctx, this.state);
        this.enterRule(localctx, 70, CParser.RULE_structDeclaration);
        try {
            this.state = 500;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 40, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 492;
                        this.specifierQualifierList();
                        this.state = 493;
                        this.structDeclaratorList();
                        this.state = 494;
                        this.match(CParser.Semi);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 496;
                        this.specifierQualifierList();
                        this.state = 497;
                        this.match(CParser.Semi);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(localctx, 3);
                    {
                        this.state = 499;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    specifierQualifierList() {
        let localctx = new SpecifierQualifierListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 72, CParser.RULE_specifierQualifierList);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 504;
                this._errHandler.sync(this);
                switch (this._interp.adaptivePredict(this._input, 41, this._ctx)) {
                    case 1:
                        {
                            this.state = 502;
                            this.typeSpecifier();
                        }
                        break;
                    case 2:
                        {
                            this.state = 503;
                            this.typeQualifier();
                        }
                        break;
                }
                this.state = 507;
                this._errHandler.sync(this);
                switch (this._interp.adaptivePredict(this._input, 42, this._ctx)) {
                    case 1:
                        {
                            this.state = 506;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    structDeclaratorList() {
        let localctx = new StructDeclaratorListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 74, CParser.RULE_structDeclaratorList);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 509;
                this.structDeclarator();
                this.state = 514;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 94) {
                    {
                        {
                            this.state = 510;
                            this.match(CParser.Comma);
                            this.state = 511;
                            this.structDeclarator();
                        }
                    }
                    this.state = 516;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    structDeclarator() {
        let localctx = new StructDeclaratorContext(this, this._ctx, this.state);
        this.enterRule(localctx, 76, CParser.RULE_structDeclarator);
        let _la;
        try {
            this.state = 523;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 45, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 517;
                        this.declarator();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 519;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 64000) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 8454145) !== 0) || _la === 111) {
                            {
                                this.state = 518;
                                this.declarator();
                            }
                        }
                        this.state = 521;
                        this.match(CParser.Colon);
                        this.state = 522;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    enumSpecifier() {
        let localctx = new EnumSpecifierContext(this, this._ctx, this.state);
        this.enterRule(localctx, 78, CParser.RULE_enumSpecifier);
        let _la;
        try {
            this.state = 538;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 48, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 525;
                        this.match(CParser.Enum);
                        this.state = 527;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === 111) {
                            {
                                this.state = 526;
                                this.match(CParser.Identifier);
                            }
                        }
                        this.state = 529;
                        this.match(CParser.LeftBrace);
                        this.state = 530;
                        this.enumeratorList();
                        this.state = 532;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === 94) {
                            {
                                this.state = 531;
                                this.match(CParser.Comma);
                            }
                        }
                        this.state = 534;
                        this.match(CParser.RightBrace);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 536;
                        this.match(CParser.Enum);
                        this.state = 537;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    enumeratorList() {
        let localctx = new EnumeratorListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 80, CParser.RULE_enumeratorList);
        try {
            let _alt;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 540;
                this.enumerator();
                this.state = 545;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 49, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 541;
                                this.match(CParser.Comma);
                                this.state = 542;
                                this.enumerator();
                            }
                        }
                    }
                    this.state = 547;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 49, this._ctx);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    enumerator() {
        let localctx = new EnumeratorContext(this, this._ctx, this.state);
        this.enterRule(localctx, 82, CParser.RULE_enumerator);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 548;
                this.enumerationConstant();
                this.state = 551;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === 95) {
                    {
                        this.state = 549;
                        this.match(CParser.Assign);
                        this.state = 550;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    enumerationConstant() {
        let localctx = new EnumerationConstantContext(this, this._ctx, this.state);
        this.enterRule(localctx, 84, CParser.RULE_enumerationConstant);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 553;
                this.match(CParser.Identifier);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    atomicTypeSpecifier() {
        let localctx = new AtomicTypeSpecifierContext(this, this._ctx, this.state);
        this.enterRule(localctx, 86, CParser.RULE_atomicTypeSpecifier);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 555;
                this.match(CParser.Atomic);
                this.state = 556;
                this.match(CParser.LeftParen);
                this.state = 557;
                this.typeName();
                this.state = 558;
                this.match(CParser.RightParen);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    typeQualifier() {
        let localctx = new TypeQualifierContext(this, this._ctx, this.state);
        this.enterRule(localctx, 88, CParser.RULE_typeQualifier);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 560;
                _la = this._input.LA(1);
                if (!(_la === 25 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 69633) !== 0))) {
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    functionSpecifier() {
        let localctx = new FunctionSpecifierContext(this, this._ctx, this.state);
        this.enterRule(localctx, 90, CParser.RULE_functionSpecifier);
        let _la;
        try {
            this.state = 568;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case 8:
                case 9:
                case 37:
                case 62:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 562;
                        _la = this._input.LA(1);
                        if (!(_la === 8 || _la === 9 || _la === 37 || _la === 62)) {
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
                        this.state = 563;
                        this.gccAttributeSpecifier();
                    }
                    break;
                case 10:
                    this.enterOuterAlt(localctx, 3);
                    {
                        this.state = 564;
                        this.match(CParser.T__9);
                        this.state = 565;
                        this.match(CParser.LeftParen);
                        this.state = 566;
                        this.match(CParser.Identifier);
                        this.state = 567;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    alignmentSpecifier() {
        let localctx = new AlignmentSpecifierContext(this, this._ctx, this.state);
        this.enterRule(localctx, 92, CParser.RULE_alignmentSpecifier);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 570;
                this.match(CParser.Alignas);
                this.state = 571;
                this.match(CParser.LeftParen);
                this.state = 574;
                this._errHandler.sync(this);
                switch (this._interp.adaptivePredict(this._input, 52, this._ctx)) {
                    case 1:
                        {
                            this.state = 572;
                            this.typeName();
                        }
                        break;
                    case 2:
                        {
                            this.state = 573;
                            this.constantExpression();
                        }
                        break;
                }
                this.state = 576;
                this.match(CParser.RightParen);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    declarator() {
        let localctx = new DeclaratorContext(this, this._ctx, this.state);
        this.enterRule(localctx, 94, CParser.RULE_declarator);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 579;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === 81 || _la === 88) {
                    {
                        this.state = 578;
                        this.pointer();
                    }
                }
                this.state = 581;
                this.directDeclarator(0);
                this.state = 585;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 54, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 582;
                                this.gccDeclaratorExtension();
                            }
                        }
                    }
                    this.state = 587;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 54, this._ctx);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    directDeclarator(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let localctx = new DirectDeclaratorContext(this, this._ctx, _parentState);
        let _prevctx = localctx;
        let _startState = 96;
        this.enterRecursionRule(localctx, 96, CParser.RULE_directDeclarator, _p);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 605;
                this._errHandler.sync(this);
                switch (this._interp.adaptivePredict(this._input, 55, this._ctx)) {
                    case 1:
                        {
                            this.state = 589;
                            this.match(CParser.Identifier);
                        }
                        break;
                    case 2:
                        {
                            this.state = 590;
                            this.match(CParser.LeftParen);
                            this.state = 591;
                            this.declarator();
                            this.state = 592;
                            this.match(CParser.RightParen);
                        }
                        break;
                    case 3:
                        {
                            this.state = 594;
                            this.match(CParser.Identifier);
                            this.state = 595;
                            this.match(CParser.Colon);
                            this.state = 596;
                            this.match(CParser.DigitSequence);
                        }
                        break;
                    case 4:
                        {
                            this.state = 597;
                            this.vcSpecificModifer();
                            this.state = 598;
                            this.match(CParser.Identifier);
                        }
                        break;
                    case 5:
                        {
                            this.state = 600;
                            this.match(CParser.LeftParen);
                            this.state = 601;
                            this.vcSpecificModifer();
                            this.state = 602;
                            this.declarator();
                            this.state = 603;
                            this.match(CParser.RightParen);
                        }
                        break;
                }
                this._ctx.stop = this._input.LT(-1);
                this.state = 652;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 62, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = localctx;
                        {
                            this.state = 650;
                            this._errHandler.sync(this);
                            switch (this._interp.adaptivePredict(this._input, 61, this._ctx)) {
                                case 1:
                                    {
                                        localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
                                        this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directDeclarator);
                                        this.state = 607;
                                        if (!(this.precpred(this._ctx, 9))) {
                                            throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
                                        }
                                        this.state = 608;
                                        this.match(CParser.LeftBracket);
                                        this.state = 610;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        if (_la === 25 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 69633) !== 0)) {
                                            {
                                                this.state = 609;
                                                this.typeQualifierList();
                                            }
                                        }
                                        this.state = 613;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1083393) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 12959) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0)) {
                                            {
                                                this.state = 612;
                                                this.assignmentExpression();
                                            }
                                        }
                                        this.state = 615;
                                        this.match(CParser.RightBracket);
                                    }
                                    break;
                                case 2:
                                    {
                                        localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
                                        this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directDeclarator);
                                        this.state = 616;
                                        if (!(this.precpred(this._ctx, 8))) {
                                            throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
                                        }
                                        this.state = 617;
                                        this.match(CParser.LeftBracket);
                                        this.state = 618;
                                        this.match(CParser.Static);
                                        this.state = 620;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        if (_la === 25 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 69633) !== 0)) {
                                            {
                                                this.state = 619;
                                                this.typeQualifierList();
                                            }
                                        }
                                        this.state = 622;
                                        this.assignmentExpression();
                                        this.state = 623;
                                        this.match(CParser.RightBracket);
                                    }
                                    break;
                                case 3:
                                    {
                                        localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
                                        this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directDeclarator);
                                        this.state = 625;
                                        if (!(this.precpred(this._ctx, 7))) {
                                            throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
                                        }
                                        this.state = 626;
                                        this.match(CParser.LeftBracket);
                                        this.state = 627;
                                        this.typeQualifierList();
                                        this.state = 628;
                                        this.match(CParser.Static);
                                        this.state = 629;
                                        this.assignmentExpression();
                                        this.state = 630;
                                        this.match(CParser.RightBracket);
                                    }
                                    break;
                                case 4:
                                    {
                                        localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
                                        this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directDeclarator);
                                        this.state = 632;
                                        if (!(this.precpred(this._ctx, 6))) {
                                            throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
                                        }
                                        this.state = 633;
                                        this.match(CParser.LeftBracket);
                                        this.state = 635;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        if (_la === 25 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 69633) !== 0)) {
                                            {
                                                this.state = 634;
                                                this.typeQualifierList();
                                            }
                                        }
                                        this.state = 637;
                                        this.match(CParser.Star);
                                        this.state = 638;
                                        this.match(CParser.RightBracket);
                                    }
                                    break;
                                case 5:
                                    {
                                        localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
                                        this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directDeclarator);
                                        this.state = 639;
                                        if (!(this.precpred(this._ctx, 5))) {
                                            throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
                                        }
                                        this.state = 640;
                                        this.match(CParser.LeftParen);
                                        this.state = 641;
                                        this.parameterTypeList();
                                        this.state = 642;
                                        this.match(CParser.RightParen);
                                    }
                                    break;
                                case 6:
                                    {
                                        localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
                                        this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directDeclarator);
                                        this.state = 644;
                                        if (!(this.precpred(this._ctx, 4))) {
                                            throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
                                        }
                                        this.state = 645;
                                        this.match(CParser.LeftParen);
                                        this.state = 647;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        if (_la === 111) {
                                            {
                                                this.state = 646;
                                                this.identifierList();
                                            }
                                        }
                                        this.state = 649;
                                        this.match(CParser.RightParen);
                                    }
                                    break;
                            }
                        }
                    }
                    this.state = 654;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 62, this._ctx);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return localctx;
    }
    // @RuleVersion(0)
    vcSpecificModifer() {
        let localctx = new VcSpecificModiferContext(this, this._ctx, this.state);
        this.enterRule(localctx, 98, CParser.RULE_vcSpecificModifer);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 655;
                _la = this._input.LA(1);
                if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & 64000) !== 0))) {
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    gccDeclaratorExtension() {
        let localctx = new GccDeclaratorExtensionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 100, CParser.RULE_gccDeclaratorExtension);
        let _la;
        try {
            this.state = 666;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case 16:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 657;
                        this.match(CParser.T__15);
                        this.state = 658;
                        this.match(CParser.LeftParen);
                        this.state = 660;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        do {
                            {
                                {
                                    this.state = 659;
                                    this.match(CParser.StringLiteral);
                                }
                            }
                            this.state = 662;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        } while (_la === 114);
                        this.state = 664;
                        this.match(CParser.RightParen);
                    }
                    break;
                case 17:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 665;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    gccAttributeSpecifier() {
        let localctx = new GccAttributeSpecifierContext(this, this._ctx, this.state);
        this.enterRule(localctx, 102, CParser.RULE_gccAttributeSpecifier);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 668;
                this.match(CParser.T__16);
                this.state = 669;
                this.match(CParser.LeftParen);
                this.state = 670;
                this.match(CParser.LeftParen);
                this.state = 671;
                this.gccAttributeList();
                this.state = 672;
                this.match(CParser.RightParen);
                this.state = 673;
                this.match(CParser.RightParen);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    gccAttributeList() {
        let localctx = new GccAttributeListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 104, CParser.RULE_gccAttributeList);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 676;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 3221225465) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 536870911) !== 0)) {
                    {
                        this.state = 675;
                        this.gccAttribute();
                    }
                }
                this.state = 684;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 94) {
                    {
                        {
                            this.state = 678;
                            this.match(CParser.Comma);
                            this.state = 680;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 3221225465) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 536870911) !== 0)) {
                                {
                                    this.state = 679;
                                    this.gccAttribute();
                                }
                            }
                        }
                    }
                    this.state = 686;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    gccAttribute() {
        let localctx = new GccAttributeContext(this, this._ctx, this.state);
        this.enterRule(localctx, 106, CParser.RULE_gccAttribute);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 687;
                _la = this._input.LA(1);
                if (_la <= 0 || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 536870915) !== 0)) {
                    this._errHandler.recoverInline(this);
                }
                else {
                    this._errHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 693;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === 65) {
                    {
                        this.state = 688;
                        this.match(CParser.LeftParen);
                        this.state = 690;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1083393) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 12959) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0)) {
                            {
                                this.state = 689;
                                this.argumentExpressionList();
                            }
                        }
                        this.state = 692;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    nestedParenthesesBlock() {
        let localctx = new NestedParenthesesBlockContext(this, this._ctx, this.state);
        this.enterRule(localctx, 108, CParser.RULE_nestedParenthesesBlock);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 702;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967291) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 536870911) !== 0)) {
                    {
                        this.state = 700;
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
                            case 64:
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
                            case 124:
                                {
                                    this.state = 695;
                                    _la = this._input.LA(1);
                                    if (_la <= 0 || _la === 65 || _la === 66) {
                                        this._errHandler.recoverInline(this);
                                    }
                                    else {
                                        this._errHandler.reportMatch(this);
                                        this.consume();
                                    }
                                }
                                break;
                            case 65:
                                {
                                    this.state = 696;
                                    this.match(CParser.LeftParen);
                                    this.state = 697;
                                    this.nestedParenthesesBlock();
                                    this.state = 698;
                                    this.match(CParser.RightParen);
                                }
                                break;
                            default:
                                throw new NoViableAltException(this);
                        }
                    }
                    this.state = 704;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    pointer() {
        let localctx = new PointerContext(this, this._ctx, this.state);
        this.enterRule(localctx, 110, CParser.RULE_pointer);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 709;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 705;
                            _la = this._input.LA(1);
                            if (!(_la === 81 || _la === 88)) {
                                this._errHandler.recoverInline(this);
                            }
                            else {
                                this._errHandler.reportMatch(this);
                                this.consume();
                            }
                            this.state = 707;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === 25 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 69633) !== 0)) {
                                {
                                    this.state = 706;
                                    this.typeQualifierList();
                                }
                            }
                        }
                    }
                    this.state = 711;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while (_la === 81 || _la === 88);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    typeQualifierList() {
        let localctx = new TypeQualifierListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 112, CParser.RULE_typeQualifierList);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 714;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 713;
                            this.typeQualifier();
                        }
                    }
                    this.state = 716;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while (_la === 25 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 69633) !== 0));
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    parameterTypeList() {
        let localctx = new ParameterTypeListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 114, CParser.RULE_parameterTypeList);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 718;
                this.parameterList();
                this.state = 721;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === 94) {
                    {
                        this.state = 719;
                        this.match(CParser.Comma);
                        this.state = 720;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    parameterList() {
        let localctx = new ParameterListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 116, CParser.RULE_parameterList);
        try {
            let _alt;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 723;
                this.parameterDeclaration();
                this.state = 728;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 76, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 724;
                                this.match(CParser.Comma);
                                this.state = 725;
                                this.parameterDeclaration();
                            }
                        }
                    }
                    this.state = 730;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 76, this._ctx);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    parameterDeclaration() {
        let localctx = new ParameterDeclarationContext(this, this._ctx, this.state);
        this.enterRule(localctx, 118, CParser.RULE_parameterDeclaration);
        let _la;
        try {
            this.state = 738;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 78, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 731;
                        this.declarationSpecifiers();
                        this.state = 732;
                        this.declarator();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 734;
                        this.declarationSpecifiers2();
                        this.state = 736;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 8454149) !== 0)) {
                            {
                                this.state = 735;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    identifierList() {
        let localctx = new IdentifierListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 120, CParser.RULE_identifierList);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 740;
                this.match(CParser.Identifier);
                this.state = 745;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 94) {
                    {
                        {
                            this.state = 741;
                            this.match(CParser.Comma);
                            this.state = 742;
                            this.match(CParser.Identifier);
                        }
                    }
                    this.state = 747;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    typeName() {
        let localctx = new TypeNameContext(this, this._ctx, this.state);
        this.enterRule(localctx, 122, CParser.RULE_typeName);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 748;
                this.specifierQualifierList();
                this.state = 750;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 8454149) !== 0)) {
                    {
                        this.state = 749;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    abstractDeclarator() {
        let localctx = new AbstractDeclaratorContext(this, this._ctx, this.state);
        this.enterRule(localctx, 124, CParser.RULE_abstractDeclarator);
        let _la;
        try {
            this.state = 763;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 83, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 752;
                        this.pointer();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 754;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === 81 || _la === 88) {
                            {
                                this.state = 753;
                                this.pointer();
                            }
                        }
                        this.state = 756;
                        this.directAbstractDeclarator(0);
                        this.state = 760;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === 16 || _la === 17) {
                            {
                                {
                                    this.state = 757;
                                    this.gccDeclaratorExtension();
                                }
                            }
                            this.state = 762;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    directAbstractDeclarator(_p) {
        if (_p === undefined) {
            _p = 0;
        }
        let _parentctx = this._ctx;
        let _parentState = this.state;
        let localctx = new DirectAbstractDeclaratorContext(this, this._ctx, _parentState);
        let _prevctx = localctx;
        let _startState = 126;
        this.enterRecursionRule(localctx, 126, CParser.RULE_directAbstractDeclarator, _p);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 811;
                this._errHandler.sync(this);
                switch (this._interp.adaptivePredict(this._input, 90, this._ctx)) {
                    case 1:
                        {
                            this.state = 766;
                            this.match(CParser.LeftParen);
                            this.state = 767;
                            this.abstractDeclarator();
                            this.state = 768;
                            this.match(CParser.RightParen);
                            this.state = 772;
                            this._errHandler.sync(this);
                            _alt = this._interp.adaptivePredict(this._input, 84, this._ctx);
                            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                                if (_alt === 1) {
                                    {
                                        {
                                            this.state = 769;
                                            this.gccDeclaratorExtension();
                                        }
                                    }
                                }
                                this.state = 774;
                                this._errHandler.sync(this);
                                _alt = this._interp.adaptivePredict(this._input, 84, this._ctx);
                            }
                        }
                        break;
                    case 2:
                        {
                            this.state = 775;
                            this.match(CParser.LeftBracket);
                            this.state = 777;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === 25 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 69633) !== 0)) {
                                {
                                    this.state = 776;
                                    this.typeQualifierList();
                                }
                            }
                            this.state = 780;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1083393) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 12959) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0)) {
                                {
                                    this.state = 779;
                                    this.assignmentExpression();
                                }
                            }
                            this.state = 782;
                            this.match(CParser.RightBracket);
                        }
                        break;
                    case 3:
                        {
                            this.state = 783;
                            this.match(CParser.LeftBracket);
                            this.state = 784;
                            this.match(CParser.Static);
                            this.state = 786;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (_la === 25 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 69633) !== 0)) {
                                {
                                    this.state = 785;
                                    this.typeQualifierList();
                                }
                            }
                            this.state = 788;
                            this.assignmentExpression();
                            this.state = 789;
                            this.match(CParser.RightBracket);
                        }
                        break;
                    case 4:
                        {
                            this.state = 791;
                            this.match(CParser.LeftBracket);
                            this.state = 792;
                            this.typeQualifierList();
                            this.state = 793;
                            this.match(CParser.Static);
                            this.state = 794;
                            this.assignmentExpression();
                            this.state = 795;
                            this.match(CParser.RightBracket);
                        }
                        break;
                    case 5:
                        {
                            this.state = 797;
                            this.match(CParser.LeftBracket);
                            this.state = 798;
                            this.match(CParser.Star);
                            this.state = 799;
                            this.match(CParser.RightBracket);
                        }
                        break;
                    case 6:
                        {
                            this.state = 800;
                            this.match(CParser.LeftParen);
                            this.state = 802;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if (((((_la - 1)) & ~0x1F) === 0 && ((1 << (_la - 1)) & 3515941881) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2808049137) !== 0) || _la === 111) {
                                {
                                    this.state = 801;
                                    this.parameterTypeList();
                                }
                            }
                            this.state = 804;
                            this.match(CParser.RightParen);
                            this.state = 808;
                            this._errHandler.sync(this);
                            _alt = this._interp.adaptivePredict(this._input, 89, this._ctx);
                            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                                if (_alt === 1) {
                                    {
                                        {
                                            this.state = 805;
                                            this.gccDeclaratorExtension();
                                        }
                                    }
                                }
                                this.state = 810;
                                this._errHandler.sync(this);
                                _alt = this._interp.adaptivePredict(this._input, 89, this._ctx);
                            }
                        }
                        break;
                }
                this._ctx.stop = this._input.LT(-1);
                this.state = 856;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 97, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        if (this._parseListeners != null) {
                            this.triggerExitRuleEvent();
                        }
                        _prevctx = localctx;
                        {
                            this.state = 854;
                            this._errHandler.sync(this);
                            switch (this._interp.adaptivePredict(this._input, 96, this._ctx)) {
                                case 1:
                                    {
                                        localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
                                        this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directAbstractDeclarator);
                                        this.state = 813;
                                        if (!(this.precpred(this._ctx, 5))) {
                                            throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
                                        }
                                        this.state = 814;
                                        this.match(CParser.LeftBracket);
                                        this.state = 816;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        if (_la === 25 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 69633) !== 0)) {
                                            {
                                                this.state = 815;
                                                this.typeQualifierList();
                                            }
                                        }
                                        this.state = 819;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1083393) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 12959) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0)) {
                                            {
                                                this.state = 818;
                                                this.assignmentExpression();
                                            }
                                        }
                                        this.state = 821;
                                        this.match(CParser.RightBracket);
                                    }
                                    break;
                                case 2:
                                    {
                                        localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
                                        this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directAbstractDeclarator);
                                        this.state = 822;
                                        if (!(this.precpred(this._ctx, 4))) {
                                            throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
                                        }
                                        this.state = 823;
                                        this.match(CParser.LeftBracket);
                                        this.state = 824;
                                        this.match(CParser.Static);
                                        this.state = 826;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        if (_la === 25 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 69633) !== 0)) {
                                            {
                                                this.state = 825;
                                                this.typeQualifierList();
                                            }
                                        }
                                        this.state = 828;
                                        this.assignmentExpression();
                                        this.state = 829;
                                        this.match(CParser.RightBracket);
                                    }
                                    break;
                                case 3:
                                    {
                                        localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
                                        this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directAbstractDeclarator);
                                        this.state = 831;
                                        if (!(this.precpred(this._ctx, 3))) {
                                            throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
                                        }
                                        this.state = 832;
                                        this.match(CParser.LeftBracket);
                                        this.state = 833;
                                        this.typeQualifierList();
                                        this.state = 834;
                                        this.match(CParser.Static);
                                        this.state = 835;
                                        this.assignmentExpression();
                                        this.state = 836;
                                        this.match(CParser.RightBracket);
                                    }
                                    break;
                                case 4:
                                    {
                                        localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
                                        this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directAbstractDeclarator);
                                        this.state = 838;
                                        if (!(this.precpred(this._ctx, 2))) {
                                            throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
                                        }
                                        this.state = 839;
                                        this.match(CParser.LeftBracket);
                                        this.state = 840;
                                        this.match(CParser.Star);
                                        this.state = 841;
                                        this.match(CParser.RightBracket);
                                    }
                                    break;
                                case 5:
                                    {
                                        localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
                                        this.pushNewRecursionContext(localctx, _startState, CParser.RULE_directAbstractDeclarator);
                                        this.state = 842;
                                        if (!(this.precpred(this._ctx, 1))) {
                                            throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
                                        }
                                        this.state = 843;
                                        this.match(CParser.LeftParen);
                                        this.state = 845;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        if (((((_la - 1)) & ~0x1F) === 0 && ((1 << (_la - 1)) & 3515941881) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 2808049137) !== 0) || _la === 111) {
                                            {
                                                this.state = 844;
                                                this.parameterTypeList();
                                            }
                                        }
                                        this.state = 847;
                                        this.match(CParser.RightParen);
                                        this.state = 851;
                                        this._errHandler.sync(this);
                                        _alt = this._interp.adaptivePredict(this._input, 95, this._ctx);
                                        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                                            if (_alt === 1) {
                                                {
                                                    {
                                                        this.state = 848;
                                                        this.gccDeclaratorExtension();
                                                    }
                                                }
                                            }
                                            this.state = 853;
                                            this._errHandler.sync(this);
                                            _alt = this._interp.adaptivePredict(this._input, 95, this._ctx);
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                    this.state = 858;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 97, this._ctx);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(_parentctx);
        }
        return localctx;
    }
    // @RuleVersion(0)
    typedefName() {
        let localctx = new TypedefNameContext(this, this._ctx, this.state);
        this.enterRule(localctx, 128, CParser.RULE_typedefName);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 859;
                this.match(CParser.Identifier);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    initializer() {
        let localctx = new InitializerContext(this, this._ctx, this.state);
        this.enterRule(localctx, 130, CParser.RULE_initializer);
        let _la;
        try {
            this.state = 869;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case 1:
                case 2:
                case 3:
                case 45:
                case 56:
                case 60:
                case 65:
                case 77:
                case 78:
                case 79:
                case 80:
                case 81:
                case 84:
                case 86:
                case 89:
                case 90:
                case 111:
                case 112:
                case 113:
                case 114:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 861;
                        this.assignmentExpression();
                    }
                    break;
                case 69:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 862;
                        this.match(CParser.LeftBrace);
                        this.state = 863;
                        this.initializerList();
                        this.state = 865;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === 94) {
                            {
                                this.state = 864;
                                this.match(CParser.Comma);
                            }
                        }
                        this.state = 867;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    initializerList() {
        let localctx = new InitializerListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 132, CParser.RULE_initializerList);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 872;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === 67 || _la === 109) {
                    {
                        this.state = 871;
                        this.designation();
                    }
                }
                this.state = 874;
                this.initializer();
                this.state = 882;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 102, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 875;
                                this.match(CParser.Comma);
                                this.state = 877;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                if (_la === 67 || _la === 109) {
                                    {
                                        this.state = 876;
                                        this.designation();
                                    }
                                }
                                this.state = 879;
                                this.initializer();
                            }
                        }
                    }
                    this.state = 884;
                    this._errHandler.sync(this);
                    _alt = this._interp.adaptivePredict(this._input, 102, this._ctx);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    designation() {
        let localctx = new DesignationContext(this, this._ctx, this.state);
        this.enterRule(localctx, 134, CParser.RULE_designation);
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 885;
                this.designatorList();
                this.state = 886;
                this.match(CParser.Assign);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    designatorList() {
        let localctx = new DesignatorListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 136, CParser.RULE_designatorList);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 889;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 888;
                            this.designator();
                        }
                    }
                    this.state = 891;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while (_la === 67 || _la === 109);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    designator() {
        let localctx = new DesignatorContext(this, this._ctx, this.state);
        this.enterRule(localctx, 138, CParser.RULE_designator);
        try {
            this.state = 899;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case 67:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 893;
                        this.match(CParser.LeftBracket);
                        this.state = 894;
                        this.constantExpression();
                        this.state = 895;
                        this.match(CParser.RightBracket);
                    }
                    break;
                case 109:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 897;
                        this.match(CParser.Dot);
                        this.state = 898;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    staticAssertDeclaration() {
        let localctx = new StaticAssertDeclarationContext(this, this._ctx, this.state);
        this.enterRule(localctx, 140, CParser.RULE_staticAssertDeclaration);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 901;
                this.match(CParser.StaticAssert);
                this.state = 902;
                this.match(CParser.LeftParen);
                this.state = 903;
                this.constantExpression();
                this.state = 904;
                this.match(CParser.Comma);
                this.state = 906;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 905;
                            this.match(CParser.StringLiteral);
                        }
                    }
                    this.state = 908;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while (_la === 114);
                this.state = 910;
                this.match(CParser.RightParen);
                this.state = 911;
                this.match(CParser.Semi);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    statement() {
        let localctx = new StatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 142, CParser.RULE_statement);
        let _la;
        try {
            this.state = 950;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 111, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 913;
                        this.labeledStatement();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 914;
                        this.compoundStatement();
                    }
                    break;
                case 3:
                    this.enterOuterAlt(localctx, 3);
                    {
                        this.state = 915;
                        this.expressionStatement();
                    }
                    break;
                case 4:
                    this.enterOuterAlt(localctx, 4);
                    {
                        this.state = 916;
                        this.selectionStatement();
                    }
                    break;
                case 5:
                    this.enterOuterAlt(localctx, 5);
                    {
                        this.state = 917;
                        this.iterationStatement();
                    }
                    break;
                case 6:
                    this.enterOuterAlt(localctx, 6);
                    {
                        this.state = 918;
                        this.jumpStatement();
                    }
                    break;
                case 7:
                    this.enterOuterAlt(localctx, 7);
                    {
                        this.state = 919;
                        _la = this._input.LA(1);
                        if (!(_la === 16 || _la === 18)) {
                            this._errHandler.recoverInline(this);
                        }
                        else {
                            this._errHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 920;
                        _la = this._input.LA(1);
                        if (!(_la === 19 || _la === 53)) {
                            this._errHandler.recoverInline(this);
                        }
                        else {
                            this._errHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 921;
                        this.match(CParser.LeftParen);
                        this.state = 930;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1083393) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 12959) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0)) {
                            {
                                this.state = 922;
                                this.logicalOrExpression();
                                this.state = 927;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                while (_la === 94) {
                                    {
                                        {
                                            this.state = 923;
                                            this.match(CParser.Comma);
                                            this.state = 924;
                                            this.logicalOrExpression();
                                        }
                                    }
                                    this.state = 929;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                }
                            }
                        }
                        this.state = 945;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === 92) {
                            {
                                {
                                    this.state = 932;
                                    this.match(CParser.Colon);
                                    this.state = 941;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                    if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1083393) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 12959) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0)) {
                                        {
                                            this.state = 933;
                                            this.logicalOrExpression();
                                            this.state = 938;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                            while (_la === 94) {
                                                {
                                                    {
                                                        this.state = 934;
                                                        this.match(CParser.Comma);
                                                        this.state = 935;
                                                        this.logicalOrExpression();
                                                    }
                                                }
                                                this.state = 940;
                                                this._errHandler.sync(this);
                                                _la = this._input.LA(1);
                                            }
                                        }
                                    }
                                }
                            }
                            this.state = 947;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 948;
                        this.match(CParser.RightParen);
                        this.state = 949;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    labeledStatement() {
        let localctx = new LabeledStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 144, CParser.RULE_labeledStatement);
        try {
            this.state = 963;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case 111:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 952;
                        this.match(CParser.Identifier);
                        this.state = 953;
                        this.match(CParser.Colon);
                        this.state = 954;
                        this.statement();
                    }
                    break;
                case 23:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 955;
                        this.match(CParser.Case);
                        this.state = 956;
                        this.constantExpression();
                        this.state = 957;
                        this.match(CParser.Colon);
                        this.state = 958;
                        this.statement();
                    }
                    break;
                case 27:
                    this.enterOuterAlt(localctx, 3);
                    {
                        this.state = 960;
                        this.match(CParser.Default);
                        this.state = 961;
                        this.match(CParser.Colon);
                        this.state = 962;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    compoundStatement() {
        let localctx = new CompoundStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 146, CParser.RULE_compoundStatement);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 965;
                this.match(CParser.LeftBrace);
                this.state = 967;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3219589118) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 3758096383) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 643031075) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0)) {
                    {
                        this.state = 966;
                        this.blockItemList();
                    }
                }
                this.state = 969;
                this.match(CParser.RightBrace);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    blockItemList() {
        let localctx = new BlockItemListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 148, CParser.RULE_blockItemList);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 972;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 971;
                            this.blockItem();
                        }
                    }
                    this.state = 974;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3219589118) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 3758096383) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 643031075) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0));
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    blockItem() {
        let localctx = new BlockItemContext(this, this._ctx, this.state);
        this.enterRule(localctx, 150, CParser.RULE_blockItem);
        try {
            this.state = 978;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 115, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 976;
                        this.statement();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 977;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    expressionStatement() {
        let localctx = new ExpressionStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 152, CParser.RULE_expressionStatement);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 981;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1083393) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 12959) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0)) {
                    {
                        this.state = 980;
                        this.expression();
                    }
                }
                this.state = 983;
                this.match(CParser.Semi);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    selectionStatement() {
        let localctx = new SelectionStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 154, CParser.RULE_selectionStatement);
        try {
            this.state = 1000;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case 36:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 985;
                        this.match(CParser.If);
                        this.state = 986;
                        this.match(CParser.LeftParen);
                        this.state = 987;
                        this.expression();
                        this.state = 988;
                        this.match(CParser.RightParen);
                        this.state = 989;
                        this.statement();
                        this.state = 992;
                        this._errHandler.sync(this);
                        switch (this._interp.adaptivePredict(this._input, 117, this._ctx)) {
                            case 1:
                                {
                                    this.state = 990;
                                    this.match(CParser.Else);
                                    this.state = 991;
                                    this.statement();
                                }
                                break;
                        }
                    }
                    break;
                case 48:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 994;
                        this.match(CParser.Switch);
                        this.state = 995;
                        this.match(CParser.LeftParen);
                        this.state = 996;
                        this.expression();
                        this.state = 997;
                        this.match(CParser.RightParen);
                        this.state = 998;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    iterationStatement() {
        let localctx = new IterationStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 156, CParser.RULE_iterationStatement);
        try {
            this.state = 1022;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case 54:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 1002;
                        this.match(CParser.While);
                        this.state = 1003;
                        this.match(CParser.LeftParen);
                        this.state = 1004;
                        this.expression();
                        this.state = 1005;
                        this.match(CParser.RightParen);
                        this.state = 1006;
                        this.statement();
                    }
                    break;
                case 28:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 1008;
                        this.match(CParser.Do);
                        this.state = 1009;
                        this.statement();
                        this.state = 1010;
                        this.match(CParser.While);
                        this.state = 1011;
                        this.match(CParser.LeftParen);
                        this.state = 1012;
                        this.expression();
                        this.state = 1013;
                        this.match(CParser.RightParen);
                        this.state = 1014;
                        this.match(CParser.Semi);
                    }
                    break;
                case 34:
                    this.enterOuterAlt(localctx, 3);
                    {
                        this.state = 1016;
                        this.match(CParser.For);
                        this.state = 1017;
                        this.match(CParser.LeftParen);
                        this.state = 1018;
                        this.forCondition();
                        this.state = 1019;
                        this.match(CParser.RightParen);
                        this.state = 1020;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    forCondition() {
        let localctx = new ForConditionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 158, CParser.RULE_forCondition);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 1028;
                this._errHandler.sync(this);
                switch (this._interp.adaptivePredict(this._input, 121, this._ctx)) {
                    case 1:
                        {
                            this.state = 1024;
                            this.forDeclaration();
                        }
                        break;
                    case 2:
                        {
                            this.state = 1026;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1083393) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 12959) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0)) {
                                {
                                    this.state = 1025;
                                    this.expression();
                                }
                            }
                        }
                        break;
                }
                this.state = 1030;
                this.match(CParser.Semi);
                this.state = 1032;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1083393) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 12959) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0)) {
                    {
                        this.state = 1031;
                        this.forExpression();
                    }
                }
                this.state = 1034;
                this.match(CParser.Semi);
                this.state = 1036;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1083393) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 12959) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0)) {
                    {
                        this.state = 1035;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    forDeclaration() {
        let localctx = new ForDeclarationContext(this, this._ctx, this.state);
        this.enterRule(localctx, 160, CParser.RULE_forDeclaration);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 1038;
                this.declarationSpecifiers();
                this.state = 1040;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 64000) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 8454145) !== 0) || _la === 111) {
                    {
                        this.state = 1039;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    forExpression() {
        let localctx = new ForExpressionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 162, CParser.RULE_forExpression);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 1042;
                this.assignmentExpression();
                this.state = 1047;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === 94) {
                    {
                        {
                            this.state = 1043;
                            this.match(CParser.Comma);
                            this.state = 1044;
                            this.assignmentExpression();
                        }
                    }
                    this.state = 1049;
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
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    jumpStatement() {
        let localctx = new JumpStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 164, CParser.RULE_jumpStatement);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 1059;
                this._errHandler.sync(this);
                switch (this._interp.adaptivePredict(this._input, 127, this._ctx)) {
                    case 1:
                        {
                            this.state = 1050;
                            this.match(CParser.Goto);
                            this.state = 1051;
                            this.match(CParser.Identifier);
                        }
                        break;
                    case 2:
                        {
                            this.state = 1052;
                            _la = this._input.LA(1);
                            if (!(_la === 22 || _la === 26)) {
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
                            this.state = 1053;
                            this.match(CParser.Return);
                            this.state = 1055;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                            if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1083393) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 12959) !== 0) || ((((_la - 111)) & ~0x1F) === 0 && ((1 << (_la - 111)) & 15) !== 0)) {
                                {
                                    this.state = 1054;
                                    this.expression();
                                }
                            }
                        }
                        break;
                    case 4:
                        {
                            this.state = 1057;
                            this.match(CParser.Goto);
                            this.state = 1058;
                            this.unaryExpression();
                        }
                        break;
                }
                this.state = 1061;
                this.match(CParser.Semi);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    compilationUnit() {
        let localctx = new CompilationUnitContext(this, this._ctx, this.state);
        this.enterRule(localctx, 166, CParser.RULE_compilationUnit);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 1064;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2738028530) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 3468614627) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 553779203) !== 0) || _la === 111) {
                    {
                        this.state = 1063;
                        this.translationUnit();
                    }
                }
                this.state = 1066;
                this.match(CParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    translationUnit() {
        let localctx = new TranslationUnitContext(this, this._ctx, this.state);
        this.enterRule(localctx, 168, CParser.RULE_translationUnit);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 1069;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 1068;
                            this.externalDeclaration();
                        }
                    }
                    this.state = 1071;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2738028530) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 3468614627) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 553779203) !== 0) || _la === 111);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    externalDeclaration() {
        let localctx = new ExternalDeclarationContext(this, this._ctx, this.state);
        this.enterRule(localctx, 170, CParser.RULE_externalDeclaration);
        try {
            this.state = 1077;
            this._errHandler.sync(this);
            switch (this._interp.adaptivePredict(this._input, 130, this._ctx)) {
                case 1:
                    this.enterOuterAlt(localctx, 1);
                    {
                        this.state = 1073;
                        this.functionDefinition();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(localctx, 2);
                    {
                        this.state = 1074;
                        this.declaration();
                    }
                    break;
                case 3:
                    this.enterOuterAlt(localctx, 3);
                    {
                        this.state = 1075;
                        this.match(CParser.Semi);
                    }
                    break;
                case 4:
                    this.enterOuterAlt(localctx, 4);
                    {
                        this.state = 1076;
                        this.match(CParser.T__19);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    functionDefinition() {
        let localctx = new FunctionDefinitionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 172, CParser.RULE_functionDefinition);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 1080;
                this._errHandler.sync(this);
                switch (this._interp.adaptivePredict(this._input, 131, this._ctx)) {
                    case 1:
                        {
                            this.state = 1079;
                            this.declarationSpecifiers();
                        }
                        break;
                }
                this.state = 1082;
                this.declarator();
                this.state = 1084;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (((((_la - 1)) & ~0x1F) === 0 && ((1 << (_la - 1)) & 3515941881) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 3881790961) !== 0) || _la === 111) {
                    {
                        this.state = 1083;
                        this.declarationList();
                    }
                }
                this.state = 1086;
                this.compoundStatement();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    // @RuleVersion(0)
    declarationList() {
        let localctx = new DeclarationListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 174, CParser.RULE_declarationList);
        let _la;
        try {
            this.enterOuterAlt(localctx, 1);
            {
                this.state = 1089;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                do {
                    {
                        {
                            this.state = 1088;
                            this.declaration();
                        }
                    }
                    this.state = 1091;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                } while (((((_la - 1)) & ~0x1F) === 0 && ((1 << (_la - 1)) & 3515941881) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & 3881790961) !== 0) || _la === 111);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localctx;
    }
    sempred(localctx, ruleIndex, predIndex) {
        switch (ruleIndex) {
            case 48:
                return this.directDeclarator_sempred(localctx, predIndex);
            case 63:
                return this.directAbstractDeclarator_sempred(localctx, predIndex);
        }
        return true;
    }
    directDeclarator_sempred(localctx, predIndex) {
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
    directAbstractDeclarator_sempred(localctx, predIndex) {
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
    static get _ATN() {
        if (!CParser.__ATN) {
            CParser.__ATN = new ATNDeserializer().deserialize(CParser._serializedATN);
        }
        return CParser.__ATN;
    }
}
CParser.T__0 = 1;
CParser.T__1 = 2;
CParser.T__2 = 3;
CParser.T__3 = 4;
CParser.T__4 = 5;
CParser.T__5 = 6;
CParser.T__6 = 7;
CParser.T__7 = 8;
CParser.T__8 = 9;
CParser.T__9 = 10;
CParser.T__10 = 11;
CParser.T__11 = 12;
CParser.T__12 = 13;
CParser.T__13 = 14;
CParser.T__14 = 15;
CParser.T__15 = 16;
CParser.T__16 = 17;
CParser.T__17 = 18;
CParser.T__18 = 19;
CParser.T__19 = 20;
CParser.Auto = 21;
CParser.Break = 22;
CParser.Case = 23;
CParser.Char = 24;
CParser.Const = 25;
CParser.Continue = 26;
CParser.Default = 27;
CParser.Do = 28;
CParser.Double = 29;
CParser.Else = 30;
CParser.Enum = 31;
CParser.Extern = 32;
CParser.Float = 33;
CParser.For = 34;
CParser.Goto = 35;
CParser.If = 36;
CParser.Inline = 37;
CParser.Int = 38;
CParser.Long = 39;
CParser.Register = 40;
CParser.Restrict = 41;
CParser.Return = 42;
CParser.Short = 43;
CParser.Signed = 44;
CParser.Sizeof = 45;
CParser.Static = 46;
CParser.Struct = 47;
CParser.Switch = 48;
CParser.Typedef = 49;
CParser.Union = 50;
CParser.Unsigned = 51;
CParser.Void = 52;
CParser.Volatile = 53;
CParser.While = 54;
CParser.Alignas = 55;
CParser.Alignof = 56;
CParser.Atomic = 57;
CParser.Bool = 58;
CParser.Complex = 59;
CParser.Generic = 60;
CParser.Imaginary = 61;
CParser.Noreturn = 62;
CParser.StaticAssert = 63;
CParser.ThreadLocal = 64;
CParser.LeftParen = 65;
CParser.RightParen = 66;
CParser.LeftBracket = 67;
CParser.RightBracket = 68;
CParser.LeftBrace = 69;
CParser.RightBrace = 70;
CParser.Less = 71;
CParser.LessEqual = 72;
CParser.Greater = 73;
CParser.GreaterEqual = 74;
CParser.LeftShift = 75;
CParser.RightShift = 76;
CParser.Plus = 77;
CParser.PlusPlus = 78;
CParser.Minus = 79;
CParser.MinusMinus = 80;
CParser.Star = 81;
CParser.Div = 82;
CParser.Mod = 83;
CParser.And = 84;
CParser.Or = 85;
CParser.AndAnd = 86;
CParser.OrOr = 87;
CParser.Caret = 88;
CParser.Not = 89;
CParser.Tilde = 90;
CParser.Question = 91;
CParser.Colon = 92;
CParser.Semi = 93;
CParser.Comma = 94;
CParser.Assign = 95;
CParser.StarAssign = 96;
CParser.DivAssign = 97;
CParser.ModAssign = 98;
CParser.PlusAssign = 99;
CParser.MinusAssign = 100;
CParser.LeftShiftAssign = 101;
CParser.RightShiftAssign = 102;
CParser.AndAssign = 103;
CParser.XorAssign = 104;
CParser.OrAssign = 105;
CParser.Equal = 106;
CParser.NotEqual = 107;
CParser.Arrow = 108;
CParser.Dot = 109;
CParser.Ellipsis = 110;
CParser.Identifier = 111;
CParser.Constant = 112;
CParser.DigitSequence = 113;
CParser.StringLiteral = 114;
CParser.ComplexDefine = 115;
CParser.IncludeDirective = 116;
CParser.AsmBlock = 117;
CParser.LineAfterPreprocessing = 118;
CParser.LineDirective = 119;
CParser.PragmaDirective = 120;
CParser.Whitespace = 121;
CParser.Newline = 122;
CParser.BlockComment = 123;
CParser.LineComment = 124;
CParser.EOF = Token.EOF;
CParser.RULE_primaryExpression = 0;
CParser.RULE_genericSelection = 1;
CParser.RULE_genericAssocList = 2;
CParser.RULE_genericAssociation = 3;
CParser.RULE_postfixExpression = 4;
CParser.RULE_argumentExpressionList = 5;
CParser.RULE_unaryExpression = 6;
CParser.RULE_unaryOperator = 7;
CParser.RULE_castExpression = 8;
CParser.RULE_multiplicativeExpression = 9;
CParser.RULE_additiveExpression = 10;
CParser.RULE_shiftExpression = 11;
CParser.RULE_relationalExpression = 12;
CParser.RULE_equalityExpression = 13;
CParser.RULE_andExpression = 14;
CParser.RULE_exclusiveOrExpression = 15;
CParser.RULE_inclusiveOrExpression = 16;
CParser.RULE_logicalAndExpression = 17;
CParser.RULE_logicalOrExpression = 18;
CParser.RULE_conditionalExpression = 19;
CParser.RULE_assignmentExpression = 20;
CParser.RULE_assignmentOperator = 21;
CParser.RULE_expression = 22;
CParser.RULE_constantExpression = 23;
CParser.RULE_declaration = 24;
CParser.RULE_declarationSpecifiers = 25;
CParser.RULE_declarationSpecifiers2 = 26;
CParser.RULE_declarationSpecifier = 27;
CParser.RULE_initDeclaratorList = 28;
CParser.RULE_initDeclarator = 29;
CParser.RULE_storageClassSpecifier = 30;
CParser.RULE_typeSpecifier = 31;
CParser.RULE_structOrUnionSpecifier = 32;
CParser.RULE_structOrUnion = 33;
CParser.RULE_structDeclarationList = 34;
CParser.RULE_structDeclaration = 35;
CParser.RULE_specifierQualifierList = 36;
CParser.RULE_structDeclaratorList = 37;
CParser.RULE_structDeclarator = 38;
CParser.RULE_enumSpecifier = 39;
CParser.RULE_enumeratorList = 40;
CParser.RULE_enumerator = 41;
CParser.RULE_enumerationConstant = 42;
CParser.RULE_atomicTypeSpecifier = 43;
CParser.RULE_typeQualifier = 44;
CParser.RULE_functionSpecifier = 45;
CParser.RULE_alignmentSpecifier = 46;
CParser.RULE_declarator = 47;
CParser.RULE_directDeclarator = 48;
CParser.RULE_vcSpecificModifer = 49;
CParser.RULE_gccDeclaratorExtension = 50;
CParser.RULE_gccAttributeSpecifier = 51;
CParser.RULE_gccAttributeList = 52;
CParser.RULE_gccAttribute = 53;
CParser.RULE_nestedParenthesesBlock = 54;
CParser.RULE_pointer = 55;
CParser.RULE_typeQualifierList = 56;
CParser.RULE_parameterTypeList = 57;
CParser.RULE_parameterList = 58;
CParser.RULE_parameterDeclaration = 59;
CParser.RULE_identifierList = 60;
CParser.RULE_typeName = 61;
CParser.RULE_abstractDeclarator = 62;
CParser.RULE_directAbstractDeclarator = 63;
CParser.RULE_typedefName = 64;
CParser.RULE_initializer = 65;
CParser.RULE_initializerList = 66;
CParser.RULE_designation = 67;
CParser.RULE_designatorList = 68;
CParser.RULE_designator = 69;
CParser.RULE_staticAssertDeclaration = 70;
CParser.RULE_statement = 71;
CParser.RULE_labeledStatement = 72;
CParser.RULE_compoundStatement = 73;
CParser.RULE_blockItemList = 74;
CParser.RULE_blockItem = 75;
CParser.RULE_expressionStatement = 76;
CParser.RULE_selectionStatement = 77;
CParser.RULE_iterationStatement = 78;
CParser.RULE_forCondition = 79;
CParser.RULE_forDeclaration = 80;
CParser.RULE_forExpression = 81;
CParser.RULE_jumpStatement = 82;
CParser.RULE_compilationUnit = 83;
CParser.RULE_translationUnit = 84;
CParser.RULE_externalDeclaration = 85;
CParser.RULE_functionDefinition = 86;
CParser.RULE_declarationList = 87;
CParser.literalNames = [null, "'__extension__'",
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
    "'g'", "'auto'",
    "'break'", "'case'",
    "'char'", "'const'",
    "'continue'",
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
    "'.'", "'...'"];
CParser.symbolicNames = [null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, null,
    null, "Auto",
    "Break", "Case",
    "Char", "Const",
    "Continue",
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
    "LineComment"];
// tslint:disable:no-trailing-whitespace
CParser.ruleNames = [
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
    "typedefName", "initializer", "initializerList", "designation", "designatorList",
    "designator", "staticAssertDeclaration", "statement", "labeledStatement",
    "compoundStatement", "blockItemList", "blockItem", "expressionStatement",
    "selectionStatement", "iterationStatement", "forCondition", "forDeclaration",
    "forExpression", "jumpStatement", "compilationUnit", "translationUnit",
    "externalDeclaration", "functionDefinition", "declarationList",
];
CParser._serializedATN = [4, 1, 124, 1094, 2, 0, 7, 0,
    2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9,
    2, 10, 7, 10, 2, 11, 7, 11, 2, 12, 7, 12, 2, 13, 7, 13, 2, 14, 7, 14, 2, 15, 7, 15, 2, 16, 7, 16, 2,
    17, 7, 17, 2, 18, 7, 18, 2, 19, 7, 19, 2, 20, 7, 20, 2, 21, 7, 21, 2, 22, 7, 22, 2, 23, 7, 23, 2, 24,
    7, 24, 2, 25, 7, 25, 2, 26, 7, 26, 2, 27, 7, 27, 2, 28, 7, 28, 2, 29, 7, 29, 2, 30, 7, 30, 2, 31, 7,
    31, 2, 32, 7, 32, 2, 33, 7, 33, 2, 34, 7, 34, 2, 35, 7, 35, 2, 36, 7, 36, 2, 37, 7, 37, 2, 38, 7, 38,
    2, 39, 7, 39, 2, 40, 7, 40, 2, 41, 7, 41, 2, 42, 7, 42, 2, 43, 7, 43, 2, 44, 7, 44, 2, 45, 7, 45, 2,
    46, 7, 46, 2, 47, 7, 47, 2, 48, 7, 48, 2, 49, 7, 49, 2, 50, 7, 50, 2, 51, 7, 51, 2, 52, 7, 52, 2, 53,
    7, 53, 2, 54, 7, 54, 2, 55, 7, 55, 2, 56, 7, 56, 2, 57, 7, 57, 2, 58, 7, 58, 2, 59, 7, 59, 2, 60, 7,
    60, 2, 61, 7, 61, 2, 62, 7, 62, 2, 63, 7, 63, 2, 64, 7, 64, 2, 65, 7, 65, 2, 66, 7, 66, 2, 67, 7, 67,
    2, 68, 7, 68, 2, 69, 7, 69, 2, 70, 7, 70, 2, 71, 7, 71, 2, 72, 7, 72, 2, 73, 7, 73, 2, 74, 7, 74, 2,
    75, 7, 75, 2, 76, 7, 76, 2, 77, 7, 77, 2, 78, 7, 78, 2, 79, 7, 79, 2, 80, 7, 80, 2, 81, 7, 81, 2, 82,
    7, 82, 2, 83, 7, 83, 2, 84, 7, 84, 2, 85, 7, 85, 2, 86, 7, 86, 2, 87, 7, 87, 1, 0, 1, 0, 1, 0, 4, 0,
    180, 8, 0, 11, 0, 12, 0, 181, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 190, 8, 0, 1, 0, 1, 0, 1, 0, 1,
    0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 210, 8, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 5, 2, 222, 8, 2, 10, 2, 12, 2, 225, 9, 2, 1, 3,
    1, 3, 3, 3, 229, 8, 3, 1, 3, 1, 3, 1, 3, 1, 4, 1, 4, 3, 4, 236, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4,
    3, 4, 244, 8, 4, 1, 4, 1, 4, 3, 4, 248, 8, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 3, 4, 256, 8, 4, 1, 4,
    1, 4, 1, 4, 1, 4, 5, 4, 262, 8, 4, 10, 4, 12, 4, 265, 9, 4, 1, 5, 1, 5, 1, 5, 5, 5, 270, 8, 5, 10, 5,
    12, 5, 273, 9, 5, 1, 6, 5, 6, 276, 8, 6, 10, 6, 12, 6, 279, 9, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6,
    1, 6, 1, 6, 1, 6, 1, 6, 1, 6, 3, 6, 292, 8, 6, 1, 7, 1, 7, 1, 8, 3, 8, 297, 8, 8, 1, 8, 1, 8, 1, 8, 1, 8,
    1, 8, 1, 8, 1, 8, 3, 8, 306, 8, 8, 1, 9, 1, 9, 1, 9, 5, 9, 311, 8, 9, 10, 9, 12, 9, 314, 9, 9, 1, 10,
    1, 10, 1, 10, 5, 10, 319, 8, 10, 10, 10, 12, 10, 322, 9, 10, 1, 11, 1, 11, 1, 11, 5, 11, 327, 8,
    11, 10, 11, 12, 11, 330, 9, 11, 1, 12, 1, 12, 1, 12, 5, 12, 335, 8, 12, 10, 12, 12, 12, 338, 9,
    12, 1, 13, 1, 13, 1, 13, 5, 13, 343, 8, 13, 10, 13, 12, 13, 346, 9, 13, 1, 14, 1, 14, 1, 14, 5, 14,
    351, 8, 14, 10, 14, 12, 14, 354, 9, 14, 1, 15, 1, 15, 1, 15, 5, 15, 359, 8, 15, 10, 15, 12, 15,
    362, 9, 15, 1, 16, 1, 16, 1, 16, 5, 16, 367, 8, 16, 10, 16, 12, 16, 370, 9, 16, 1, 17, 1, 17, 1,
    17, 5, 17, 375, 8, 17, 10, 17, 12, 17, 378, 9, 17, 1, 18, 1, 18, 1, 18, 5, 18, 383, 8, 18, 10, 18,
    12, 18, 386, 9, 18, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 1, 19, 3, 19, 394, 8, 19, 1, 20, 1, 20, 1,
    20, 1, 20, 1, 20, 1, 20, 3, 20, 402, 8, 20, 1, 21, 1, 21, 1, 22, 1, 22, 1, 22, 5, 22, 409, 8, 22,
    10, 22, 12, 22, 412, 9, 22, 1, 23, 1, 23, 1, 24, 1, 24, 3, 24, 418, 8, 24, 1, 24, 1, 24, 1, 24, 3,
    24, 423, 8, 24, 1, 25, 4, 25, 426, 8, 25, 11, 25, 12, 25, 427, 1, 26, 4, 26, 431, 8, 26, 11, 26,
    12, 26, 432, 1, 27, 1, 27, 1, 27, 1, 27, 1, 27, 3, 27, 440, 8, 27, 1, 28, 1, 28, 1, 28, 5, 28, 445,
    8, 28, 10, 28, 12, 28, 448, 9, 28, 1, 29, 1, 29, 1, 29, 3, 29, 453, 8, 29, 1, 30, 1, 30, 1, 31, 1,
    31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 1, 31, 3, 31, 471,
    8, 31, 1, 32, 1, 32, 3, 32, 475, 8, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 1, 32, 3, 32, 484,
    8, 32, 1, 33, 1, 33, 1, 34, 4, 34, 489, 8, 34, 11, 34, 12, 34, 490, 1, 35, 1, 35, 1, 35, 1, 35, 1,
    35, 1, 35, 1, 35, 1, 35, 3, 35, 501, 8, 35, 1, 36, 1, 36, 3, 36, 505, 8, 36, 1, 36, 3, 36, 508, 8,
    36, 1, 37, 1, 37, 1, 37, 5, 37, 513, 8, 37, 10, 37, 12, 37, 516, 9, 37, 1, 38, 1, 38, 3, 38, 520,
    8, 38, 1, 38, 1, 38, 3, 38, 524, 8, 38, 1, 39, 1, 39, 3, 39, 528, 8, 39, 1, 39, 1, 39, 1, 39, 3, 39,
    533, 8, 39, 1, 39, 1, 39, 1, 39, 1, 39, 3, 39, 539, 8, 39, 1, 40, 1, 40, 1, 40, 5, 40, 544, 8, 40,
    10, 40, 12, 40, 547, 9, 40, 1, 41, 1, 41, 1, 41, 3, 41, 552, 8, 41, 1, 42, 1, 42, 1, 43, 1, 43, 1,
    43, 1, 43, 1, 43, 1, 44, 1, 44, 1, 45, 1, 45, 1, 45, 1, 45, 1, 45, 1, 45, 3, 45, 569, 8, 45, 1, 46,
    1, 46, 1, 46, 1, 46, 3, 46, 575, 8, 46, 1, 46, 1, 46, 1, 47, 3, 47, 580, 8, 47, 1, 47, 1, 47, 5, 47,
    584, 8, 47, 10, 47, 12, 47, 587, 9, 47, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1,
    48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 3, 48, 606, 8, 48, 1, 48, 1, 48, 1, 48,
    3, 48, 611, 8, 48, 1, 48, 3, 48, 614, 8, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 3, 48, 621, 8, 48,
    1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 3, 48, 636,
    8, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 3, 48, 648, 8, 48, 1,
    48, 5, 48, 651, 8, 48, 10, 48, 12, 48, 654, 9, 48, 1, 49, 1, 49, 1, 50, 1, 50, 1, 50, 4, 50, 661,
    8, 50, 11, 50, 12, 50, 662, 1, 50, 1, 50, 3, 50, 667, 8, 50, 1, 51, 1, 51, 1, 51, 1, 51, 1, 51, 1,
    51, 1, 51, 1, 52, 3, 52, 677, 8, 52, 1, 52, 1, 52, 3, 52, 681, 8, 52, 5, 52, 683, 8, 52, 10, 52,
    12, 52, 686, 9, 52, 1, 53, 1, 53, 1, 53, 3, 53, 691, 8, 53, 1, 53, 3, 53, 694, 8, 53, 1, 54, 1, 54,
    1, 54, 1, 54, 1, 54, 5, 54, 701, 8, 54, 10, 54, 12, 54, 704, 9, 54, 1, 55, 1, 55, 3, 55, 708, 8,
    55, 4, 55, 710, 8, 55, 11, 55, 12, 55, 711, 1, 56, 4, 56, 715, 8, 56, 11, 56, 12, 56, 716, 1, 57,
    1, 57, 1, 57, 3, 57, 722, 8, 57, 1, 58, 1, 58, 1, 58, 5, 58, 727, 8, 58, 10, 58, 12, 58, 730, 9,
    58, 1, 59, 1, 59, 1, 59, 1, 59, 1, 59, 3, 59, 737, 8, 59, 3, 59, 739, 8, 59, 1, 60, 1, 60, 1, 60,
    5, 60, 744, 8, 60, 10, 60, 12, 60, 747, 9, 60, 1, 61, 1, 61, 3, 61, 751, 8, 61, 1, 62, 1, 62, 3,
    62, 755, 8, 62, 1, 62, 1, 62, 5, 62, 759, 8, 62, 10, 62, 12, 62, 762, 9, 62, 3, 62, 764, 8, 62,
    1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 5, 63, 771, 8, 63, 10, 63, 12, 63, 774, 9, 63, 1, 63, 1, 63, 3,
    63, 778, 8, 63, 1, 63, 3, 63, 781, 8, 63, 1, 63, 1, 63, 1, 63, 1, 63, 3, 63, 787, 8, 63, 1, 63, 1,
    63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 3, 63, 803,
    8, 63, 1, 63, 1, 63, 5, 63, 807, 8, 63, 10, 63, 12, 63, 810, 9, 63, 3, 63, 812, 8, 63, 1, 63, 1,
    63, 1, 63, 3, 63, 817, 8, 63, 1, 63, 3, 63, 820, 8, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 3, 63,
    827, 8, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1, 63, 1,
    63, 1, 63, 1, 63, 1, 63, 1, 63, 3, 63, 846, 8, 63, 1, 63, 1, 63, 5, 63, 850, 8, 63, 10, 63, 12, 63,
    853, 9, 63, 5, 63, 855, 8, 63, 10, 63, 12, 63, 858, 9, 63, 1, 64, 1, 64, 1, 65, 1, 65, 1, 65, 1,
    65, 3, 65, 866, 8, 65, 1, 65, 1, 65, 3, 65, 870, 8, 65, 1, 66, 3, 66, 873, 8, 66, 1, 66, 1, 66, 1,
    66, 3, 66, 878, 8, 66, 1, 66, 5, 66, 881, 8, 66, 10, 66, 12, 66, 884, 9, 66, 1, 67, 1, 67, 1, 67,
    1, 68, 4, 68, 890, 8, 68, 11, 68, 12, 68, 891, 1, 69, 1, 69, 1, 69, 1, 69, 1, 69, 1, 69, 3, 69, 900,
    8, 69, 1, 70, 1, 70, 1, 70, 1, 70, 1, 70, 4, 70, 907, 8, 70, 11, 70, 12, 70, 908, 1, 70, 1, 70, 1,
    70, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 1, 71, 5, 71, 926,
    8, 71, 10, 71, 12, 71, 929, 9, 71, 3, 71, 931, 8, 71, 1, 71, 1, 71, 1, 71, 1, 71, 5, 71, 937, 8,
    71, 10, 71, 12, 71, 940, 9, 71, 3, 71, 942, 8, 71, 5, 71, 944, 8, 71, 10, 71, 12, 71, 947, 9, 71,
    1, 71, 1, 71, 3, 71, 951, 8, 71, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1, 72, 1,
    72, 1, 72, 3, 72, 964, 8, 72, 1, 73, 1, 73, 3, 73, 968, 8, 73, 1, 73, 1, 73, 1, 74, 4, 74, 973, 8,
    74, 11, 74, 12, 74, 974, 1, 75, 1, 75, 3, 75, 979, 8, 75, 1, 76, 3, 76, 982, 8, 76, 1, 76, 1, 76,
    1, 77, 1, 77, 1, 77, 1, 77, 1, 77, 1, 77, 1, 77, 3, 77, 993, 8, 77, 1, 77, 1, 77, 1, 77, 1, 77, 1,
    77, 1, 77, 3, 77, 1001, 8, 77, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78,
    1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 1, 78, 3, 78, 1023, 8, 78, 1, 79, 1,
    79, 3, 79, 1027, 8, 79, 3, 79, 1029, 8, 79, 1, 79, 1, 79, 3, 79, 1033, 8, 79, 1, 79, 1, 79, 3, 79,
    1037, 8, 79, 1, 80, 1, 80, 3, 80, 1041, 8, 80, 1, 81, 1, 81, 1, 81, 5, 81, 1046, 8, 81, 10, 81,
    12, 81, 1049, 9, 81, 1, 82, 1, 82, 1, 82, 1, 82, 1, 82, 3, 82, 1056, 8, 82, 1, 82, 1, 82, 3, 82,
    1060, 8, 82, 1, 82, 1, 82, 1, 83, 3, 83, 1065, 8, 83, 1, 83, 1, 83, 1, 84, 4, 84, 1070, 8, 84, 11,
    84, 12, 84, 1071, 1, 85, 1, 85, 1, 85, 1, 85, 3, 85, 1078, 8, 85, 1, 86, 3, 86, 1081, 8, 86, 1,
    86, 1, 86, 3, 86, 1085, 8, 86, 1, 86, 1, 86, 1, 87, 4, 87, 1090, 8, 87, 11, 87, 12, 87, 1091, 1,
    87, 0, 2, 96, 126, 88, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38,
    40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86,
    88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126,
    128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162,
    164, 166, 168, 170, 172, 174, 0, 24, 1, 0, 108, 109, 2, 0, 78, 78, 80, 80, 3, 0, 45, 45, 78, 78,
    80, 80, 2, 0, 45, 45, 56, 56, 5, 0, 77, 77, 79, 79, 81, 81, 84, 84, 89, 90, 1, 0, 81, 83, 2, 0, 77,
    77, 79, 79, 1, 0, 75, 76, 1, 0, 71, 74, 1, 0, 106, 107, 1, 0, 95, 105, 6, 0, 21, 21, 32, 32, 40,
    40, 46, 46, 49, 49, 64, 64, 8, 0, 4, 6, 24, 24, 29, 29, 33, 33, 38, 39, 43, 44, 51, 52, 58, 59,
    1, 0, 4, 6, 2, 0, 47, 47, 50, 50, 4, 0, 25, 25, 41, 41, 53, 53, 57, 57, 3, 0, 8, 9, 37, 37, 62, 62,
    2, 0, 9, 9, 11, 15, 2, 0, 65, 66, 94, 94, 1, 0, 65, 66, 2, 0, 81, 81, 88, 88, 2, 0, 16, 16, 18, 18,
    2, 0, 19, 19, 53, 53, 2, 0, 22, 22, 26, 26, 1186, 0, 209, 1, 0, 0, 0, 2, 211, 1, 0, 0, 0, 4, 218,
    1, 0, 0, 0, 6, 228, 1, 0, 0, 0, 8, 247, 1, 0, 0, 0, 10, 266, 1, 0, 0, 0, 12, 277, 1, 0, 0, 0, 14, 293,
    1, 0, 0, 0, 16, 305, 1, 0, 0, 0, 18, 307, 1, 0, 0, 0, 20, 315, 1, 0, 0, 0, 22, 323, 1, 0, 0, 0, 24,
    331, 1, 0, 0, 0, 26, 339, 1, 0, 0, 0, 28, 347, 1, 0, 0, 0, 30, 355, 1, 0, 0, 0, 32, 363, 1, 0, 0, 0,
    34, 371, 1, 0, 0, 0, 36, 379, 1, 0, 0, 0, 38, 387, 1, 0, 0, 0, 40, 401, 1, 0, 0, 0, 42, 403, 1, 0,
    0, 0, 44, 405, 1, 0, 0, 0, 46, 413, 1, 0, 0, 0, 48, 422, 1, 0, 0, 0, 50, 425, 1, 0, 0, 0, 52, 430,
    1, 0, 0, 0, 54, 439, 1, 0, 0, 0, 56, 441, 1, 0, 0, 0, 58, 449, 1, 0, 0, 0, 60, 454, 1, 0, 0, 0, 62,
    470, 1, 0, 0, 0, 64, 483, 1, 0, 0, 0, 66, 485, 1, 0, 0, 0, 68, 488, 1, 0, 0, 0, 70, 500, 1, 0, 0, 0,
    72, 504, 1, 0, 0, 0, 74, 509, 1, 0, 0, 0, 76, 523, 1, 0, 0, 0, 78, 538, 1, 0, 0, 0, 80, 540, 1, 0,
    0, 0, 82, 548, 1, 0, 0, 0, 84, 553, 1, 0, 0, 0, 86, 555, 1, 0, 0, 0, 88, 560, 1, 0, 0, 0, 90, 568,
    1, 0, 0, 0, 92, 570, 1, 0, 0, 0, 94, 579, 1, 0, 0, 0, 96, 605, 1, 0, 0, 0, 98, 655, 1, 0, 0, 0, 100,
    666, 1, 0, 0, 0, 102, 668, 1, 0, 0, 0, 104, 676, 1, 0, 0, 0, 106, 687, 1, 0, 0, 0, 108, 702, 1, 0,
    0, 0, 110, 709, 1, 0, 0, 0, 112, 714, 1, 0, 0, 0, 114, 718, 1, 0, 0, 0, 116, 723, 1, 0, 0, 0, 118,
    738, 1, 0, 0, 0, 120, 740, 1, 0, 0, 0, 122, 748, 1, 0, 0, 0, 124, 763, 1, 0, 0, 0, 126, 811, 1, 0,
    0, 0, 128, 859, 1, 0, 0, 0, 130, 869, 1, 0, 0, 0, 132, 872, 1, 0, 0, 0, 134, 885, 1, 0, 0, 0, 136,
    889, 1, 0, 0, 0, 138, 899, 1, 0, 0, 0, 140, 901, 1, 0, 0, 0, 142, 950, 1, 0, 0, 0, 144, 963, 1, 0,
    0, 0, 146, 965, 1, 0, 0, 0, 148, 972, 1, 0, 0, 0, 150, 978, 1, 0, 0, 0, 152, 981, 1, 0, 0, 0, 154,
    1000, 1, 0, 0, 0, 156, 1022, 1, 0, 0, 0, 158, 1028, 1, 0, 0, 0, 160, 1038, 1, 0, 0, 0, 162, 1042,
    1, 0, 0, 0, 164, 1059, 1, 0, 0, 0, 166, 1064, 1, 0, 0, 0, 168, 1069, 1, 0, 0, 0, 170, 1077, 1, 0,
    0, 0, 172, 1080, 1, 0, 0, 0, 174, 1089, 1, 0, 0, 0, 176, 210, 5, 111, 0, 0, 177, 210, 5, 112, 0,
    0, 178, 180, 5, 114, 0, 0, 179, 178, 1, 0, 0, 0, 180, 181, 1, 0, 0, 0, 181, 179, 1, 0, 0, 0, 181,
    182, 1, 0, 0, 0, 182, 210, 1, 0, 0, 0, 183, 184, 5, 65, 0, 0, 184, 185, 3, 44, 22, 0, 185, 186,
    5, 66, 0, 0, 186, 210, 1, 0, 0, 0, 187, 210, 3, 2, 1, 0, 188, 190, 5, 1, 0, 0, 189, 188, 1, 0, 0,
    0, 189, 190, 1, 0, 0, 0, 190, 191, 1, 0, 0, 0, 191, 192, 5, 65, 0, 0, 192, 193, 3, 146, 73, 0, 193,
    194, 5, 66, 0, 0, 194, 210, 1, 0, 0, 0, 195, 196, 5, 2, 0, 0, 196, 197, 5, 65, 0, 0, 197, 198, 3,
    12, 6, 0, 198, 199, 5, 94, 0, 0, 199, 200, 3, 122, 61, 0, 200, 201, 5, 66, 0, 0, 201, 210, 1, 0,
    0, 0, 202, 203, 5, 3, 0, 0, 203, 204, 5, 65, 0, 0, 204, 205, 3, 122, 61, 0, 205, 206, 5, 94, 0,
    0, 206, 207, 3, 12, 6, 0, 207, 208, 5, 66, 0, 0, 208, 210, 1, 0, 0, 0, 209, 176, 1, 0, 0, 0, 209,
    177, 1, 0, 0, 0, 209, 179, 1, 0, 0, 0, 209, 183, 1, 0, 0, 0, 209, 187, 1, 0, 0, 0, 209, 189, 1, 0,
    0, 0, 209, 195, 1, 0, 0, 0, 209, 202, 1, 0, 0, 0, 210, 1, 1, 0, 0, 0, 211, 212, 5, 60, 0, 0, 212,
    213, 5, 65, 0, 0, 213, 214, 3, 40, 20, 0, 214, 215, 5, 94, 0, 0, 215, 216, 3, 4, 2, 0, 216, 217,
    5, 66, 0, 0, 217, 3, 1, 0, 0, 0, 218, 223, 3, 6, 3, 0, 219, 220, 5, 94, 0, 0, 220, 222, 3, 6, 3, 0,
    221, 219, 1, 0, 0, 0, 222, 225, 1, 0, 0, 0, 223, 221, 1, 0, 0, 0, 223, 224, 1, 0, 0, 0, 224, 5, 1,
    0, 0, 0, 225, 223, 1, 0, 0, 0, 226, 229, 3, 122, 61, 0, 227, 229, 5, 27, 0, 0, 228, 226, 1, 0, 0,
    0, 228, 227, 1, 0, 0, 0, 229, 230, 1, 0, 0, 0, 230, 231, 5, 92, 0, 0, 231, 232, 3, 40, 20, 0, 232,
    7, 1, 0, 0, 0, 233, 248, 3, 0, 0, 0, 234, 236, 5, 1, 0, 0, 235, 234, 1, 0, 0, 0, 235, 236, 1, 0, 0,
    0, 236, 237, 1, 0, 0, 0, 237, 238, 5, 65, 0, 0, 238, 239, 3, 122, 61, 0, 239, 240, 5, 66, 0, 0,
    240, 241, 5, 69, 0, 0, 241, 243, 3, 132, 66, 0, 242, 244, 5, 94, 0, 0, 243, 242, 1, 0, 0, 0, 243,
    244, 1, 0, 0, 0, 244, 245, 1, 0, 0, 0, 245, 246, 5, 70, 0, 0, 246, 248, 1, 0, 0, 0, 247, 233, 1,
    0, 0, 0, 247, 235, 1, 0, 0, 0, 248, 263, 1, 0, 0, 0, 249, 250, 5, 67, 0, 0, 250, 251, 3, 44, 22,
    0, 251, 252, 5, 68, 0, 0, 252, 262, 1, 0, 0, 0, 253, 255, 5, 65, 0, 0, 254, 256, 3, 10, 5, 0, 255,
    254, 1, 0, 0, 0, 255, 256, 1, 0, 0, 0, 256, 257, 1, 0, 0, 0, 257, 262, 5, 66, 0, 0, 258, 259, 7,
    0, 0, 0, 259, 262, 5, 111, 0, 0, 260, 262, 7, 1, 0, 0, 261, 249, 1, 0, 0, 0, 261, 253, 1, 0, 0, 0,
    261, 258, 1, 0, 0, 0, 261, 260, 1, 0, 0, 0, 262, 265, 1, 0, 0, 0, 263, 261, 1, 0, 0, 0, 263, 264,
    1, 0, 0, 0, 264, 9, 1, 0, 0, 0, 265, 263, 1, 0, 0, 0, 266, 271, 3, 40, 20, 0, 267, 268, 5, 94, 0,
    0, 268, 270, 3, 40, 20, 0, 269, 267, 1, 0, 0, 0, 270, 273, 1, 0, 0, 0, 271, 269, 1, 0, 0, 0, 271,
    272, 1, 0, 0, 0, 272, 11, 1, 0, 0, 0, 273, 271, 1, 0, 0, 0, 274, 276, 7, 2, 0, 0, 275, 274, 1, 0,
    0, 0, 276, 279, 1, 0, 0, 0, 277, 275, 1, 0, 0, 0, 277, 278, 1, 0, 0, 0, 278, 291, 1, 0, 0, 0, 279,
    277, 1, 0, 0, 0, 280, 292, 3, 8, 4, 0, 281, 282, 3, 14, 7, 0, 282, 283, 3, 16, 8, 0, 283, 292, 1,
    0, 0, 0, 284, 285, 7, 3, 0, 0, 285, 286, 5, 65, 0, 0, 286, 287, 3, 122, 61, 0, 287, 288, 5, 66,
    0, 0, 288, 292, 1, 0, 0, 0, 289, 290, 5, 86, 0, 0, 290, 292, 5, 111, 0, 0, 291, 280, 1, 0, 0, 0,
    291, 281, 1, 0, 0, 0, 291, 284, 1, 0, 0, 0, 291, 289, 1, 0, 0, 0, 292, 13, 1, 0, 0, 0, 293, 294,
    7, 4, 0, 0, 294, 15, 1, 0, 0, 0, 295, 297, 5, 1, 0, 0, 296, 295, 1, 0, 0, 0, 296, 297, 1, 0, 0, 0,
    297, 298, 1, 0, 0, 0, 298, 299, 5, 65, 0, 0, 299, 300, 3, 122, 61, 0, 300, 301, 5, 66, 0, 0, 301,
    302, 3, 16, 8, 0, 302, 306, 1, 0, 0, 0, 303, 306, 3, 12, 6, 0, 304, 306, 5, 113, 0, 0, 305, 296,
    1, 0, 0, 0, 305, 303, 1, 0, 0, 0, 305, 304, 1, 0, 0, 0, 306, 17, 1, 0, 0, 0, 307, 312, 3, 16, 8, 0,
    308, 309, 7, 5, 0, 0, 309, 311, 3, 16, 8, 0, 310, 308, 1, 0, 0, 0, 311, 314, 1, 0, 0, 0, 312, 310,
    1, 0, 0, 0, 312, 313, 1, 0, 0, 0, 313, 19, 1, 0, 0, 0, 314, 312, 1, 0, 0, 0, 315, 320, 3, 18, 9, 0,
    316, 317, 7, 6, 0, 0, 317, 319, 3, 18, 9, 0, 318, 316, 1, 0, 0, 0, 319, 322, 1, 0, 0, 0, 320, 318,
    1, 0, 0, 0, 320, 321, 1, 0, 0, 0, 321, 21, 1, 0, 0, 0, 322, 320, 1, 0, 0, 0, 323, 328, 3, 20, 10,
    0, 324, 325, 7, 7, 0, 0, 325, 327, 3, 20, 10, 0, 326, 324, 1, 0, 0, 0, 327, 330, 1, 0, 0, 0, 328,
    326, 1, 0, 0, 0, 328, 329, 1, 0, 0, 0, 329, 23, 1, 0, 0, 0, 330, 328, 1, 0, 0, 0, 331, 336, 3, 22,
    11, 0, 332, 333, 7, 8, 0, 0, 333, 335, 3, 22, 11, 0, 334, 332, 1, 0, 0, 0, 335, 338, 1, 0, 0, 0,
    336, 334, 1, 0, 0, 0, 336, 337, 1, 0, 0, 0, 337, 25, 1, 0, 0, 0, 338, 336, 1, 0, 0, 0, 339, 344,
    3, 24, 12, 0, 340, 341, 7, 9, 0, 0, 341, 343, 3, 24, 12, 0, 342, 340, 1, 0, 0, 0, 343, 346, 1, 0,
    0, 0, 344, 342, 1, 0, 0, 0, 344, 345, 1, 0, 0, 0, 345, 27, 1, 0, 0, 0, 346, 344, 1, 0, 0, 0, 347,
    352, 3, 26, 13, 0, 348, 349, 5, 84, 0, 0, 349, 351, 3, 26, 13, 0, 350, 348, 1, 0, 0, 0, 351, 354,
    1, 0, 0, 0, 352, 350, 1, 0, 0, 0, 352, 353, 1, 0, 0, 0, 353, 29, 1, 0, 0, 0, 354, 352, 1, 0, 0, 0,
    355, 360, 3, 28, 14, 0, 356, 357, 5, 88, 0, 0, 357, 359, 3, 28, 14, 0, 358, 356, 1, 0, 0, 0, 359,
    362, 1, 0, 0, 0, 360, 358, 1, 0, 0, 0, 360, 361, 1, 0, 0, 0, 361, 31, 1, 0, 0, 0, 362, 360, 1, 0,
    0, 0, 363, 368, 3, 30, 15, 0, 364, 365, 5, 85, 0, 0, 365, 367, 3, 30, 15, 0, 366, 364, 1, 0, 0,
    0, 367, 370, 1, 0, 0, 0, 368, 366, 1, 0, 0, 0, 368, 369, 1, 0, 0, 0, 369, 33, 1, 0, 0, 0, 370, 368,
    1, 0, 0, 0, 371, 376, 3, 32, 16, 0, 372, 373, 5, 86, 0, 0, 373, 375, 3, 32, 16, 0, 374, 372, 1,
    0, 0, 0, 375, 378, 1, 0, 0, 0, 376, 374, 1, 0, 0, 0, 376, 377, 1, 0, 0, 0, 377, 35, 1, 0, 0, 0, 378,
    376, 1, 0, 0, 0, 379, 384, 3, 34, 17, 0, 380, 381, 5, 87, 0, 0, 381, 383, 3, 34, 17, 0, 382, 380,
    1, 0, 0, 0, 383, 386, 1, 0, 0, 0, 384, 382, 1, 0, 0, 0, 384, 385, 1, 0, 0, 0, 385, 37, 1, 0, 0, 0,
    386, 384, 1, 0, 0, 0, 387, 393, 3, 36, 18, 0, 388, 389, 5, 91, 0, 0, 389, 390, 3, 44, 22, 0, 390,
    391, 5, 92, 0, 0, 391, 392, 3, 38, 19, 0, 392, 394, 1, 0, 0, 0, 393, 388, 1, 0, 0, 0, 393, 394,
    1, 0, 0, 0, 394, 39, 1, 0, 0, 0, 395, 402, 3, 38, 19, 0, 396, 397, 3, 12, 6, 0, 397, 398, 3, 42,
    21, 0, 398, 399, 3, 40, 20, 0, 399, 402, 1, 0, 0, 0, 400, 402, 5, 113, 0, 0, 401, 395, 1, 0, 0,
    0, 401, 396, 1, 0, 0, 0, 401, 400, 1, 0, 0, 0, 402, 41, 1, 0, 0, 0, 403, 404, 7, 10, 0, 0, 404, 43,
    1, 0, 0, 0, 405, 410, 3, 40, 20, 0, 406, 407, 5, 94, 0, 0, 407, 409, 3, 40, 20, 0, 408, 406, 1,
    0, 0, 0, 409, 412, 1, 0, 0, 0, 410, 408, 1, 0, 0, 0, 410, 411, 1, 0, 0, 0, 411, 45, 1, 0, 0, 0, 412,
    410, 1, 0, 0, 0, 413, 414, 3, 38, 19, 0, 414, 47, 1, 0, 0, 0, 415, 417, 3, 50, 25, 0, 416, 418,
    3, 56, 28, 0, 417, 416, 1, 0, 0, 0, 417, 418, 1, 0, 0, 0, 418, 419, 1, 0, 0, 0, 419, 420, 5, 93,
    0, 0, 420, 423, 1, 0, 0, 0, 421, 423, 3, 140, 70, 0, 422, 415, 1, 0, 0, 0, 422, 421, 1, 0, 0, 0,
    423, 49, 1, 0, 0, 0, 424, 426, 3, 54, 27, 0, 425, 424, 1, 0, 0, 0, 426, 427, 1, 0, 0, 0, 427, 425,
    1, 0, 0, 0, 427, 428, 1, 0, 0, 0, 428, 51, 1, 0, 0, 0, 429, 431, 3, 54, 27, 0, 430, 429, 1, 0, 0,
    0, 431, 432, 1, 0, 0, 0, 432, 430, 1, 0, 0, 0, 432, 433, 1, 0, 0, 0, 433, 53, 1, 0, 0, 0, 434, 440,
    3, 60, 30, 0, 435, 440, 3, 62, 31, 0, 436, 440, 3, 88, 44, 0, 437, 440, 3, 90, 45, 0, 438, 440,
    3, 92, 46, 0, 439, 434, 1, 0, 0, 0, 439, 435, 1, 0, 0, 0, 439, 436, 1, 0, 0, 0, 439, 437, 1, 0, 0,
    0, 439, 438, 1, 0, 0, 0, 440, 55, 1, 0, 0, 0, 441, 446, 3, 58, 29, 0, 442, 443, 5, 94, 0, 0, 443,
    445, 3, 58, 29, 0, 444, 442, 1, 0, 0, 0, 445, 448, 1, 0, 0, 0, 446, 444, 1, 0, 0, 0, 446, 447, 1,
    0, 0, 0, 447, 57, 1, 0, 0, 0, 448, 446, 1, 0, 0, 0, 449, 452, 3, 94, 47, 0, 450, 451, 5, 95, 0, 0,
    451, 453, 3, 130, 65, 0, 452, 450, 1, 0, 0, 0, 452, 453, 1, 0, 0, 0, 453, 59, 1, 0, 0, 0, 454, 455,
    7, 11, 0, 0, 455, 61, 1, 0, 0, 0, 456, 471, 7, 12, 0, 0, 457, 458, 5, 1, 0, 0, 458, 459, 5, 65, 0,
    0, 459, 460, 7, 13, 0, 0, 460, 471, 5, 66, 0, 0, 461, 471, 3, 86, 43, 0, 462, 471, 3, 64, 32, 0,
    463, 471, 3, 78, 39, 0, 464, 471, 3, 128, 64, 0, 465, 466, 5, 7, 0, 0, 466, 467, 5, 65, 0, 0, 467,
    468, 3, 46, 23, 0, 468, 469, 5, 66, 0, 0, 469, 471, 1, 0, 0, 0, 470, 456, 1, 0, 0, 0, 470, 457,
    1, 0, 0, 0, 470, 461, 1, 0, 0, 0, 470, 462, 1, 0, 0, 0, 470, 463, 1, 0, 0, 0, 470, 464, 1, 0, 0, 0,
    470, 465, 1, 0, 0, 0, 471, 63, 1, 0, 0, 0, 472, 474, 3, 66, 33, 0, 473, 475, 5, 111, 0, 0, 474,
    473, 1, 0, 0, 0, 474, 475, 1, 0, 0, 0, 475, 476, 1, 0, 0, 0, 476, 477, 5, 69, 0, 0, 477, 478, 3,
    68, 34, 0, 478, 479, 5, 70, 0, 0, 479, 484, 1, 0, 0, 0, 480, 481, 3, 66, 33, 0, 481, 482, 5, 111,
    0, 0, 482, 484, 1, 0, 0, 0, 483, 472, 1, 0, 0, 0, 483, 480, 1, 0, 0, 0, 484, 65, 1, 0, 0, 0, 485,
    486, 7, 14, 0, 0, 486, 67, 1, 0, 0, 0, 487, 489, 3, 70, 35, 0, 488, 487, 1, 0, 0, 0, 489, 490, 1,
    0, 0, 0, 490, 488, 1, 0, 0, 0, 490, 491, 1, 0, 0, 0, 491, 69, 1, 0, 0, 0, 492, 493, 3, 72, 36, 0,
    493, 494, 3, 74, 37, 0, 494, 495, 5, 93, 0, 0, 495, 501, 1, 0, 0, 0, 496, 497, 3, 72, 36, 0, 497,
    498, 5, 93, 0, 0, 498, 501, 1, 0, 0, 0, 499, 501, 3, 140, 70, 0, 500, 492, 1, 0, 0, 0, 500, 496,
    1, 0, 0, 0, 500, 499, 1, 0, 0, 0, 501, 71, 1, 0, 0, 0, 502, 505, 3, 62, 31, 0, 503, 505, 3, 88, 44,
    0, 504, 502, 1, 0, 0, 0, 504, 503, 1, 0, 0, 0, 505, 507, 1, 0, 0, 0, 506, 508, 3, 72, 36, 0, 507,
    506, 1, 0, 0, 0, 507, 508, 1, 0, 0, 0, 508, 73, 1, 0, 0, 0, 509, 514, 3, 76, 38, 0, 510, 511, 5,
    94, 0, 0, 511, 513, 3, 76, 38, 0, 512, 510, 1, 0, 0, 0, 513, 516, 1, 0, 0, 0, 514, 512, 1, 0, 0,
    0, 514, 515, 1, 0, 0, 0, 515, 75, 1, 0, 0, 0, 516, 514, 1, 0, 0, 0, 517, 524, 3, 94, 47, 0, 518,
    520, 3, 94, 47, 0, 519, 518, 1, 0, 0, 0, 519, 520, 1, 0, 0, 0, 520, 521, 1, 0, 0, 0, 521, 522, 5,
    92, 0, 0, 522, 524, 3, 46, 23, 0, 523, 517, 1, 0, 0, 0, 523, 519, 1, 0, 0, 0, 524, 77, 1, 0, 0, 0,
    525, 527, 5, 31, 0, 0, 526, 528, 5, 111, 0, 0, 527, 526, 1, 0, 0, 0, 527, 528, 1, 0, 0, 0, 528,
    529, 1, 0, 0, 0, 529, 530, 5, 69, 0, 0, 530, 532, 3, 80, 40, 0, 531, 533, 5, 94, 0, 0, 532, 531,
    1, 0, 0, 0, 532, 533, 1, 0, 0, 0, 533, 534, 1, 0, 0, 0, 534, 535, 5, 70, 0, 0, 535, 539, 1, 0, 0,
    0, 536, 537, 5, 31, 0, 0, 537, 539, 5, 111, 0, 0, 538, 525, 1, 0, 0, 0, 538, 536, 1, 0, 0, 0, 539,
    79, 1, 0, 0, 0, 540, 545, 3, 82, 41, 0, 541, 542, 5, 94, 0, 0, 542, 544, 3, 82, 41, 0, 543, 541,
    1, 0, 0, 0, 544, 547, 1, 0, 0, 0, 545, 543, 1, 0, 0, 0, 545, 546, 1, 0, 0, 0, 546, 81, 1, 0, 0, 0,
    547, 545, 1, 0, 0, 0, 548, 551, 3, 84, 42, 0, 549, 550, 5, 95, 0, 0, 550, 552, 3, 46, 23, 0, 551,
    549, 1, 0, 0, 0, 551, 552, 1, 0, 0, 0, 552, 83, 1, 0, 0, 0, 553, 554, 5, 111, 0, 0, 554, 85, 1, 0,
    0, 0, 555, 556, 5, 57, 0, 0, 556, 557, 5, 65, 0, 0, 557, 558, 3, 122, 61, 0, 558, 559, 5, 66, 0,
    0, 559, 87, 1, 0, 0, 0, 560, 561, 7, 15, 0, 0, 561, 89, 1, 0, 0, 0, 562, 569, 7, 16, 0, 0, 563, 569,
    3, 102, 51, 0, 564, 565, 5, 10, 0, 0, 565, 566, 5, 65, 0, 0, 566, 567, 5, 111, 0, 0, 567, 569,
    5, 66, 0, 0, 568, 562, 1, 0, 0, 0, 568, 563, 1, 0, 0, 0, 568, 564, 1, 0, 0, 0, 569, 91, 1, 0, 0, 0,
    570, 571, 5, 55, 0, 0, 571, 574, 5, 65, 0, 0, 572, 575, 3, 122, 61, 0, 573, 575, 3, 46, 23, 0,
    574, 572, 1, 0, 0, 0, 574, 573, 1, 0, 0, 0, 575, 576, 1, 0, 0, 0, 576, 577, 5, 66, 0, 0, 577, 93,
    1, 0, 0, 0, 578, 580, 3, 110, 55, 0, 579, 578, 1, 0, 0, 0, 579, 580, 1, 0, 0, 0, 580, 581, 1, 0,
    0, 0, 581, 585, 3, 96, 48, 0, 582, 584, 3, 100, 50, 0, 583, 582, 1, 0, 0, 0, 584, 587, 1, 0, 0,
    0, 585, 583, 1, 0, 0, 0, 585, 586, 1, 0, 0, 0, 586, 95, 1, 0, 0, 0, 587, 585, 1, 0, 0, 0, 588, 589,
    6, 48, -1, 0, 589, 606, 5, 111, 0, 0, 590, 591, 5, 65, 0, 0, 591, 592, 3, 94, 47, 0, 592, 593,
    5, 66, 0, 0, 593, 606, 1, 0, 0, 0, 594, 595, 5, 111, 0, 0, 595, 596, 5, 92, 0, 0, 596, 606, 5, 113,
    0, 0, 597, 598, 3, 98, 49, 0, 598, 599, 5, 111, 0, 0, 599, 606, 1, 0, 0, 0, 600, 601, 5, 65, 0,
    0, 601, 602, 3, 98, 49, 0, 602, 603, 3, 94, 47, 0, 603, 604, 5, 66, 0, 0, 604, 606, 1, 0, 0, 0,
    605, 588, 1, 0, 0, 0, 605, 590, 1, 0, 0, 0, 605, 594, 1, 0, 0, 0, 605, 597, 1, 0, 0, 0, 605, 600,
    1, 0, 0, 0, 606, 652, 1, 0, 0, 0, 607, 608, 10, 9, 0, 0, 608, 610, 5, 67, 0, 0, 609, 611, 3, 112,
    56, 0, 610, 609, 1, 0, 0, 0, 610, 611, 1, 0, 0, 0, 611, 613, 1, 0, 0, 0, 612, 614, 3, 40, 20, 0,
    613, 612, 1, 0, 0, 0, 613, 614, 1, 0, 0, 0, 614, 615, 1, 0, 0, 0, 615, 651, 5, 68, 0, 0, 616, 617,
    10, 8, 0, 0, 617, 618, 5, 67, 0, 0, 618, 620, 5, 46, 0, 0, 619, 621, 3, 112, 56, 0, 620, 619, 1,
    0, 0, 0, 620, 621, 1, 0, 0, 0, 621, 622, 1, 0, 0, 0, 622, 623, 3, 40, 20, 0, 623, 624, 5, 68, 0,
    0, 624, 651, 1, 0, 0, 0, 625, 626, 10, 7, 0, 0, 626, 627, 5, 67, 0, 0, 627, 628, 3, 112, 56, 0,
    628, 629, 5, 46, 0, 0, 629, 630, 3, 40, 20, 0, 630, 631, 5, 68, 0, 0, 631, 651, 1, 0, 0, 0, 632,
    633, 10, 6, 0, 0, 633, 635, 5, 67, 0, 0, 634, 636, 3, 112, 56, 0, 635, 634, 1, 0, 0, 0, 635, 636,
    1, 0, 0, 0, 636, 637, 1, 0, 0, 0, 637, 638, 5, 81, 0, 0, 638, 651, 5, 68, 0, 0, 639, 640, 10, 5,
    0, 0, 640, 641, 5, 65, 0, 0, 641, 642, 3, 114, 57, 0, 642, 643, 5, 66, 0, 0, 643, 651, 1, 0, 0,
    0, 644, 645, 10, 4, 0, 0, 645, 647, 5, 65, 0, 0, 646, 648, 3, 120, 60, 0, 647, 646, 1, 0, 0, 0,
    647, 648, 1, 0, 0, 0, 648, 649, 1, 0, 0, 0, 649, 651, 5, 66, 0, 0, 650, 607, 1, 0, 0, 0, 650, 616,
    1, 0, 0, 0, 650, 625, 1, 0, 0, 0, 650, 632, 1, 0, 0, 0, 650, 639, 1, 0, 0, 0, 650, 644, 1, 0, 0, 0,
    651, 654, 1, 0, 0, 0, 652, 650, 1, 0, 0, 0, 652, 653, 1, 0, 0, 0, 653, 97, 1, 0, 0, 0, 654, 652,
    1, 0, 0, 0, 655, 656, 7, 17, 0, 0, 656, 99, 1, 0, 0, 0, 657, 658, 5, 16, 0, 0, 658, 660, 5, 65, 0,
    0, 659, 661, 5, 114, 0, 0, 660, 659, 1, 0, 0, 0, 661, 662, 1, 0, 0, 0, 662, 660, 1, 0, 0, 0, 662,
    663, 1, 0, 0, 0, 663, 664, 1, 0, 0, 0, 664, 667, 5, 66, 0, 0, 665, 667, 3, 102, 51, 0, 666, 657,
    1, 0, 0, 0, 666, 665, 1, 0, 0, 0, 667, 101, 1, 0, 0, 0, 668, 669, 5, 17, 0, 0, 669, 670, 5, 65, 0,
    0, 670, 671, 5, 65, 0, 0, 671, 672, 3, 104, 52, 0, 672, 673, 5, 66, 0, 0, 673, 674, 5, 66, 0, 0,
    674, 103, 1, 0, 0, 0, 675, 677, 3, 106, 53, 0, 676, 675, 1, 0, 0, 0, 676, 677, 1, 0, 0, 0, 677,
    684, 1, 0, 0, 0, 678, 680, 5, 94, 0, 0, 679, 681, 3, 106, 53, 0, 680, 679, 1, 0, 0, 0, 680, 681,
    1, 0, 0, 0, 681, 683, 1, 0, 0, 0, 682, 678, 1, 0, 0, 0, 683, 686, 1, 0, 0, 0, 684, 682, 1, 0, 0, 0,
    684, 685, 1, 0, 0, 0, 685, 105, 1, 0, 0, 0, 686, 684, 1, 0, 0, 0, 687, 693, 8, 18, 0, 0, 688, 690,
    5, 65, 0, 0, 689, 691, 3, 10, 5, 0, 690, 689, 1, 0, 0, 0, 690, 691, 1, 0, 0, 0, 691, 692, 1, 0, 0,
    0, 692, 694, 5, 66, 0, 0, 693, 688, 1, 0, 0, 0, 693, 694, 1, 0, 0, 0, 694, 107, 1, 0, 0, 0, 695,
    701, 8, 19, 0, 0, 696, 697, 5, 65, 0, 0, 697, 698, 3, 108, 54, 0, 698, 699, 5, 66, 0, 0, 699, 701,
    1, 0, 0, 0, 700, 695, 1, 0, 0, 0, 700, 696, 1, 0, 0, 0, 701, 704, 1, 0, 0, 0, 702, 700, 1, 0, 0, 0,
    702, 703, 1, 0, 0, 0, 703, 109, 1, 0, 0, 0, 704, 702, 1, 0, 0, 0, 705, 707, 7, 20, 0, 0, 706, 708,
    3, 112, 56, 0, 707, 706, 1, 0, 0, 0, 707, 708, 1, 0, 0, 0, 708, 710, 1, 0, 0, 0, 709, 705, 1, 0,
    0, 0, 710, 711, 1, 0, 0, 0, 711, 709, 1, 0, 0, 0, 711, 712, 1, 0, 0, 0, 712, 111, 1, 0, 0, 0, 713,
    715, 3, 88, 44, 0, 714, 713, 1, 0, 0, 0, 715, 716, 1, 0, 0, 0, 716, 714, 1, 0, 0, 0, 716, 717, 1,
    0, 0, 0, 717, 113, 1, 0, 0, 0, 718, 721, 3, 116, 58, 0, 719, 720, 5, 94, 0, 0, 720, 722, 5, 110,
    0, 0, 721, 719, 1, 0, 0, 0, 721, 722, 1, 0, 0, 0, 722, 115, 1, 0, 0, 0, 723, 728, 3, 118, 59, 0,
    724, 725, 5, 94, 0, 0, 725, 727, 3, 118, 59, 0, 726, 724, 1, 0, 0, 0, 727, 730, 1, 0, 0, 0, 728,
    726, 1, 0, 0, 0, 728, 729, 1, 0, 0, 0, 729, 117, 1, 0, 0, 0, 730, 728, 1, 0, 0, 0, 731, 732, 3, 50,
    25, 0, 732, 733, 3, 94, 47, 0, 733, 739, 1, 0, 0, 0, 734, 736, 3, 52, 26, 0, 735, 737, 3, 124,
    62, 0, 736, 735, 1, 0, 0, 0, 736, 737, 1, 0, 0, 0, 737, 739, 1, 0, 0, 0, 738, 731, 1, 0, 0, 0, 738,
    734, 1, 0, 0, 0, 739, 119, 1, 0, 0, 0, 740, 745, 5, 111, 0, 0, 741, 742, 5, 94, 0, 0, 742, 744,
    5, 111, 0, 0, 743, 741, 1, 0, 0, 0, 744, 747, 1, 0, 0, 0, 745, 743, 1, 0, 0, 0, 745, 746, 1, 0, 0,
    0, 746, 121, 1, 0, 0, 0, 747, 745, 1, 0, 0, 0, 748, 750, 3, 72, 36, 0, 749, 751, 3, 124, 62, 0,
    750, 749, 1, 0, 0, 0, 750, 751, 1, 0, 0, 0, 751, 123, 1, 0, 0, 0, 752, 764, 3, 110, 55, 0, 753,
    755, 3, 110, 55, 0, 754, 753, 1, 0, 0, 0, 754, 755, 1, 0, 0, 0, 755, 756, 1, 0, 0, 0, 756, 760,
    3, 126, 63, 0, 757, 759, 3, 100, 50, 0, 758, 757, 1, 0, 0, 0, 759, 762, 1, 0, 0, 0, 760, 758, 1,
    0, 0, 0, 760, 761, 1, 0, 0, 0, 761, 764, 1, 0, 0, 0, 762, 760, 1, 0, 0, 0, 763, 752, 1, 0, 0, 0, 763,
    754, 1, 0, 0, 0, 764, 125, 1, 0, 0, 0, 765, 766, 6, 63, -1, 0, 766, 767, 5, 65, 0, 0, 767, 768,
    3, 124, 62, 0, 768, 772, 5, 66, 0, 0, 769, 771, 3, 100, 50, 0, 770, 769, 1, 0, 0, 0, 771, 774,
    1, 0, 0, 0, 772, 770, 1, 0, 0, 0, 772, 773, 1, 0, 0, 0, 773, 812, 1, 0, 0, 0, 774, 772, 1, 0, 0, 0,
    775, 777, 5, 67, 0, 0, 776, 778, 3, 112, 56, 0, 777, 776, 1, 0, 0, 0, 777, 778, 1, 0, 0, 0, 778,
    780, 1, 0, 0, 0, 779, 781, 3, 40, 20, 0, 780, 779, 1, 0, 0, 0, 780, 781, 1, 0, 0, 0, 781, 782, 1,
    0, 0, 0, 782, 812, 5, 68, 0, 0, 783, 784, 5, 67, 0, 0, 784, 786, 5, 46, 0, 0, 785, 787, 3, 112,
    56, 0, 786, 785, 1, 0, 0, 0, 786, 787, 1, 0, 0, 0, 787, 788, 1, 0, 0, 0, 788, 789, 3, 40, 20, 0,
    789, 790, 5, 68, 0, 0, 790, 812, 1, 0, 0, 0, 791, 792, 5, 67, 0, 0, 792, 793, 3, 112, 56, 0, 793,
    794, 5, 46, 0, 0, 794, 795, 3, 40, 20, 0, 795, 796, 5, 68, 0, 0, 796, 812, 1, 0, 0, 0, 797, 798,
    5, 67, 0, 0, 798, 799, 5, 81, 0, 0, 799, 812, 5, 68, 0, 0, 800, 802, 5, 65, 0, 0, 801, 803, 3, 114,
    57, 0, 802, 801, 1, 0, 0, 0, 802, 803, 1, 0, 0, 0, 803, 804, 1, 0, 0, 0, 804, 808, 5, 66, 0, 0, 805,
    807, 3, 100, 50, 0, 806, 805, 1, 0, 0, 0, 807, 810, 1, 0, 0, 0, 808, 806, 1, 0, 0, 0, 808, 809,
    1, 0, 0, 0, 809, 812, 1, 0, 0, 0, 810, 808, 1, 0, 0, 0, 811, 765, 1, 0, 0, 0, 811, 775, 1, 0, 0, 0,
    811, 783, 1, 0, 0, 0, 811, 791, 1, 0, 0, 0, 811, 797, 1, 0, 0, 0, 811, 800, 1, 0, 0, 0, 812, 856,
    1, 0, 0, 0, 813, 814, 10, 5, 0, 0, 814, 816, 5, 67, 0, 0, 815, 817, 3, 112, 56, 0, 816, 815, 1,
    0, 0, 0, 816, 817, 1, 0, 0, 0, 817, 819, 1, 0, 0, 0, 818, 820, 3, 40, 20, 0, 819, 818, 1, 0, 0, 0,
    819, 820, 1, 0, 0, 0, 820, 821, 1, 0, 0, 0, 821, 855, 5, 68, 0, 0, 822, 823, 10, 4, 0, 0, 823, 824,
    5, 67, 0, 0, 824, 826, 5, 46, 0, 0, 825, 827, 3, 112, 56, 0, 826, 825, 1, 0, 0, 0, 826, 827, 1,
    0, 0, 0, 827, 828, 1, 0, 0, 0, 828, 829, 3, 40, 20, 0, 829, 830, 5, 68, 0, 0, 830, 855, 1, 0, 0,
    0, 831, 832, 10, 3, 0, 0, 832, 833, 5, 67, 0, 0, 833, 834, 3, 112, 56, 0, 834, 835, 5, 46, 0, 0,
    835, 836, 3, 40, 20, 0, 836, 837, 5, 68, 0, 0, 837, 855, 1, 0, 0, 0, 838, 839, 10, 2, 0, 0, 839,
    840, 5, 67, 0, 0, 840, 841, 5, 81, 0, 0, 841, 855, 5, 68, 0, 0, 842, 843, 10, 1, 0, 0, 843, 845,
    5, 65, 0, 0, 844, 846, 3, 114, 57, 0, 845, 844, 1, 0, 0, 0, 845, 846, 1, 0, 0, 0, 846, 847, 1, 0,
    0, 0, 847, 851, 5, 66, 0, 0, 848, 850, 3, 100, 50, 0, 849, 848, 1, 0, 0, 0, 850, 853, 1, 0, 0, 0,
    851, 849, 1, 0, 0, 0, 851, 852, 1, 0, 0, 0, 852, 855, 1, 0, 0, 0, 853, 851, 1, 0, 0, 0, 854, 813,
    1, 0, 0, 0, 854, 822, 1, 0, 0, 0, 854, 831, 1, 0, 0, 0, 854, 838, 1, 0, 0, 0, 854, 842, 1, 0, 0, 0,
    855, 858, 1, 0, 0, 0, 856, 854, 1, 0, 0, 0, 856, 857, 1, 0, 0, 0, 857, 127, 1, 0, 0, 0, 858, 856,
    1, 0, 0, 0, 859, 860, 5, 111, 0, 0, 860, 129, 1, 0, 0, 0, 861, 870, 3, 40, 20, 0, 862, 863, 5, 69,
    0, 0, 863, 865, 3, 132, 66, 0, 864, 866, 5, 94, 0, 0, 865, 864, 1, 0, 0, 0, 865, 866, 1, 0, 0, 0,
    866, 867, 1, 0, 0, 0, 867, 868, 5, 70, 0, 0, 868, 870, 1, 0, 0, 0, 869, 861, 1, 0, 0, 0, 869, 862,
    1, 0, 0, 0, 870, 131, 1, 0, 0, 0, 871, 873, 3, 134, 67, 0, 872, 871, 1, 0, 0, 0, 872, 873, 1, 0,
    0, 0, 873, 874, 1, 0, 0, 0, 874, 882, 3, 130, 65, 0, 875, 877, 5, 94, 0, 0, 876, 878, 3, 134, 67,
    0, 877, 876, 1, 0, 0, 0, 877, 878, 1, 0, 0, 0, 878, 879, 1, 0, 0, 0, 879, 881, 3, 130, 65, 0, 880,
    875, 1, 0, 0, 0, 881, 884, 1, 0, 0, 0, 882, 880, 1, 0, 0, 0, 882, 883, 1, 0, 0, 0, 883, 133, 1, 0,
    0, 0, 884, 882, 1, 0, 0, 0, 885, 886, 3, 136, 68, 0, 886, 887, 5, 95, 0, 0, 887, 135, 1, 0, 0, 0,
    888, 890, 3, 138, 69, 0, 889, 888, 1, 0, 0, 0, 890, 891, 1, 0, 0, 0, 891, 889, 1, 0, 0, 0, 891,
    892, 1, 0, 0, 0, 892, 137, 1, 0, 0, 0, 893, 894, 5, 67, 0, 0, 894, 895, 3, 46, 23, 0, 895, 896,
    5, 68, 0, 0, 896, 900, 1, 0, 0, 0, 897, 898, 5, 109, 0, 0, 898, 900, 5, 111, 0, 0, 899, 893, 1,
    0, 0, 0, 899, 897, 1, 0, 0, 0, 900, 139, 1, 0, 0, 0, 901, 902, 5, 63, 0, 0, 902, 903, 5, 65, 0, 0,
    903, 904, 3, 46, 23, 0, 904, 906, 5, 94, 0, 0, 905, 907, 5, 114, 0, 0, 906, 905, 1, 0, 0, 0, 907,
    908, 1, 0, 0, 0, 908, 906, 1, 0, 0, 0, 908, 909, 1, 0, 0, 0, 909, 910, 1, 0, 0, 0, 910, 911, 5, 66,
    0, 0, 911, 912, 5, 93, 0, 0, 912, 141, 1, 0, 0, 0, 913, 951, 3, 144, 72, 0, 914, 951, 3, 146, 73,
    0, 915, 951, 3, 152, 76, 0, 916, 951, 3, 154, 77, 0, 917, 951, 3, 156, 78, 0, 918, 951, 3, 164,
    82, 0, 919, 920, 7, 21, 0, 0, 920, 921, 7, 22, 0, 0, 921, 930, 5, 65, 0, 0, 922, 927, 3, 36, 18,
    0, 923, 924, 5, 94, 0, 0, 924, 926, 3, 36, 18, 0, 925, 923, 1, 0, 0, 0, 926, 929, 1, 0, 0, 0, 927,
    925, 1, 0, 0, 0, 927, 928, 1, 0, 0, 0, 928, 931, 1, 0, 0, 0, 929, 927, 1, 0, 0, 0, 930, 922, 1, 0,
    0, 0, 930, 931, 1, 0, 0, 0, 931, 945, 1, 0, 0, 0, 932, 941, 5, 92, 0, 0, 933, 938, 3, 36, 18, 0,
    934, 935, 5, 94, 0, 0, 935, 937, 3, 36, 18, 0, 936, 934, 1, 0, 0, 0, 937, 940, 1, 0, 0, 0, 938,
    936, 1, 0, 0, 0, 938, 939, 1, 0, 0, 0, 939, 942, 1, 0, 0, 0, 940, 938, 1, 0, 0, 0, 941, 933, 1, 0,
    0, 0, 941, 942, 1, 0, 0, 0, 942, 944, 1, 0, 0, 0, 943, 932, 1, 0, 0, 0, 944, 947, 1, 0, 0, 0, 945,
    943, 1, 0, 0, 0, 945, 946, 1, 0, 0, 0, 946, 948, 1, 0, 0, 0, 947, 945, 1, 0, 0, 0, 948, 949, 5, 66,
    0, 0, 949, 951, 5, 93, 0, 0, 950, 913, 1, 0, 0, 0, 950, 914, 1, 0, 0, 0, 950, 915, 1, 0, 0, 0, 950,
    916, 1, 0, 0, 0, 950, 917, 1, 0, 0, 0, 950, 918, 1, 0, 0, 0, 950, 919, 1, 0, 0, 0, 951, 143, 1, 0,
    0, 0, 952, 953, 5, 111, 0, 0, 953, 954, 5, 92, 0, 0, 954, 964, 3, 142, 71, 0, 955, 956, 5, 23,
    0, 0, 956, 957, 3, 46, 23, 0, 957, 958, 5, 92, 0, 0, 958, 959, 3, 142, 71, 0, 959, 964, 1, 0, 0,
    0, 960, 961, 5, 27, 0, 0, 961, 962, 5, 92, 0, 0, 962, 964, 3, 142, 71, 0, 963, 952, 1, 0, 0, 0,
    963, 955, 1, 0, 0, 0, 963, 960, 1, 0, 0, 0, 964, 145, 1, 0, 0, 0, 965, 967, 5, 69, 0, 0, 966, 968,
    3, 148, 74, 0, 967, 966, 1, 0, 0, 0, 967, 968, 1, 0, 0, 0, 968, 969, 1, 0, 0, 0, 969, 970, 5, 70,
    0, 0, 970, 147, 1, 0, 0, 0, 971, 973, 3, 150, 75, 0, 972, 971, 1, 0, 0, 0, 973, 974, 1, 0, 0, 0,
    974, 972, 1, 0, 0, 0, 974, 975, 1, 0, 0, 0, 975, 149, 1, 0, 0, 0, 976, 979, 3, 142, 71, 0, 977,
    979, 3, 48, 24, 0, 978, 976, 1, 0, 0, 0, 978, 977, 1, 0, 0, 0, 979, 151, 1, 0, 0, 0, 980, 982, 3,
    44, 22, 0, 981, 980, 1, 0, 0, 0, 981, 982, 1, 0, 0, 0, 982, 983, 1, 0, 0, 0, 983, 984, 5, 93, 0,
    0, 984, 153, 1, 0, 0, 0, 985, 986, 5, 36, 0, 0, 986, 987, 5, 65, 0, 0, 987, 988, 3, 44, 22, 0, 988,
    989, 5, 66, 0, 0, 989, 992, 3, 142, 71, 0, 990, 991, 5, 30, 0, 0, 991, 993, 3, 142, 71, 0, 992,
    990, 1, 0, 0, 0, 992, 993, 1, 0, 0, 0, 993, 1001, 1, 0, 0, 0, 994, 995, 5, 48, 0, 0, 995, 996, 5,
    65, 0, 0, 996, 997, 3, 44, 22, 0, 997, 998, 5, 66, 0, 0, 998, 999, 3, 142, 71, 0, 999, 1001, 1,
    0, 0, 0, 1000, 985, 1, 0, 0, 0, 1000, 994, 1, 0, 0, 0, 1001, 155, 1, 0, 0, 0, 1002, 1003, 5, 54,
    0, 0, 1003, 1004, 5, 65, 0, 0, 1004, 1005, 3, 44, 22, 0, 1005, 1006, 5, 66, 0, 0, 1006, 1007,
    3, 142, 71, 0, 1007, 1023, 1, 0, 0, 0, 1008, 1009, 5, 28, 0, 0, 1009, 1010, 3, 142, 71, 0, 1010,
    1011, 5, 54, 0, 0, 1011, 1012, 5, 65, 0, 0, 1012, 1013, 3, 44, 22, 0, 1013, 1014, 5, 66, 0, 0,
    1014, 1015, 5, 93, 0, 0, 1015, 1023, 1, 0, 0, 0, 1016, 1017, 5, 34, 0, 0, 1017, 1018, 5, 65,
    0, 0, 1018, 1019, 3, 158, 79, 0, 1019, 1020, 5, 66, 0, 0, 1020, 1021, 3, 142, 71, 0, 1021, 1023,
    1, 0, 0, 0, 1022, 1002, 1, 0, 0, 0, 1022, 1008, 1, 0, 0, 0, 1022, 1016, 1, 0, 0, 0, 1023, 157,
    1, 0, 0, 0, 1024, 1029, 3, 160, 80, 0, 1025, 1027, 3, 44, 22, 0, 1026, 1025, 1, 0, 0, 0, 1026,
    1027, 1, 0, 0, 0, 1027, 1029, 1, 0, 0, 0, 1028, 1024, 1, 0, 0, 0, 1028, 1026, 1, 0, 0, 0, 1029,
    1030, 1, 0, 0, 0, 1030, 1032, 5, 93, 0, 0, 1031, 1033, 3, 162, 81, 0, 1032, 1031, 1, 0, 0, 0,
    1032, 1033, 1, 0, 0, 0, 1033, 1034, 1, 0, 0, 0, 1034, 1036, 5, 93, 0, 0, 1035, 1037, 3, 162,
    81, 0, 1036, 1035, 1, 0, 0, 0, 1036, 1037, 1, 0, 0, 0, 1037, 159, 1, 0, 0, 0, 1038, 1040, 3, 50,
    25, 0, 1039, 1041, 3, 56, 28, 0, 1040, 1039, 1, 0, 0, 0, 1040, 1041, 1, 0, 0, 0, 1041, 161, 1,
    0, 0, 0, 1042, 1047, 3, 40, 20, 0, 1043, 1044, 5, 94, 0, 0, 1044, 1046, 3, 40, 20, 0, 1045, 1043,
    1, 0, 0, 0, 1046, 1049, 1, 0, 0, 0, 1047, 1045, 1, 0, 0, 0, 1047, 1048, 1, 0, 0, 0, 1048, 163,
    1, 0, 0, 0, 1049, 1047, 1, 0, 0, 0, 1050, 1051, 5, 35, 0, 0, 1051, 1060, 5, 111, 0, 0, 1052, 1060,
    7, 23, 0, 0, 1053, 1055, 5, 42, 0, 0, 1054, 1056, 3, 44, 22, 0, 1055, 1054, 1, 0, 0, 0, 1055,
    1056, 1, 0, 0, 0, 1056, 1060, 1, 0, 0, 0, 1057, 1058, 5, 35, 0, 0, 1058, 1060, 3, 12, 6, 0, 1059,
    1050, 1, 0, 0, 0, 1059, 1052, 1, 0, 0, 0, 1059, 1053, 1, 0, 0, 0, 1059, 1057, 1, 0, 0, 0, 1060,
    1061, 1, 0, 0, 0, 1061, 1062, 5, 93, 0, 0, 1062, 165, 1, 0, 0, 0, 1063, 1065, 3, 168, 84, 0, 1064,
    1063, 1, 0, 0, 0, 1064, 1065, 1, 0, 0, 0, 1065, 1066, 1, 0, 0, 0, 1066, 1067, 5, 0, 0, 1, 1067,
    167, 1, 0, 0, 0, 1068, 1070, 3, 170, 85, 0, 1069, 1068, 1, 0, 0, 0, 1070, 1071, 1, 0, 0, 0, 1071,
    1069, 1, 0, 0, 0, 1071, 1072, 1, 0, 0, 0, 1072, 169, 1, 0, 0, 0, 1073, 1078, 3, 172, 86, 0, 1074,
    1078, 3, 48, 24, 0, 1075, 1078, 5, 93, 0, 0, 1076, 1078, 5, 20, 0, 0, 1077, 1073, 1, 0, 0, 0,
    1077, 1074, 1, 0, 0, 0, 1077, 1075, 1, 0, 0, 0, 1077, 1076, 1, 0, 0, 0, 1078, 171, 1, 0, 0, 0,
    1079, 1081, 3, 50, 25, 0, 1080, 1079, 1, 0, 0, 0, 1080, 1081, 1, 0, 0, 0, 1081, 1082, 1, 0, 0,
    0, 1082, 1084, 3, 94, 47, 0, 1083, 1085, 3, 174, 87, 0, 1084, 1083, 1, 0, 0, 0, 1084, 1085,
    1, 0, 0, 0, 1085, 1086, 1, 0, 0, 0, 1086, 1087, 3, 146, 73, 0, 1087, 173, 1, 0, 0, 0, 1088, 1090,
    3, 48, 24, 0, 1089, 1088, 1, 0, 0, 0, 1090, 1091, 1, 0, 0, 0, 1091, 1089, 1, 0, 0, 0, 1091, 1092,
    1, 0, 0, 0, 1092, 175, 1, 0, 0, 0, 134, 181, 189, 209, 223, 228, 235, 243, 247, 255, 261, 263,
    271, 277, 291, 296, 305, 312, 320, 328, 336, 344, 352, 360, 368, 376, 384, 393, 401, 410,
    417, 422, 427, 432, 439, 446, 452, 470, 474, 483, 490, 500, 504, 507, 514, 519, 523, 527,
    532, 538, 545, 551, 568, 574, 579, 585, 605, 610, 613, 620, 635, 647, 650, 652, 662, 666,
    676, 680, 684, 690, 693, 700, 702, 707, 711, 716, 721, 728, 736, 738, 745, 750, 754, 760,
    763, 772, 777, 780, 786, 802, 808, 811, 816, 819, 826, 845, 851, 854, 856, 865, 869, 872,
    877, 882, 891, 899, 908, 927, 930, 938, 941, 945, 950, 963, 967, 974, 978, 981, 992, 1000,
    1022, 1026, 1028, 1032, 1036, 1040, 1047, 1055, 1059, 1064, 1071, 1077, 1080, 1084, 1091];
CParser.DecisionsToDFA = CParser._ATN.decisionToState.map((ds, index) => new DFA(ds, index));
export class PrimaryExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Identifier() {
        return this.getToken(CParser.Identifier, 0);
    }
    Constant() {
        return this.getToken(CParser.Constant, 0);
    }
    StringLiteral_list() {
        return this.getTokens(CParser.StringLiteral);
    }
    StringLiteral(i) {
        return this.getToken(CParser.StringLiteral, i);
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    expression() {
        return this.getTypedRuleContext(ExpressionContext, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    genericSelection() {
        return this.getTypedRuleContext(GenericSelectionContext, 0);
    }
    compoundStatement() {
        return this.getTypedRuleContext(CompoundStatementContext, 0);
    }
    unaryExpression() {
        return this.getTypedRuleContext(UnaryExpressionContext, 0);
    }
    Comma() {
        return this.getToken(CParser.Comma, 0);
    }
    typeName() {
        return this.getTypedRuleContext(TypeNameContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_primaryExpression;
    }
    enterRule(listener) {
        if (listener.enterPrimaryExpression) {
            listener.enterPrimaryExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitPrimaryExpression) {
            listener.exitPrimaryExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitPrimaryExpression) {
            return visitor.visitPrimaryExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class GenericSelectionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Generic() {
        return this.getToken(CParser.Generic, 0);
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    assignmentExpression() {
        return this.getTypedRuleContext(AssignmentExpressionContext, 0);
    }
    Comma() {
        return this.getToken(CParser.Comma, 0);
    }
    genericAssocList() {
        return this.getTypedRuleContext(GenericAssocListContext, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    get ruleIndex() {
        return CParser.RULE_genericSelection;
    }
    enterRule(listener) {
        if (listener.enterGenericSelection) {
            listener.enterGenericSelection(this);
        }
    }
    exitRule(listener) {
        if (listener.exitGenericSelection) {
            listener.exitGenericSelection(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitGenericSelection) {
            return visitor.visitGenericSelection(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class GenericAssocListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    genericAssociation_list() {
        return this.getTypedRuleContexts(GenericAssociationContext);
    }
    genericAssociation(i) {
        return this.getTypedRuleContext(GenericAssociationContext, i);
    }
    Comma_list() {
        return this.getTokens(CParser.Comma);
    }
    Comma(i) {
        return this.getToken(CParser.Comma, i);
    }
    get ruleIndex() {
        return CParser.RULE_genericAssocList;
    }
    enterRule(listener) {
        if (listener.enterGenericAssocList) {
            listener.enterGenericAssocList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitGenericAssocList) {
            listener.exitGenericAssocList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitGenericAssocList) {
            return visitor.visitGenericAssocList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class GenericAssociationContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Colon() {
        return this.getToken(CParser.Colon, 0);
    }
    assignmentExpression() {
        return this.getTypedRuleContext(AssignmentExpressionContext, 0);
    }
    typeName() {
        return this.getTypedRuleContext(TypeNameContext, 0);
    }
    Default() {
        return this.getToken(CParser.Default, 0);
    }
    get ruleIndex() {
        return CParser.RULE_genericAssociation;
    }
    enterRule(listener) {
        if (listener.enterGenericAssociation) {
            listener.enterGenericAssociation(this);
        }
    }
    exitRule(listener) {
        if (listener.exitGenericAssociation) {
            listener.exitGenericAssociation(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitGenericAssociation) {
            return visitor.visitGenericAssociation(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class PostfixExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    primaryExpression() {
        return this.getTypedRuleContext(PrimaryExpressionContext, 0);
    }
    LeftParen_list() {
        return this.getTokens(CParser.LeftParen);
    }
    LeftParen(i) {
        return this.getToken(CParser.LeftParen, i);
    }
    typeName() {
        return this.getTypedRuleContext(TypeNameContext, 0);
    }
    RightParen_list() {
        return this.getTokens(CParser.RightParen);
    }
    RightParen(i) {
        return this.getToken(CParser.RightParen, i);
    }
    LeftBrace() {
        return this.getToken(CParser.LeftBrace, 0);
    }
    initializerList() {
        return this.getTypedRuleContext(InitializerListContext, 0);
    }
    RightBrace() {
        return this.getToken(CParser.RightBrace, 0);
    }
    LeftBracket_list() {
        return this.getTokens(CParser.LeftBracket);
    }
    LeftBracket(i) {
        return this.getToken(CParser.LeftBracket, i);
    }
    expression_list() {
        return this.getTypedRuleContexts(ExpressionContext);
    }
    expression(i) {
        return this.getTypedRuleContext(ExpressionContext, i);
    }
    RightBracket_list() {
        return this.getTokens(CParser.RightBracket);
    }
    RightBracket(i) {
        return this.getToken(CParser.RightBracket, i);
    }
    Identifier_list() {
        return this.getTokens(CParser.Identifier);
    }
    Identifier(i) {
        return this.getToken(CParser.Identifier, i);
    }
    Dot_list() {
        return this.getTokens(CParser.Dot);
    }
    Dot(i) {
        return this.getToken(CParser.Dot, i);
    }
    Arrow_list() {
        return this.getTokens(CParser.Arrow);
    }
    Arrow(i) {
        return this.getToken(CParser.Arrow, i);
    }
    PlusPlus_list() {
        return this.getTokens(CParser.PlusPlus);
    }
    PlusPlus(i) {
        return this.getToken(CParser.PlusPlus, i);
    }
    MinusMinus_list() {
        return this.getTokens(CParser.MinusMinus);
    }
    MinusMinus(i) {
        return this.getToken(CParser.MinusMinus, i);
    }
    Comma() {
        return this.getToken(CParser.Comma, 0);
    }
    argumentExpressionList_list() {
        return this.getTypedRuleContexts(ArgumentExpressionListContext);
    }
    argumentExpressionList(i) {
        return this.getTypedRuleContext(ArgumentExpressionListContext, i);
    }
    get ruleIndex() {
        return CParser.RULE_postfixExpression;
    }
    enterRule(listener) {
        if (listener.enterPostfixExpression) {
            listener.enterPostfixExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitPostfixExpression) {
            listener.exitPostfixExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitPostfixExpression) {
            return visitor.visitPostfixExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ArgumentExpressionListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    assignmentExpression_list() {
        return this.getTypedRuleContexts(AssignmentExpressionContext);
    }
    assignmentExpression(i) {
        return this.getTypedRuleContext(AssignmentExpressionContext, i);
    }
    Comma_list() {
        return this.getTokens(CParser.Comma);
    }
    Comma(i) {
        return this.getToken(CParser.Comma, i);
    }
    get ruleIndex() {
        return CParser.RULE_argumentExpressionList;
    }
    enterRule(listener) {
        if (listener.enterArgumentExpressionList) {
            listener.enterArgumentExpressionList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitArgumentExpressionList) {
            listener.exitArgumentExpressionList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitArgumentExpressionList) {
            return visitor.visitArgumentExpressionList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class UnaryExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    postfixExpression() {
        return this.getTypedRuleContext(PostfixExpressionContext, 0);
    }
    unaryOperator() {
        return this.getTypedRuleContext(UnaryOperatorContext, 0);
    }
    castExpression() {
        return this.getTypedRuleContext(CastExpressionContext, 0);
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    typeName() {
        return this.getTypedRuleContext(TypeNameContext, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    AndAnd() {
        return this.getToken(CParser.AndAnd, 0);
    }
    Identifier() {
        return this.getToken(CParser.Identifier, 0);
    }
    Sizeof_list() {
        return this.getTokens(CParser.Sizeof);
    }
    Sizeof(i) {
        return this.getToken(CParser.Sizeof, i);
    }
    Alignof() {
        return this.getToken(CParser.Alignof, 0);
    }
    PlusPlus_list() {
        return this.getTokens(CParser.PlusPlus);
    }
    PlusPlus(i) {
        return this.getToken(CParser.PlusPlus, i);
    }
    MinusMinus_list() {
        return this.getTokens(CParser.MinusMinus);
    }
    MinusMinus(i) {
        return this.getToken(CParser.MinusMinus, i);
    }
    get ruleIndex() {
        return CParser.RULE_unaryExpression;
    }
    enterRule(listener) {
        if (listener.enterUnaryExpression) {
            listener.enterUnaryExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitUnaryExpression) {
            listener.exitUnaryExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitUnaryExpression) {
            return visitor.visitUnaryExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class UnaryOperatorContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    And() {
        return this.getToken(CParser.And, 0);
    }
    Star() {
        return this.getToken(CParser.Star, 0);
    }
    Plus() {
        return this.getToken(CParser.Plus, 0);
    }
    Minus() {
        return this.getToken(CParser.Minus, 0);
    }
    Tilde() {
        return this.getToken(CParser.Tilde, 0);
    }
    Not() {
        return this.getToken(CParser.Not, 0);
    }
    get ruleIndex() {
        return CParser.RULE_unaryOperator;
    }
    enterRule(listener) {
        if (listener.enterUnaryOperator) {
            listener.enterUnaryOperator(this);
        }
    }
    exitRule(listener) {
        if (listener.exitUnaryOperator) {
            listener.exitUnaryOperator(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitUnaryOperator) {
            return visitor.visitUnaryOperator(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class CastExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    typeName() {
        return this.getTypedRuleContext(TypeNameContext, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    castExpression() {
        return this.getTypedRuleContext(CastExpressionContext, 0);
    }
    unaryExpression() {
        return this.getTypedRuleContext(UnaryExpressionContext, 0);
    }
    DigitSequence() {
        return this.getToken(CParser.DigitSequence, 0);
    }
    get ruleIndex() {
        return CParser.RULE_castExpression;
    }
    enterRule(listener) {
        if (listener.enterCastExpression) {
            listener.enterCastExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitCastExpression) {
            listener.exitCastExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitCastExpression) {
            return visitor.visitCastExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class MultiplicativeExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    castExpression_list() {
        return this.getTypedRuleContexts(CastExpressionContext);
    }
    castExpression(i) {
        return this.getTypedRuleContext(CastExpressionContext, i);
    }
    Star_list() {
        return this.getTokens(CParser.Star);
    }
    Star(i) {
        return this.getToken(CParser.Star, i);
    }
    Div_list() {
        return this.getTokens(CParser.Div);
    }
    Div(i) {
        return this.getToken(CParser.Div, i);
    }
    Mod_list() {
        return this.getTokens(CParser.Mod);
    }
    Mod(i) {
        return this.getToken(CParser.Mod, i);
    }
    get ruleIndex() {
        return CParser.RULE_multiplicativeExpression;
    }
    enterRule(listener) {
        if (listener.enterMultiplicativeExpression) {
            listener.enterMultiplicativeExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitMultiplicativeExpression) {
            listener.exitMultiplicativeExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitMultiplicativeExpression) {
            return visitor.visitMultiplicativeExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class AdditiveExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    multiplicativeExpression_list() {
        return this.getTypedRuleContexts(MultiplicativeExpressionContext);
    }
    multiplicativeExpression(i) {
        return this.getTypedRuleContext(MultiplicativeExpressionContext, i);
    }
    Plus_list() {
        return this.getTokens(CParser.Plus);
    }
    Plus(i) {
        return this.getToken(CParser.Plus, i);
    }
    Minus_list() {
        return this.getTokens(CParser.Minus);
    }
    Minus(i) {
        return this.getToken(CParser.Minus, i);
    }
    get ruleIndex() {
        return CParser.RULE_additiveExpression;
    }
    enterRule(listener) {
        if (listener.enterAdditiveExpression) {
            listener.enterAdditiveExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitAdditiveExpression) {
            listener.exitAdditiveExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAdditiveExpression) {
            return visitor.visitAdditiveExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ShiftExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    additiveExpression_list() {
        return this.getTypedRuleContexts(AdditiveExpressionContext);
    }
    additiveExpression(i) {
        return this.getTypedRuleContext(AdditiveExpressionContext, i);
    }
    LeftShift_list() {
        return this.getTokens(CParser.LeftShift);
    }
    LeftShift(i) {
        return this.getToken(CParser.LeftShift, i);
    }
    RightShift_list() {
        return this.getTokens(CParser.RightShift);
    }
    RightShift(i) {
        return this.getToken(CParser.RightShift, i);
    }
    get ruleIndex() {
        return CParser.RULE_shiftExpression;
    }
    enterRule(listener) {
        if (listener.enterShiftExpression) {
            listener.enterShiftExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitShiftExpression) {
            listener.exitShiftExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitShiftExpression) {
            return visitor.visitShiftExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class RelationalExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    shiftExpression_list() {
        return this.getTypedRuleContexts(ShiftExpressionContext);
    }
    shiftExpression(i) {
        return this.getTypedRuleContext(ShiftExpressionContext, i);
    }
    Less_list() {
        return this.getTokens(CParser.Less);
    }
    Less(i) {
        return this.getToken(CParser.Less, i);
    }
    Greater_list() {
        return this.getTokens(CParser.Greater);
    }
    Greater(i) {
        return this.getToken(CParser.Greater, i);
    }
    LessEqual_list() {
        return this.getTokens(CParser.LessEqual);
    }
    LessEqual(i) {
        return this.getToken(CParser.LessEqual, i);
    }
    GreaterEqual_list() {
        return this.getTokens(CParser.GreaterEqual);
    }
    GreaterEqual(i) {
        return this.getToken(CParser.GreaterEqual, i);
    }
    get ruleIndex() {
        return CParser.RULE_relationalExpression;
    }
    enterRule(listener) {
        if (listener.enterRelationalExpression) {
            listener.enterRelationalExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitRelationalExpression) {
            listener.exitRelationalExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitRelationalExpression) {
            return visitor.visitRelationalExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class EqualityExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    relationalExpression_list() {
        return this.getTypedRuleContexts(RelationalExpressionContext);
    }
    relationalExpression(i) {
        return this.getTypedRuleContext(RelationalExpressionContext, i);
    }
    Equal_list() {
        return this.getTokens(CParser.Equal);
    }
    Equal(i) {
        return this.getToken(CParser.Equal, i);
    }
    NotEqual_list() {
        return this.getTokens(CParser.NotEqual);
    }
    NotEqual(i) {
        return this.getToken(CParser.NotEqual, i);
    }
    get ruleIndex() {
        return CParser.RULE_equalityExpression;
    }
    enterRule(listener) {
        if (listener.enterEqualityExpression) {
            listener.enterEqualityExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitEqualityExpression) {
            listener.exitEqualityExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitEqualityExpression) {
            return visitor.visitEqualityExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class AndExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    equalityExpression_list() {
        return this.getTypedRuleContexts(EqualityExpressionContext);
    }
    equalityExpression(i) {
        return this.getTypedRuleContext(EqualityExpressionContext, i);
    }
    And_list() {
        return this.getTokens(CParser.And);
    }
    And(i) {
        return this.getToken(CParser.And, i);
    }
    get ruleIndex() {
        return CParser.RULE_andExpression;
    }
    enterRule(listener) {
        if (listener.enterAndExpression) {
            listener.enterAndExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitAndExpression) {
            listener.exitAndExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAndExpression) {
            return visitor.visitAndExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ExclusiveOrExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    andExpression_list() {
        return this.getTypedRuleContexts(AndExpressionContext);
    }
    andExpression(i) {
        return this.getTypedRuleContext(AndExpressionContext, i);
    }
    Caret_list() {
        return this.getTokens(CParser.Caret);
    }
    Caret(i) {
        return this.getToken(CParser.Caret, i);
    }
    get ruleIndex() {
        return CParser.RULE_exclusiveOrExpression;
    }
    enterRule(listener) {
        if (listener.enterExclusiveOrExpression) {
            listener.enterExclusiveOrExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitExclusiveOrExpression) {
            listener.exitExclusiveOrExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitExclusiveOrExpression) {
            return visitor.visitExclusiveOrExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class InclusiveOrExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    exclusiveOrExpression_list() {
        return this.getTypedRuleContexts(ExclusiveOrExpressionContext);
    }
    exclusiveOrExpression(i) {
        return this.getTypedRuleContext(ExclusiveOrExpressionContext, i);
    }
    Or_list() {
        return this.getTokens(CParser.Or);
    }
    Or(i) {
        return this.getToken(CParser.Or, i);
    }
    get ruleIndex() {
        return CParser.RULE_inclusiveOrExpression;
    }
    enterRule(listener) {
        if (listener.enterInclusiveOrExpression) {
            listener.enterInclusiveOrExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitInclusiveOrExpression) {
            listener.exitInclusiveOrExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitInclusiveOrExpression) {
            return visitor.visitInclusiveOrExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class LogicalAndExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    inclusiveOrExpression_list() {
        return this.getTypedRuleContexts(InclusiveOrExpressionContext);
    }
    inclusiveOrExpression(i) {
        return this.getTypedRuleContext(InclusiveOrExpressionContext, i);
    }
    AndAnd_list() {
        return this.getTokens(CParser.AndAnd);
    }
    AndAnd(i) {
        return this.getToken(CParser.AndAnd, i);
    }
    get ruleIndex() {
        return CParser.RULE_logicalAndExpression;
    }
    enterRule(listener) {
        if (listener.enterLogicalAndExpression) {
            listener.enterLogicalAndExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitLogicalAndExpression) {
            listener.exitLogicalAndExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitLogicalAndExpression) {
            return visitor.visitLogicalAndExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class LogicalOrExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    logicalAndExpression_list() {
        return this.getTypedRuleContexts(LogicalAndExpressionContext);
    }
    logicalAndExpression(i) {
        return this.getTypedRuleContext(LogicalAndExpressionContext, i);
    }
    OrOr_list() {
        return this.getTokens(CParser.OrOr);
    }
    OrOr(i) {
        return this.getToken(CParser.OrOr, i);
    }
    get ruleIndex() {
        return CParser.RULE_logicalOrExpression;
    }
    enterRule(listener) {
        if (listener.enterLogicalOrExpression) {
            listener.enterLogicalOrExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitLogicalOrExpression) {
            listener.exitLogicalOrExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitLogicalOrExpression) {
            return visitor.visitLogicalOrExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ConditionalExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    logicalOrExpression() {
        return this.getTypedRuleContext(LogicalOrExpressionContext, 0);
    }
    Question() {
        return this.getToken(CParser.Question, 0);
    }
    expression() {
        return this.getTypedRuleContext(ExpressionContext, 0);
    }
    Colon() {
        return this.getToken(CParser.Colon, 0);
    }
    conditionalExpression() {
        return this.getTypedRuleContext(ConditionalExpressionContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_conditionalExpression;
    }
    enterRule(listener) {
        if (listener.enterConditionalExpression) {
            listener.enterConditionalExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitConditionalExpression) {
            listener.exitConditionalExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitConditionalExpression) {
            return visitor.visitConditionalExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class AssignmentExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    conditionalExpression() {
        return this.getTypedRuleContext(ConditionalExpressionContext, 0);
    }
    unaryExpression() {
        return this.getTypedRuleContext(UnaryExpressionContext, 0);
    }
    assignmentOperator() {
        return this.getTypedRuleContext(AssignmentOperatorContext, 0);
    }
    assignmentExpression() {
        return this.getTypedRuleContext(AssignmentExpressionContext, 0);
    }
    DigitSequence() {
        return this.getToken(CParser.DigitSequence, 0);
    }
    get ruleIndex() {
        return CParser.RULE_assignmentExpression;
    }
    enterRule(listener) {
        if (listener.enterAssignmentExpression) {
            listener.enterAssignmentExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitAssignmentExpression) {
            listener.exitAssignmentExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAssignmentExpression) {
            return visitor.visitAssignmentExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class AssignmentOperatorContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Assign() {
        return this.getToken(CParser.Assign, 0);
    }
    StarAssign() {
        return this.getToken(CParser.StarAssign, 0);
    }
    DivAssign() {
        return this.getToken(CParser.DivAssign, 0);
    }
    ModAssign() {
        return this.getToken(CParser.ModAssign, 0);
    }
    PlusAssign() {
        return this.getToken(CParser.PlusAssign, 0);
    }
    MinusAssign() {
        return this.getToken(CParser.MinusAssign, 0);
    }
    LeftShiftAssign() {
        return this.getToken(CParser.LeftShiftAssign, 0);
    }
    RightShiftAssign() {
        return this.getToken(CParser.RightShiftAssign, 0);
    }
    AndAssign() {
        return this.getToken(CParser.AndAssign, 0);
    }
    XorAssign() {
        return this.getToken(CParser.XorAssign, 0);
    }
    OrAssign() {
        return this.getToken(CParser.OrAssign, 0);
    }
    get ruleIndex() {
        return CParser.RULE_assignmentOperator;
    }
    enterRule(listener) {
        if (listener.enterAssignmentOperator) {
            listener.enterAssignmentOperator(this);
        }
    }
    exitRule(listener) {
        if (listener.exitAssignmentOperator) {
            listener.exitAssignmentOperator(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAssignmentOperator) {
            return visitor.visitAssignmentOperator(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    assignmentExpression_list() {
        return this.getTypedRuleContexts(AssignmentExpressionContext);
    }
    assignmentExpression(i) {
        return this.getTypedRuleContext(AssignmentExpressionContext, i);
    }
    Comma_list() {
        return this.getTokens(CParser.Comma);
    }
    Comma(i) {
        return this.getToken(CParser.Comma, i);
    }
    get ruleIndex() {
        return CParser.RULE_expression;
    }
    enterRule(listener) {
        if (listener.enterExpression) {
            listener.enterExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitExpression) {
            listener.exitExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitExpression) {
            return visitor.visitExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ConstantExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    conditionalExpression() {
        return this.getTypedRuleContext(ConditionalExpressionContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_constantExpression;
    }
    enterRule(listener) {
        if (listener.enterConstantExpression) {
            listener.enterConstantExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitConstantExpression) {
            listener.exitConstantExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitConstantExpression) {
            return visitor.visitConstantExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class DeclarationContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    declarationSpecifiers() {
        return this.getTypedRuleContext(DeclarationSpecifiersContext, 0);
    }
    Semi() {
        return this.getToken(CParser.Semi, 0);
    }
    initDeclaratorList() {
        return this.getTypedRuleContext(InitDeclaratorListContext, 0);
    }
    staticAssertDeclaration() {
        return this.getTypedRuleContext(StaticAssertDeclarationContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_declaration;
    }
    enterRule(listener) {
        if (listener.enterDeclaration) {
            listener.enterDeclaration(this);
        }
    }
    exitRule(listener) {
        if (listener.exitDeclaration) {
            listener.exitDeclaration(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDeclaration) {
            return visitor.visitDeclaration(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class DeclarationSpecifiersContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    declarationSpecifier_list() {
        return this.getTypedRuleContexts(DeclarationSpecifierContext);
    }
    declarationSpecifier(i) {
        return this.getTypedRuleContext(DeclarationSpecifierContext, i);
    }
    get ruleIndex() {
        return CParser.RULE_declarationSpecifiers;
    }
    enterRule(listener) {
        if (listener.enterDeclarationSpecifiers) {
            listener.enterDeclarationSpecifiers(this);
        }
    }
    exitRule(listener) {
        if (listener.exitDeclarationSpecifiers) {
            listener.exitDeclarationSpecifiers(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDeclarationSpecifiers) {
            return visitor.visitDeclarationSpecifiers(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class DeclarationSpecifiers2Context extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    declarationSpecifier_list() {
        return this.getTypedRuleContexts(DeclarationSpecifierContext);
    }
    declarationSpecifier(i) {
        return this.getTypedRuleContext(DeclarationSpecifierContext, i);
    }
    get ruleIndex() {
        return CParser.RULE_declarationSpecifiers2;
    }
    enterRule(listener) {
        if (listener.enterDeclarationSpecifiers2) {
            listener.enterDeclarationSpecifiers2(this);
        }
    }
    exitRule(listener) {
        if (listener.exitDeclarationSpecifiers2) {
            listener.exitDeclarationSpecifiers2(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDeclarationSpecifiers2) {
            return visitor.visitDeclarationSpecifiers2(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class DeclarationSpecifierContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    storageClassSpecifier() {
        return this.getTypedRuleContext(StorageClassSpecifierContext, 0);
    }
    typeSpecifier() {
        return this.getTypedRuleContext(TypeSpecifierContext, 0);
    }
    typeQualifier() {
        return this.getTypedRuleContext(TypeQualifierContext, 0);
    }
    functionSpecifier() {
        return this.getTypedRuleContext(FunctionSpecifierContext, 0);
    }
    alignmentSpecifier() {
        return this.getTypedRuleContext(AlignmentSpecifierContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_declarationSpecifier;
    }
    enterRule(listener) {
        if (listener.enterDeclarationSpecifier) {
            listener.enterDeclarationSpecifier(this);
        }
    }
    exitRule(listener) {
        if (listener.exitDeclarationSpecifier) {
            listener.exitDeclarationSpecifier(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDeclarationSpecifier) {
            return visitor.visitDeclarationSpecifier(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class InitDeclaratorListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    initDeclarator_list() {
        return this.getTypedRuleContexts(InitDeclaratorContext);
    }
    initDeclarator(i) {
        return this.getTypedRuleContext(InitDeclaratorContext, i);
    }
    Comma_list() {
        return this.getTokens(CParser.Comma);
    }
    Comma(i) {
        return this.getToken(CParser.Comma, i);
    }
    get ruleIndex() {
        return CParser.RULE_initDeclaratorList;
    }
    enterRule(listener) {
        if (listener.enterInitDeclaratorList) {
            listener.enterInitDeclaratorList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitInitDeclaratorList) {
            listener.exitInitDeclaratorList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitInitDeclaratorList) {
            return visitor.visitInitDeclaratorList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class InitDeclaratorContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    declarator() {
        return this.getTypedRuleContext(DeclaratorContext, 0);
    }
    Assign() {
        return this.getToken(CParser.Assign, 0);
    }
    initializer() {
        return this.getTypedRuleContext(InitializerContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_initDeclarator;
    }
    enterRule(listener) {
        if (listener.enterInitDeclarator) {
            listener.enterInitDeclarator(this);
        }
    }
    exitRule(listener) {
        if (listener.exitInitDeclarator) {
            listener.exitInitDeclarator(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitInitDeclarator) {
            return visitor.visitInitDeclarator(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class StorageClassSpecifierContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Typedef() {
        return this.getToken(CParser.Typedef, 0);
    }
    Extern() {
        return this.getToken(CParser.Extern, 0);
    }
    Static() {
        return this.getToken(CParser.Static, 0);
    }
    ThreadLocal() {
        return this.getToken(CParser.ThreadLocal, 0);
    }
    Auto() {
        return this.getToken(CParser.Auto, 0);
    }
    Register() {
        return this.getToken(CParser.Register, 0);
    }
    get ruleIndex() {
        return CParser.RULE_storageClassSpecifier;
    }
    enterRule(listener) {
        if (listener.enterStorageClassSpecifier) {
            listener.enterStorageClassSpecifier(this);
        }
    }
    exitRule(listener) {
        if (listener.exitStorageClassSpecifier) {
            listener.exitStorageClassSpecifier(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStorageClassSpecifier) {
            return visitor.visitStorageClassSpecifier(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class TypeSpecifierContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Void() {
        return this.getToken(CParser.Void, 0);
    }
    Char() {
        return this.getToken(CParser.Char, 0);
    }
    Short() {
        return this.getToken(CParser.Short, 0);
    }
    Int() {
        return this.getToken(CParser.Int, 0);
    }
    Long() {
        return this.getToken(CParser.Long, 0);
    }
    Float() {
        return this.getToken(CParser.Float, 0);
    }
    Double() {
        return this.getToken(CParser.Double, 0);
    }
    Signed() {
        return this.getToken(CParser.Signed, 0);
    }
    Unsigned() {
        return this.getToken(CParser.Unsigned, 0);
    }
    Bool() {
        return this.getToken(CParser.Bool, 0);
    }
    Complex() {
        return this.getToken(CParser.Complex, 0);
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    atomicTypeSpecifier() {
        return this.getTypedRuleContext(AtomicTypeSpecifierContext, 0);
    }
    structOrUnionSpecifier() {
        return this.getTypedRuleContext(StructOrUnionSpecifierContext, 0);
    }
    enumSpecifier() {
        return this.getTypedRuleContext(EnumSpecifierContext, 0);
    }
    typedefName() {
        return this.getTypedRuleContext(TypedefNameContext, 0);
    }
    constantExpression() {
        return this.getTypedRuleContext(ConstantExpressionContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_typeSpecifier;
    }
    enterRule(listener) {
        if (listener.enterTypeSpecifier) {
            listener.enterTypeSpecifier(this);
        }
    }
    exitRule(listener) {
        if (listener.exitTypeSpecifier) {
            listener.exitTypeSpecifier(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTypeSpecifier) {
            return visitor.visitTypeSpecifier(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class StructOrUnionSpecifierContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    structOrUnion() {
        return this.getTypedRuleContext(StructOrUnionContext, 0);
    }
    LeftBrace() {
        return this.getToken(CParser.LeftBrace, 0);
    }
    structDeclarationList() {
        return this.getTypedRuleContext(StructDeclarationListContext, 0);
    }
    RightBrace() {
        return this.getToken(CParser.RightBrace, 0);
    }
    Identifier() {
        return this.getToken(CParser.Identifier, 0);
    }
    get ruleIndex() {
        return CParser.RULE_structOrUnionSpecifier;
    }
    enterRule(listener) {
        if (listener.enterStructOrUnionSpecifier) {
            listener.enterStructOrUnionSpecifier(this);
        }
    }
    exitRule(listener) {
        if (listener.exitStructOrUnionSpecifier) {
            listener.exitStructOrUnionSpecifier(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStructOrUnionSpecifier) {
            return visitor.visitStructOrUnionSpecifier(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class StructOrUnionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Struct() {
        return this.getToken(CParser.Struct, 0);
    }
    Union() {
        return this.getToken(CParser.Union, 0);
    }
    get ruleIndex() {
        return CParser.RULE_structOrUnion;
    }
    enterRule(listener) {
        if (listener.enterStructOrUnion) {
            listener.enterStructOrUnion(this);
        }
    }
    exitRule(listener) {
        if (listener.exitStructOrUnion) {
            listener.exitStructOrUnion(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStructOrUnion) {
            return visitor.visitStructOrUnion(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class StructDeclarationListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    structDeclaration_list() {
        return this.getTypedRuleContexts(StructDeclarationContext);
    }
    structDeclaration(i) {
        return this.getTypedRuleContext(StructDeclarationContext, i);
    }
    get ruleIndex() {
        return CParser.RULE_structDeclarationList;
    }
    enterRule(listener) {
        if (listener.enterStructDeclarationList) {
            listener.enterStructDeclarationList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitStructDeclarationList) {
            listener.exitStructDeclarationList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStructDeclarationList) {
            return visitor.visitStructDeclarationList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class StructDeclarationContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    specifierQualifierList() {
        return this.getTypedRuleContext(SpecifierQualifierListContext, 0);
    }
    structDeclaratorList() {
        return this.getTypedRuleContext(StructDeclaratorListContext, 0);
    }
    Semi() {
        return this.getToken(CParser.Semi, 0);
    }
    staticAssertDeclaration() {
        return this.getTypedRuleContext(StaticAssertDeclarationContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_structDeclaration;
    }
    enterRule(listener) {
        if (listener.enterStructDeclaration) {
            listener.enterStructDeclaration(this);
        }
    }
    exitRule(listener) {
        if (listener.exitStructDeclaration) {
            listener.exitStructDeclaration(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStructDeclaration) {
            return visitor.visitStructDeclaration(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class SpecifierQualifierListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    typeSpecifier() {
        return this.getTypedRuleContext(TypeSpecifierContext, 0);
    }
    typeQualifier() {
        return this.getTypedRuleContext(TypeQualifierContext, 0);
    }
    specifierQualifierList() {
        return this.getTypedRuleContext(SpecifierQualifierListContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_specifierQualifierList;
    }
    enterRule(listener) {
        if (listener.enterSpecifierQualifierList) {
            listener.enterSpecifierQualifierList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitSpecifierQualifierList) {
            listener.exitSpecifierQualifierList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitSpecifierQualifierList) {
            return visitor.visitSpecifierQualifierList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class StructDeclaratorListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    structDeclarator_list() {
        return this.getTypedRuleContexts(StructDeclaratorContext);
    }
    structDeclarator(i) {
        return this.getTypedRuleContext(StructDeclaratorContext, i);
    }
    Comma_list() {
        return this.getTokens(CParser.Comma);
    }
    Comma(i) {
        return this.getToken(CParser.Comma, i);
    }
    get ruleIndex() {
        return CParser.RULE_structDeclaratorList;
    }
    enterRule(listener) {
        if (listener.enterStructDeclaratorList) {
            listener.enterStructDeclaratorList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitStructDeclaratorList) {
            listener.exitStructDeclaratorList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStructDeclaratorList) {
            return visitor.visitStructDeclaratorList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class StructDeclaratorContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    declarator() {
        return this.getTypedRuleContext(DeclaratorContext, 0);
    }
    Colon() {
        return this.getToken(CParser.Colon, 0);
    }
    constantExpression() {
        return this.getTypedRuleContext(ConstantExpressionContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_structDeclarator;
    }
    enterRule(listener) {
        if (listener.enterStructDeclarator) {
            listener.enterStructDeclarator(this);
        }
    }
    exitRule(listener) {
        if (listener.exitStructDeclarator) {
            listener.exitStructDeclarator(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStructDeclarator) {
            return visitor.visitStructDeclarator(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class EnumSpecifierContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Enum() {
        return this.getToken(CParser.Enum, 0);
    }
    LeftBrace() {
        return this.getToken(CParser.LeftBrace, 0);
    }
    enumeratorList() {
        return this.getTypedRuleContext(EnumeratorListContext, 0);
    }
    RightBrace() {
        return this.getToken(CParser.RightBrace, 0);
    }
    Identifier() {
        return this.getToken(CParser.Identifier, 0);
    }
    Comma() {
        return this.getToken(CParser.Comma, 0);
    }
    get ruleIndex() {
        return CParser.RULE_enumSpecifier;
    }
    enterRule(listener) {
        if (listener.enterEnumSpecifier) {
            listener.enterEnumSpecifier(this);
        }
    }
    exitRule(listener) {
        if (listener.exitEnumSpecifier) {
            listener.exitEnumSpecifier(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitEnumSpecifier) {
            return visitor.visitEnumSpecifier(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class EnumeratorListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    enumerator_list() {
        return this.getTypedRuleContexts(EnumeratorContext);
    }
    enumerator(i) {
        return this.getTypedRuleContext(EnumeratorContext, i);
    }
    Comma_list() {
        return this.getTokens(CParser.Comma);
    }
    Comma(i) {
        return this.getToken(CParser.Comma, i);
    }
    get ruleIndex() {
        return CParser.RULE_enumeratorList;
    }
    enterRule(listener) {
        if (listener.enterEnumeratorList) {
            listener.enterEnumeratorList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitEnumeratorList) {
            listener.exitEnumeratorList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitEnumeratorList) {
            return visitor.visitEnumeratorList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class EnumeratorContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    enumerationConstant() {
        return this.getTypedRuleContext(EnumerationConstantContext, 0);
    }
    Assign() {
        return this.getToken(CParser.Assign, 0);
    }
    constantExpression() {
        return this.getTypedRuleContext(ConstantExpressionContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_enumerator;
    }
    enterRule(listener) {
        if (listener.enterEnumerator) {
            listener.enterEnumerator(this);
        }
    }
    exitRule(listener) {
        if (listener.exitEnumerator) {
            listener.exitEnumerator(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitEnumerator) {
            return visitor.visitEnumerator(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class EnumerationConstantContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Identifier() {
        return this.getToken(CParser.Identifier, 0);
    }
    get ruleIndex() {
        return CParser.RULE_enumerationConstant;
    }
    enterRule(listener) {
        if (listener.enterEnumerationConstant) {
            listener.enterEnumerationConstant(this);
        }
    }
    exitRule(listener) {
        if (listener.exitEnumerationConstant) {
            listener.exitEnumerationConstant(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitEnumerationConstant) {
            return visitor.visitEnumerationConstant(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class AtomicTypeSpecifierContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Atomic() {
        return this.getToken(CParser.Atomic, 0);
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    typeName() {
        return this.getTypedRuleContext(TypeNameContext, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    get ruleIndex() {
        return CParser.RULE_atomicTypeSpecifier;
    }
    enterRule(listener) {
        if (listener.enterAtomicTypeSpecifier) {
            listener.enterAtomicTypeSpecifier(this);
        }
    }
    exitRule(listener) {
        if (listener.exitAtomicTypeSpecifier) {
            listener.exitAtomicTypeSpecifier(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAtomicTypeSpecifier) {
            return visitor.visitAtomicTypeSpecifier(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class TypeQualifierContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Const() {
        return this.getToken(CParser.Const, 0);
    }
    Restrict() {
        return this.getToken(CParser.Restrict, 0);
    }
    Volatile() {
        return this.getToken(CParser.Volatile, 0);
    }
    Atomic() {
        return this.getToken(CParser.Atomic, 0);
    }
    get ruleIndex() {
        return CParser.RULE_typeQualifier;
    }
    enterRule(listener) {
        if (listener.enterTypeQualifier) {
            listener.enterTypeQualifier(this);
        }
    }
    exitRule(listener) {
        if (listener.exitTypeQualifier) {
            listener.exitTypeQualifier(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTypeQualifier) {
            return visitor.visitTypeQualifier(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class FunctionSpecifierContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Inline() {
        return this.getToken(CParser.Inline, 0);
    }
    Noreturn() {
        return this.getToken(CParser.Noreturn, 0);
    }
    gccAttributeSpecifier() {
        return this.getTypedRuleContext(GccAttributeSpecifierContext, 0);
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    Identifier() {
        return this.getToken(CParser.Identifier, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    get ruleIndex() {
        return CParser.RULE_functionSpecifier;
    }
    enterRule(listener) {
        if (listener.enterFunctionSpecifier) {
            listener.enterFunctionSpecifier(this);
        }
    }
    exitRule(listener) {
        if (listener.exitFunctionSpecifier) {
            listener.exitFunctionSpecifier(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitFunctionSpecifier) {
            return visitor.visitFunctionSpecifier(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class AlignmentSpecifierContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Alignas() {
        return this.getToken(CParser.Alignas, 0);
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    typeName() {
        return this.getTypedRuleContext(TypeNameContext, 0);
    }
    constantExpression() {
        return this.getTypedRuleContext(ConstantExpressionContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_alignmentSpecifier;
    }
    enterRule(listener) {
        if (listener.enterAlignmentSpecifier) {
            listener.enterAlignmentSpecifier(this);
        }
    }
    exitRule(listener) {
        if (listener.exitAlignmentSpecifier) {
            listener.exitAlignmentSpecifier(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAlignmentSpecifier) {
            return visitor.visitAlignmentSpecifier(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class DeclaratorContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    directDeclarator() {
        return this.getTypedRuleContext(DirectDeclaratorContext, 0);
    }
    pointer() {
        return this.getTypedRuleContext(PointerContext, 0);
    }
    gccDeclaratorExtension_list() {
        return this.getTypedRuleContexts(GccDeclaratorExtensionContext);
    }
    gccDeclaratorExtension(i) {
        return this.getTypedRuleContext(GccDeclaratorExtensionContext, i);
    }
    get ruleIndex() {
        return CParser.RULE_declarator;
    }
    enterRule(listener) {
        if (listener.enterDeclarator) {
            listener.enterDeclarator(this);
        }
    }
    exitRule(listener) {
        if (listener.exitDeclarator) {
            listener.exitDeclarator(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDeclarator) {
            return visitor.visitDeclarator(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class DirectDeclaratorContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Identifier() {
        return this.getToken(CParser.Identifier, 0);
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    declarator() {
        return this.getTypedRuleContext(DeclaratorContext, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    Colon() {
        return this.getToken(CParser.Colon, 0);
    }
    DigitSequence() {
        return this.getToken(CParser.DigitSequence, 0);
    }
    vcSpecificModifer() {
        return this.getTypedRuleContext(VcSpecificModiferContext, 0);
    }
    directDeclarator() {
        return this.getTypedRuleContext(DirectDeclaratorContext, 0);
    }
    LeftBracket() {
        return this.getToken(CParser.LeftBracket, 0);
    }
    RightBracket() {
        return this.getToken(CParser.RightBracket, 0);
    }
    typeQualifierList() {
        return this.getTypedRuleContext(TypeQualifierListContext, 0);
    }
    assignmentExpression() {
        return this.getTypedRuleContext(AssignmentExpressionContext, 0);
    }
    Static() {
        return this.getToken(CParser.Static, 0);
    }
    Star() {
        return this.getToken(CParser.Star, 0);
    }
    parameterTypeList() {
        return this.getTypedRuleContext(ParameterTypeListContext, 0);
    }
    identifierList() {
        return this.getTypedRuleContext(IdentifierListContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_directDeclarator;
    }
    enterRule(listener) {
        if (listener.enterDirectDeclarator) {
            listener.enterDirectDeclarator(this);
        }
    }
    exitRule(listener) {
        if (listener.exitDirectDeclarator) {
            listener.exitDirectDeclarator(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDirectDeclarator) {
            return visitor.visitDirectDeclarator(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class VcSpecificModiferContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    get ruleIndex() {
        return CParser.RULE_vcSpecificModifer;
    }
    enterRule(listener) {
        if (listener.enterVcSpecificModifer) {
            listener.enterVcSpecificModifer(this);
        }
    }
    exitRule(listener) {
        if (listener.exitVcSpecificModifer) {
            listener.exitVcSpecificModifer(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitVcSpecificModifer) {
            return visitor.visitVcSpecificModifer(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class GccDeclaratorExtensionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    StringLiteral_list() {
        return this.getTokens(CParser.StringLiteral);
    }
    StringLiteral(i) {
        return this.getToken(CParser.StringLiteral, i);
    }
    gccAttributeSpecifier() {
        return this.getTypedRuleContext(GccAttributeSpecifierContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_gccDeclaratorExtension;
    }
    enterRule(listener) {
        if (listener.enterGccDeclaratorExtension) {
            listener.enterGccDeclaratorExtension(this);
        }
    }
    exitRule(listener) {
        if (listener.exitGccDeclaratorExtension) {
            listener.exitGccDeclaratorExtension(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitGccDeclaratorExtension) {
            return visitor.visitGccDeclaratorExtension(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class GccAttributeSpecifierContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    LeftParen_list() {
        return this.getTokens(CParser.LeftParen);
    }
    LeftParen(i) {
        return this.getToken(CParser.LeftParen, i);
    }
    gccAttributeList() {
        return this.getTypedRuleContext(GccAttributeListContext, 0);
    }
    RightParen_list() {
        return this.getTokens(CParser.RightParen);
    }
    RightParen(i) {
        return this.getToken(CParser.RightParen, i);
    }
    get ruleIndex() {
        return CParser.RULE_gccAttributeSpecifier;
    }
    enterRule(listener) {
        if (listener.enterGccAttributeSpecifier) {
            listener.enterGccAttributeSpecifier(this);
        }
    }
    exitRule(listener) {
        if (listener.exitGccAttributeSpecifier) {
            listener.exitGccAttributeSpecifier(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitGccAttributeSpecifier) {
            return visitor.visitGccAttributeSpecifier(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class GccAttributeListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    gccAttribute_list() {
        return this.getTypedRuleContexts(GccAttributeContext);
    }
    gccAttribute(i) {
        return this.getTypedRuleContext(GccAttributeContext, i);
    }
    Comma_list() {
        return this.getTokens(CParser.Comma);
    }
    Comma(i) {
        return this.getToken(CParser.Comma, i);
    }
    get ruleIndex() {
        return CParser.RULE_gccAttributeList;
    }
    enterRule(listener) {
        if (listener.enterGccAttributeList) {
            listener.enterGccAttributeList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitGccAttributeList) {
            listener.exitGccAttributeList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitGccAttributeList) {
            return visitor.visitGccAttributeList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class GccAttributeContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Comma() {
        return this.getToken(CParser.Comma, 0);
    }
    LeftParen_list() {
        return this.getTokens(CParser.LeftParen);
    }
    LeftParen(i) {
        return this.getToken(CParser.LeftParen, i);
    }
    RightParen_list() {
        return this.getTokens(CParser.RightParen);
    }
    RightParen(i) {
        return this.getToken(CParser.RightParen, i);
    }
    argumentExpressionList() {
        return this.getTypedRuleContext(ArgumentExpressionListContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_gccAttribute;
    }
    enterRule(listener) {
        if (listener.enterGccAttribute) {
            listener.enterGccAttribute(this);
        }
    }
    exitRule(listener) {
        if (listener.exitGccAttribute) {
            listener.exitGccAttribute(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitGccAttribute) {
            return visitor.visitGccAttribute(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class NestedParenthesesBlockContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    LeftParen_list() {
        return this.getTokens(CParser.LeftParen);
    }
    LeftParen(i) {
        return this.getToken(CParser.LeftParen, i);
    }
    nestedParenthesesBlock_list() {
        return this.getTypedRuleContexts(NestedParenthesesBlockContext);
    }
    nestedParenthesesBlock(i) {
        return this.getTypedRuleContext(NestedParenthesesBlockContext, i);
    }
    RightParen_list() {
        return this.getTokens(CParser.RightParen);
    }
    RightParen(i) {
        return this.getToken(CParser.RightParen, i);
    }
    get ruleIndex() {
        return CParser.RULE_nestedParenthesesBlock;
    }
    enterRule(listener) {
        if (listener.enterNestedParenthesesBlock) {
            listener.enterNestedParenthesesBlock(this);
        }
    }
    exitRule(listener) {
        if (listener.exitNestedParenthesesBlock) {
            listener.exitNestedParenthesesBlock(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitNestedParenthesesBlock) {
            return visitor.visitNestedParenthesesBlock(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class PointerContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Star_list() {
        return this.getTokens(CParser.Star);
    }
    Star(i) {
        return this.getToken(CParser.Star, i);
    }
    Caret_list() {
        return this.getTokens(CParser.Caret);
    }
    Caret(i) {
        return this.getToken(CParser.Caret, i);
    }
    typeQualifierList_list() {
        return this.getTypedRuleContexts(TypeQualifierListContext);
    }
    typeQualifierList(i) {
        return this.getTypedRuleContext(TypeQualifierListContext, i);
    }
    get ruleIndex() {
        return CParser.RULE_pointer;
    }
    enterRule(listener) {
        if (listener.enterPointer) {
            listener.enterPointer(this);
        }
    }
    exitRule(listener) {
        if (listener.exitPointer) {
            listener.exitPointer(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitPointer) {
            return visitor.visitPointer(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class TypeQualifierListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    typeQualifier_list() {
        return this.getTypedRuleContexts(TypeQualifierContext);
    }
    typeQualifier(i) {
        return this.getTypedRuleContext(TypeQualifierContext, i);
    }
    get ruleIndex() {
        return CParser.RULE_typeQualifierList;
    }
    enterRule(listener) {
        if (listener.enterTypeQualifierList) {
            listener.enterTypeQualifierList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitTypeQualifierList) {
            listener.exitTypeQualifierList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTypeQualifierList) {
            return visitor.visitTypeQualifierList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ParameterTypeListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    parameterList() {
        return this.getTypedRuleContext(ParameterListContext, 0);
    }
    Comma() {
        return this.getToken(CParser.Comma, 0);
    }
    Ellipsis() {
        return this.getToken(CParser.Ellipsis, 0);
    }
    get ruleIndex() {
        return CParser.RULE_parameterTypeList;
    }
    enterRule(listener) {
        if (listener.enterParameterTypeList) {
            listener.enterParameterTypeList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitParameterTypeList) {
            listener.exitParameterTypeList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitParameterTypeList) {
            return visitor.visitParameterTypeList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ParameterListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    parameterDeclaration_list() {
        return this.getTypedRuleContexts(ParameterDeclarationContext);
    }
    parameterDeclaration(i) {
        return this.getTypedRuleContext(ParameterDeclarationContext, i);
    }
    Comma_list() {
        return this.getTokens(CParser.Comma);
    }
    Comma(i) {
        return this.getToken(CParser.Comma, i);
    }
    get ruleIndex() {
        return CParser.RULE_parameterList;
    }
    enterRule(listener) {
        if (listener.enterParameterList) {
            listener.enterParameterList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitParameterList) {
            listener.exitParameterList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitParameterList) {
            return visitor.visitParameterList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ParameterDeclarationContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    declarationSpecifiers() {
        return this.getTypedRuleContext(DeclarationSpecifiersContext, 0);
    }
    declarator() {
        return this.getTypedRuleContext(DeclaratorContext, 0);
    }
    declarationSpecifiers2() {
        return this.getTypedRuleContext(DeclarationSpecifiers2Context, 0);
    }
    abstractDeclarator() {
        return this.getTypedRuleContext(AbstractDeclaratorContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_parameterDeclaration;
    }
    enterRule(listener) {
        if (listener.enterParameterDeclaration) {
            listener.enterParameterDeclaration(this);
        }
    }
    exitRule(listener) {
        if (listener.exitParameterDeclaration) {
            listener.exitParameterDeclaration(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitParameterDeclaration) {
            return visitor.visitParameterDeclaration(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class IdentifierListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Identifier_list() {
        return this.getTokens(CParser.Identifier);
    }
    Identifier(i) {
        return this.getToken(CParser.Identifier, i);
    }
    Comma_list() {
        return this.getTokens(CParser.Comma);
    }
    Comma(i) {
        return this.getToken(CParser.Comma, i);
    }
    get ruleIndex() {
        return CParser.RULE_identifierList;
    }
    enterRule(listener) {
        if (listener.enterIdentifierList) {
            listener.enterIdentifierList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitIdentifierList) {
            listener.exitIdentifierList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitIdentifierList) {
            return visitor.visitIdentifierList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class TypeNameContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    specifierQualifierList() {
        return this.getTypedRuleContext(SpecifierQualifierListContext, 0);
    }
    abstractDeclarator() {
        return this.getTypedRuleContext(AbstractDeclaratorContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_typeName;
    }
    enterRule(listener) {
        if (listener.enterTypeName) {
            listener.enterTypeName(this);
        }
    }
    exitRule(listener) {
        if (listener.exitTypeName) {
            listener.exitTypeName(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTypeName) {
            return visitor.visitTypeName(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class AbstractDeclaratorContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    pointer() {
        return this.getTypedRuleContext(PointerContext, 0);
    }
    directAbstractDeclarator() {
        return this.getTypedRuleContext(DirectAbstractDeclaratorContext, 0);
    }
    gccDeclaratorExtension_list() {
        return this.getTypedRuleContexts(GccDeclaratorExtensionContext);
    }
    gccDeclaratorExtension(i) {
        return this.getTypedRuleContext(GccDeclaratorExtensionContext, i);
    }
    get ruleIndex() {
        return CParser.RULE_abstractDeclarator;
    }
    enterRule(listener) {
        if (listener.enterAbstractDeclarator) {
            listener.enterAbstractDeclarator(this);
        }
    }
    exitRule(listener) {
        if (listener.exitAbstractDeclarator) {
            listener.exitAbstractDeclarator(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitAbstractDeclarator) {
            return visitor.visitAbstractDeclarator(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class DirectAbstractDeclaratorContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    abstractDeclarator() {
        return this.getTypedRuleContext(AbstractDeclaratorContext, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    gccDeclaratorExtension_list() {
        return this.getTypedRuleContexts(GccDeclaratorExtensionContext);
    }
    gccDeclaratorExtension(i) {
        return this.getTypedRuleContext(GccDeclaratorExtensionContext, i);
    }
    LeftBracket() {
        return this.getToken(CParser.LeftBracket, 0);
    }
    RightBracket() {
        return this.getToken(CParser.RightBracket, 0);
    }
    typeQualifierList() {
        return this.getTypedRuleContext(TypeQualifierListContext, 0);
    }
    assignmentExpression() {
        return this.getTypedRuleContext(AssignmentExpressionContext, 0);
    }
    Static() {
        return this.getToken(CParser.Static, 0);
    }
    Star() {
        return this.getToken(CParser.Star, 0);
    }
    parameterTypeList() {
        return this.getTypedRuleContext(ParameterTypeListContext, 0);
    }
    directAbstractDeclarator() {
        return this.getTypedRuleContext(DirectAbstractDeclaratorContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_directAbstractDeclarator;
    }
    enterRule(listener) {
        if (listener.enterDirectAbstractDeclarator) {
            listener.enterDirectAbstractDeclarator(this);
        }
    }
    exitRule(listener) {
        if (listener.exitDirectAbstractDeclarator) {
            listener.exitDirectAbstractDeclarator(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDirectAbstractDeclarator) {
            return visitor.visitDirectAbstractDeclarator(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class TypedefNameContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Identifier() {
        return this.getToken(CParser.Identifier, 0);
    }
    get ruleIndex() {
        return CParser.RULE_typedefName;
    }
    enterRule(listener) {
        if (listener.enterTypedefName) {
            listener.enterTypedefName(this);
        }
    }
    exitRule(listener) {
        if (listener.exitTypedefName) {
            listener.exitTypedefName(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTypedefName) {
            return visitor.visitTypedefName(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class InitializerContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    assignmentExpression() {
        return this.getTypedRuleContext(AssignmentExpressionContext, 0);
    }
    LeftBrace() {
        return this.getToken(CParser.LeftBrace, 0);
    }
    initializerList() {
        return this.getTypedRuleContext(InitializerListContext, 0);
    }
    RightBrace() {
        return this.getToken(CParser.RightBrace, 0);
    }
    Comma() {
        return this.getToken(CParser.Comma, 0);
    }
    get ruleIndex() {
        return CParser.RULE_initializer;
    }
    enterRule(listener) {
        if (listener.enterInitializer) {
            listener.enterInitializer(this);
        }
    }
    exitRule(listener) {
        if (listener.exitInitializer) {
            listener.exitInitializer(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitInitializer) {
            return visitor.visitInitializer(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class InitializerListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    initializer_list() {
        return this.getTypedRuleContexts(InitializerContext);
    }
    initializer(i) {
        return this.getTypedRuleContext(InitializerContext, i);
    }
    designation_list() {
        return this.getTypedRuleContexts(DesignationContext);
    }
    designation(i) {
        return this.getTypedRuleContext(DesignationContext, i);
    }
    Comma_list() {
        return this.getTokens(CParser.Comma);
    }
    Comma(i) {
        return this.getToken(CParser.Comma, i);
    }
    get ruleIndex() {
        return CParser.RULE_initializerList;
    }
    enterRule(listener) {
        if (listener.enterInitializerList) {
            listener.enterInitializerList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitInitializerList) {
            listener.exitInitializerList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitInitializerList) {
            return visitor.visitInitializerList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class DesignationContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    designatorList() {
        return this.getTypedRuleContext(DesignatorListContext, 0);
    }
    Assign() {
        return this.getToken(CParser.Assign, 0);
    }
    get ruleIndex() {
        return CParser.RULE_designation;
    }
    enterRule(listener) {
        if (listener.enterDesignation) {
            listener.enterDesignation(this);
        }
    }
    exitRule(listener) {
        if (listener.exitDesignation) {
            listener.exitDesignation(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDesignation) {
            return visitor.visitDesignation(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class DesignatorListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    designator_list() {
        return this.getTypedRuleContexts(DesignatorContext);
    }
    designator(i) {
        return this.getTypedRuleContext(DesignatorContext, i);
    }
    get ruleIndex() {
        return CParser.RULE_designatorList;
    }
    enterRule(listener) {
        if (listener.enterDesignatorList) {
            listener.enterDesignatorList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitDesignatorList) {
            listener.exitDesignatorList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDesignatorList) {
            return visitor.visitDesignatorList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class DesignatorContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    LeftBracket() {
        return this.getToken(CParser.LeftBracket, 0);
    }
    constantExpression() {
        return this.getTypedRuleContext(ConstantExpressionContext, 0);
    }
    RightBracket() {
        return this.getToken(CParser.RightBracket, 0);
    }
    Dot() {
        return this.getToken(CParser.Dot, 0);
    }
    Identifier() {
        return this.getToken(CParser.Identifier, 0);
    }
    get ruleIndex() {
        return CParser.RULE_designator;
    }
    enterRule(listener) {
        if (listener.enterDesignator) {
            listener.enterDesignator(this);
        }
    }
    exitRule(listener) {
        if (listener.exitDesignator) {
            listener.exitDesignator(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDesignator) {
            return visitor.visitDesignator(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class StaticAssertDeclarationContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    StaticAssert() {
        return this.getToken(CParser.StaticAssert, 0);
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    constantExpression() {
        return this.getTypedRuleContext(ConstantExpressionContext, 0);
    }
    Comma() {
        return this.getToken(CParser.Comma, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    Semi() {
        return this.getToken(CParser.Semi, 0);
    }
    StringLiteral_list() {
        return this.getTokens(CParser.StringLiteral);
    }
    StringLiteral(i) {
        return this.getToken(CParser.StringLiteral, i);
    }
    get ruleIndex() {
        return CParser.RULE_staticAssertDeclaration;
    }
    enterRule(listener) {
        if (listener.enterStaticAssertDeclaration) {
            listener.enterStaticAssertDeclaration(this);
        }
    }
    exitRule(listener) {
        if (listener.exitStaticAssertDeclaration) {
            listener.exitStaticAssertDeclaration(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStaticAssertDeclaration) {
            return visitor.visitStaticAssertDeclaration(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class StatementContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    labeledStatement() {
        return this.getTypedRuleContext(LabeledStatementContext, 0);
    }
    compoundStatement() {
        return this.getTypedRuleContext(CompoundStatementContext, 0);
    }
    expressionStatement() {
        return this.getTypedRuleContext(ExpressionStatementContext, 0);
    }
    selectionStatement() {
        return this.getTypedRuleContext(SelectionStatementContext, 0);
    }
    iterationStatement() {
        return this.getTypedRuleContext(IterationStatementContext, 0);
    }
    jumpStatement() {
        return this.getTypedRuleContext(JumpStatementContext, 0);
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    Semi() {
        return this.getToken(CParser.Semi, 0);
    }
    Volatile() {
        return this.getToken(CParser.Volatile, 0);
    }
    logicalOrExpression_list() {
        return this.getTypedRuleContexts(LogicalOrExpressionContext);
    }
    logicalOrExpression(i) {
        return this.getTypedRuleContext(LogicalOrExpressionContext, i);
    }
    Colon_list() {
        return this.getTokens(CParser.Colon);
    }
    Colon(i) {
        return this.getToken(CParser.Colon, i);
    }
    Comma_list() {
        return this.getTokens(CParser.Comma);
    }
    Comma(i) {
        return this.getToken(CParser.Comma, i);
    }
    get ruleIndex() {
        return CParser.RULE_statement;
    }
    enterRule(listener) {
        if (listener.enterStatement) {
            listener.enterStatement(this);
        }
    }
    exitRule(listener) {
        if (listener.exitStatement) {
            listener.exitStatement(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitStatement) {
            return visitor.visitStatement(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class LabeledStatementContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Identifier() {
        return this.getToken(CParser.Identifier, 0);
    }
    Colon() {
        return this.getToken(CParser.Colon, 0);
    }
    statement() {
        return this.getTypedRuleContext(StatementContext, 0);
    }
    Case() {
        return this.getToken(CParser.Case, 0);
    }
    constantExpression() {
        return this.getTypedRuleContext(ConstantExpressionContext, 0);
    }
    Default() {
        return this.getToken(CParser.Default, 0);
    }
    get ruleIndex() {
        return CParser.RULE_labeledStatement;
    }
    enterRule(listener) {
        if (listener.enterLabeledStatement) {
            listener.enterLabeledStatement(this);
        }
    }
    exitRule(listener) {
        if (listener.exitLabeledStatement) {
            listener.exitLabeledStatement(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitLabeledStatement) {
            return visitor.visitLabeledStatement(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class CompoundStatementContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    LeftBrace() {
        return this.getToken(CParser.LeftBrace, 0);
    }
    RightBrace() {
        return this.getToken(CParser.RightBrace, 0);
    }
    blockItemList() {
        return this.getTypedRuleContext(BlockItemListContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_compoundStatement;
    }
    enterRule(listener) {
        if (listener.enterCompoundStatement) {
            listener.enterCompoundStatement(this);
        }
    }
    exitRule(listener) {
        if (listener.exitCompoundStatement) {
            listener.exitCompoundStatement(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitCompoundStatement) {
            return visitor.visitCompoundStatement(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class BlockItemListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    blockItem_list() {
        return this.getTypedRuleContexts(BlockItemContext);
    }
    blockItem(i) {
        return this.getTypedRuleContext(BlockItemContext, i);
    }
    get ruleIndex() {
        return CParser.RULE_blockItemList;
    }
    enterRule(listener) {
        if (listener.enterBlockItemList) {
            listener.enterBlockItemList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitBlockItemList) {
            listener.exitBlockItemList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitBlockItemList) {
            return visitor.visitBlockItemList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class BlockItemContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    statement() {
        return this.getTypedRuleContext(StatementContext, 0);
    }
    declaration() {
        return this.getTypedRuleContext(DeclarationContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_blockItem;
    }
    enterRule(listener) {
        if (listener.enterBlockItem) {
            listener.enterBlockItem(this);
        }
    }
    exitRule(listener) {
        if (listener.exitBlockItem) {
            listener.exitBlockItem(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitBlockItem) {
            return visitor.visitBlockItem(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ExpressionStatementContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Semi() {
        return this.getToken(CParser.Semi, 0);
    }
    expression() {
        return this.getTypedRuleContext(ExpressionContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_expressionStatement;
    }
    enterRule(listener) {
        if (listener.enterExpressionStatement) {
            listener.enterExpressionStatement(this);
        }
    }
    exitRule(listener) {
        if (listener.exitExpressionStatement) {
            listener.exitExpressionStatement(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitExpressionStatement) {
            return visitor.visitExpressionStatement(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class SelectionStatementContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    If() {
        return this.getToken(CParser.If, 0);
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    expression() {
        return this.getTypedRuleContext(ExpressionContext, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    statement_list() {
        return this.getTypedRuleContexts(StatementContext);
    }
    statement(i) {
        return this.getTypedRuleContext(StatementContext, i);
    }
    Else() {
        return this.getToken(CParser.Else, 0);
    }
    Switch() {
        return this.getToken(CParser.Switch, 0);
    }
    get ruleIndex() {
        return CParser.RULE_selectionStatement;
    }
    enterRule(listener) {
        if (listener.enterSelectionStatement) {
            listener.enterSelectionStatement(this);
        }
    }
    exitRule(listener) {
        if (listener.exitSelectionStatement) {
            listener.exitSelectionStatement(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitSelectionStatement) {
            return visitor.visitSelectionStatement(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class IterationStatementContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    While() {
        return this.getToken(CParser.While, 0);
    }
    LeftParen() {
        return this.getToken(CParser.LeftParen, 0);
    }
    expression() {
        return this.getTypedRuleContext(ExpressionContext, 0);
    }
    RightParen() {
        return this.getToken(CParser.RightParen, 0);
    }
    statement() {
        return this.getTypedRuleContext(StatementContext, 0);
    }
    Do() {
        return this.getToken(CParser.Do, 0);
    }
    Semi() {
        return this.getToken(CParser.Semi, 0);
    }
    For() {
        return this.getToken(CParser.For, 0);
    }
    forCondition() {
        return this.getTypedRuleContext(ForConditionContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_iterationStatement;
    }
    enterRule(listener) {
        if (listener.enterIterationStatement) {
            listener.enterIterationStatement(this);
        }
    }
    exitRule(listener) {
        if (listener.exitIterationStatement) {
            listener.exitIterationStatement(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitIterationStatement) {
            return visitor.visitIterationStatement(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ForConditionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Semi_list() {
        return this.getTokens(CParser.Semi);
    }
    Semi(i) {
        return this.getToken(CParser.Semi, i);
    }
    forDeclaration() {
        return this.getTypedRuleContext(ForDeclarationContext, 0);
    }
    forExpression_list() {
        return this.getTypedRuleContexts(ForExpressionContext);
    }
    forExpression(i) {
        return this.getTypedRuleContext(ForExpressionContext, i);
    }
    expression() {
        return this.getTypedRuleContext(ExpressionContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_forCondition;
    }
    enterRule(listener) {
        if (listener.enterForCondition) {
            listener.enterForCondition(this);
        }
    }
    exitRule(listener) {
        if (listener.exitForCondition) {
            listener.exitForCondition(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitForCondition) {
            return visitor.visitForCondition(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ForDeclarationContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    declarationSpecifiers() {
        return this.getTypedRuleContext(DeclarationSpecifiersContext, 0);
    }
    initDeclaratorList() {
        return this.getTypedRuleContext(InitDeclaratorListContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_forDeclaration;
    }
    enterRule(listener) {
        if (listener.enterForDeclaration) {
            listener.enterForDeclaration(this);
        }
    }
    exitRule(listener) {
        if (listener.exitForDeclaration) {
            listener.exitForDeclaration(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitForDeclaration) {
            return visitor.visitForDeclaration(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ForExpressionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    assignmentExpression_list() {
        return this.getTypedRuleContexts(AssignmentExpressionContext);
    }
    assignmentExpression(i) {
        return this.getTypedRuleContext(AssignmentExpressionContext, i);
    }
    Comma_list() {
        return this.getTokens(CParser.Comma);
    }
    Comma(i) {
        return this.getToken(CParser.Comma, i);
    }
    get ruleIndex() {
        return CParser.RULE_forExpression;
    }
    enterRule(listener) {
        if (listener.enterForExpression) {
            listener.enterForExpression(this);
        }
    }
    exitRule(listener) {
        if (listener.exitForExpression) {
            listener.exitForExpression(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitForExpression) {
            return visitor.visitForExpression(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class JumpStatementContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    Semi() {
        return this.getToken(CParser.Semi, 0);
    }
    Goto() {
        return this.getToken(CParser.Goto, 0);
    }
    Identifier() {
        return this.getToken(CParser.Identifier, 0);
    }
    Return() {
        return this.getToken(CParser.Return, 0);
    }
    unaryExpression() {
        return this.getTypedRuleContext(UnaryExpressionContext, 0);
    }
    Continue() {
        return this.getToken(CParser.Continue, 0);
    }
    Break() {
        return this.getToken(CParser.Break, 0);
    }
    expression() {
        return this.getTypedRuleContext(ExpressionContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_jumpStatement;
    }
    enterRule(listener) {
        if (listener.enterJumpStatement) {
            listener.enterJumpStatement(this);
        }
    }
    exitRule(listener) {
        if (listener.exitJumpStatement) {
            listener.exitJumpStatement(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitJumpStatement) {
            return visitor.visitJumpStatement(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class CompilationUnitContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    EOF() {
        return this.getToken(CParser.EOF, 0);
    }
    translationUnit() {
        return this.getTypedRuleContext(TranslationUnitContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_compilationUnit;
    }
    enterRule(listener) {
        if (listener.enterCompilationUnit) {
            listener.enterCompilationUnit(this);
        }
    }
    exitRule(listener) {
        if (listener.exitCompilationUnit) {
            listener.exitCompilationUnit(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitCompilationUnit) {
            return visitor.visitCompilationUnit(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class TranslationUnitContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    externalDeclaration_list() {
        return this.getTypedRuleContexts(ExternalDeclarationContext);
    }
    externalDeclaration(i) {
        return this.getTypedRuleContext(ExternalDeclarationContext, i);
    }
    get ruleIndex() {
        return CParser.RULE_translationUnit;
    }
    enterRule(listener) {
        if (listener.enterTranslationUnit) {
            listener.enterTranslationUnit(this);
        }
    }
    exitRule(listener) {
        if (listener.exitTranslationUnit) {
            listener.exitTranslationUnit(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitTranslationUnit) {
            return visitor.visitTranslationUnit(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class ExternalDeclarationContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    functionDefinition() {
        return this.getTypedRuleContext(FunctionDefinitionContext, 0);
    }
    declaration() {
        return this.getTypedRuleContext(DeclarationContext, 0);
    }
    Semi() {
        return this.getToken(CParser.Semi, 0);
    }
    get ruleIndex() {
        return CParser.RULE_externalDeclaration;
    }
    enterRule(listener) {
        if (listener.enterExternalDeclaration) {
            listener.enterExternalDeclaration(this);
        }
    }
    exitRule(listener) {
        if (listener.exitExternalDeclaration) {
            listener.exitExternalDeclaration(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitExternalDeclaration) {
            return visitor.visitExternalDeclaration(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class FunctionDefinitionContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    declarator() {
        return this.getTypedRuleContext(DeclaratorContext, 0);
    }
    compoundStatement() {
        return this.getTypedRuleContext(CompoundStatementContext, 0);
    }
    declarationSpecifiers() {
        return this.getTypedRuleContext(DeclarationSpecifiersContext, 0);
    }
    declarationList() {
        return this.getTypedRuleContext(DeclarationListContext, 0);
    }
    get ruleIndex() {
        return CParser.RULE_functionDefinition;
    }
    enterRule(listener) {
        if (listener.enterFunctionDefinition) {
            listener.enterFunctionDefinition(this);
        }
    }
    exitRule(listener) {
        if (listener.exitFunctionDefinition) {
            listener.exitFunctionDefinition(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitFunctionDefinition) {
            return visitor.visitFunctionDefinition(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
export class DeclarationListContext extends ParserRuleContext {
    constructor(parser, parent, invokingState) {
        super(parent, invokingState);
        this.parser = parser;
    }
    declaration_list() {
        return this.getTypedRuleContexts(DeclarationContext);
    }
    declaration(i) {
        return this.getTypedRuleContext(DeclarationContext, i);
    }
    get ruleIndex() {
        return CParser.RULE_declarationList;
    }
    enterRule(listener) {
        if (listener.enterDeclarationList) {
            listener.enterDeclarationList(this);
        }
    }
    exitRule(listener) {
        if (listener.exitDeclarationList) {
            listener.exitDeclarationList(this);
        }
    }
    // @Override
    accept(visitor) {
        if (visitor.visitDeclarationList) {
            return visitor.visitDeclarationList(this);
        }
        else {
            return visitor.visitChildren(this);
        }
    }
}
//# sourceMappingURL=CParser.js.map