"use strict";
var TSC;
(function (TSC) {
    var rootNode;
    var currNode;
    var AST = /** @class */ (function () {
        function AST() {
        }
        AST.prototype.moveUp = function () {
            if (currNode.parent !== null) {
                currNode = currNode.parent;
            }
        };
        //Adds nodes to the tree
        AST.prototype.addNode = function (node) {
            if (node.parent == null) {
                node.name = "program";
                node.parent = null;
                node.value = "program";
                currNode = node;
                rootNode = node;
            }
            else {
                node.parent = currNode;
                currNode.children.push(node);
            }
            if (node.name != typeof TokenType) {
                currNode = node;
            }
        };
        AST.prototype.getCurrentNode = function () {
            return currNode;
        };
        AST.prototype.getRootNode = function () {
            return rootNode;
        };
        //prints the final ast, adding "-"" for each child
        AST.prototype.printAST = function (node, indent) {
            if (indent === void 0) { indent = ""; }
            document.getElementById("taOutput").value += "  AST --> | " + indent + "<" + node.value + ">" + "\n";
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                this.printAST(child, indent + "-");
            }
        };
        return AST;
    }());
    TSC.AST = AST;
})(TSC || (TSC = {}));
