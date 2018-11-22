import React, { Component } from 'react';
import './App.css';
import Sheet from './Sheet.js';
import SheetView from './SheetView.js';



class App extends Component {
  constructor(props){
      super(props);
      const sheet1 = new Sheet();
      this.state = {sheetInView : sheet1};
  }

  render() {
    return (
      <div className="App">
        <SheetView sheet={this.state.sheetInView}/>
      </div>
    );
  }
}

export default App;
