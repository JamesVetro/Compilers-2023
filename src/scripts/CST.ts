module TSC {
    interface CSTNode{
        name: string | TokenType | null;
        parent: CSTNode | null;
        value: string | number | null;
        children: CSTNode[];
    }
    let rootNode: CSTNode;
    let currNode: CSTNode;
    export class CST{
        public moveUp() {
            if (currNode.parent !== null){
                currNode = currNode.parent;
              }
        }
        //Adds nodes to the tree
        public addNode(node: CSTNode) {
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
//prints the final cst, adding "-"" for each child
        public printCST(node: CSTNode, indent = ""){
            (<HTMLInputElement>document.getElementById("taOutput")).value += "  CST --> | " + indent + "<" + node.value + ">" + "\n";
            for (const child of node.children) {
                this.printCST(child, indent + "-");
            }
        }
    }
}