module TSC {
    //the actual token storage
    let tokenList:(TokenType|string|number)[][] = [];
    //not really used yet but I just feel like it might be useful to keep the tokens. 
    let laterTokens:(TokenType|string|number)[][] = [];
    let listLen = tokenList.length;
    let parseError:number = 0;
    export class Parser {
        public static parse(inToken:TokenType,tokenValue:string,lineNum:number,lexError:number,progNum:number) {
            if(inToken == TokenType.EOF){
                listLen = tokenList.push([inToken,tokenValue,lineNum]);
                //Doesn't run parse or CST unless there are no lex errors. 
                if(lexError == 0){
                    (<HTMLInputElement>document.getElementById("taOutput")).value += "PARSER - | Parsing program "+progNum+": \n"; 
                    parseProgram(progNum);
                    tokenList = [];
                    parseError = 0;
                }else{
                    (<HTMLInputElement>document.getElementById("taOutput")).value += "PARSER - | Skipped due to LEXER Errors\n\nCST for program "+progNum+ ": Skipped due to LEXER errors\n\n"; 
                    tokenList = [];
                    parseError = 0;
                }
            }else{
                listLen = tokenList.push([inToken,tokenValue]);
            }
        }
    } 

    function parseProgram(progNum:number){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER - | parseProgram() \n"; 
        _CST.addNode({name: "program", parent: null, children: [], value: "program"});
        parseBlock();
        matchToken(TokenType.EOF);
        _CST.moveUp();
        //chooses to print cst or not based on parser errors or lack thereof
        if(parseError == 0){
            (<HTMLInputElement>document.getElementById("taOutput")).value += "PARSER - | Parse Completed Successfully \n\n"; 
            (<HTMLInputElement>document.getElementById("taOutput")).value += "CST for Program "+progNum+": \n"; 
            _CST.printCST(_CST.getRootNode());
            (<HTMLInputElement>document.getElementById("taOutput")).value += "CST Complete.\n"; 
        }else{
            (<HTMLInputElement>document.getElementById("taOutput")).value += "PARSER - | Parse Failed with "+parseError +" error(s).\n\n"; 
            (<HTMLInputElement>document.getElementById("taOutput")).value += "CST for Program "+progNum+":Skipped due to PARSER errors.\n\n";
        }

        
    }
 //the rest of the parse statements are fairly self explanatory, simply going down then back up the tree adding nodes and checking tokens.
    function parseBlock(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER - | parseBlock() \n";
       _CST.addNode({name: "block", parent:_CST.getCurrentNode(), children: [], value: "block"});
        matchToken(TokenType.LCURLY);
        parseStatementList();
        matchToken(TokenType.RCURLY);
       _CST.moveUp();
    }


    function parseStatementList(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER - | parseStatementList() \n";
       _CST.addNode({name: "statementList", parent:_CST.getCurrentNode(), children: [], value: "statementList"});
        if (nextToken() != TokenType.RCURLY){
            parseStatement();
            parseStatementList();
        }
        else{
            // It's an Empty Production!
        }
       _CST.moveUp();
    }
   
    function parseStatement(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER - | parseStatement() \n";
       _CST.addNode({name: "statement", parent:_CST.getCurrentNode(), children: [], value: "statement"});
       if(nextToken() == TokenType.PRINT){
        parsePrintStatement();
       _CST.moveUp();
       }else if(nextToken() == TokenType.VARIABLE){
        parseAssignmentStatement();
       _CST.moveUp();
       }else if(nextToken() == TokenType.INT||nextToken() == TokenType.STRING||nextToken() == TokenType.BOOLEAN){
        parseVarDecl();
       _CST.moveUp();
       }else if(nextToken() == TokenType.WHILE){
        parseWhileStatement();
       _CST.moveUp();
       }else if(nextToken() == TokenType.IF){
        parseIfStatement();
       _CST.moveUp();
       }else if(nextToken() == TokenType.LCURLY){
        parseBlock();
       _CST.moveUp();
       }else{
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER ERROR - | Expected a statement start (PRINT, a variable, IF, WHILE, variable declaration, or left curly bracket), and instead got: "+tokenList[0][0]+" With value: '"+tokenList[0][1]+"' On line: "+tokenList[0][2]; 
        laterTokens.push(tokenList[0]);
        tokenList.shift();
       }
    }

    function parsePrintStatement(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER - | parsePrintStatement() \n";
       _CST.addNode({name: "printStatement", parent:_CST.getCurrentNode(), children: [], value: "printStatement"});
        matchToken(TokenType.PRINT);
        matchToken(TokenType.LPAREN);
        parseExpr();
        matchToken(TokenType.RPAREN);
       _CST.moveUp();
    }

    function parseAssignmentStatement(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER - | parseAssignmentStatement() \n";
       _CST.addNode({name: "assignmentStatement", parent:_CST.getCurrentNode(), children: [], value: "assignmentStatement"});
        matchToken(TokenType.VARIABLE);
        matchToken(TokenType.OPERATOR);
        parseExpr();
       _CST.moveUp();
    }
    
    function parseVarDecl(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER - | parseVarDecl() \n";
       _CST.addNode({name: "varDecl", parent:_CST.getCurrentNode(), children: [], value: "varDecl"});
        if(nextToken() == TokenType.INT){
            matchToken(TokenType.INT);
        }else if(nextToken() == TokenType.STRING){
            matchToken(TokenType.STRING);
        }else if(nextToken() == TokenType.BOOLEAN){
            matchToken(TokenType.BOOLEAN);
        }
        matchToken(TokenType.VARIABLE)
       _CST.moveUp();
    }

    function parseWhileStatement(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER - | parseWhileStatement() \n";
       _CST.addNode({name: "whileStatement", parent:_CST.getCurrentNode(), children: [], value: "whileStatement"});
        matchToken(TokenType.WHILE);
        parseBooleanExpr();
        parseBlock();
       _CST.moveUp();
    }
    
    function parseIfStatement(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER - | parseIfStatement() \n";
       _CST.addNode({name: "ifStatement", parent:_CST.getCurrentNode(), children: [], value: "ifStatement"});
        matchToken(TokenType.IF);
        parseBooleanExpr();
        parseBlock();
       _CST.moveUp();
    }
        
    function parseBooleanExpr(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER - | parseBooleanExpr() \n";
       _CST.addNode({name: "booleanExpr", parent:_CST.getCurrentNode(), children: [], value: "booleanExpr"});
        if (nextToken() == TokenType.LPAREN){
            matchToken(TokenType.LPAREN);
            parseExpr();
            matchToken(TokenType.BOOLOP);
            parseExpr();
            matchToken(TokenType.RPAREN);
        }else if (nextToken() == TokenType.FALSE){
            matchToken(TokenType.FALSE);
        }else{
            matchToken(TokenType.TRUE);
        }
       _CST.moveUp();
    }

    function parseExpr(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER - | parseExpr() \n";
       _CST.addNode({name: "expr", parent:_CST.getCurrentNode(), children: [], value: "expr"});
        if(nextToken() == TokenType.INTEGER){
            parseIntExpr();
           _CST.moveUp();
        }else if(nextToken() == TokenType.QMARK){
            parseStringExpr();
           _CST.moveUp();
        }else if(nextToken() == TokenType.LPAREN){
            parseBooleanExpr();
           _CST.moveUp();
        }else if(nextToken() == TokenType.VARIABLE){
            matchToken(TokenType.VARIABLE)
           _CST.moveUp();
        }else{
            parseError++;
            (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER ERROR - | Expected an expression start (an integer, a string, a left paren, or a variable), and instead got: "+tokenList[0][0]+" With value: '"+tokenList[0][1]+"' On line: "+tokenList[0][2]; 
            laterTokens.push(tokenList[0]);
            tokenList.shift();
        }
    }

    function parseStringExpr(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER - | parsestringExpr() \n";
        _CST.addNode({name: "stringExpr", parent:_CST.getCurrentNode(), children: [], value: "stringExpr"});
        matchToken(TokenType.QMARK);
        matchToken(TokenType.CHARLIST);
        matchToken(TokenType.QMARK);
       _CST.moveUp();
    }

    function parseIntExpr() {
        (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER - | parseIntExpr() \n";
       _CST.addNode({name: "intExpr", parent:_CST.getCurrentNode(), children: [], value: "intExpr"});
        matchToken(TokenType.INTEGER);
        if(tokenList[1][0] == TokenType.INTOP){
            matchToken(TokenType.INTOP);
            parseExpr();
        }
       _CST.moveUp();
    }
/*figured I'd do this for simplicity's sake so code is more readable. 
Doesn't actually do anything to be honest, could replace nexttoken anywhere with "tokenList[0][0]"*/
    function nextToken(){
        let nextToken = tokenList[0][0];
        return nextToken;
    }
//basic match function 
    function matchToken(checkValue:TokenType){
        if(checkValue == tokenList[0][0]){
            laterTokens.push(tokenList[0]);
            _CST.addNode({name: checkValue, parent:_CST.getCurrentNode(), children: [], value: tokenList[0][1]});
            tokenList.shift();
            _CST.moveUp();
        //CST work is unnessecary if this else is triggered because the CST won't be printed anyway due to the error.
        }else{
            parseError++;
            (<HTMLInputElement>document.getElementById("taOutput")).value += "  PARSER ERROR - | Expected: "+checkValue+", and instead got: "+tokenList[0][0]+" With value: '"+tokenList[0][1]+"' On line: "+tokenList[0][2]; 
            laterTokens.push(tokenList[0]);
            tokenList.shift();
        }
    }
}


