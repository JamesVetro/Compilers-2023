"use strict";
var TSC;
(function (TSC) {
    var Lexer = /** @class */ (function () {
        function Lexer() {
        }
        Lexer.lex = function () {
            {
                var sourceCode = document.getElementById("taSourceCode").value;
                var lexer = new Lexers(sourceCode);
                document.getElementById("taOutput").value += "Lexing program " + 1 + "\n";
                var token = lexer.getNextToken();
                while (token.value !== "null") {
                    var checker = token.value;
                    if (token.value != "$") {
                        document.getElementById("taOutput").value += "  LEXER - | " + token.type + " { " + token.value + " } FOUND AT POSITION: " + token.pos + " IN LINE:  " + token.line + "\n";
                        TSC.Parser.parse(token.type, token.value, token.line, token.errorNum, token.progNum);
                    }
                    token = lexer.getNextToken();
                    if (checker != "$" && token.value == "null") { //makes sure there's an end of file note at the end of the whole set of programs.
                        document.getElementById("taOutput").value += "  LEXER - | " + TokenType.WARNING + " NO END CHARACTER FOUND. CHECK FOR UNCLOSED COMMENTS OR ADD AN EOF CHARACTER.\n\n";
                        TSC.Parser.parse(TokenType.EOF, "Assumed EOF", token.line, token.errorNum, token.progNum);
                    }
                }
                return sourceCode;
            }
        };
        return Lexer;
    }());
    TSC.Lexer = Lexer;
    var Token = /** @class */ (function () {
        function Token(type, value, pos, line, errorNum, progNum) {
            this.type = type;
            this.value = value;
            this.pos = pos;
            this.progNum = progNum;
            this.errorNum = errorNum;
            this.line = line;
        }
        return Token;
    }());
    var Lexers = /** @class */ (function () {
        function Lexers(text) {
            this.text = text;
            this.pos = 0;
            this.errorNum = 0;
            this.linePos = 0;
            this.progNum = 1;
            this.currentChar = this.text.charAt(this.pos);
            this.line = 0;
        }
        Lexers.prototype.advance = function () {
            this.pos += 1;
            this.linePos++;
            if (this.pos > this.text.length - 1) {
                this.currentChar = "";
            }
            else {
                this.currentChar = this.text.charAt(this.pos);
            }
        };
        Lexers.prototype.skipWhitespace = function () {
            while (this.currentChar !== "" && this.currentChar === ' ') {
                this.advance();
                this.linePos--;
            }
        };
        Lexers.prototype.isAlpha = function (ch) {
            return /([a-z])+/g.test(ch);
        };
        Lexers.prototype.isDigit = function (ch) {
            return /^\d$/.test(ch);
        };
        Lexers.prototype.AlphaSplitter = function (Block) {
            Block = Block.toLowerCase();
            while (true) {
                var LockUp = Block.charAt(0);
                if (LockUp == "") {
                    break;
                }
                if (LockUp == "i") {
                    if (Block.charAt(1) == "n" && Block.charAt(2) == "t") {
                        LockUp += Block.charAt(1) + Block.charAt(2);
                        Block = Block.substring(3);
                        document.getElementById("taOutput").value += "  LEXER - | " + TokenType.INT + " { " + LockUp + " } FOUND AT POSITION: " + (this.linePos - Block.length - LockUp.length) + " IN LINE:  " + this.line + "\n";
                        TSC.Parser.parse(TokenType.INT, LockUp, this.line, this.errorNum, this.progNum);
                        LockUp = "";
                    }
                    else if (Block.charAt(1) == "f") {
                        LockUp += Block.charAt(1);
                        Block = Block.substring(2);
                        document.getElementById("taOutput").value += "  LEXER - | " + TokenType.IF + " { " + LockUp + " } FOUND AT POSITION: " + (this.linePos - Block.length - LockUp.length) + " IN LINE:  " + this.line + "\n";
                        TSC.Parser.parse(TokenType.IF, LockUp, this.line, this.errorNum, this.progNum);
                        LockUp = "";
                    }
                    else {
                        Block = Block.substring(1);
                        document.getElementById("taOutput").value += "  LEXER - | " + TokenType.VARIABLE + " { " + LockUp + " } FOUND AT POSITION: " + (this.linePos - Block.length - LockUp.length) + " IN LINE:  " + this.line + "\n";
                        TSC.Parser.parse(TokenType.VARIABLE, LockUp, this.line, this.errorNum, this.progNum);
                        LockUp = "";
                    }
                }
                else if (LockUp == "t" && Block.charAt(1) == "r" && Block.charAt(2) == "u" && Block.charAt(3) == "e") {
                    LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3);
                    Block = Block.substring(4);
                    document.getElementById("taOutput").value += "  LEXER - | " + TokenType.TRUE + " { " + LockUp + " } FOUND AT POSITION: " + (this.linePos - Block.length - LockUp.length) + " IN LINE:  " + this.line + "\n";
                    TSC.Parser.parse(TokenType.TRUE, LockUp, this.line, this.errorNum, this.progNum);
                    LockUp = "";
                }
                else if (LockUp == "f" && Block.charAt(1) == "a" && Block.charAt(2) == "l" && Block.charAt(3) == "s" && Block.charAt(4) == "e") {
                    LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4);
                    Block = Block.substring(5);
                    document.getElementById("taOutput").value += "  LEXER - | " + TokenType.FALSE + " { " + LockUp + " } FOUND AT POSITION: " + (this.linePos - Block.length - LockUp.length) + " IN LINE:  " + this.line + "\n";
                    TSC.Parser.parse(TokenType.FALSE, LockUp, this.line, this.errorNum, this.progNum);
                    LockUp = "";
                }
                else if (LockUp == "s" && Block.charAt(1) == "t" && Block.charAt(2) == "r" && Block.charAt(3) == "i" && Block.charAt(4) == "n" && Block.charAt(5) == "g") {
                    LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4) + Block.charAt(5);
                    Block = Block.substring(6);
                    document.getElementById("taOutput").value += "  LEXER - | " + TokenType.STRING + " { " + LockUp + " } FOUND AT POSITION: " + (this.linePos - Block.length - LockUp.length) + " IN LINE:  " + this.line + "\n";
                    TSC.Parser.parse(TokenType.STRING, LockUp, this.line, this.errorNum, this.progNum);
                    LockUp = "";
                }
                else if (LockUp == "p" && Block.charAt(1) == "r" && Block.charAt(2) == "i" && Block.charAt(3) == "n" && Block.charAt(4) == "t") {
                    LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4);
                    Block = Block.substring(5);
                    document.getElementById("taOutput").value += "  LEXER - | " + TokenType.PRINT + " { " + LockUp + " } FOUND AT POSITION: " + (this.linePos - Block.length - LockUp.length) + " IN LINE:  " + this.line + "\n";
                    TSC.Parser.parse(TokenType.PRINT, LockUp, this.line, this.errorNum, this.progNum);
                    LockUp = "";
                }
                else if (LockUp == "w" && Block.charAt(1) == "h" && Block.charAt(2) == "i" && Block.charAt(3) == "l" && Block.charAt(4) == "e") {
                    LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4);
                    Block = Block.substring(5);
                    document.getElementById("taOutput").value += "  LEXER - | " + TokenType.WHILE + " { " + LockUp + " } FOUND AT POSITION: " + (this.linePos - Block.length - LockUp.length) + " IN LINE:  " + this.line + "\n";
                    TSC.Parser.parse(TokenType.WHILE, LockUp, this.line, this.errorNum, this.progNum);
                    LockUp = "";
                }
                else if (LockUp == "b" && Block.charAt(1) == "o" && Block.charAt(2) == "o" && Block.charAt(3) == "l" && Block.charAt(4) == "e" && Block.charAt(5) == "a" && Block.charAt(6) == "n") {
                    LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4) + Block.charAt(5) + Block.charAt(6);
                    Block = Block.substring(7);
                    document.getElementById("taOutput").value += "  LEXER - | " + TokenType.BOOLEAN + " { " + LockUp + " } FOUND AT POSITION: " + (this.linePos - Block.length - LockUp.length) + " IN LINE:  " + this.line + "\n";
                    TSC.Parser.parse(TokenType.BOOLEAN, LockUp, this.line, this.errorNum, this.progNum);
                    LockUp = "";
                }
                else {
                    Block = Block.substring(1);
                    document.getElementById("taOutput").value += "  LEXER - | " + TokenType.VARIABLE + " { " + LockUp + " } FOUND AT POSITION: " + (this.linePos - Block.length - LockUp.length) + " IN LINE:  " + this.line + "\n";
                    TSC.Parser.parse(TokenType.VARIABLE, LockUp, this.line, this.errorNum, this.progNum);
                    LockUp = "";
                }
            }
        };
        Lexers.prototype.getNextToken = function () {
            var stop = false;
            while (this.currentChar !== "") {
                if (this.currentChar === ' ') { //skipping whitespace
                    this.skipWhitespace();
                    continue;
                }
                if (this.isAlpha(this.currentChar)) { //alphabetical character collection
                    var result = '';
                    while (this.isAlpha(this.currentChar)) {
                        result += this.currentChar;
                        this.advance();
                    }
                    this.AlphaSplitter(result);
                    continue;
                }
                if (this.isDigit(this.currentChar)) { //numeric checker
                    var result = '';
                    while (this.isDigit(this.currentChar)) {
                        result += this.currentChar;
                        this.advance();
                    }
                    return new Token(TokenType.INTEGER, parseInt(result), this.linePos - result.length, this.line, this.errorNum, this.progNum);
                }
                if (this.currentChar === '=') { //equals or double equals
                    var result = this.currentChar;
                    this.advance();
                    if (this.currentChar === '=') {
                        result += this.currentChar;
                        this.advance();
                        return new Token(TokenType.BOOLOP, result, this.linePos - result.length, this.line, this.errorNum, this.progNum);
                    }
                    return new Token(TokenType.OPERATOR, result, this.linePos - result.length, this.line, this.errorNum, this.progNum);
                }
                if (this.currentChar === '!') { // not equals sign
                    var result = this.currentChar;
                    this.pos += 1;
                    if (this.pos > this.text.length - 1) {
                        this.currentChar = "";
                    }
                    else {
                        this.currentChar = this.text.charAt(this.pos);
                    }
                    if (this.currentChar === '=') { //requires equals to work
                        result += this.currentChar;
                        this.advance();
                        return new Token(TokenType.BOOLOP, result, this.linePos - result.length, this.line, this.errorNum, this.progNum);
                    }
                    this.errorNum++;
                    return new Token(TokenType.ERROR, result, this.linePos, this.line, this.errorNum, this.progNum);
                }
                if (this.currentChar === '(') { //parentheses checking
                    var result = this.currentChar;
                    this.advance();
                    return new Token(TokenType.LPAREN, result, this.linePos - result.length, this.line, this.errorNum, this.progNum);
                }
                if (this.currentChar === ')') { //parentheses checking
                    var result = this.currentChar;
                    this.advance();
                    return new Token(TokenType.RPAREN, result, this.linePos - result.length, this.line, this.errorNum, this.progNum);
                }
                if (this.currentChar === '{') { //curly bracket checking
                    var result = this.currentChar;
                    this.advance();
                    return new Token(TokenType.LCURLY, result, this.linePos - result.length, this.line, this.errorNum, this.progNum);
                }
                if (this.currentChar === '}') { //curly bracket checking
                    var result = this.currentChar;
                    this.advance();
                    return new Token(TokenType.RCURLY, result, this.linePos - result.length, this.line, this.errorNum, this.progNum);
                }
                if (this.currentChar === '+') { //addition operator
                    var result = this.currentChar;
                    this.advance();
                    return new Token(TokenType.INTOP, result, this.linePos - result.length, this.line, this.errorNum, this.progNum);
                }
                if (this.currentChar === '/') { //comment checking
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
                        if (this.currentChar === '*') { //end comment checking
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
                        else {
                            document.getElementById("taOutput").value += "  LEXER - | " + TokenType.WARNING + " NON-TERMINATING COMMENT FOUND AT POSITION: " + this.linePos + " IN LINE:  " + this.line + "\n";
                        }
                        continue;
                    }
                }
                if (this.currentChar === '"') { //quote handling
                    this.pos += 1;
                    if (this.pos > this.text.length - 1) {
                        this.currentChar = "";
                    }
                    else {
                        this.currentChar = this.text.charAt(this.pos);
                    }
                    var quoteString = "";
                    stop = false;
                    while (this.currentChar !== "" && this.currentChar !== '"') { //end quote checking
                        if (this.currentChar === ' ') {
                            this.skipWhitespace();
                            quoteString += " ";
                            continue;
                        }
                        else if (this.isAlpha(this.currentChar)) {
                            quoteString += this.currentChar;
                            this.advance();
                            continue;
                        }
                        else if (this.currentChar == "$") { //checks for end characters in a quote, ending it and giving warnings associated.
                            this.pos += 1;
                            if (this.pos > this.text.length - 1) {
                                this.currentChar = "";
                            }
                            else {
                                this.currentChar = this.text.charAt(this.pos);
                            }
                            document.getElementById("taOutput").value += "  LEXER - | " + TokenType.WARNING + ' NON-TERMINATING STRING - "' + quoteString + '" FOUND AT POSITION: ' + this.linePos + " IN LINE: " + this.line + "\n";
                            document.getElementById("taOutput").value += "  LEXER - | " + TokenType.EOF + " { " + "$" + " } FOUND AT POSITION: " + this.linePos + " IN LINE:  " + this.line + "\n";
                            if (this.errorNum == 0) {
                                document.getElementById("taOutput").value += "Lex completed with 0 errors. \n \n";
                                TSC.Parser.parse(TokenType.EOF, "$", this.line, this.errorNum, this.progNum);
                                this.progNum++;
                                if (this.currentChar != "") {
                                    document.getElementById("taOutput").value += "\n\nLexing program " + this.progNum + "\n";
                                }
                                this.errorNum = 0;
                            }
                            else {
                                document.getElementById("taOutput").value += "Lex FAILED with: " + this.errorNum + " errors. \n \n";
                                TSC.Parser.parse(TokenType.EOF, "$", this.line, this.errorNum, this.progNum);
                                this.errorNum = 0;
                                this.progNum++;
                                if (this.currentChar != "") {
                                    document.getElementById("taOutput").value += "\n\nLexing program " + this.progNum + "\n";
                                }
                            }
                            stop = true;
                            break;
                        }
                        else if (this.currentChar == "\n") {
                            this.line++;
                            this.skipWhitespace;
                            this.linePos = 0;
                            document.getElementById("taOutput").value += "  LEXER - | " + TokenType.WARNING + ' NON-TERMINATING STRING - "' + quoteString + '" FOUND AT POSITION: ' + this.linePos + " IN LINE: " + this.line + "\n";
                            stop = true;
                            break;
                        }
                        else {
                            this.errorNum++;
                            quoteString += this.currentChar;
                            document.getElementById("taOutput").value += "  LEXER - | " + TokenType.ERROR + " { " + this.currentChar + " } FOUND AT POSITION: " + this.linePos + " IN LINE:  " + this.line + "\n";
                            this.advance();
                            continue;
                        }
                    }
                    this.advance();
                    document.getElementById("taOutput").value += "  LEXER - | " + TokenType.QMARK + " { " + '"' + " } FOUND AT POSITION: " + this.linePos + " IN LINE:  " + this.line + "\n";
                    TSC.Parser.parse(TokenType.QMARK, '"', this.line, this.errorNum, this.progNum);
                    document.getElementById("taOutput").value += "  LEXER - | " + TokenType.CHARLIST + " { " + quoteString + " } FOUND AT POSITION: " + (this.linePos - quoteString.length) + " IN LINE:  " + this.line + "\n";
                    TSC.Parser.parse(TokenType.CHARLIST, quoteString, this.line, this.errorNum, this.progNum);
                    document.getElementById("taOutput").value += "  LEXER - | " + TokenType.QMARK + " { " + '"' + " } FOUND AT POSITION: " + this.linePos + " IN LINE:  " + this.line + "\n";
                    TSC.Parser.parse(TokenType.QMARK, '"', this.line, this.errorNum, this.progNum);
                    continue;
                }
                //simple newline implementation.
                if (this.currentChar === '\n') {
                    this.line++;
                    this.advance();
                    this.linePos = 0;
                    continue;
                }
                //END CHARACTER 
                if (this.currentChar === '$') {
                    this.pos += 1;
                    if (this.pos > this.text.length - 1) {
                        this.currentChar = "";
                    }
                    else {
                        this.currentChar = this.text.charAt(this.pos);
                    }
                    document.getElementById("taOutput").value += "  LEXER - | " + TokenType.EOF + " { " + "$" + " } FOUND AT POSITION: " + this.linePos + " IN LINE:  " + this.line + "\n";
                    if (this.errorNum == 0) { //checks for errors, and if there are none, and there is another program after, starts the next
                        document.getElementById("taOutput").value += "Lex completed with 0 errors. \n \n";
                        TSC.Parser.parse(TokenType.EOF, "$", this.line, this.errorNum, this.progNum);
                        this.progNum++;
                        if (this.currentChar != "") {
                            document.getElementById("taOutput").value += "\n\nLexing program " + this.progNum + "\n";
                        }
                        this.errorNum = 0;
                    }
                    else { //if there are errors, they are called to attention here.
                        document.getElementById("taOutput").value += "Lex FAILED with: " + this.errorNum + " errors. \n \n";
                        TSC.Parser.parse(TokenType.EOF, "$", this.line, this.errorNum, this.progNum);
                        this.progNum++;
                        this.errorNum = 0;
                        if (this.currentChar != "") {
                            document.getElementById("taOutput").value += "\n\nLexing program " + this.progNum + "\n";
                        }
                    }
                    return new Token(TokenType.EOF, "$", this.linePos, this.line, this.errorNum, this.progNum);
                }
                else { //if it's other than these symbols it's an error
                    var errorval = this.currentChar;
                    this.advance();
                    this.errorNum++;
                    return new Token(TokenType.ERROR, errorval, this.linePos, this.line, this.errorNum, this.progNum);
                }
            }
            //returns null 
            return new Token(TokenType.NULL, "null", this.linePos, this.line, this.errorNum, this.progNum);
        };
        return Lexers;
    }());
})(TSC || (TSC = {}));
