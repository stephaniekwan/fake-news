import React, {useState, useEffect, useCallback} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../styles/Results.css';

/*
 * Params:
 *  - setReanalyze: allows Results.js to communicate that user wants to reanalyze
 *  - article: passes the data from db for the article user currently interacting with
 */
function Results( {setReanalyze, article} ) {
  const [articles, setArticles] = useState(0);
  useEffect(() => {
    axios.get('/articles').then(response => {
      setArticles(response.data.articles);
    });
  }, []);

  // if user wants to reanalyze, change state of parent component to reflect that
  const handleClick = useCallback(event => {
    console.log("setting reanalyze = true");
    setReanalyze(true);
  }, [setReanalyze]);

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
        <Link to='/processing'>
          <button onClick={handleClick} class="button">Renanalyze Article</button>
        </Link>
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
        <p>{ articles[0] ? articles[0].domain : null}</p>
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Related Article #2
        </a>
        <p>{ articles[0] ? articles[0].domain : null}</p>

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
