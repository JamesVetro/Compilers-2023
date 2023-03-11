"use strict";
var TSC;
(function (TSC) {
    var rootNode;
    var currentNode;
    var CST = /** @class */ (function () {
        function CST() {
        }
        CST.prototype.moveUp = function () {
            if (currentNode.parent !== null) {
                currentNode = currentNode.parent;
            }
        };
        CST.prototype.addNode = function (node) {
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
        CST.prototype.getCurrentNode = function () {
            return currentNode;
        };
        CST.prototype.getRootNode = function () {
            return rootNode;
        };
        CST.prototype.printCST = function (node, indent) {
            if (indent === void 0) { indent = ""; }
            document.getElementById("taOutput").value += "CST --> | " + indent + "<" + node.value + ">" + "\n";
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var child = _a[_i];
                this.printCST(child, indent + "-");
            }
        };
        return CST;
    }());
    TSC.CST = CST;
})(TSC || (TSC = {}));
