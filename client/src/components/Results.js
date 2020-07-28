import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/Results.css';


function Results() {
  return (
    <div className="App">
      <header className="App-header">
        <img src='./assets/logo-small.png' className="App-logo" alt="logo" />
        <h1>Fake News Detector</h1>
        <div class="circle"></div>
        <p class="body">
          Our analysis finds this article to be about XX% factually accurate. You are at low risk of being exposed to false information.
        </p>
        <p class="body">
          Disagree with your results?
        </p>
        <button class="button">Renanalyze Article</button>
        <Link to='/report'>
          <button class="button">Make a Report</button>
        </Link>
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

export default Results;
