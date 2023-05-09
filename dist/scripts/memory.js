"use strict";
var TSC;
(function (TSC) {
    class Memory {
        constructor() {
            this.hexArray = [];
            // Size of addressable memory.
            this.memSize = 0x10000;
        }
        // Initializes the array, and then fills with 0x00.
        initMem() {
            this.hexArray = new Array(this.memSize);
            for (let i = 0; i < this.memSize; i++) {
                this.hexArray[i] = "00";
            }
        }
        hexLog(num, len) {
            let hex = num.toUpperCase();
            return hex.padStart(len, '0');
        }
        // Displays content of memory (0x00 to 0x14)
        displayMemory() {
            document.getElementById("taOutput2").value += "\n Displaying Memory for Program. \n";
            for (let i = 0x00; i <= this.memSize; i++) {
                document.getElementById("taOutput2").value += this.hexArray[i] + " ";
            }
            document.getElementById("taOutput2").value += "\n Memory Dump Complete. \n \n";
        }
        // Getter for the Memory
        getMemoryArr() {
            return this.hexArray;
        }
        // Setter for Memory array
        setMemoryArr(hexArray) {
            this.hexArray = hexArray;
        }
        //Write the contents of the MDR to memory
        write(i, data) {
            this.hexArray[i] = data;
            i++;
            return i;
        }
        // Resets all values in the Memory and MAR+MDR with 0x00
        reset() {
            let memArr = this.getMemoryArr();
            for (let i = 0x00; i < memArr.length; i++) {
                memArr[i] = "00";
            }
            this.setMemoryArr(memArr);
        }
        replaceT(last) {
            let memArr = this.getMemoryArr();
            for (let i = 0x00; i < memArr.length; i++) {
                let x = memArr[i];
                if (x.charAt(1) == "T") {
                    last = last + parseInt(x.charAt(2));
                    this.write(i, last.toString());
                }
            }
        }
    }
    TSC.Memory = Memory;
})(TSC || (TSC = {}));
