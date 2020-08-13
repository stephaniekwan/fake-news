import React, {useState, useEffect, useCallback} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../styles/Results.css';
import PickColor from '../utils/PickColor';

/*
 * Params:
 *  - setReanalyze: allows Results.js to communicate that user wants to reanalyze
 *  - article: passes the data from db for the article user currently interacting with
 *      -> the article dict has the following keys:
 *            {domain, rating, reports[], risk_level, timestamp, title, url}
 *            var percentage = article[rating];
 *            var headline = article[title];
 *            var color = article[risk_level];  // style = color
 *           and i guess in model we put instead of XX% as like {percentage}
 *            does that work?
 * 
 */
function Results( {setReanalyze, article} ) {
  const [articles, setArticles] = useState(0);

  useEffect(() => {
    axios.get('/articles').then(response => {
      setArticles(response.data.articles);
    });
  }, []);

  // figure out color of circle
  //var dict = PickColor(article['rating']);
  var dict = PickColor('30%');
  var rating = dict['rating'];
  var color = dict['color'];
  var riskLevel = dict['riskLevel'];

  //console.log("rating: " + dict['rating']);
  //console.log("color: " + dict['color']);


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
        <div style={{backgroundColor: color}} class="circle"></div>
        <p class="body">
          Our analysis finds this article to be about {rating}% factually accurate. You are at {riskLevel} risk of being exposed to false information.
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

/*
<h3>Article: {article['title']}</h3>
{article['rating']} 
*/