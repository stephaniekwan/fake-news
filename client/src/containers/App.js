import React from 'react';
import stonks from '../assets/logo-small.png';
import '../styles/App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={stonks} className="App-logo" alt="logo" />
        <h1>Fake News Detector</h1>
        <div class="circle"></div>
        <p class="body">
          Our analysis finds this article to be about XX% factually accurate. You are at low risk of being exposed to false information.
        </p>
        <p class="body">
          Disagree with your results?
        </p>
        <button class="button">Renanalyze Article</button>
        <button class="button">Make a Report</button>
        <p>
          Related Low Risk Articles:
        </p>
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Related Article #1
        </a>
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Related Article #2
        </a>
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Related Article #3
        </a>
      </header>
    </div>
  );
}

export default App;
