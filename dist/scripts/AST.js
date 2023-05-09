"use strict";
var TSC;
(function (TSC) {
    let rootNode;
    let currNode;
    class AST {
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
        //prints the final ast, adding "-"" for each child
        printAST(node, indent = "") {
            document.getElementById("taOutput").value += "  AST --> | " + indent + "<" + node.value + ">" + "\n";
            for (const child of node.children) {
                this.printAST(child, indent + "-");
            }
        }
    }
    TSC.AST = AST;
})(TSC || (TSC = {}));
