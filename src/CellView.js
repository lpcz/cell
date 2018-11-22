import React from 'react';
import './index.css';

class CellView extends React.Component{
    constructor(props){
        super(props);
        this.cell = props.cell;
        this.content = props.content || props.cell.output || "";
    }


    render(){
        return (<div className="square" onClick={() => this.props.handleFocus(this.cell)} contentEditable >{this.content}</div>);
    }
}

export default CellView;