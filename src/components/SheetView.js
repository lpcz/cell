import React from 'react';
import '../css/index.css';
import CellView from './CellView.js';
import Sheet from '../model/Sheet';
import CodeInput from './CodeInput.js';

class SheetView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            focusedCol: 0,
            focusedRow: 0,
        };
        this.codeInputRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    focusedCell = () => this.props.sheet.getCellByPos(this.state.focusedCol, this.state.focusedRow);

    //called when the focused cell's code is changed by the CodeInput component
    handleSubmit(event, newCode, label) {
        let c = this.focusedCell();
        if (c.id === 0){
            c = this.props.sheet.createNewCell(this.state.focusedCol, this.state.focusedRow, label);
        }
        c.setCode(newCode);
        c.label = label;
        this.setState((state, props) => {
            if (state.focusedCol < props.sheet.colNum){
                return {focusedCol: state.focusedCol + 1}
            }
            else{
                return {focusedCol: 0, focusedRow: state.focusedRow + 1}
            }
        })
        // this.forceUpdate();
    }

    handleFocus(col, row){
        this.setState({
            focusedCol: col,
            focusedRow: row
        });
        //Todo: outline the corresponding col and row label 'cells', as a visual help
    }

    createTable(){
        let cells = [];
        const colNum = this.props.sheet.colNum;
        const rowNum = this.props.sheet.rowNum;
        const zeroCell = this.props.sheet.zeroCell;

        cells.push(<div key="plusSign" className="columnLabel">+</div>) //corner element, (select all, standard functionality)
        for (let i = 0; i < colNum; i++) {
            const letter = String.fromCharCode(65+i);
            cells.push(<div key={letter} className="columnLabel">{letter}</div>);
        }
        for (let i = 0; i < rowNum; i++) {
            cells.push(<div key={i} className="rowLabel">{i}</div>); //row label
            for (let j = 0; j < colNum; j++) {
                const cell = this.props.sheet.getCellByPos(j, i) || zeroCell;
                const isSelected = (i === this.state.focusedRow && j === this.state.focusedCol);
                cells.push(<CellView key={"key" + Sheet.posToCircularId(j, i)} cell={cell} col={j} row={i} selected={isSelected} handleFocus={this.handleFocus}/>);
            }
        }
        let tableStyle = {
            gridTemplateColumns: '2em repeat(' + colNum + ', 1fr)',
            gridTemplateRows: '2em repeat(' + rowNum + ', 1fr)'
        };
        const cellInFocus = this.focusedCell();
        let result = (
            <>
                <div id="table" style={tableStyle}>{cells}</div>
                <CodeInput ref={this.codeInputRef} key={cellInFocus.id} cell={cellInFocus} handleSubmit={this.handleSubmit} rows={5}/>
            </>
        );
        return result;
    }


    render() { return this.createTable()}
}

export default SheetView;