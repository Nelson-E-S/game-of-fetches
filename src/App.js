import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameOfThrones from './component/GameOfThrones';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GameOfThrones />
      </header>
    </div>
  );
}

export default App;
