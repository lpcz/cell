export default class Cell {
    id;
    label;
    content = "";
    code = "";
    constructor(id, label){
        this.id = id;
        this.label = label;
    }
}