import React, { Component } from 'react';
import StarMatch from './Game_Hooks/Game.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <StarMatch />
      </div>
    );
  }
}

export default App;
