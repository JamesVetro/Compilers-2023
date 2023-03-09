"use strict";
/*
var onDocumentLoad = function() {
    TSOS.Control.hostInit();
};
*/
var _Lexer = TSC.Lexer;
var _Parser = TSC.Parser;
// Global variables
var tokens = "";
var tokenIndex = 0;
var currentToken = "";
var errorCount = 0;
var EOF = "$";
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
    TokenType["BOOLOP"] = "BOOLOP";
    TokenType["INTOP"] = "INTOP";
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
