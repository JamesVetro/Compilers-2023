"use strict";
var TSC;
(function (TSC) {
    var rootNode;
    var currentNode;
    var CST = /** @class */ (function () {
        function CST() {
        }
        CST.moveUp = function () {
            if (currentNode.parent !== null) {
                currentNode = currentNode.parent;
            }
        };
        CST.addNode = function (node) {
            if (node.parent == null) {
                node.name = "goal";
                node.parent = null;
                node.value = null;
                currentNode = node;
                rootNode = node;
            }
            else {
                node.parent = currentNode;
                currentNode.children.push(node);
            }
            if (node.name != typeof TokenType) {
                currentNode = node;
            }
        };
        CST.putMessage = function (msg) {
            document.getElementById("taOutput").value += "CST --> | " + msg + "\n";
        };
        CST.getCurrentNode = function () {
            return currentNode;
        };
        CST.getRootNode = function () {
            return rootNode;
        };
        CST.printCST = function (node, indent) {
            if (indent === void 0) { indent = ""; }
            this.putMessage(indent + "<" + node.value + ">");
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                this.printCST(child, indent + "--");
            }
        };
        return CST;
    }());
    TSC.CST = CST;
})(TSC || (TSC = {}));
