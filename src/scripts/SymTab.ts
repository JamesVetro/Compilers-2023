module TSC {
    interface SymTabNode{
        name: string | TokenType | null;
        type: string;
        Scope: number;
        LineNum: string | number;
    }

    let symbolTable: SymTabNode[] = [];

    export class SymTab{

        public addNode(node: SymTabNode)
        {
            symbolTable.push(node);
        }

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
        public printSymbolTable(){
            for (const child of symbolTable) {
                (<HTMLInputElement>document.getElementById("taOutput")).value += "  "+child.name + "          " + 
                child.LineNum + "           " + child.Scope + "        " + child.type + "\n";
            }
        }
    }
}