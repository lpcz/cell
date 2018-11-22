import React from 'react';
import Cell from './Cell.js';

class CodeInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            codeText: props.cell.code,
            label: props.cell.label
        };

        this.handleChangeCode = this.handleChangeCode.bind(this);
        this.handleChangeLabel = this.handleChangeLabel.bind(this);
    }

    handleChangeCode(event) {
        this.setState({codeText: event.target.value});
    }

    handleChangeLabel(event) {
        this.setState({label: event.target.value});
    }

    render() {
        return (
            <>
            <h1 className="codeInputTitle">Input for cell #{this.props.cell.id} (pos: {this.props.cell.col}, {this.props.cell.row})</h1>
                label: <input className="codeInputLabel" value={this.state.label}/><br/>
            code: <textarea name="codeInputTextArea" cols={this.props.cols} rows={this.props.rows} value={this.state.codeText} onChange={this.handleChangeCode}/><br/>
                <button onClick={(e) => this.props.handleSubmit(e, this.state.codeText)}>Input</button>
            </>
        );
    }
}

CodeInput.defaultProps = {
    cell: new Cell(),
    cols: 60,
    rows: 10
};

export default CodeInput;