import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import stonks from './logo-small.png';
import './App.css';


function App() {
  const [articles, setArticles] = useState(0);
  useEffect(() => {
    axios.get('/articles').then(response => {
      setArticles(response.data.articles);
    });
  }, []);

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
  <p>{ articles[0] ? articles[0].domain : null}</p>
        </a>
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Related Article #2
        </a>
        <p>{ articles[2] ? articles[2].domain : null}</p>
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
