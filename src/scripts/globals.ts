/*
var onDocumentLoad = function() {
	TSOS.Control.hostInit();
};
*/
var _Lexer = TSC.Lexer;
var _Parser = TSC.Parser;
var _CST = new TSC.CST();
var _AST = new TSC.AST();
var _SymTab = new TSC.SymTab();
// Global variables
    var tokens = "";
    var tokenIndex = 0;
    var currentToken = "";
    var errorCount = 0;
    var EOF = "$";
    enum TokenType {
        INTEGER = 'INTEGER',
        VARIABLE = 'VARIABLE',
        PRINT = 'PRINT',
        WHILE = 'WHILE',
        IF = 'IF',
        BOOLEAN = 'BOOLEAN',
        INT = 'INT',
        STRING = 'STRING',
        TRUE = 'TRUE',
        FALSE = 'FALSE',
        OPERATOR = 'OPERATOR',
        CHARLIST = 'CHARLIST',
        QMARK = 'QMARK',
        BOOLOP = 'BOOLOP',
        INTOP = 'INTOP',
        LPAREN = 'LPAREN',
        RPAREN = 'RPAREN',
        LCURLY = 'LCURLY',
        RCURLY = 'RCURLY',
        EOF = 'EOF',
        COMMENT = 'COMMENT',
        ERROR = "ERROR",
        NULL = "NULL",
        WARNING = "WARNING"
      }