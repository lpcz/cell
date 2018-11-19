import React from 'react';
import './index.css';
import Cell from './Cell.js';

class Table extends React.Component {
    constructor(props){
        super(props);
        this.colNum = props.cols;
        this.rowNum = props.rows;
    }

    createTable(){
        let cells = [];

        cells.push(<div className="columnLabel">+</div>) //corner element, i will find some use for it (new sheet (+) ? )
        for (let i = 0; i < this.colNum; i++) {
            cells.push(<div className="columnLabel">{String.fromCharCode(65+i)}</div>);
        }
        for (let i = 0; i < this.rowNum; i++) {
            cells.push(<div className="rowLabel">{i}</div>); //row label
            for (let j = 0; j < this.colNum; j++) {
                cells.push(<Cell id={i*this.colNum+j} />);
            }
        }
        let tableStyle = {
            gridTemplateColumns: 'repeat(' + (this.colNum + 1) + ', 1fr)'
        };
        let tableDiv = (<div id="table" style={tableStyle}>{cells}</div>);
        return tableDiv;
    }


    render() { return this.createTable()}
}

export default Table;