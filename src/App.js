import React, { Component } from 'react';
import './App.css';
import Sheet from './Sheet.js'
import SheetView from './SheetView.js'


class App extends Component {
  constructor(props){
      super(props);
      this.sheet1 = new Sheet();
  }

  render() {
    return (
      <div className="App">
        <SheetView sheet={this.sheet1}/>
      </div>
    );
  }
}

export default App;
