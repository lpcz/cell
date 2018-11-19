import Cell from 'Cell.js';

export default class Sheet {
    constructor(colNum=12, rowNum=16, src){
        //later we will be able to get a sheet from server
        this.colNum = colNum;
        this.rowNum = rowNum;
        this.size = colNum*rowNum;
        this.cellArray = new Array(colNum*rowNum);

    }

    // with Typescript we wont need this function
    // id
    // label
    // row, col
    getCell(arg1, arg2){
        if (!arg2 &&
            Number.isInteger(arg1) &&
            arg1 >= 0 && arg1 < this.size
        ){
            return this.getCellById(arg1);
        }
        else if (Number.isInteger(arg1) && Number.isInteger(arg2)){
            // TODO...

        }
    }

    getCellById(id){
        if (Number.isInteger(id) &&
            id >= 0 && id < this.size
        ){
            const cell = this.cellArray[id];
            if (cell instanceof Cell) return cell;
            else{
                this.cellArray[id] = new Cell();
                return this.cellArray[id];
            }
        }
    }

    getCellByRef(){}
}