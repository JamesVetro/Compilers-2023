module TSC {
    interface CSTNode{
        name: string | TokenType | null;
        parent: CSTNode | null;
        value: string | number |null;
        children: CSTNode[];
    }
    let rootNode: CSTNode;
    let currentNode: CSTNode;
    export class CST{
        public moveUp() {
            if (currentNode.parent !== null){
                currentNode = currentNode.parent;
              }
        }
        //Adds nodes to the tree
        public addNode(node: CSTNode) {
            if (node.parent == null) {
                node.name = "goal";
                node.parent = null;
                node.value = "program";
                currentNode = node;
                rootNode = node;
            }else{
                node.parent = currentNode;
                currentNode.children.push(node);
            }
            if (node.name != typeof TokenType){
                currentNode = node;
            }
        }

        public getCurrentNode(){
            return currentNode;
        }

        public getRootNode(){
            return rootNode;
        }
//prints the final cst, adding "-"" for each child
        public printCST(node: CSTNode, indent = ""){
            (<HTMLInputElement>document.getElementById("taOutput")).value += "  CST --> | " + indent + "<" + node.value + ">" + "\n";
            for (const child of node.children) {
                this.printCST(child, indent + "-");
            }
        }
    }
}