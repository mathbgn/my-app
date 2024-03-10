import React from 'react';
import TrendingCoin from './TrendingCoin'; // Ensure you have this component
import './App.css'; // Your CSS file for App styling

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Crypto Dashboard</h1>
      </header>
      <TrendingCoin />
    </div>
  );
}

export default App;
