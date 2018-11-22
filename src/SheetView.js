import React from 'react';
import './index.css';
import CellView from './CellView.js';
import Sheet from './Sheet';
import CodeInput from './CodeInput.js';
import Cell from './Cell.js';

class SheetView extends React.Component {
    constructor(props){
        super(props);
        this.sheet = props.sheet;
        this.state = {cellInFocus: this.sheet.createNewCell(0, 0)};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    //called when the focused cell's code is changed by a CodeInput component
    handleSubmit(event, newCode, label) {
        let c = this.state.cellInFocus;
        if (c.id === 0){
            c = this.sheet.createNewCell(c.col, c.row, label);
        }
        alert('input: ' + newCode);
        c.setCode(newCode);
        this.setState({cellInFocus: c});
        // event.preventDefault();
    }

    handleFocus(newCellInFocus){
        this.setState({cellInFocus: newCellInFocus})
        //Todo: outline the corresponding col and row label 'cells', as a visual help
    }

    createTable(){
        let cells = [];
        const colNum = this.sheet.colNum;
        const rowNum = this.sheet.rowNum;
        const zeroCell = new Cell(0);

        cells.push(<div className="columnLabel">+</div>) //corner element, (select all, standard functionality)
        for (let i = 0; i < colNum; i++) {
            cells.push(<div className="columnLabel">{String.fromCharCode(65+i)}</div>);
        }
        for (let i = 0; i < rowNum; i++) {
            cells.push(<div className="rowLabel">{i}</div>); //row label
            for (let j = 0; j < colNum; j++) {
                const cell = this.sheet.getCellByPos(j, i) || zeroCell;
                cells.push(<CellView key={Sheet.posToKey(j, i)} cell={cell} handleFocus={this.handleFocus}/>);
            }
        }
        let tableStyle = {
            gridTemplateColumns: 'repeat(' + (colNum + 1) + ', 1fr)'
        };
        let result = (
            <>
                <div id="table" style={tableStyle}>{cells}</div>
                <CodeInput cell={this.state.cellInFocus} handleSubmit={this.handleSubmit}/>
            </>
        );
        return result;
    }


    render() { return this.createTable()}
}

export default SheetView;