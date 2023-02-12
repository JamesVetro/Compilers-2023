"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexertoken = void 0;
var Lexertoken = /** @class */ (function () {
    function Lexertoken() {
    }
    Lexertoken.lex = function () {
        {
            // Grab the "raw" source code.
            var sourceCode = document.getElementById("taSourceCode").value;
            // Trim the leading and trailing spaces.
            sourceCode = TSC.Utils.trim(sourceCode);
            analyze(sourceCode);
            var lexer = new Lexer(sourceCode);
            var token = lexer.getNextToken();
            while (token.type !== TokenType.EOF) {
                console.log(token);
                token = lexer.getNextToken();
            }
            // TODO: remove all spaces in the middle; remove line breaks too.
            return sourceCode;
        }
    };
    return Lexertoken;
}());
exports.Lexertoken = Lexertoken;
var TokenType;
(function (TokenType) {
    TokenType["INTEGER"] = "INTEGER";
    TokenType["VARIABLE"] = "VARIABLE";
    TokenType["PRINT"] = "PRINT";
    TokenType["WHILE"] = "WHILE";
    TokenType["IF"] = "IF";
    TokenType["BOOLEAN"] = "BOOLEAN";
    TokenType["INT"] = "INT";
    TokenType["STRING"] = "STRING";
    TokenType["TRUE"] = "TRUE";
    TokenType["FALSE"] = "FALSE";
    TokenType["OPERATOR"] = "OPERATOR";
    TokenType["PAREN"] = "PAREN";
    TokenType["CURLY_BRACE"] = "CURLY_BRACE";
    TokenType["EOF"] = "EOF";
    TokenType["COMMENT"] = "COMMENT";
})(TokenType || (TokenType = {}));
var Token = /** @class */ (function () {
    function Token(type, value, pos) {
        this.type = type;
        this.value = value;
        this.pos = pos;
    }
    return Token;
}());
var Lexer = /** @class */ (function () {
    function Lexer(text) {
        this.text = text;
        this.pos = 0;
        this.currentChar = this.text.charAt(this.pos);
    }
    Lexer.prototype.advance = function () {
        this.pos += 1;
        if (this.pos > this.text.length - 1) {
            this.currentChar = "";
        }
        else {
            this.currentChar = this.text.charAt(this.pos);
        }
    };
    Lexer.prototype.skipWhitespace = function () {
        while (this.currentChar !== "" && this.currentChar === ' ') {
            this.advance();
        }
    };
    Lexer.prototype.isAlpha = function (ch) {
        return /^[a-z]+$/i.test(ch);
    };
    Lexer.prototype.isDigit = function (ch) {
        return /^\d$/.test(ch);
    };
    Lexer.prototype.getNextToken = function () {
        while (this.currentChar !== "") {
            if (this.currentChar === ' ') {
                this.skipWhitespace();
                continue;
            }
            if (this.isAlpha(this.currentChar)) {
                var result = '';
                while (this.isAlpha(this.currentChar)) {
                    result += this.currentChar;
                    this.advance();
                }
                if (result === 'print') {
                    return new Token(TokenType.PRINT, result, this.pos - result.length);
                }
                return new Token(TokenType.VARIABLE, result, this.pos - result.length);
            }
            if (this.isDigit(this.currentChar)) {
                var result = '';
                while (this.isDigit(this.currentChar)) {
                    result += this.currentChar;
                    this.advance();
                }
                return new Token(TokenType.INTEGER, parseInt(result), this.pos - result.length);
            }
            if (this.currentChar === '=') {
                var result = this.currentChar;
                this.advance();
                if (this.currentChar === '=') {
                    result += this.currentChar;
                    this.advance();
                }
                return new Token(TokenType.OPERATOR, result, this.pos - result.length);
            }
            if (this.currentChar === '!') {
                var result = this.currentChar;
                this.pos += 1;
                if (this.pos > this.text.length - 1) {
                    this.currentChar = "";
                }
                else {
                    this.currentChar = this.text.charAt(this.pos);
                }
                if (this.currentChar === '=') {
                    result += this.currentChar;
                    this.advance();
                }
                return new Token(TokenType.OPERATOR, result, this.pos - result.length);
            }
            if (this.currentChar === '(' || this.currentChar === ')') {
                var result = this.currentChar;
                this.advance();
                return new Token(TokenType.PAREN, result, this.pos - result.length);
            }
            if (this.currentChar === '{' || this.currentChar === '}') {
                var result = this.currentChar;
                this.advance();
                return new Token(TokenType.CURLY_BRACE, result, this.pos - result.length);
            }
            if (this.currentChar === '/') {
                var result = this.currentChar;
                this.pos += 1;
                if (this.pos > this.text.length - 1) {
                    this.currentChar = "";
                }
                else {
                    this.currentChar = this.text.charAt(this.pos);
                }
                if (this.currentChar === '*') {
                    result += this.currentChar;
                    this.pos += 1;
                    if (this.pos > this.text.length - 1) {
                        this.currentChar = "";
                    }
                    else {
                        this.currentChar = this.text.charAt(this.pos);
                    }
                    var comment = '';
                    while (this.currentChar !== "" && !(this.currentChar === '*' && this.text.charAt(this.pos + 1) === '/')) {
                        comment += this.currentChar;
                        this.advance();
                    }
                    if (this.currentChar === '*') {
                        result += this.currentChar;
                        this.pos += 1;
                        if (this.pos > this.text.length - 1) {
                            this.currentChar = "";
                        }
                        else {
                            this.currentChar = this.text.charAt(this.pos);
                        }
                        if (this.currentChar === '/') {
                            result += this.currentChar;
                            this.advance();
                        }
                    }
                    return new Token(TokenType.COMMENT, result + comment, this.pos - result.length - comment.length);
                }
            }
        }
        return new Token(TokenType.EOF, null, this.pos);
    };
    return Lexer;
}());
