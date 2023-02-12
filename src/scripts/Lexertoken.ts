export class Lexertoken {
	public static lex() {
		{
	        
	        var sourceCode = (<HTMLInputElement>document.getElementById("taSourceCode")).value;
	        
	        sourceCode = TSC.Utils.trim(sourceCode);
            analyze(sourceCode)
            
            const lexer = new Lexer(sourceCode);
            let token = lexer.getNextToken();
            while (token.type !== TokenType.EOF) {
              console.log(token);
              token = lexer.getNextToken();
            }
	        // TODO: remove all spaces in the middle; remove line breaks too.
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
        ERROR = "ERROR"
      }
      
      class Token {
        type: TokenType;
        value: any;
        pos: number;
        line:number;
      
        constructor(type: TokenType, value: any, pos: number, line: number) {
          this.type = type;
          this.value = value;
          this.pos = pos;
          this.line = line;
        }
      }
      
      class Lexer {
        text: string;
        pos: number;
        line: number;
        currentChar: string;
      
        constructor(text: string) {
          this.text = text;
          this.pos = 0;
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
                        return new Token(TokenType.INT, LockUp, this.pos - LockUp.length, this.line);
                    }else if(Block.charAt(1)=="f"){
                        LockUp += Block.charAt(1)
                        Block = Block.substring(2)
                        return new Token(TokenType.IF, LockUp, this.pos - LockUp.length, this.line);
                    }else{
                        Block = Block.substring(1)
                        return new Token(TokenType.VARIABLE, LockUp, this.pos - LockUp.length, this.line);
                    }
                }else if(LockUp == "t"&& Block.charAt(1) == "r"&& Block.charAt(2) == "u" && Block.charAt(3) == "e"){
                    LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3)
                    Block = Block.substring(4)
                    return new Token(TokenType.TRUE, LockUp, this.pos - LockUp.length, this.line);
                }else if(LockUp == "f"&& Block.charAt(1) == "a"&& Block.charAt(2) == "l" && Block.charAt(3) == "s"&& Block.charAt(4) == "e"){
                    LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4)
                    Block = Block.substring(5)
                    return new Token(TokenType.FALSE, LockUp, this.pos - LockUp.length, this.line);           
                }else if(LockUp == "s"&& Block.charAt(1) == "t"&& Block.charAt(2) == "r" && Block.charAt(3) == "i"&& Block.charAt(4) == "n"&& Block.charAt(5) == "g"){
                    LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4) + Block.charAt(5)
                    Block = Block.substring(6)
                    return new Token(TokenType.STRING, LockUp, this.pos - LockUp.length, this.line);   
                }else if(LockUp == "p"&& Block.charAt(1) == "r"&& Block.charAt(2) == "i" && Block.charAt(3) == "n"&& Block.charAt(4) == "t"){
                    LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4)
                    Block = Block.substring(5)
                    return new Token(TokenType.PRINT, LockUp, this.pos - LockUp.length, this.line);
                }else if(LockUp == "w"&& Block.charAt(1) == "h"&& Block.charAt(2) == "i" && Block.charAt(3) == "l"&& Block.charAt(4) == "e"){
                    LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4)
                    Block = Block.substring(5)
                    return new Token(TokenType.WHILE, LockUp, this.pos - LockUp.length, this.line);
                }else if(LockUp == "b"&& Block.charAt(1) == "o"&& Block.charAt(2) == "o" && Block.charAt(3) == "l"&& Block.charAt(4) == "e"&& Block.charAt(5) == "a"&& Block.charAt(6) == "n"){
                    LockUp += Block.charAt(1) + Block.charAt(2) + Block.charAt(3) + Block.charAt(4) + Block.charAt(5) + Block.charAt(6)
                    Block = Block.substring(7)
                    return new Token(TokenType.BOOLEAN, LockUp, this.pos - LockUp.length, this.line); 
                }else{
                    Block = Block.substring(1)
                    return new Token(TokenType.VARIABLE, LockUp, this.pos - LockUp.length, this.line);
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
              this.AlphaSplitter(result)
            }
            if (this.isDigit(this.currentChar)) {
              let result = '';
              while (this.isDigit(this.currentChar)) {
                result += this.currentChar;
                this.advance();
              }
              return new Token(TokenType.INTEGER, parseInt(result), this.pos - result.length, this.line);
            }
            if (this.currentChar === '=') {
                let result = this.currentChar;
                this.advance();
                if (this.currentChar === '=') {
                  result += this.currentChar;
                  this.advance();
                }
                return new Token(TokenType.OPERATOR, result, this.pos - result.length, this.line);
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
                return new Token(TokenType.OPERATOR, result, this.pos - result.length, this.line);
              }
              if (this.currentChar === '(' || this.currentChar === ')') {
                let result = this.currentChar;
                this.advance();
                return new Token(TokenType.PAREN, result, this.pos - result.length, this.line);
              }
              if (this.currentChar === '{' || this.currentChar === '}') {
                let result = this.currentChar;
                this.advance();
                return new Token(TokenType.CURLY_BRACE, result, this.pos - result.length, this.line);
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
                  return new Token(TokenType.COMMENT, result + comment, this.pos - result.length - comment.length, this.line);
                }else if(this.currentChar === '"'){
                  this.pos += 1;
                  if (this.pos > this.text.length - 1) {
                    this.currentChar = "";
                  } else {
                    this.currentChar = this.text.charAt(this.pos);
                  }
                  let quoteString:string = ""
                    while (this.currentChar !== "" && !(this.currentChar === '"')) {
                        if(this.isAlpha(this.currentChar)){
                            quoteString += this.currentChar;
                            this.advance();
                        }else{
                            return new Token(TokenType.ERROR,quoteString, this.pos - quoteString.length, this.line);
                        }
                    }
                    return new Token(TokenType.STRING,quoteString, this.pos - quoteString.length, this.line);
                }else if(this.currentChar === '/n'){
                    this.line++;
                }
              }
            }
            return new Token(TokenType.EOF, null, this.pos, this.line);
          }
        }
        
        
        