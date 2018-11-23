import Cell from './Cell.js';

export default class Sheet {
    constructor(colNum=12, rowNum=16, src){
        //later we will be able to get a sheet from server
        this.colNum = colNum;
        this.rowNum = rowNum;
        this.size = colNum*rowNum;
        this.cellMap = new Map();
        this.cellCounter = 1; //0 is for the default Cell
        this.zeroCell = new Cell(0, this, -1, -1, "");
    }

    createNewCell(col, row, label){
        const newCell = new Cell(this.cellCounter++, this, col, row, label);
        this.cellMap.set(Sheet.posToKey(col, row), newCell);
        return newCell;
    }

    getCellByPos(col, row){
        return this.cellMap.get(Sheet.posToKey(col, row)) || this.zeroCell;
    }

    //e.g "A0", "a3", "C7" -> cell obj
    getCellByRef(refStr){
        const pos = Sheet.refStrToPos(refStr);
        console.log(pos);
        const c = this.getCellByPos(pos[0], pos[1]);
        console.log(c);
        return c;
    }


    static refStrToPos(refStr){
        let col, row;
        let matchArr = refStr.match(/([a-zA-Z]+)([0-9]+)/);
        if (matchArr){
            col = Sheet.abcToNum(matchArr[1]);
            row = Number(matchArr[2]);
        }
        return [col, row];
    }

    static posToKey(col, row){
        if (col >= row){
            return col*col + row;
        }
        else{
            return row*(row+1) + (row-col);
        }
    }

    static abcToNum(colStr){
        colStr = colStr.toUpperCase();
        let col = 0;
        for (let i = 0; i < colStr.length; i++) {
            col += (colStr[i].charCodeAt(0) - 65 + 1)*Math.pow(26, (colStr.length - i - 1))
        }
        return col - 1; //we count from zero
    }
}