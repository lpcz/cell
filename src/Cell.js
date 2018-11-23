export default class Cell {
    id;
    label;
    output = "";
    code = "";
    constructor(id, col, row, label){
        this.id = id;
        this.label = label;
        this.col = col;
        this.row = row;
    }

    //this will set and (re)run the code of the cell
    setCode(newCode){
        this.code = newCode;
        this.run();
    }

    //RUN!!!!! - here we interpret the code
    run(){
        this.output = this.code;
    }


}