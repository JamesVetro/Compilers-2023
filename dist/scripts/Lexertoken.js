"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexertoken = void 0;
var Lexertoken = /** @class */ (function () {
    function Lexertoken() {
    }
    Lexertoken.lex = function () {
        {
            var sourceCode = document.getElementById("taSourceCode").value;
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
    TokenType["ERROR"] = "ERROR";
})(TokenType || (TokenType = {}));
var Token = /** @class */ (function () {
    function Token(type, value, pos, line) {
        this.type = type;
        this.value = value;
        this.pos = pos;
        this.line = line;
    }
    return Token;
}());
var Lexer = /** @class */ (function () {
    function Lexer(text) {
        this.text = text;
        this.pos = 0;
        this.currentChar = this.text.charAt(this.pos);
        this.line = 0;
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
    Lexer.prototype.AlphaSplitter = function (Block) {
        Block = Block.toLowerCase();
        while (true) {
            var LockUp = Block.charAt(0);
            if (LockUp == "i") {
                if (Block.charAt(1) == "n" && Block.charAt(2) == "t") {
                    LockUp += Block.charAt(1) + Block.charAt(2);
                    Block = Block.substring(3);
                    return new Token(TokenType.INT, LockUp, this.pos - LockUp.length, this.line);
                }
                else if (Block.charAt(1) == "f") {
                    LockUp += Block.charAt(1);
                    Block = Block.substring(2);
                    return new Token(TokenType.IF, LockUp, this.pos - LockUp.length, this.line);
                }
                else {
                    Block = Block.substring(1);
                    return new Token(TokenType.VARIABLE, LockUp, this.pos - LockUp.length, this.line);
                }
            }
            else if (LockUp == "t" && Block.charAt(1) == "r" && Block.charAt(2) == "u" && Block.charAt(3) == "e") {
                LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3);
                Block = Block.substring(4);
                return new Token(TokenType.TRUE, LockUp, this.pos - LockUp.length, this.line);
            }
            else if (LockUp == "f" && Block.charAt(1) == "a" && Block.charAt(2) == "l" && Block.charAt(3) == "s" && Block.charAt(4) == "e") {
                LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4);
                Block = Block.substring(5);
                return new Token(TokenType.FALSE, LockUp, this.pos - LockUp.length, this.line);
            }
            else if (LockUp == "s" && Block.charAt(1) == "t" && Block.charAt(2) == "r" && Block.charAt(3) == "i" && Block.charAt(4) == "n" && Block.charAt(5) == "g") {
                LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4) + Block.charAt(5);
                Block = Block.substring(6);
                return new Token(TokenType.STRING, LockUp, this.pos - LockUp.length, this.line);
            }
            else if (LockUp == "p" && Block.charAt(1) == "r" && Block.charAt(2) == "i" && Block.charAt(3) == "n" && Block.charAt(4) == "t") {
                LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4);
                Block = Block.substring(5);
                return new Token(TokenType.PRINT, LockUp, this.pos - LockUp.length, this.line);
            }
            else if (LockUp == "w" && Block.charAt(1) == "h" && Block.charAt(2) == "i" && Block.charAt(3) == "l" && Block.charAt(4) == "e") {
                LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4);
                Block = Block.substring(5);
                return new Token(TokenType.WHILE, LockUp, this.pos - LockUp.length, this.line);
            }
            else if (LockUp == "b" && Block.charAt(1) == "o" && Block.charAt(2) == "o" && Block.charAt(3) == "l" && Block.charAt(4) == "e" && Block.charAt(5) == "a" && Block.charAt(6) == "n") {
                LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4) + Block.charAt(5) + Block.charAt(6);
                Block = Block.substring(7);
                return new Token(TokenType.BOOLEAN, LockUp, this.pos - LockUp.length, this.line);
            }
            else {
                Block = Block.substring(1);
                return new Token(TokenType.VARIABLE, LockUp, this.pos - LockUp.length, this.line);
            }
        }
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
                this.AlphaSplitter(result);
            }
            if (this.isDigit(this.currentChar)) {
                var result = '';
                while (this.isDigit(this.currentChar)) {
                    result += this.currentChar;
                    this.advance();
                }
                return new Token(TokenType.INTEGER, parseInt(result), this.pos - result.length, this.line);
            }
            if (this.currentChar === '=') {
                var result = this.currentChar;
                this.advance();
                if (this.currentChar === '=') {
                    result += this.currentChar;
                    this.advance();
                }
                return new Token(TokenType.OPERATOR, result, this.pos - result.length, this.line);
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
                return new Token(TokenType.OPERATOR, result, this.pos - result.length, this.line);
            }
            if (this.currentChar === '(' || this.currentChar === ')') {
                var result = this.currentChar;
                this.advance();
                return new Token(TokenType.PAREN, result, this.pos - result.length, this.line);
            }
            if (this.currentChar === '{' || this.currentChar === '}') {
                var result = this.currentChar;
                this.advance();
                return new Token(TokenType.CURLY_BRACE, result, this.pos - result.length, this.line);
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
                    return new Token(TokenType.COMMENT, result + comment, this.pos - result.length - comment.length, this.line);
                }
                else if (this.currentChar === '"') {
                    this.pos += 1;
                    if (this.pos > this.text.length - 1) {
                        this.currentChar = "";
                    }
                    else {
                        this.currentChar = this.text.charAt(this.pos);
                    }
                    var quoteString = "";
                    while (this.currentChar !== "" && !(this.currentChar === '"')) {
                        if (this.isAlpha(this.currentChar)) {
                            quoteString += this.currentChar;
                            this.advance();
                        }
                        else {
                            return new Token(TokenType.ERROR, quoteString, this.pos - quoteString.length, this.line);
                        }
                    }
                    return new Token(TokenType.STRING, quoteString, this.pos - quoteString.length, this.line);
                }
                else if (this.currentChar === '/n') {
                    this.line++;
                }
            }
        }
        return new Token(TokenType.EOF, null, this.pos, this.line);
    };
    return Lexer;
}());
