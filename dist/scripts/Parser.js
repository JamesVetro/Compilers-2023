"use strict";
var TSC;
(function (TSC) {
    var tokenList = [];
    var laterTokens = [];
    var listLen = tokenList.length;
    var parseError = 0;
    var Parser = /** @class */ (function () {
        function Parser() {
        }
        Parser.parse = function (inToken, tokenValue, lineNum, lexError, progNum) {
            if (inToken == TokenType.EOF) {
                listLen = tokenList.push([inToken, tokenValue, lineNum]);
                if (lexError == 0) {
                    document.getElementById("taOutput").value += "\n \nPARSER - | Parsing program " + progNum + ": \n\n";
                    parseProgram(progNum);
                    tokenList = [];
                    parseError = 0;
                    laterTokens = [];
                }
                else {
                    document.getElementById("taOutput").value += "\n \nPARSER - | Skipped due to LEXER Errors \n \nCST for program " + progNum + ": Skipped due to LEXER errors\n\n";
                    tokenList = [];
                    parseError = 0;
                    laterTokens = [];
                }
            }
            else {
                listLen = tokenList.push([inToken, tokenValue]);
            }
        };
        return Parser;
    }());
    TSC.Parser = Parser;
    function parseProgram(progNum) {
        document.getElementById("taOutput").value += "PARSER - | parseProgram() \n";
        parseBlock();
        matchToken(TokenType.EOF);
        if (parseError == 0) {
            document.getElementById("taOutput").value += "\n PARSER - | Parse Completed Successfully \n \n";
            document.getElementById("taOutput").value += "CST for Program " + progNum + ": \n";
            //CST IS RUN HERE
        }
        else {
            document.getElementById("taOutput").value += "\n \nPARSER - | Parse Failed with " + parseError + " error(s).\n \n";
            document.getElementById("taOutput").value += "CST for Program " + progNum + ":Skipped due to PARSER errors.\n \n";
        }
    }
    function parseBlock() {
        document.getElementById("taOutput").value += "PARSER - | parseBlock() \n";
        matchToken(TokenType.LCURLY);
        parseStatementList();
        matchToken(TokenType.RCURLY);
    }
    function parseStatementList() {
        document.getElementById("taOutput").value += "PARSER - | parseStatementList() \n";
        if (nextToken() != TokenType.RCURLY) {
            parseStatement();
            parseStatementList();
        }
        else {
            // It's an Empty Production!
        }
    }
    function parseStatement() {
        document.getElementById("taOutput").value += "PARSER - | parseStatement() \n";
        if (nextToken() == TokenType.PRINT) {
            parsePrintStatement();
        }
        else if (nextToken() == TokenType.VARIABLE) {
            parseAssignmentStatement();
        }
        else if (nextToken() == TokenType.INT || nextToken() == TokenType.STRING || nextToken() == TokenType.BOOLEAN) {
            parseVarDecl();
        }
        else if (nextToken() == TokenType.WHILE) {
            parseWhileStatement();
        }
        else if (nextToken() == TokenType.IF) {
            parseIfStatement();
        }
        else if (nextToken() == TokenType.LCURLY) {
            parseBlock();
        }
        else {
            document.getElementById("taOutput").value += "PARSER ERROR - | Expected a statement start (PRINT, a variable, IF, WHILE, variable declaration, or left curly bracket), and instead got: " + tokenList[0][0] + " With value: '" + tokenList[0][1] + " On line: " + tokenList[0][2];
            laterTokens.push(tokenList[0]);
            tokenList.shift();
        }
    }
    function parsePrintStatement() {
        document.getElementById("taOutput").value += "PARSER - | parsePrintStatement() \n";
        matchToken(TokenType.PRINT);
        matchToken(TokenType.LPAREN);
        parseExpr();
        matchToken(TokenType.RPAREN);
    }
    function parseAssignmentStatement() {
        document.getElementById("taOutput").value += "PARSER - | parseAssignmentStatement() \n";
        matchToken(TokenType.VARIABLE);
        matchToken(TokenType.OPERATOR);
        parseExpr();
    }
    function parseVarDecl() {
        document.getElementById("taOutput").value += "PARSER - | parseVarDecl() \n";
        if (nextToken() == TokenType.INT) {
            matchToken(TokenType.INT);
        }
        else if (nextToken() == TokenType.STRING) {
            matchToken(TokenType.STRING);
        }
        else if (nextToken() == TokenType.BOOLEAN) {
            matchToken(TokenType.BOOLEAN);
        }
        matchToken(TokenType.VARIABLE);
    }
    function parseWhileStatement() {
        document.getElementById("taOutput").value += "PARSER - | parseWhileStatement() \n";
        matchToken(TokenType.WHILE);
        parseBooleanExpr();
        parseBlock();
    }
    function parseIfStatement() {
        document.getElementById("taOutput").value += "PARSER - | parseIfStatement() \n";
        matchToken(TokenType.IF);
        parseBooleanExpr();
        parseBlock();
    }
    function parseBooleanExpr() {
        document.getElementById("taOutput").value += "PARSER - | parseBooleanExpr() \n";
        if (nextToken() == TokenType.LPAREN) {
            matchToken(TokenType.LPAREN);
            parseExpr();
            matchToken(TokenType.BOOLOP);
            parseExpr();
            matchToken(TokenType.RPAREN);
        }
        else if (nextToken() == TokenType.FALSE) {
            matchToken(TokenType.FALSE);
        }
        else {
            matchToken(TokenType.TRUE);
        }
    }
    function parseExpr() {
        document.getElementById("taOutput").value += "PARSER - | parseExpr() \n";
        if (nextToken() == TokenType.INTEGER) {
            parseIntExpr();
        }
        else if (nextToken() == TokenType.STRING) {
            matchToken(TokenType.STRING);
        }
        else if (nextToken() == TokenType.LPAREN) {
            parseBooleanExpr();
        }
        else if (nextToken() == TokenType.VARIABLE) {
            matchToken(TokenType.VARIABLE);
        }
        else {
            parseError++;
            document.getElementById("taOutput").value += "PARSER ERROR - | Expected an expression start (an integer, a string, a left paren, or a variable), and instead got: " + tokenList[0][0] + " With value: '" + tokenList[0][1] + " On line: " + tokenList[0][2];
            laterTokens.push(tokenList[0]);
            tokenList.shift();
        }
    }
    function parseIntExpr() {
        document.getElementById("taOutput").value += "PARSER - | parseIntExpr() \n";
        matchToken(TokenType.INTEGER);
        matchToken(TokenType.INTOP);
        parseExpr();
    }
    function nextToken() {
        var nextToken = tokenList[0][0];
        return nextToken;
    }
    function matchToken(checkValue) {
        if (checkValue == tokenList[0][0]) {
            laterTokens.push(tokenList[0]);
            tokenList.shift();
        }
        else {
            parseError++;
            document.getElementById("taOutput").value += "PARSER ERROR - | Expected: " + checkValue + ", and instead got: " + tokenList[0][0] + " With value: '" + tokenList[0][1] + " On line: " + tokenList[0][2];
            laterTokens.push(tokenList[0]);
            tokenList.shift();
        }
    }
})(TSC || (TSC = {}));
