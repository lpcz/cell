export default class Cell {
    id;
    label;
    output = "";
    code = "";
    constructor(id, sheet, col, row, label){
        this.id = id;
        this.sheet = sheet;
        this.label = label;
        this.col = col;
        this.row = row;
    }

    //this will set and (re)run the code of the cell
    setCode(newCode){
        this.code = newCode;
        this.run();
    }

    /*
    expr: (ref | function_call | string | binary_op | unary_op | EOF) [expr]
    ref: /[A-Z]+[0-9]+/
    function_call: /[A-Z]+/ ( expr [, expr] )
    string: /".*"/
    number: /[0-9]+/
    binary_operator: '+' | '-' | '*' | '/' | '='
    label_ref: /:[A-Za-z][\w]* /
    id_ref: '#' number
    binary_op: number binary_operator number
    unary_op: unary_operator expr

     */

    //RUN!!!!! - here we interpret the code
    run(){
        this.output = this.code;
        const cellRefs = this.code.match(/[A-Z]{1,3}[0-9]{1,5}/i);
        if (cellRefs) {
            const refCell = this.sheet.getCellByRef(cellRefs[0]);
            if (refCell !== this) { //avoid infinite loop
                this.output = refCell.run();
            }
        }
        return this.output;
    }


}