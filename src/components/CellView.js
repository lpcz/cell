import React from 'react';
import '../css/index.css';
import CodeInput from "./CodeInput";


class CellView extends React.Component{
    constructor(props){
        super(props);
        this.divRef = React.createRef();

        this.state = {
            popupCodeInput: false,
            editingMode: false,
            codeText: props.cell.code
        };
        this.codeText = props.cell.code;
        this.handleClick = this.handleClick.bind(this);
        this.textChangeCallback = this.textChangeCallback.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleCloseCodeInput = this.handleCloseCodeInput.bind(this);

        this.observerCallback = this.observerCallback.bind(this);
        this.textObserver = new MutationObserver(this.textChangeCallback);
    }

    componentDidMount() {
        if (!this.divRef.current) return;

        const rect = this.divRef.current.getBoundingClientRect();

        this.divLeft = rect.left + window.pageXOffset;
        this.divTop = rect.top + window.pageYOffset;

        // Create an observer instance linked to the callback function
        this.observer = new MutationObserver(this.observerCallback);

        // Options for the observer (which mutations to observe)
        const config = {attributes: true, childList: true, subtree: true};

        // Start observing the target node for configured mutations
        this.observer.observe(this.divRef.current, config);


    }

    componentWillUnmount() {
        // Later, you can stop observing
        this.observer.disconnect();
    }

    //Todo: when we click on it, then it becomes contenteditable with the codetext
    handleClick(){
        this.props.changeFocus(this.props.col, this.props.row);
        this.setState({editingMode: true});
    }

    handleKeyPress(event){
        event.stopPropagation();
        if (event.key === "Enter" && this.state.editingMode){
            this.props.handleSubmit(event, this.codeText, this.props.cell.label);
            this.setState({editingMode: false, codeText: this.codeText});
        }
        else if (!this.state.editingMode && event.key === "ArrowLeft"){
            alert("asdasd");
        }
    }

    handleCloseCodeInput(){
        console.log("in handleCloseCodeInput");
        this.setState({popupCodeInput: false, editingMode: false});
    }

    didOverflow(element) {
        if (!element) return false;
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }

    // didSizeChange(element) {
    //     if (!element) return false;
    //     console.log("element.clientHeight: " + element.clientHeight);
    //     return element.clientHeight > 40;
    // }

    textChangeCallback(mutationsList, observer){

        for (const mutation of mutationsList) {
            if (mutation.type === 'characterData'){
                console.log('text changed: ' + mutation.target.data.length);
                this.codeText = mutation.target.data;
                if (this.didOverflow(mutation.target.parentElement)){
                    console.log("size changed, pop up the input box");
                    if (this.state.editingMode && !this.state.popupCodeInput) this.setState({popupCodeInput: true});
                }
            }
        }
    };

    observerCallback(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
                const config = {characterData: true};
                if (mutation.target.firstChild){
                    console.log("this: " + this);
                    this.textObserver.observe(mutation.target.firstChild, config);
                }
            } else if (mutation.type === 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }
        }

    };

    render(){
        let className = "square " + (this.props.selected ? "squareSelected" : "");

        return (
            <>
                {this.state.popupCodeInput && <CodeInput cell={this.props.cell}
                                                         left={this.divLeft} top={this.divTop}
                                                         rows={5}
                                                         closeHandler={this.handleCloseCodeInput}
                                                         handleSubmit={this.props.handleSubmit} codeText={this.codeText}/>}
                <div className={className} ref={this.divRef} onClick={this.handleClick} contentEditable={this.state.editingMode} onKeyDown={this.handleKeyPress}>
                    {this.state.editingMode ? this.props.cell.code : this.props.cell.output}
                </div>
            </>
        );
    }
}

export default CellView;