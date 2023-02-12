"use strict";
var TSC;
(function (TSC) {
    var Lexer = /** @class */ (function () {
        function Lexer() {
        }
        Lexer.lex = function () {
            {
                // Grab the "raw" source code.
                var sourceCode = document.getElementById("taSourceCode").value;
                // Trim the leading and trailing spaces.
                sourceCode = TSC.Utils.trim(sourceCode);
                analyze(sourceCode);
                // TODO: remove all spaces in the middle; remove line breaks too.
                return sourceCode;
            }
        };
        return Lexer;
    }());
    TSC.Lexer = Lexer;
})(TSC || (TSC = {}));
function analyze(Code) {
    var Placeholder = 0;
    while (true) {
        var _a = Iterate(Placeholder, Code), Marks = _a.Marks, Placement = _a.Placement;
        Splitter(Marks);
        TwoTerms(Placement, Code);
    }
}
function Iterate(Placeholder, Code) {
    var Marks = "";
    var Placement = Placeholder;
    var nextChar = "";
    while (true) {
        nextChar = Code.charAt(Placement);
        if (nextChar != "{" && nextChar != "}" && nextChar != "=" && nextChar != "+" && nextChar != "!" && nextChar != "(" && nextChar != ")" && nextChar != '"' && nextChar != "/") {
            Marks += nextChar;
            Placement++;
        }
        else {
            Placement++;
            break;
        }
    }
    return { Marks: Marks, Placement: Placement };
}
function Splitter(Marks) {
}
function TwoTerms(Placeholder, Code) {
    var holding = "";
    var Placement = Placeholder;
    var nextChar = Code.charAt(Placement);
    if (nextChar == "=") {
        Placement++;
        nextChar = Code.charAt(Placement);
        if (nextChar = "=") {
            holding = "==";
            return { holding: holding, Placement: Placement };
        }
        else {
            holding = "=";
            return { holding: holding, Placement: Placement };
        }
    }
    else if (nextChar = "/") {
        Placement++;
        nextChar = Code.charAt(Placement);
        if (nextChar = "*") {
            while (true) {
                while (nextChar != "*") {
                    Placement++;
                    nextChar = Code.charAt(Placement);
                }
                Placement++;
                nextChar = Code.charAt(Placement);
                if (nextChar = "/") {
                    break;
                }
                Placement--;
            }
        }
        else {
            return ("Error, / must be followed by a * for a valid comment declaration. Error at character: " + nextChar);
        }
    }
    else if (nextChar = "!") {
        Placement++;
        nextChar = Code.charAt(Placement);
        if (nextChar = "=") {
            holding = "!=";
            return { holding: holding, Placement: Placement };
        }
        else {
            return ("Error, ! must be followed by a = for a valid boolean operator. Error at character: " + nextChar);
        }
    }
    else {
    }
}
