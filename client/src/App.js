import React from 'react';
import stonks from './logo-small.png';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={stonks} className="App-logo" alt="logo" />
        <h1>Fake News Detector</h1>
        <div class="circle"></div>
        <p class="body">
          Fake News / Not Fake News
        </p>
        <p>
          We found this article to be fake news / not fake news...
        </p>
        <p>
          Related Articles:
        </p>
      </header>
    </div>
  );
}

export default App;
