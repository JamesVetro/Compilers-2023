module TSC {
    interface SymTabNode{
        name: string | TokenType | null;
        type: string;
        Scope: number;
        LineNum: string | number;
        init:boolean;
        used:boolean;
    }

    let symbolTable: SymTabNode[] = [];

    export class SymTab{

        public addNode(node: SymTabNode)
        {
            symbolTable.push(node);
        }

        public testType (a: string, type: string){
            for (const name of symbolTable){
                if (name.name == a && name.type == type){
                    return true;
                }
            }
            return false;
        }
        public testScope (a: string, scope: number){
            for (const name of symbolTable){
                if (name.name == a && name.Scope <= scope){
                    return true;
                }
            }
            return false;
        }

        public isInit (a:string,scope:number):boolean{
            for (const name of symbolTable){
                if (name.name == a && name.Scope <= scope){
                    name.init = true;
                    return true
                }
            }
            return false;
        }

        public typeCheck (a:string,scope:number):string{
            for (const name of symbolTable){
                if (name.name == a && name.Scope <= scope){
                    name.used = true;
                    return name.type;
                }
            }
            return "NOPE";
        }

        public isUsed(a:string,scope:number):boolean{
            for (const name of symbolTable){
                if (name.name == a && name.Scope <= scope){
                    name.used = true;
                    return true;
                }
            }
            return false;
        }
        public finUsed(){
            for (const name of symbolTable){
                if (name.used == false){
                    return name.name;
                }
            }
            return null
        }

        public finInit(){
            for (const name of symbolTable){
                if (name.init == false){
                    return name.name;
                }
            }
            return null
        }


        public printSymbolTable(){
            for (const child of symbolTable) {
                (<HTMLInputElement>document.getElementById("taOutput")).value += "  "+child.name + "          " + 
                child.LineNum + "           " + child.Scope + "        " + child.type + "\n";
            }
            symbolTable = [];
        }
    }
}