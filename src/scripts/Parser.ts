module TSC {
    
    let tokenList:string[] = [];
    let listLen = tokenList.length;
    export class Parser {
        public static parse(inToken:string,lexError:number,progNum:number) {
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
}
