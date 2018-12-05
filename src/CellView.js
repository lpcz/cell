import React from 'react';
import './index.css';

let baseStyle = {overflow: "hidden"};
let selectedStyle = {backgroundColor: "#ddd"};

class CellView extends React.Component{
    constructor(props){
        super(props);
        this.divRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.style1 = Object.assign({}, baseStyle);
    }

    componentDidMount() {
        // Create an observer instance linked to the callback function
        this.observer = new MutationObserver(callback);

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

    render(){
        console.log(this.style1);
        let style = Object.create(null);
        Object.assign(style, this.style1);
        if (this.props.selected){
            Object.assign(style, {backgroundColor: "#ddd"});
        }
        return (<div contentEditable className="square" ref={this.divRef} style={style} onClick={this.handleClick}>{this.props.cell.output}</div>);
    }
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

// Callback function to execute when mutations are observed
const textChangeCallback = function(mutationsList, observer){
    for (const mutation of mutationsList) {
        if (mutation.type === 'characterData'){
            console.log('text changed: ' + mutation.target.data.length);
            if (isOverflown(mutation.target.parentElement)){
                console.log("Overflown!!!");
            }
        }
    }
};
const textObserver = new MutationObserver(textChangeCallback);

const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
            const config = {characterData: true};
            if (mutation.target.firstChild){
                textObserver.observe(mutation.target.firstChild, config);
            }
        } else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }

};

export default CellView;