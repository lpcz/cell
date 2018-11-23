import React from 'react';
import './index.css';

class CellView extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    selectedStyle = {backgroundColor: "#ddd"};

    handleClick(){
        this.props.handleFocus(this.props.cell, this.props.col, this.props.row);
    }

    render(){

        return (<div className="square" style={this.props.selected ? this.selectedStyle : null} onClick={this.handleClick}>{this.props.cell.output}</div>);
    }
}

export default CellView;