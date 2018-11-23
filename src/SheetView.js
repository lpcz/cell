import React from 'react';
import './index.css';
import CellView from './CellView.js';
import Sheet from './Sheet';
import CodeInput from './CodeInput.js';
import Cell from './Cell.js';

class SheetView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cellInFocus: props.sheet.createNewCell(0, 0),
            focusedCol: 0,
            focusedRow: 0,
            sheet: props.sheet
        };
        this.codeInputRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    //called when the focused cell's code is changed by a CodeInput component
    handleSubmit(event, newCode, label) {
        console.log(this);
        let c = this.state.cellInFocus;
        if (c.id === 0){
            c = this.state.sheet.createNewCell(this.state.focusedCol, this.state.focusedRow, label);
        }
        c.setCode(newCode);
        c.label = label;
        this.setState({sheet: this.state.sheet});
    }

    handleFocus(newCellInFocus, col, row){
        this.setState({
            cellInFocus: newCellInFocus,
            focusedCol: col,
            focusedRow: row
        })
        this.codeInputRef.current.focus();
        //Todo: outline the corresponding col and row label 'cells', as a visual help
    }

    createTable(){
        let cells = [];
        const colNum = this.state.sheet.colNum;
        const rowNum = this.state.sheet.rowNum;
        const zeroCell = this.state.sheet.zeroCell;

        cells.push(<div className="columnLabel">+</div>) //corner element, (select all, standard functionality)
        for (let i = 0; i < colNum; i++) {
            cells.push(<div className="columnLabel">{String.fromCharCode(65+i)}</div>);
        }
        for (let i = 0; i < rowNum; i++) {
            cells.push(<div className="rowLabel">{i}</div>); //row label
            for (let j = 0; j < colNum; j++) {
                const cell = this.state.sheet.getCellByPos(j, i) || zeroCell;
                const isSelected = (i === this.state.focusedRow && j === this.state.focusedCol);
                cells.push(<CellView key={Sheet.posToKey(j, i)} cell={cell} col={j} row={i} selected={isSelected} handleFocus={this.handleFocus}/>);
            }
        }
        let tableStyle = {
            gridTemplateColumns: 'repeat(' + (colNum + 1) + ', 1fr)'
        };
        let result = (
            <>
                <CodeInput ref={this.codeInputRef} key={this.state.cellInFocus.id} cell={this.state.cellInFocus} handleSubmit={this.handleSubmit}/>
                <div id="table" style={tableStyle}>{cells}</div>
            </>
        );
        return result;
    }


    render() { return this.createTable()}
}

export default SheetView;