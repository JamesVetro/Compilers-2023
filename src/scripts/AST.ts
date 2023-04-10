module TSC {
    interface ASTNode{
        name: string | TokenType | null;
        parent: ASTNode | null;
        value: string | number | null;
        children: ASTNode[];
    }
    let rootNode: ASTNode;
    let currNode: ASTNode;
    export class AST{
        public moveUp() {
            if (currNode.parent !== null){
                currNode = currNode.parent;
              }
        }
        //Adds nodes to the tree
        public addNode(node: ASTNode) {
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

        public getCurrentNode(){
            return currNode;
        }

        public getRootNode(){
            return rootNode;
        }
//prints the final ast, adding "-"" for each child
        public printAST(node: ASTNode, indent = ""){
            (<HTMLInputElement>document.getElementById("taOutput")).value += "  AST --> | " + indent + "<" + node.value + ">" + "\n";
            for (const child of node.children) {
                this.printAST(child, indent + "-");
            }
        }
    }
}