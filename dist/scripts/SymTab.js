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
        /*
        //Adds nodes to the tree
        public addNode(node: SymTabNode) {
            if (node.parent == null) {
                node.name = "program";
                node.parent = null;
                node.value = "program";
                currNode = node;
                rootNode = node;
            }else{
                node.parent = currNode;
                currNode.children.push(node);
            }
            if (node.name != typeof TokenType){
                currNode = node;
            }
        }
        */
        //prints the final ast, adding "-"" for each child
        SymTab.prototype.printSymbolTable = function () {
            for (var _i = 0, symbolTable_1 = symbolTable; _i < symbolTable_1.length; _i++) {
                var child = symbolTable_1[_i];
                document.getElementById("taOutput").value += "  " + child.name + "          " +
                    child.LineNum + "           " + child.Scope + "        " + child.type + "\n";
            }
        };
        return SymTab;
    }());
    TSC.SymTab = SymTab;
})(TSC || (TSC = {}));
