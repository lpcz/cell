import React, { Component } from 'react';
import './App.css';
import Sheet from './Sheet.js'
import SheetView from './SheetView.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <SheetView sheet={sheet1}/>
      </div>
    );
  }
}

export default App;
