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
        <p class="body">
          Our analysis finds this article to be about XX% factually accurate. You are at low risk of being exposed to false information.
        </p>
        <p class="body">
          Disagree with your results?
        </p>
        <button class="button">Renanalyze Article</button>
        <button class="button">Make a Report</button>
        <p>
          Related Articles:
        </p>
      </header>
    </div>
  );
}

export default App;
