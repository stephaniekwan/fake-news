import React, {useEffect, useCallback} from "react";
import {Link} from "react-router-dom";
import {useLastLocation} from "react-router-last-location";
import "../styles/Results.css";


/*
 * Params:
 *  - setReanalyze: allows Results.js to communicate that user wants to reanalyze
 *  - article: passes the data from db for the article user currently interacting with
 *      -> the article dict has the following keys:
 *            {domain, rating, reports[], risk_level, timestamp, title, url}
 *            var percentage = article[rating];
 *            var headline = article[title];
 *            var color = article[risk_level];  // style = color
 * TODO: add message if article was pulled from db
 *      if match found in database wtih a timestamp not from today
 *      var timestamp = article['timestamp'];
 *      var today = new Date();
 *    this is for the month year day thing
 *      var todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
 *    this is for time
 *      var todayTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
 *     combine
 *      var todayTimeDate = todayDate + ' ' + todayTime;
 *      if (timestamp === todayTimeDate){
 *          console.log("This article has been already analyzed on (timestamp?). You may request reanalysis.")
 *      }
 *
 */
function Results({setReanalyze, article, lastAnalyzed, fromDB, risky}) {
    //const [articles, setArticles] = useState(0);
    const lastLocation = useLastLocation();

    if (!lastLocation || (lastLocation.pathname !== "/processing" &&
            lastLocation.pathname !== '/report')) {
        window.location.href = "/";
    }

    const days = lastAnalyzed[0];
    const hours = lastAnalyzed[1];
    const mins = lastAnalyzed[2];
    const secs = lastAnalyzed[3];

    // set up message to display if the article was pulled from the database
    var fromDatabase = "";
    if (fromDB) {
        fromDatabase = "The results for this article were pulled from our database \
                        and thus your results may be inaccurate depending on how \
                        long ago the article was analyzed. "
    }

    useEffect(() => {
        setReanalyze(false);
    })
    /*
    useEffect(() => {
        axios.get('/articles').then(response => {
        setArticles(response.data.articles);
        });
    }, []);*/

  /*
    // Default article upon failure
    article = article = {
        url: "test url",
        domain: "test domain",
        rating: "12",
        riskLevel: "1",
        date: "test date",
    };

    if (typeof window !== "undefined" && localStorage.getObj("articles")) {
        const recentArticles = localStorage.getObj("articles") || [];
        const recentArticleIdx = recentArticles.length - 1;

        if (recentArticles.length > 0) {
            article = recentArticles[recentArticleIdx];
        }
    }*/
    var rating = article["rating"];
    var riskLevel;
    var color;

    if (article["risk_level"] === 0) {
        riskLevel = "low";
        color = "green";
    } else if (article["risk_level"] === 1) {
        riskLevel = "moderate";
        color = "yellow";
    } else {
        riskLevel = "high";
        color = "red";
    }

    // set up info to display if domain is risky
    var domainNews;
    console.log(risky)
    if(risky === "risky") {
        domainNews = "fake";
    } else if(risky === "safe") {
        domainNews = "factual";
    }

    const handleClick = useCallback(
        (event) => {
            console.log("setting reanalyze = true");
            setReanalyze(true);
        },
        [setReanalyze]
    );

    return (
        <div className='App'>
            <header className='App-header'>
                <img src='./assets/logo-small2.png' className='App-logo' alt='logo' />
                <h1>Fake News Detector</h1>
                <div style={{backgroundColor: color}} class='circle'></div>
                <p className='body'>
                    Our analysis finds this article to be about {rating} factually accurate. You are at{" "}
                    {riskLevel} risk of being exposed to false information.
                </p>
                <p className='body'>
                    {fromDatabase}
                </p>
                <p className='body'>
                    Your article was last analyzed {days} days, {hours} hours, {mins} minutes,
                    and {secs} seconds ago.
                </p>
                <p className='body'>
                    This domain has been flagged as {risky} due to its history of {domainNews} news.
                </p>
                <p className='body'>Disagree with your results?</p>
                <div className="buttons">
                  <Link to='/processing'>
                      <button onClick={handleClick} class='button'>
                          Reanalyze Article
                          </button>
                  </Link>
                  <Link to='/report'>
                      <button className='button'>
                          Make a Report
                      </button>
                  </Link>
                </div>
            </header>
        </div>
    );
}

export default Results;

/*
<h3>Article: {article['title']}</h3>
{article['rating']}
*/
