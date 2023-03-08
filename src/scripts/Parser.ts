module TSC {
    let tokenList:TokenType[] = [];
    let listLen = tokenList.length;
    export class Parser {
        public static parse(inToken:TokenType,lexError:number,progNum:number) {
            if(inToken == TokenType.EOF){
                listLen = tokenList.push(inToken);
                if(lexError == 0){
                    (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nParsing currently missing placeholder\n\nCST currently missing placeholder\n\n"; 
                    tokenList = [];
                }else{
                    (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \nPARSER - | Skipped due to LEXER Errors \n \nCST for program "+progNum+ ": Skipped due to LEXER errors\n\n"; 
                    tokenList = [];
                }
            }else{
                listLen = tokenList.push(inToken);
            }
            
        }
    } 

    function parseProgram(){
        parseBlock();
        matchToken(TokenType.EOF);
    }

    function parseBlock(){
        matchToken(TokenType.LCURLY);
        parseStatementList();
        matchToken(TokenType.RCURLY);
    }


    function parseStatementList(){
        parseStatement();
        if (findNextToken() != TokenType.RCURLY){
            parseStatementList();
        }
        else{
            // It's an Empty Production!
        }
    }

    function parseStatement(){
       if(findNextToken() == TokenType.PRINT){
        parsePrintStatement();
       }else if(findNextToken() == TokenType.VARIABLE){
        parseAssignmentStatement();
       }else if(findNextToken() == TokenType.INT||findNextToken() == TokenType.STRING||findNextToken() == TokenType.BOOLEAN){
        parseVarDecl();
       }else if(findNextToken() == TokenType.WHILE){
        parseWhileStatement();
       }else if(findNextToken() == TokenType.IF){
        parseIfStatement();
       }else if(findNextToken() == TokenType.LCURLY){
        parseBlock();
       }else{
        error//placeholder-which-is-wrong-so-my-ide-catches-it-and-reminds-me
       }
    }

    function parsePrintStatement(){
        matchToken(TokenType.PRINT);
        matchToken(TokenType.LPAREN);
        parseExpr();
        matchToken(TokenType.RPAREN);
    }

    function parseAssignmentStatement(){
        matchToken(TokenType.VARIABLE);
        matchToken(TokenType.OPERATOR);
        parseExpr();
    }
    
    function parseVarDecl(){
        if(findNextToken() == TokenType.INT){
            matchToken(TokenType.INT);
        }
        else if(findNextToken() == TokenType.STRING){
            matchToken(TokenType.STRING);
        }
        else if(findNextToken() == TokenType.BOOLEAN){
            matchToken(TokenType.BOOLEAN);
        }

        if (findNextToken() == TokenType.VARIABLE){
            matchToken(TokenType.VARIABLE)
        }
    }

    function parseWhileStatement(){
        matchToken(TokenType.WHILE);
        parseBooleanExpr();
        parseBlock();
    }
    
    function parseIfStatement(){
        matchToken(TokenType.IF);
        parseBooleanExpr();
        parseBlock();
    }
        
    function parseBooleanExpr(){
        if (findNextToken() == TokenType.LPAREN){
            parseExpr();
            if (findNextToken() == TokenType.BOOLOP){
                matchToken(TokenType.BOOLOP);
            }
            parseExpr();
            matchToken(TokenType.RPAREN);
        }else if (findNextToken() == TokenType.FALSE){
            matchToken(TokenType.FALSE);
        }else if(findNextToken() == TokenType.TRUE){
            matchToken(TokenType.TRUE);
        }
    }

    function parseExpr(){
        if(findNextToken() == TokenType.INTEGER){
            parseIntExpr();
        }else if(findNextToken() == TokenType.STRING){
            matchToken(TokenType.STRING)
        }else if(findNextToken() == TokenType.LPAREN){
            parseBooleanExpr();
        }else if(findNextToken() == TokenType.VARIABLE){
            matchToken(TokenType.VARIABLE)
        }else{
            error//placeholder-which-is-wrong-so-my-ide-catches-it-and-reminds-me
        }
    }

    function parseIntExpr() {
        matchToken(TokenType.INTEGER);
        matchToken(TokenType.INTOP);
        parseExpr();
    }

    function findNextToken(){
        let nextToken:TokenType =  tokenList[1];
        return nextToken;
    }

    function matchToken(token:TokenType){

    }

}


