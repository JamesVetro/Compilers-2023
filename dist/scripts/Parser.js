"use strict";
var TSC;
(function (TSC) {
    //the actual token storage
    var tokenList = [];
    //not really used yet but I just feel like it might be useful to keep the tokens. 
    var laterTokens = [];
    var SymAnArray = [];
    var parseError = 0;
    var SymError = 0;
    var SymWarning = 0;
    var scope = 0;
    var Parser = /** @class */ (function () {
        function Parser() {
        }
        Parser.parse = function (inToken, tokenValue, lineNum, lexError, progNum) {
            if (inToken == TokenType.EOF) {
                tokenList.push([inToken, tokenValue, lineNum]);
                //Doesn't run parse or CST unless there are no lex errors. 
                if (lexError == 0) {
                    document.getElementById("taOutput").value += "PARSER - | Parsing program " + progNum + ": \n";
                    parseProgram(progNum);
                    tokenList = [];
                    parseError = 0;
                }
                else {
                    document.getElementById("taOutput").value += "PARSER - | Skipped due to LEXER Errors\n\nCST for program " + progNum + ": Skipped due to LEXER errors\n\n";
                    tokenList = [];
                    parseError = 0;
                    SymAnArray = [];
                    SymError = 0;
                }
            }
            else {
                tokenList.push([inToken, tokenValue, lineNum]);
            }
        };
        return Parser;
    }());
    TSC.Parser = Parser;
    function parseProgram(progNum) {
        document.getElementById("taOutput").value += "  PARSER - | parseProgram() \n";
        _CST.addNode({ name: "program", parent: null, children: [], value: "program" });
        parseBlock();
        matchToken(TokenType.EOF);
        _CST.moveUp();
        //chooses to print cst or not based on parser errors or lack thereof
        if (parseError == 0) {
            document.getElementById("taOutput").value += "PARSER - | Parse Completed Successfully \n\n";
            document.getElementById("taOutput").value += "CST for Program " + progNum + ": \n";
            _CST.printCST(_CST.getRootNode());
            document.getElementById("taOutput").value += "CST Complete.\n\n";
            var test1 = _SymTab.finInit();
            var test2 = _SymTab.finUsed();
            if (test1 != null) {
                var holder = "Semantic Error. Variable: " + test1 + " is created but never initialized.";
                SymError = SymError + 1;
                SymAnArray.push(holder);
            }
            if (test2 != null) {
                var holder = "Semantic Warning. Variable: " + test2 + " is created but never used.";
                SymWarning = SymWarning + 1;
                SymAnArray.push(holder);
            }
            if (SymError == 0) {
                if (SymWarning != 0) {
                    var n = -1;
                    for (n < SymAnArray.length; n++;) {
                        document.getElementById("taOutput").value += SymAnArray[n];
                    }
                }
                else {
                    document.getElementById("taOutput").value += "No Semantic Errors or Warnings Detected.";
                }
                document.getElementById("taOutput").value += "\n\nAST for Program " + progNum + ": \n";
                _AST.printAST(_AST.getRootNode());
                document.getElementById("taOutput").value += "AST Complete.\n\n";
                document.getElementById("taOutput").value += "Program 1 Symbol Table \n-------------------------------------- \nName   Line   Scope   Type\n-------------------------------------\n";
                _SymTab.printSymbolTable();
                scope = 0;
                SymAnArray = [];
                SymWarning = 0;
            }
            else {
                var n = -1;
                for (n < SymAnArray.length; n++;) {
                    document.getElementById("taOutput").value += SymAnArray[n];
                }
                document.getElementById("taOutput").value += "AST for Program " + progNum + ": \n";
                _AST.printAST(_AST.getRootNode());
                document.getElementById("taOutput").value += "AST Complete.\n\nSemantic Errors detected, no symbol table printed.";
                SymAnArray = [];
                SymError = 0;
                SymWarning = 0;
                scope = 0;
            }
        }
        else {
            document.getElementById("taOutput").value += "PARSER - | Parse Failed with " + parseError + " error(s).\n\n";
            document.getElementById("taOutput").value += "CST for Program " + progNum + ":Skipped due to PARSER errors.\n\n";
            document.getElementById("taOutput").value += "AST for Program " + progNum + ":Skipped due to PARSER errors.\n\n";
            parseError = 0;
            SymError = 0;
            SymAnArray = [];
            scope = 0;
        }
    }
    //the rest of the parse statements are fairly self explanatory, simply going down then back up the tree adding nodes and checking tokens.
    function parseBlock() {
        document.getElementById("taOutput").value += "  PARSER - | parseBlock() \n";
        _CST.addNode({ name: "block", parent: _CST.getCurrentNode(), children: [], value: "block" });
        _AST.addNode({ name: "block", parent: null, children: [], value: "block" });
        matchToken(TokenType.LCURLY);
        scope++;
        parseStatementList();
        matchToken(TokenType.RCURLY);
        _AST.moveUp();
        _CST.moveUp();
    }
    function parseStatementList() {
        document.getElementById("taOutput").value += "  PARSER - | parseStatementList() \n";
        _CST.addNode({ name: "statementList", parent: _CST.getCurrentNode(), children: [], value: "statementList" });
        if (nextToken() != TokenType.RCURLY) {
            parseStatement();
            parseStatementList();
        }
        else {
            // It's an Empty Production!
        }
        _CST.moveUp();
    }
    function parseStatement() {
        document.getElementById("taOutput").value += "  PARSER - | parseStatement() \n";
        _CST.addNode({ name: "statement", parent: _CST.getCurrentNode(), children: [], value: "statement" });
        if (nextToken() == TokenType.PRINT) {
            parsePrintStatement();
            _CST.moveUp();
        }
        else if (nextToken() == TokenType.VARIABLE) {
            parseAssignmentStatement();
            _CST.moveUp();
        }
        else if (nextToken() == TokenType.INT || nextToken() == TokenType.STRING || nextToken() == TokenType.BOOLEAN) {
            parseVarDecl();
            _CST.moveUp();
        }
        else if (nextToken() == TokenType.WHILE) {
            parseWhileStatement();
            _CST.moveUp();
        }
        else if (nextToken() == TokenType.IF) {
            parseIfStatement();
            _CST.moveUp();
        }
        else if (nextToken() == TokenType.LCURLY) {
            parseBlock();
            _CST.moveUp();
        }
        else {
            document.getElementById("taOutput").value += "  PARSER ERROR - | Expected a statement start (PRINT, a variable, IF, WHILE, variable declaration, or left curly bracket), and instead got: " + tokenList[0][0] + " With value: '" + tokenList[0][1] + "' On line: " + tokenList[0][2];
            laterTokens.push(tokenList[0]);
            tokenList.shift();
        }
    }
    function parsePrintStatement() {
        document.getElementById("taOutput").value += "  PARSER - | parsePrintStatement() \n";
        _CST.addNode({ name: "printStatement", parent: _CST.getCurrentNode(), children: [], value: "printStatement" });
        matchToken(TokenType.PRINT);
        matchToken(TokenType.LPAREN);
        var holder = ASTExpr(0);
        if (holder[2] == true) {
            _AST.addNode({ name: holder[1].toString(), parent: _AST.getCurrentNode(), children: [], value: holder[1].toString() });
            _AST.moveUp();
        }
        parseExpr();
        matchToken(TokenType.RPAREN);
        _CST.moveUp();
    }
    function parseAssignmentStatement() {
        document.getElementById("taOutput").value += "  PARSER - | parseAssignmentStatement() \n";
        _CST.addNode({ name: "assignmentStatement", parent: _CST.getCurrentNode(), children: [], value: "assignmentStatement" });
        _AST.addNode({ name: "assignmentStatement", parent: _AST.getCurrentNode(), children: [], value: "assignmentStatement" });
        _AST.addNode({ name: "VARIABLE", parent: _AST.getCurrentNode(), children: [], value: tokenList[0][1] });
        var symTest = _SymTab.isInit(tokenList[0][1].toString(), scope);
        var namer = tokenList[0][1].toString();
        matchToken(TokenType.VARIABLE);
        matchToken(TokenType.OPERATOR);
        _AST.addNode({ name: "VALUE", parent: _AST.getCurrentNode(), children: [], value: ASTExpr(0)[1].toString() });
        if (symTest == false) {
            var holder = "Semantic warning on line: " + tokenList[0][2] + " Variable is assigned a value before declaration.";
            SymWarning = SymWarning + 1;
            SymAnArray.push(holder);
            if (nextToken() == TokenType.INTEGER) {
                _SymTab.addNode({ name: namer, type: "INT", Scope: scope, LineNum: tokenList[0][2], init: true, used: false });
            }
            else if (nextToken() == TokenType.QMARK) {
                _SymTab.addNode({ name: namer, type: "STRING", Scope: scope, LineNum: tokenList[0][2], init: true, used: false });
            }
            else if (nextToken() == TokenType.LPAREN || nextToken() == TokenType.TRUE || nextToken() == TokenType.FALSE) {
                _SymTab.addNode({ name: namer, type: "BOOLEAN", Scope: scope, LineNum: tokenList[0][2], init: true, used: false });
            }
            else if (nextToken() == TokenType.VARIABLE) {
                if (_SymTab.typeCheck(tokenList[0][1].toString(), scope) != "NOPE") {
                    _SymTab.addNode({ name: namer, type: _SymTab.typeCheck(tokenList[0][1].toString(), scope), Scope: scope, LineNum: tokenList[0][2], init: true, used: false });
                }
                else {
                    var holder2 = "Semantic error on line: " + tokenList[0][2] + " Variable is not in scope.";
                    SymWarning = SymWarning + 1;
                    SymAnArray.push(holder2);
                }
            }
        }
        else {
            _SymTab.isInit(namer, scope);
        }
        parseExpr();
        _AST.moveUp();
        _AST.moveUp();
        _AST.moveUp();
        _CST.moveUp();
    }
    function ASTExpr(num) {
        if (nextToken() == TokenType.INTEGER) {
            if (tokenList[num + 1][0] == TokenType.INTOP) {
                num = num + 2;
                var run = ASTExpr(num)[1].toString();
                var numArr = ASTExpr(num);
                num = numArr[2];
                var boolExpr = numArr[3];
                var holder1 = tokenList[num + 1][1].toString();
                var holder2 = (holder1 + tokenList[1][1] + run[1]).toString();
                if (boolExpr == true) {
                    return ["INTEXPR", holder2, num, true];
                }
                else {
                    return ["INTEXPR", holder2, num, false];
                }
            }
            else {
                return ["INTEXPR", tokenList[0][1], 1, true];
            }
        }
        else if (nextToken() == TokenType.QMARK) {
            var Holder = '"' + tokenList[1][1] + '"';
            return ["STRINGEXPR", Holder, 3, false];
        }
        else if (nextToken() == TokenType.LPAREN) {
            num++;
            var numArr = ASTExpr(num);
            var run = numArr[1].toString();
            num = numArr[2];
            var boolHold = numArr[3];
            var holder = "{" + run;
            holder = holder + tokenList[num][1];
            num++;
            numArr = ASTExpr(num);
            if (boolHold == false) {
                boolHold = numArr[3];
            }
            run = numArr[1].toString();
            num = numArr[2];
            holder = holder + run + "}";
            return ["BOOLEANEXPR", holder, num, boolHold];
        }
        else if (nextToken() == TokenType.VARIABLE) {
            return ["VARIABLE", tokenList[0][1], 1, true];
        }
        else if (nextToken() == TokenType.TRUE || nextToken() == TokenType.FALSE) {
            return ["BOOLEANEXPR", tokenList[0][1], 1, false];
        }
        return ["ERROR", tokenList[0][1], 1, false];
    }
    function parseVarDecl() {
        document.getElementById("taOutput").value += "  PARSER - | parseVarDecl() \n";
        _CST.addNode({ name: "varDecl", parent: _CST.getCurrentNode(), children: [], value: "varDecl" });
        _AST.addNode({ name: "varDecl", parent: _AST.getCurrentNode(), children: [], value: "varDecl" });
        var types = "";
        if (nextToken() == TokenType.INT) {
            matchToken(TokenType.INT);
            _AST.addNode({ name: "INT", parent: _AST.getCurrentNode(), children: [], value: "INT" });
            types = "INT";
            _AST.moveUp();
        }
        else if (nextToken() == TokenType.STRING) {
            matchToken(TokenType.STRING);
            _AST.addNode({ name: "STRING", parent: _AST.getCurrentNode(), children: [], value: "STRING" });
            types = "STRING";
            _AST.moveUp();
        }
        else if (nextToken() == TokenType.BOOLEAN) {
            matchToken(TokenType.BOOLEAN);
            _AST.addNode({ name: "BOOLEAN", parent: _AST.getCurrentNode(), children: [], value: "BOOLEAN" });
            types = "BOOLEAN";
            _AST.moveUp();
        }
        _AST.addNode({ name: "VARIABLE", parent: _AST.getCurrentNode(), children: [], value: tokenList[0][1] });
        if (_SymTab.testScope(tokenList[0][1].toString(), scope)) {
            var holder = "Semantic Error on line: " + tokenList[0][2] + " Redeclared variable in same scope";
            SymError = SymError + 1;
            SymAnArray.push(holder);
        }
        else {
            _SymTab.addNode({ name: tokenList[0][1].toString(), type: types, Scope: scope, LineNum: tokenList[0][2], init: false, used: false });
        }
        matchToken(TokenType.VARIABLE);
        _AST.moveUp();
        _AST.moveUp();
        _CST.moveUp();
    }
    function parseWhileStatement() {
        document.getElementById("taOutput").value += "  PARSER - | parseWhileStatement() \n";
        _CST.addNode({ name: "whileStatement", parent: _CST.getCurrentNode(), children: [], value: "whileStatement" });
        matchToken(TokenType.WHILE);
        parseBooleanExpr();
        parseBlock();
        _CST.moveUp();
    }
    function parseIfStatement() {
        document.getElementById("taOutput").value += "  PARSER - | parseIfStatement() \n";
        _CST.addNode({ name: "ifStatement", parent: _CST.getCurrentNode(), children: [], value: "ifStatement" });
        matchToken(TokenType.IF);
        parseBooleanExpr();
        parseBlock();
        _CST.moveUp();
    }
    function parseBooleanExpr() {
        document.getElementById("taOutput").value += "  PARSER - | parseBooleanExpr() \n";
        _CST.addNode({ name: "booleanExpr", parent: _CST.getCurrentNode(), children: [], value: "booleanExpr" });
        if (nextToken() == TokenType.LPAREN) {
            matchToken(TokenType.LPAREN);
            var holder = ASTExpr(0);
            var TypeHolder = "";
            if (holder[2] == true) {
                _AST.addNode({ name: holder[1].toString(), parent: _AST.getCurrentNode(), children: [], value: holder[1].toString() });
                _AST.moveUp();
            }
            if (nextToken() == TokenType.LPAREN || nextToken() == TokenType.TRUE || nextToken() == TokenType.FALSE) {
                TypeHolder = "BOOLEAN";
            }
            else if (nextToken() == TokenType.INTEGER) {
                TypeHolder = "INT";
            }
            else if (nextToken() == TokenType.QMARK) {
                TypeHolder = "STRING";
            }
            else if (nextToken() == TokenType.VARIABLE) {
                if (_SymTab.typeCheck(tokenList[0][1].toString(), scope) != "NOPE") {
                    TypeHolder = _SymTab.typeCheck(tokenList[0][1].toString(), scope);
                }
            }
            parseExpr();
            matchToken(TokenType.BOOLOP);
            holder = ASTExpr(0);
            if (holder[2] == true) {
                _AST.addNode({ name: holder[1].toString(), parent: _AST.getCurrentNode(), children: [], value: holder[1].toString() });
                _AST.moveUp();
            }
            var TypeHolder2 = "";
            if (nextToken() == TokenType.LPAREN || nextToken() == TokenType.TRUE || nextToken() == TokenType.FALSE) {
                TypeHolder2 = "BOOLEAN";
            }
            else if (nextToken() == TokenType.INTEGER) {
                TypeHolder2 = "INT";
            }
            else if (nextToken() == TokenType.QMARK) {
                TypeHolder2 = "STRING";
            }
            else if (nextToken() == TokenType.VARIABLE) {
                if (_SymTab.typeCheck(tokenList[0][1].toString(), scope) != "NOPE") {
                    TypeHolder2 = _SymTab.typeCheck(tokenList[0][1].toString(), scope);
                }
            }
            if (TypeHolder != TypeHolder2) {
                var holder_1 = "Semantic Error on line: " + tokenList[0][2] + " " + TypeHolder + "-type expression compared to " + TypeHolder2 + "-type expression.";
                SymError = SymError + 1;
                SymAnArray.push(holder_1);
            }
            parseExpr();
            matchToken(TokenType.RPAREN);
        }
        else if (nextToken() == TokenType.FALSE) {
            matchToken(TokenType.FALSE);
        }
        else {
            matchToken(TokenType.TRUE);
        }
        _CST.moveUp();
    }
    function parseExpr() {
        document.getElementById("taOutput").value += "  PARSER - | parseExpr() \n";
        _CST.addNode({ name: "expr", parent: _CST.getCurrentNode(), children: [], value: "expr" });
        if (nextToken() == TokenType.INTEGER) {
            parseIntExpr();
            _CST.moveUp();
        }
        else if (nextToken() == TokenType.QMARK) {
            parseStringExpr();
            _CST.moveUp();
        }
        else if (nextToken() == TokenType.LPAREN || nextToken() == TokenType.TRUE || nextToken() == TokenType.FALSE) {
            parseBooleanExpr();
            _CST.moveUp();
        }
        else if (nextToken() == TokenType.VARIABLE) {
            var test = _SymTab.isUsed(tokenList[0][1].toString(), scope);
            if (test == false) {
                var holder = "Semantic Error on line: " + tokenList[0][2] + " Variable not declared or initialized in scope.";
                SymError = SymError + 1;
                SymAnArray.push(holder);
            }
            matchToken(TokenType.VARIABLE);
            _CST.moveUp();
        }
        else {
            parseError++;
            document.getElementById("taOutput").value += "  PARSER ERROR - | Expected an expression start (an integer, a string, a left paren, or a variable), and instead got: " + tokenList[0][0] + " With value: '" + tokenList[0][1] + "' On line: " + tokenList[0][2];
            laterTokens.push(tokenList[0]);
            tokenList.shift();
        }
    }
    function parseStringExpr() {
        document.getElementById("taOutput").value += "  PARSER - | parsestringExpr() \n";
        _CST.addNode({ name: "stringExpr", parent: _CST.getCurrentNode(), children: [], value: "stringExpr" });
        matchToken(TokenType.QMARK);
        matchToken(TokenType.CHARLIST);
        matchToken(TokenType.QMARK);
        _CST.moveUp();
    }
    function parseIntExpr() {
        document.getElementById("taOutput").value += "  PARSER - | parseIntExpr() \n";
        _CST.addNode({ name: "intExpr", parent: _CST.getCurrentNode(), children: [], value: "intExpr" });
        matchToken(TokenType.INTEGER);
        if (tokenList[0][0] == TokenType.INTOP) {
            matchToken(TokenType.INTOP);
            intExprSemAnalysis();
            var holder = ASTExpr(0);
            if (holder[2] == true) {
                _AST.addNode({ name: holder[1].toString(), parent: _AST.getCurrentNode(), children: [], value: holder[1].toString() });
                _AST.moveUp();
            }
            if (nextToken() == TokenType.INTEGER) {
                parseIntExpr();
            }
            else if (nextToken() == TokenType.VARIABLE) {
                if (_SymTab.typeCheck(tokenList[0][1].toString(), scope) == "INT") {
                    parseExpr();
                }
                else {
                    var holder_2 = "Semantic Error on line: " + tokenList[0][2] + " Non-INT variable used in INT expression.";
                    SymError = SymError + 1;
                    SymAnArray.push(holder_2);
                }
            }
        }
        _CST.moveUp();
    }
    function intExprSemAnalysis() {
        if (tokenList[0][0] == TokenType.INTEGER) {
            //No error, no code needed
        }
        else if (tokenList[0][0] == TokenType.VARIABLE) {
            //No error, no code needed
        }
        else if (tokenList[0][0] == TokenType.QMARK) {
            var holder = "Semantic Error on line: " + tokenList[0][2] + " Expected a intExpr or variable, instead got string expr";
            SymError = SymError + 1;
            SymAnArray.push(holder);
        }
        else if (tokenList[0][0] == TokenType.LPAREN) {
            var holder = "Semantic Error on line: " + tokenList[0][2] + " Expected a intExpr or variable, instead found a boolean expr or block statement";
            SymError = SymError + 1;
            SymAnArray.push(holder);
        }
        else {
        }
        return;
    }
    /*figured I'd do this for simplicity's sake so code is more readable.
    Doesn't actually do anything to be honest, could replace nexttoken anywhere with "tokenList[0][0]"*/
    function nextToken() {
        var nextToken = tokenList[0][0];
        return nextToken;
    }
    //basic match function 
    function matchToken(checkValue) {
        if (checkValue == tokenList[0][0]) {
            laterTokens.push(tokenList[0]);
            _CST.addNode({ name: checkValue, parent: _CST.getCurrentNode(), children: [], value: tokenList[0][1] });
            tokenList.shift();
            _CST.moveUp();
            //CST work is unnessecary if this else is triggered because the CST won't be printed anyway due to the error.
        }
        else {
            parseError++;
            document.getElementById("taOutput").value += "  PARSER ERROR - | Expected: " + checkValue + ", and instead got: " + tokenList[0][0] + " With value: '" + tokenList[0][1] + "' On line: " + tokenList[0][2];
            laterTokens.push(tokenList[0]);
            tokenList.shift();
        }
    }
})(TSC || (TSC = {}));
