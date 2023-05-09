"use strict";
var TSC;
(function (TSC) {
    let symbolTable = [];
    class SymTab {
        addNode(node) {
            symbolTable.push(node);
        }
        testType(a, type) {
            for (const name of symbolTable) {
                if (name.name == a && name.type == type) {
                    return true;
                }
            }
            return false;
        }
        testStack(a, scope) {
            for (const name of symbolTable) {
                if (name.name == a && name.Scope == scope) {
                    return name.stackInc;
                }
            }
            return -1;
        }
        testScope(a, scope) {
            for (const name of symbolTable) {
                if (name.name == a && name.Scope <= scope) {
                    return true;
                }
            }
            return false;
        }
        isInit(a, scope) {
            for (const name of symbolTable) {
                if (name.name == a && name.Scope <= scope) {
                    name.init = true;
                    return true;
                }
            }
            return false;
        }
        typeCheck(a, scope) {
            for (const name of symbolTable) {
                if (name.name == a && name.Scope <= scope) {
                    name.used = true;
                    return name.type;
                }
            }
            return "NOPE";
        }
        isUsed(a, scope) {
            for (const name of symbolTable) {
                if (name.name == a && name.Scope <= scope) {
                    name.used = true;
                    return true;
                }
            }
            return false;
        }
        finUsed() {
            for (const name of symbolTable) {
                if (name.used == false) {
                    return name.name;
                }
            }
            return null;
        }
        finInit() {
            for (const name of symbolTable) {
                if (name.init == false) {
                    return name.name;
                }
            }
            return null;
        }
        printSymbolTable() {
            for (const child of symbolTable) {
                document.getElementById("taOutput").value += "  " + child.name + "          " +
                    child.LineNum + "           " + child.Scope + "        " + child.type + "\n";
            }
            symbolTable = [];
        }
    }
    TSC.SymTab = SymTab;
})(TSC || (TSC = {}));
