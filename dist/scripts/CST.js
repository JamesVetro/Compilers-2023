"use strict";
var TSC;
(function (TSC) {
    var rootNode;
    var currNode;
    var CST = /** @class */ (function () {
        function CST() {
        }
        CST.prototype.moveUp = function () {
            if (currNode.parent !== null) {
                currNode = currNode.parent;
            }
        };
        //Adds nodes to the tree
        CST.prototype.addNode = function (node) {
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
        CST.prototype.getCurrentNode = function () {
            return currNode;
        };
        CST.prototype.getRootNode = function () {
            return rootNode;
        };
        //prints the final cst, adding "-"" for each child
        CST.prototype.printCST = function (node, indent) {
            if (indent === void 0) { indent = ""; }
            document.getElementById("taOutput").value += "  CST --> | " + indent + "<" + node.value + ">" + "\n";
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                this.printCST(child, indent + "-");
            }
        };
        return CST;
    }());
    TSC.CST = CST;
})(TSC || (TSC = {}));
