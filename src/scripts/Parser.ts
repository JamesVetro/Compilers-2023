module TSC {
    let tokenList:TokenType[] = [];
    let listLen = tokenList.length;
    export class Parser {
        
        public static parse(inToken:TokenType,lexError:number,progNum:number) {
            if(inToken == EOF){
                listLen = tokenList.push(inToken);
                if(lexError != 0){
                    
                    tokenList = [];
                }else{
                    (<HTMLInputElement>document.getElementById("taOutput")).value += "\n \n \n \nPARSER - | Skipped due to LEXER Errors \n \n CST for program "+progNum+ ": Skipped due to LEXER errors"; 
                    tokenList = [];
                }
            }else{
                listLen = tokenList.push(inToken);
            }
            
        }
    }
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

    
}
