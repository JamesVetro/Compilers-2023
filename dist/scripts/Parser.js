"use strict";
var TSC;
(function (TSC) {
    var tokenList = [];
    var listLen = tokenList.length;
    var Parser = /** @class */ (function () {
        function Parser() {
        }
        Parser.parse = function (inToken, lexError, progNum) {
            if (inToken == EOF) {
                listLen = tokenList.push(inToken);
                if (lexError != 0) {
                    tokenList = [];
                }
                else {
                    document.getElementById("taOutput").value += "\n \n \n \nPARSER - | Skipped due to LEXER Errors \n \n CST for program " + progNum + ": Skipped due to LEXER errors";
                    tokenList = [];
                }
            }
            else {
                listLen = tokenList.push(inToken);
            }
        };
        return Parser;
    }());
    TSC.Parser = Parser;
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
        TokenType["LPAREN"] = "LPAREN";
        TokenType["RPAREN"] = "RPAREN";
        TokenType["LCURLY"] = "LCURLY";
        TokenType["RCURLY"] = "RCURLY";
        TokenType["EOF"] = "EOF";
        TokenType["COMMENT"] = "COMMENT";
        TokenType["ERROR"] = "ERROR";
        TokenType["NULL"] = "NULL";
        TokenType["WARNING"] = "WARNING";
    })(TokenType || (TokenType = {}));
})(TSC || (TSC = {}));
