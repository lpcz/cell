import React from 'react';
import Cell from '../model/Cell.js';

class CodeInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            codeText: props.cell.code,
            label: props.cell.label
        };
        this.textAreaRef = React.createRef();

        this.handleChangeCode = this.handleChangeCode.bind(this);
        this.handleChangeLabel = this.handleChangeLabel.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    submit = (e) => {this.props.handleSubmit(e, this.state.codeText, this.state.label)};

    componentDidUpdate(prevProps) {
        console.log("codeinput updated!");
        if (prevProps.cell !== this.props.cell){
            this.textAreaRef.current.focus();
        }
    }

    componentDidMount(){
        this.textAreaRef.current.focus();
    }

    handleKeyPress(event){
        if (event.key === "Enter"){
            event.preventDefault();
            this.submit(event);
        }
    }

    handleChangeCode(event) {
        this.setState({codeText: event.target.value});
    }

    handleChangeLabel(event) {
        this.setState({label: event.target.value});
    }


    render() {
        const st = {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ddd",
            border: "3px solid",
            width: "200px",
            padding: "0px",
            zIndex: "999"
        };
        return (
            <div className="codeInput" style={st}>
            <span className="codeInputTitle">Input for cell #{this.props.cell.id} (pos: {this.props.cell.col}, {this.props.cell.row})</span>
                <div>label</div>
                <input className="codeInputLabel" value={this.state.label} onChange={this.handleChangeLabel}/>
                <div>code</div>
                <textarea ref={this.textAreaRef} id="codeInputTextArea" cols={this.props.cols} rows={this.props.rows}
                            value={this.state.codeText} onChange={this.handleChangeCode} onKeyPress={this.handleKeyPress}/>
                <button onClick={this.submit}>Input</button>
            </div>
        );
    }
}

CodeInput.defaultProps = {
    cell: new Cell(),
    cols: 50,
    rows: 2
};

export default CodeInput;