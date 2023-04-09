"use strict";
var TSC;
(function (TSC) {
    var symbolTable = [];
    var SymTab = /** @class */ (function () {
        function SymTab() {
        }
        SymTab.prototype.addNode = function (node) {
            symbolTable.push(node);
        };
        SymTab.prototype.testType = function (a, type) {
            for (var _i = 0, symbolTable_1 = symbolTable; _i < symbolTable_1.length; _i++) {
                var name_1 = symbolTable_1[_i];
                if (name_1.name == a && name_1.type == type) {
                    return true;
                }
            }
            return false;
        };
        SymTab.prototype.testScope = function (a, scope) {
            for (var _i = 0, symbolTable_2 = symbolTable; _i < symbolTable_2.length; _i++) {
                var name_2 = symbolTable_2[_i];
                if (name_2.name == a && name_2.Scope == scope) {
                    return true;
                }
            }
            return false;
        };
        SymTab.prototype.isInit = function (a, scope) {
            for (var _i = 0, symbolTable_3 = symbolTable; _i < symbolTable_3.length; _i++) {
                var name_3 = symbolTable_3[_i];
                if (name_3.name == a && name_3.Scope == scope) {
                    name_3.init = true;
                    return true;
                }
            }
            return false;
        };
        SymTab.prototype.typeCheck = function (a, scope) {
            for (var _i = 0, symbolTable_4 = symbolTable; _i < symbolTable_4.length; _i++) {
                var name_4 = symbolTable_4[_i];
                if (name_4.name == a && name_4.Scope == scope) {
                    name_4.used = true;
                    return name_4.type;
                }
            }
            return "NOPE";
        };
        SymTab.prototype.isUsed = function (a, scope) {
            for (var _i = 0, symbolTable_5 = symbolTable; _i < symbolTable_5.length; _i++) {
                var name_5 = symbolTable_5[_i];
                if (name_5.name == a && name_5.Scope == scope) {
                    name_5.used = true;
                    return true;
                }
            }
            return false;
        };
        SymTab.prototype.finUsed = function () {
            for (var _i = 0, symbolTable_6 = symbolTable; _i < symbolTable_6.length; _i++) {
                var name_6 = symbolTable_6[_i];
                if (name_6.used == false) {
                    return name_6.name;
                }
            }
            return null;
        };
        SymTab.prototype.finInit = function () {
            for (var _i = 0, symbolTable_7 = symbolTable; _i < symbolTable_7.length; _i++) {
                var name_7 = symbolTable_7[_i];
                if (name_7.init == false) {
                    return name_7.name;
                }
            }
            return null;
        };
        SymTab.prototype.printSymbolTable = function () {
            for (var _i = 0, symbolTable_8 = symbolTable; _i < symbolTable_8.length; _i++) {
                var child = symbolTable_8[_i];
                document.getElementById("taOutput").value += "  " + child.name + "          " +
                    child.LineNum + "           " + child.Scope + "        " + child.type + "\n";
            }
            symbolTable = [];
        };
        return SymTab;
    }());
    TSC.SymTab = SymTab;
})(TSC || (TSC = {}));
