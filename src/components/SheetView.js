import React from 'react';
import '../css/index.css';
import CellView from './CellView.js';
import Sheet from '../model/Sheet';

class SheetView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            focusedCol: 0,
            focusedRow: 0,
        };
        
        this.thisRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeFocus = this.changeFocus.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        this.thisRef.current.focus();
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
            if (state.focusedCol < props.sheet.colNum-1){
                return {focusedCol: state.focusedCol + 1}
            }
            else{
                return {focusedCol: 0, focusedRow: state.focusedRow + 1}
            }
        })
    }

    handleKeyPress(event){
        if (event.key === "ArrowRight"){
            this.focusRight();
        }
        else if(event.key === "ArrowLeft"){
            this.focusLeft();
        }
        else if(event.key === "ArrowDown"){
            this.focusDown();
        }
        else if(event.key === "ArrowUp"){
            this.focusUp();
        }
    }

    focusRight(){
        this.setState((state, props) => {
            if (state.focusedCol < props.sheet.colNum - 1){
                return {focusedCol: state.focusedCol + 1}
            }
            else if(state.focusedRow < props.sheet.rowNum - 1){
                return {focusedCol: 0, focusedRow: state.focusedRow + 1}
            }
            else return null;
        })
    }

    focusLeft(){
        this.setState((state, props) => {
            if (state.focusedCol > 0){
                return {focusedCol: state.focusedCol - 1}
            }
            else{
                return {focusedCol: props.sheet.colNum, focusedRow: state.focusedRow - 1}
            }
        })
    }

    focusDown(){
        this.setState((state, props) => {
            if (state.focusedRow < props.sheet.rowNum){
                return {focusedRow: state.focusedRow + 1}
            }
        })
    }

    focusUp(){
        this.setState((state, props) => {
            if (state.focusedRow > 0){
                return {focusedRow: state.focusedRow - 1}
            }
            else{
                return {focusedCol: props.sheet.colNum, focusedRow: state.focusedRow - 1}
            }
        })
    }

    changeFocus(col, row){
        this.setState({
            focusedCol: col,
            focusedRow: row
        });
    }



    createTable(){
        let cells = [];
        const colNum = this.props.sheet.colNum;
        const rowNum = this.props.sheet.rowNum;
        const zeroCell = this.props.sheet.zeroCell;

        cells.push(<div key="plusSign" className="columnLabel">+</div>) //corner element, (select all, standard functionality)
        for (let i = 0; i < colNum; i++) {
            const letter = String.fromCharCode(65+i);
            const classes = i === (this.state.focusedCol) ? "columnLabel columnLabelSelected" : "columnLabel";
            cells.push(<div key={letter} className={classes}>{letter}</div>);
        }
        for (let i = 0; i < rowNum; i++) {
            const classes = i === (this.state.focusedRow) ? "rowLabel rowLabelSelected" : "rowLabel";
            cells.push(<div key={i} className={classes}>{i}</div>); //row label
            for (let j = 0; j < colNum; j++) {
                const cell = this.props.sheet.getCellByPos(j, i) || zeroCell;
                const isSelected = (i === this.state.focusedRow && j === this.state.focusedCol);
                cells.push(<CellView key={"key" + Sheet.posToCircularId(j, i)} cell={cell} col={j} row={i} selected={isSelected} changeFocus={this.changeFocus} handleSubmit={this.handleSubmit}/>);
            }
        }
        let tableStyle = {
            gridTemplateColumns: '2em repeat(' + colNum + ', 1fr)',
            gridTemplateRows: '2em repeat(' + rowNum + ', 1fr)'
        };
        let result = (
            <>
                <div id="table" style={tableStyle} onKeyDown={this.handleKeyPress} tabIndex="0" ref={this.thisRef}>{cells}</div>
            </>
        );
        return result;
    }


    render() { return this.createTable()}
}

export default SheetView;