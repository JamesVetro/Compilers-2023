"use strict";
var TSC;
(function (TSC) {
    let rootNode;
    let currNode;
    class CST {
        moveUp() {
            if (currNode.parent !== null) {
                currNode = currNode.parent;
            }
        }
        //Adds nodes to the tree
        addNode(node) {
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
        }
        getCurrentNode() {
            return currNode;
        }
        getRootNode() {
            return rootNode;
        }
        //prints the final cst, adding "-"" for each child
        printCST(node, indent = "") {
            document.getElementById("taOutput").value += "  CST --> | " + indent + "<" + node.value + ">" + "\n";
            for (const child of node.children) {
                this.printCST(child, indent + "-");
            }
        }
    }
    TSC.CST = CST;
})(TSC || (TSC = {}));
