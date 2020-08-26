import React, {useState} from "react";
import {useLastLocation} from "react-router-last-location";
import {Modal, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import ParseDomain from "../utils/ParseDomain";
import "../styles/ProcessResults.css";
//import getTitleAtUrl from 'get-title-at-url';
//var getTitleAtUrl = require('get-title-at-url');
//import * as chrome from "sinon-chrome"
//import extract from 'article-parser';

// TODO IN THIS FILE
/*
 * 1. get the article url
 * 2. parse article info for fields needed to store in db
 * 3. POST request to /articles
 * 4. make it redirect to the results page once the results come back
 * 5. hopefully calling the model will happen in this file, would happen before step 3
 *      - prob make request to the model
 * 6. Allow for renanalysis
 *
 * for reference:  (fields to store an article)
 *  url: str
    domain: str
    title: str
    rating: string (% true)
    risk_level: int (0 = low, 1 = moderate, 2 = high)
    timestamp: datetime
*/

/*
 * Params:
 *  - url: gets the url passed from promptpage
 *  - reanalyze: gets the boolean for whether or not user wants to reanalyze (t/f)
 *  - setReanalyze: allows ProcessResults.js to set var back to false once reanalysis done
 *  - setArticle: pass the article to parent component so Results.js can display
 */
function ProcessResults({url, reanalyze, setReanalyze, setArticle, setLastAnalyzed}) {
    const [modal, setModal] = useState("hide");
    const lastLocation = useLastLocation();

    if (!lastLocation || lastLocation.pathname !== "/") {
        window.location.href = "/";
    }
    // axios API for cancelling requests
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // used to save other values needed for POST request to db
    var domain = "";
    var rating = "";
    var riskLevel = 0;
    var date = new Date();

    const onClick = (event) => {
        var parsedDomain = ParseDomain(url);
        if (parsedDomain !== "Empty url provided") {
            domain = parsedDomain;
        }
        console.log("parsedDomain: " + parsedDomain);
        console.log("domain: " + domain);

        console.log("reanalyze: " + reanalyze);

        axios
            .get("/model", {
                params: {
                    url: url,
                    domain: domain,
                    reanalyze: reanalyze,
                },
                cancelToken: source.token,
            })
            .catch((err) => {
                // User wishes to cancel
                if (axios.isCancel(err)) {
                    console.log("Request canceled", err.message);
                }
            })
            .then((res) => {
                if (reanalyze) {
                    console.log("setting reanalyze = false");
                    setReanalyze(false);
                }
                console.log(res.data);
                setArticle(res.data.article);
                setLastAnalyzed(res.data.last_analyzed);

                // set constants for localstorage
                rating = res.data.article.rating;
                riskLevel = res.data.article.risk_level;
                date = date.toUTCString();
            });

        // Add article to local storage
        if (typeof window !== "undefined") {
            let storedArticles = localStorage.getObj("articles") || [];
            storedArticles.push({
                url,
                domain,
                rating,
                riskLevel,
                date,
            });
            localStorage.setObj("articles", storedArticles);
        }
    };

    // on click function to cancel the request for analysis
    const handleCancel = (event) => {
        source.cancel("Operation canceled by user.");
        setModal(false);
    };

    const handleClick = (event) => setModal("show");
    const handleClose = (event) => setModal(false);

    // onClick={e => console.log(window.getCurrentUrl()) for get url button
    return (
        <div>
            {!lastLocation || lastLocation.pathname !== "/" ? null : (
                <div>
                    <h2 className='Header'>Getting your results now!</h2>
                    <h4>Your URL is: {url}</h4>

                    <button onClick={onClick}>Parse</button>

                    <hr />

                    <button className='CancelButton' onClick={handleClick}>
                        Cancel
                    </button>

                    <Link to='/results'>
                        <button className='ResultsButton'>Proceed to results</button>
                    </Link>

                    <Modal show={modal === "show"} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Cancellation</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>URL: {url}</p>
                            <p>Are you sure you want to cancel the analysis?</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant='outline-secondary' onClick={handleClose}>
                                Close
                            </Button>
                            <Link to='/'>
                                <Button variant='danger' onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Link>
                        </Modal.Footer>
                    </Modal>
                    <div />
                </div>
            )}
        </div>
    );
}

// Override default storage methods: setItem(), getItem
Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key));
};

export default ProcessResults;
