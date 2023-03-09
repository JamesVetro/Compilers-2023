module TSC {
    let tokenList:(TokenType|string|number)[][] = [];
    let laterTokens:(TokenType|string|number)[][] = [];
    let listLen = tokenList.length;
    let parseError:number = 0;
    export class Parser {
        public static parse(inToken:TokenType,tokenValue:string,lineNum:number,lexError:number,progNum:number) {
            if(inToken == TokenType.EOF){
                listLen = tokenList.push([inToken,tokenValue,lineNum]);
                if(lexError == 0){
                    (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | Parsing program "+progNum+": \n"; 
                    parseProgram(progNum);
                    tokenList = [];
                }else{
                    (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | Skipped due to LEXER Errors \n \nCST for program "+progNum+ ": Skipped due to LEXER errors\n\n"; 
                    tokenList = [];
                }
            }else{
                listLen = tokenList.push([inToken,tokenValue]);
            }
        }
    } 

    function parseProgram(progNum:number){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | parseProgram() \n"; 
        parseBlock();
        matchToken(TokenType.EOF);
        if(parseError == 0){
            (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | Parse Completed Successfully \n \n "; 
            (<HTMLInputElement>document.getElementById("taOutput")).value += "CST for Program "+progNum+": \n"; 
            //CST IS RUN HERE
        }else{
            (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | Parse Failed with "+parseError +"errors.\n \n "; 
            (<HTMLInputElement>document.getElementById("taOutput")).value += "CST for Program "+progNum+":Skipped due to PARSER errors.\n \n";
        }

        
    }

    function parseBlock(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | parseBlock() \n";
        matchToken(TokenType.LCURLY);
        parseStatementList();
        matchToken(TokenType.RCURLY);
    }


    function parseStatementList(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | parseStatementList() \n";
        parseStatement();
        if (nextToken() != TokenType.RCURLY){
            parseStatementList();
        }
        else{
            // It's an Empty Production!
        }
    }

    function parseStatement(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | parseStatement() \n";
       if(nextToken() == TokenType.PRINT){
        parsePrintStatement();
       }else if(nextToken() == TokenType.VARIABLE){
        parseAssignmentStatement();
       }else if(nextToken() == TokenType.INT||nextToken() == TokenType.STRING||nextToken() == TokenType.BOOLEAN){
        parseVarDecl();
       }else if(nextToken() == TokenType.WHILE){
        parseWhileStatement();
       }else if(nextToken() == TokenType.IF){
        parseIfStatement();
       }else if(nextToken() == TokenType.LCURLY){
        parseBlock();
       }else{
        (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER ERROR - | Expected a statement start (PRINT, a variable, IF, WHILE, variable declaration, or left curly bracket), and instead got: "+tokenList[0][0]+" With value: '"+tokenList[0][1]+" On line: "+tokenList[0][2]; 
        laterTokens.push(tokenList[0]);
        tokenList.shift();
       }
    }

    function parsePrintStatement(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | parsePrintStatement() \n";
        matchToken(TokenType.PRINT);
        matchToken(TokenType.LPAREN);
        parseExpr();
        matchToken(TokenType.RPAREN);
    }

    function parseAssignmentStatement(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | parseAssignmentStatement() \n";
        matchToken(TokenType.VARIABLE);
        matchToken(TokenType.OPERATOR);
        parseExpr();
    }
    
    function parseVarDecl(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | parseVarDecl() \n";
        if(nextToken() == TokenType.INT){
            matchToken(TokenType.INT);
        }else if(nextToken() == TokenType.STRING){
            matchToken(TokenType.STRING);
        }else if(nextToken() == TokenType.BOOLEAN){
            matchToken(TokenType.BOOLEAN);
        }
        if (nextToken() == TokenType.VARIABLE){
            matchToken(TokenType.VARIABLE)
        }
    }

    function parseWhileStatement(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | parseWhileStatement() \n";
        matchToken(TokenType.WHILE);
        parseBooleanExpr();
        parseBlock();
    }
    
    function parseIfStatement(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | parseIfStatement() \n";
        matchToken(TokenType.IF);
        parseBooleanExpr();
        parseBlock();
    }
        
    function parseBooleanExpr(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | parseBooleanExpr() \n";
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
    }

    function parseExpr(){
        (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | parseExpr() \n";
        if(nextToken() == TokenType.INTEGER){
            parseIntExpr();
        }else if(nextToken() == TokenType.STRING){
            matchToken(TokenType.STRING)
        }else if(nextToken() == TokenType.LPAREN){
            parseBooleanExpr();
        }else if(nextToken() == TokenType.VARIABLE){
            matchToken(TokenType.VARIABLE)
        }else{
            parseError++;
            (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER ERROR - | Expected an expression start (an integer, a string, a left paren, or a variable), and instead got: "+tokenList[0][0]+" With value: '"+tokenList[0][1]+" On line: "+tokenList[0][2]; 
            laterTokens.push(tokenList[0]);
            tokenList.shift();
        }
    }

    function parseIntExpr() {
        (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | parseIntExpr() \n";
        matchToken(TokenType.INTEGER);
        matchToken(TokenType.INTOP);
        parseExpr();
    }

    function nextToken(){
        let nextToken = tokenList[0][0];
        return nextToken;
    }

    function matchToken(checkValue:TokenType){
        if(checkValue == tokenList[0][0]){
            (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | matchToken("+tokenList[0][1]+") \n";
            laterTokens.push(tokenList[0]);
            tokenList.shift();
        }else{
            parseError++;
            (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER ERROR - | Expected: "+checkValue+", and instead got: "+tokenList[0][0]+" With value: '"+tokenList[0][1]+" On line: "+tokenList[0][2]; 
            laterTokens.push(tokenList[0]);
            tokenList.shift();
        }
    }

}


