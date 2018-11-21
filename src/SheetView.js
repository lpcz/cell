import React from 'react';
import './index.css';
import CellView from './CellView.js';
import Sheet from './Sheet';

class SheetView extends React.Component {
    constructor(props){
        super(props);
        this.sheet = props.sheet;
    }

    createTable(){
        let cells = [];
        const colNum = this.sheet.colNum;
        const rowNum = this.sheet.rowNum;

        cells.push(<div className="columnLabel">+</div>) //corner element, i will find some use for it (new sheet (+) ? )
        for (let i = 0; i < colNum; i++) {
            cells.push(<div className="columnLabel">{String.fromCharCode(65+i)}</div>);
        }
        for (let i = 0; i < rowNum; i++) {
            cells.push(<div className="rowLabel">{i}</div>); //row label
            for (let j = 0; j < colNum; j++) {
                const cell = this.sheet.getCellByPos(j, i) || {content: ""};
                cells.push(<CellView key={Sheet.posToKey(j, i)} content={cell.content}/>);
            }
        }
        let tableStyle = {
            gridTemplateColumns: 'repeat(' + (colNum + 1) + ', 1fr)'
        };
        let tableDiv = (<div id="table" style={tableStyle}>{cells}</div>);
        return tableDiv;
    }


    render() { return this.createTable()}
}

export default SheetView;