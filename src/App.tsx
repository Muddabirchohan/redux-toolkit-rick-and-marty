import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {Player} from './features/players/player';
import { Header } from './components/header';

function App() {
  return (
    <div className="App">
      <Player/>
    </div>
  );
}

export default App;
