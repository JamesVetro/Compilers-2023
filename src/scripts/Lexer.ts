module TSC {
  export class Lexer {
    public static lex() {
      {
            
            var sourceCode = (<HTMLInputElement>document.getElementById("taSourceCode")).value;
              const lexer = new Lexers(sourceCode);
              (<HTMLInputElement>document.getElementById("taOutput")).value += "Lexing program "+1+"\n";
              let token = lexer.getNextToken();
              while (token.value !== "null") {
                (<HTMLInputElement>document.getElementById("taOutput")).value += "LEXER - | " + token.type+" { "+token.value+" } FOUND AT POSITION: " +token.pos+" IN LINE:  "+token.line+"\n";
                token = lexer.getNextToken();
              }
            return sourceCode;
            
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
          PAREN = 'PAREN',
          CURLY_BRACE = 'CURLY_BRACE',
          EOF = 'EOF',
          COMMENT = 'COMMENT',
          ERROR = "ERROR",
          NULL = "NULL"
        }
        
        class Token {
          type: TokenType;
          value: any;
          pos: number;
          errorNum:number;
          progNum:number;
          line:number;
        
          constructor(type: TokenType, value: any, pos: number, line: number, errorNum:number,progNum:number) {
            this.type = type;
            this.value = value;
            this.pos = pos;
            this.progNum = progNum;
            this.errorNum = errorNum;
            this.line = line;
          }
        }
        
        class Lexers {
          text: string;
          pos: number;
          line: number;
          errorNum:number;
          progNum:number;
          currentChar: string;
        
          constructor(text: string) {
            this.text = text;
            this.pos = 0;
            this.errorNum = 0;
            this.progNum = 1;
            this.currentChar = this.text.charAt(this.pos);
            this.line = 0;
          }
        
          advance() {
            this.pos += 1;
            if (this.pos > this.text.length - 1) {
              this.currentChar = "";
            } else {
              this.currentChar = this.text.charAt(this.pos);
            }
          }
        
          skipWhitespace() {
            while (this.currentChar !== "" && this.currentChar === ' ') {
              this.advance();
            }
          }
        
          isAlpha(ch: string) {
            return /^[a-z]+$/i.test(ch);
          }
        
          isDigit(ch: string) {
            return /^\d$/.test(ch);
          }
  
          AlphaSplitter(Block:string){
              Block = Block.toLowerCase();
              while(true){
                  let LockUp = Block.charAt(0)
                  if(LockUp == "i"){
                      if(Block.charAt(1) == "n" && Block.charAt(2) == "t"){
                          LockUp += Block.charAt(1) + Block.charAt(2)
                          Block = Block.substring(3)
                          return new Token(TokenType.INT, LockUp, this.pos - LockUp.length, this.line,this.errorNum,this.progNum);
                      }else if(Block.charAt(1)=="f"){
                          LockUp += Block.charAt(1)
                          Block = Block.substring(2)
                          return new Token(TokenType.IF, LockUp, this.pos - LockUp.length, this.line,this.errorNum,this.progNum);
                      }else{
                          Block = Block.substring(1)
                          return new Token(TokenType.VARIABLE, LockUp, this.pos - LockUp.length, this.line,this.errorNum,this.progNum);
                      }
                  }else if(LockUp == "t"&& Block.charAt(1) == "r"&& Block.charAt(2) == "u" && Block.charAt(3) == "e"){
                      LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3)
                      Block = Block.substring(4)
                      return new Token(TokenType.TRUE, LockUp, this.pos - LockUp.length, this.line,this.errorNum,this.progNum);
                  }else if(LockUp == "f"&& Block.charAt(1) == "a"&& Block.charAt(2) == "l" && Block.charAt(3) == "s"&& Block.charAt(4) == "e"){
                      LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4)
                      Block = Block.substring(5)
                      return new Token(TokenType.FALSE, LockUp, this.pos - LockUp.length, this.line,this.errorNum,this.progNum);           
                  }else if(LockUp == "s"&& Block.charAt(1) == "t"&& Block.charAt(2) == "r" && Block.charAt(3) == "i"&& Block.charAt(4) == "n"&& Block.charAt(5) == "g"){
                      LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4) + Block.charAt(5)
                      Block = Block.substring(6)
                      return new Token(TokenType.STRING, LockUp, this.pos - LockUp.length, this.line,this.errorNum,this.progNum);   
                  }else if(LockUp == "p"&& Block.charAt(1) == "r"&& Block.charAt(2) == "i" && Block.charAt(3) == "n"&& Block.charAt(4) == "t"){
                      LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4)
                      Block = Block.substring(5)
                      return new Token(TokenType.PRINT, LockUp, this.pos - LockUp.length, this.line,this.errorNum,this.progNum);
                  }else if(LockUp == "w"&& Block.charAt(1) == "h"&& Block.charAt(2) == "i" && Block.charAt(3) == "l"&& Block.charAt(4) == "e"){
                      LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4)
                      Block = Block.substring(5)
                      return new Token(TokenType.WHILE, LockUp, this.pos - LockUp.length, this.line,this.errorNum,this.progNum);
                  }else if(LockUp == "b"&& Block.charAt(1) == "o"&& Block.charAt(2) == "o" && Block.charAt(3) == "l"&& Block.charAt(4) == "e"&& Block.charAt(5) == "a"&& Block.charAt(6) == "n"){
                      LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4) + Block.charAt(5) + Block.charAt(6)
                      Block = Block.substring(7)
                      return new Token(TokenType.BOOLEAN, LockUp, this.pos - LockUp.length, this.line,this.errorNum,this.progNum); 
                  }else{
                      Block = Block.substring(1)
                      return new Token(TokenType.VARIABLE, LockUp, this.pos - LockUp.length, this.line,this.errorNum,this.progNum);
                  }
              }
          }
        
          getNextToken() {
            while (this.currentChar !== "") {
              if (this.currentChar === ' ') {
                this.skipWhitespace();
                continue;
              }
              if (this.isAlpha(this.currentChar)) {
                let result = '';
                while (this.isAlpha(this.currentChar)) {
                  result += this.currentChar;
                  this.advance();
                }
                return this.AlphaSplitter(result)
              }
              if (this.isDigit(this.currentChar)) {
                let result = '';
                while (this.isDigit(this.currentChar)) {
                  result += this.currentChar;
                  this.advance();
                }
                return new Token(TokenType.INTEGER, parseInt(result), this.pos - result.length, this.line,this.errorNum,this.progNum);
              }
              if (this.currentChar === '=') {
                  let result = this.currentChar;
                  this.advance();
                  if (this.currentChar === '=') {
                    result += this.currentChar;
                    this.advance();
                  }
                  return new Token(TokenType.OPERATOR, result, this.pos - result.length, this.line,this.errorNum,this.progNum);
                }
                if (this.currentChar === '!') {
                  let result = this.currentChar;
                  this.pos += 1;
                  if (this.pos > this.text.length - 1) {
                    this.currentChar = "";
                  } else {
                    this.currentChar = this.text.charAt(this.pos);
                  }
                  if (this.currentChar === '=') {
                    result += this.currentChar;
                    this.advance();
                  }
                  return new Token(TokenType.OPERATOR, result, this.pos - result.length, this.line,this.errorNum,this.progNum);
                }
                if (this.currentChar === '(' || this.currentChar === ')') {
                  let result = this.currentChar;
                  this.advance();
                  return new Token(TokenType.PAREN, result, this.pos - result.length, this.line,this.errorNum,this.progNum);
                }
                if (this.currentChar === '{' || this.currentChar === '}') {
                  let result = this.currentChar;
                  this.advance();
                  return new Token(TokenType.CURLY_BRACE, result, this.pos - result.length, this.line,this.errorNum,this.progNum);
                }
                if (this.currentChar === '/') {
                  let result = this.currentChar;
                  this.pos += 1;
                  if (this.pos > this.text.length - 1) {
                    this.currentChar = "";
                  } else {
                    this.currentChar = this.text.charAt(this.pos);
                  }
                  if (this.currentChar === '*') {
                    result += this.currentChar;
                    this.pos += 1;
                  if (this.pos > this.text.length - 1) {
                    this.currentChar = "";
                  } else {
                    this.currentChar = this.text.charAt(this.pos);
                  }
                    let comment = '';
                    while (this.currentChar !== "" && !(this.currentChar === '*' && this.text.charAt(this.pos + 1) === '/')) {
                      comment += this.currentChar;
                      this.advance();
                    }
                    if (this.currentChar === '*') {
                      result += this.currentChar;
                      this.pos += 1;
                      if (this.pos > this.text.length - 1) {
                        this.currentChar = "";
                      } else {
                        this.currentChar = this.text.charAt(this.pos);
                      }
                      if (this.currentChar === '/') {
                        result += this.currentChar;
                        this.advance();
                      }
                    }
                    continue;
                  }
                }
                if(this.currentChar === '"'){
                  this.pos += 1;
                  if (this.pos > this.text.length - 1) {
                    this.currentChar = "";
                  } else {
                    this.currentChar = this.text.charAt(this.pos);
                  }
                  let quoteString:string = ""
                    while (this.currentChar !== "" && !(this.currentChar === '"')) {
                        if (this.currentChar === ' ') {
                            this.skipWhitespace();
                        }
                        if(this.isAlpha(this.currentChar)){
                            quoteString += this.currentChar;
                            this.advance();
                        }else{
                            this.errorNum++;
                            return new Token(TokenType.ERROR,quoteString, this.pos - quoteString.length, this.line,this.errorNum,this.progNum);
                        }
                    }
                    return new Token(TokenType.STRING,quoteString, this.pos - quoteString.length, this.line,this.errorNum,this.progNum);
                }
                if(this.currentChar === '\n'){
                  this.line++;
                  this.advance();
                  continue;
                }
                if(this.currentChar === '$'){
                  this.pos += 1;
                  if (this.pos > this.text.length - 1) {
                    this.currentChar = "";
                  } else {
                    this.currentChar = this.text.charAt(this.pos);
                  }
                  this.progNum++;
                  (<HTMLInputElement>document.getElementById("taOutput")).value += "LEXER - | " + EOF+" { "+"$"+" } FOUND AT POSITION: " +this.pos+" IN LINE:  "+this.line+"\n";
                  if(this.errorNum == 0){
                    (<HTMLInputElement>document.getElementById("taOutput")).value += "Lex completed with 0 errors. \n \n";
                    if(this.currentChar != ""){
                      (<HTMLInputElement>document.getElementById("taOutput")).value += "Lexing program "+this.progNum+"\n";
                    }
                    this.errorNum = 0;
                  }else{
                    (<HTMLInputElement>document.getElementById("taOutput")).value += "Lex FAILED with: "+this.errorNum+" errors. \n \n";
                    this.errorNum = 0;
                    if(this.currentChar != ""){
                      (<HTMLInputElement>document.getElementById("taOutput")).value += "Lexing program "+this.progNum+"\n";
                    }
                  }
                  
                  continue;
                }
                else{
                  let errorval = this.currentChar
                  this.advance();
                  this.errorNum++;
                  return new Token(TokenType.ERROR, errorval,this.pos,this.line,this.errorNum,this.progNum)
                }
              }
              return new Token(TokenType.NULL, "null",this.pos,this.line,this.errorNum,this.progNum)
            }
          }
        }