import React from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import '../css/index.css';
import CodeInput from "./CodeInput";


class CellView extends React.Component{
    constructor(props){
        super(props);
        this.divRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.observerCallback = this.observerCallback.bind(this);
        this.textChangeCallback = this.textChangeCallback.bind(this);
        this.textObserver = new MutationObserver(this.textChangeCallback);
    }

    componentDidMount() {
        this.divWidth = this.divRef.current.width;
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

    handleClick(){
        this.props.handleFocus(this.props.col, this.props.row);
    }

    // static didOverflow(element) {
    //     if (!element) return false;
    //     return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    // }

    didSizeChange(element) {
        if (!element) return false;
        console.log("element.clientHeight: " + element.clientHeight);
        return element.clientHeight > 40;
    }

    textChangeCallback(mutationsList, observer){

        for (const mutation of mutationsList) {
            if (mutation.type === 'characterData'){
                console.log('text changed: ' + mutation.target.data.length);
                if (this.didSizeChange(mutation.target.parentElement)){
                    console.log("size changed, pop up the input box");
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
            <Manager>
                <Reference>
                    {({ ref }) => (
                        <div className={className} ref={ref} onClick={this.handleClick}>{this.props.cell.output}</div>
                    )}
                </Reference>
                <Popper placement="bottom-end">
                    {() => {
                        //erre kiakadt
                        // return this.props.selected &&
                        //     <CodeInput/>
                        
                    }}
                </Popper>
            </Manager>

        );
    }
}

export default CellView;