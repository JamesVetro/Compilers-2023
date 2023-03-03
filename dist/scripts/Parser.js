"use strict";
var TSC;
(function (TSC) {
    var tokenList = [];
    var listLen = tokenList.length;
    var Parser = /** @class */ (function () {
        function Parser() {
        }
        Parser.parse = function (inToken, lexError, progNum) {
            if (inToken == TokenType.EOF) {
                listLen = tokenList.push(inToken);
                if (lexError == 0) {
                    document.getElementById("taOutput").value += "\n \nParsing currently missing placeholder\n\nCST currently missing placeholder\n\n";
                    tokenList = [];
                }
                else {
                    document.getElementById("taOutput").value += "\n \nPARSER - | Skipped due to LEXER Errors \n \nCST for program " + progNum + ": Skipped due to LEXER errors\n\n";
                    tokenList = [];
                }
            }
            else {
                listLen = tokenList.push(inToken);
            }
        };
        return Parser;
    }());
    TSC.Parser = Parser;
})(TSC || (TSC = {}));
