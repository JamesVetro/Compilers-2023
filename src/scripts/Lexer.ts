module TSC
	{
	export class Lexer {
		public static lex() {
		    {
		        // Grab the "raw" source code.
		        var sourceCode = (<HTMLInputElement>document.getElementById("taSourceCode")).value;
		        // Trim the leading and trailing spaces.
		        sourceCode = TSC.Utils.trim(sourceCode);
                analyze(sourceCode)
		        // TODO: remove all spaces in the middle; remove line breaks too.
		        return sourceCode;
		    }
		}
	}
	}


function analyze(Code:string){
    let Placeholder:number = 0;
    while(true){
        let {Marks, Placement} = Iterate(Placeholder,Code);
        Splitter(Marks);
        TwoTerms(Placement,Code)
    }
}
function Iterate(Placeholder:number, Code:string) {
    let Marks = "";
    let Placement = Placeholder;
    let nextChar = ""
    while(true){
        nextChar = Code.charAt(Placement);
        if(nextChar != "{"&& nextChar != "}" && nextChar != "=" && nextChar != "+" && nextChar != "!" && nextChar != "(" && nextChar != ")" && nextChar != '"' && nextChar != "/"){
            Marks += nextChar;
            Placement++;
        }else{
            Placement++;
            break;
        }
    }
    return {Marks, Placement};
  }
function Splitter(Marks:string){

}
function TwoTerms(Placeholder:number, Code:string) {
    let holding = "";
    let Placement = Placeholder;
    let nextChar = Code.charAt(Placement);
    if (nextChar == "="){
        Placement++;
        nextChar = Code.charAt(Placement);
        if(nextChar = "="){
            holding = "=="
            return {holding, Placement}
        }else{
            holding = "="
            return {holding, Placement}
        }
    }else if(nextChar = "/"){
        Placement++;
        nextChar = Code.charAt(Placement);
        if(nextChar = "*"){
            while(true){
                while(nextChar != "*"){
                    Placement++;
                    nextChar = Code.charAt(Placement);
                }
                Placement++;
                nextChar = Code.charAt(Placement);
                if(nextChar = "/"){
                    break;
                }
                Placement--;
            }
            
        }else{
            return ("Error, / must be followed by a * for a valid comment declaration. Error at character: "+nextChar)
        }
    }else if(nextChar = "!"){
        Placement++;
        nextChar = Code.charAt(Placement);
        if(nextChar = "="){
            holding = "!="
            return {holding, Placement}
        }else{
        return ("Error, ! must be followed by a = for a valid boolean operator. Error at character: "+nextChar)
        }
    }else{

    }
}