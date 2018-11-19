import React from 'react';
import './index.css';

class Cell extends React.Component{
    constructor(props){
        super(props);
        this.id = props.id;
        this.content = props.content;
    }
    handleClick(){

    }

    render(){
        return (<div className="square" onClick={this.handleClick} contentEditable >{this.content}</div>);
    }
}

export default Cell;