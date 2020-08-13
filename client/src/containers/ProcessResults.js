import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import axios from 'axios';
import ParseDomain from '../utils/ParseDomain';
import ParseTitle from '../utils/ParseTitle';
import '../styles/ProcessResults.css';
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
    rating: float
    risk_level: int
    timestamp: datetime
*/

/*
 * Params:
 *  - url: gets the url passed from promptpage
 *  - reanalyze: gets the boolean for whether or not user wants to reanalyze (t/f)
 *  - setReanalyze: allows ProcessResults.js to set var back to false once reanalysis done
 *  - setArticle: pass the article to parent component so Results.js can display
 */
function ProcessResults( {url, reanalyze, setReanalyze, setArticle} ) {
    const [modal, setModal] = useState('hide');

    // axios API for cancelling requests
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source()
    
    // used to save other values needed for POST request to db
    var domain = "";
    var title = "";
    var rating = "";
    var riskLevel = 0;
    var timestamp = null;
    var date = new Date();

    useEffect(() => {
        // https://www.npmjs.com/package/article-title  || dunno if this will work for title
        // https://www.npmjs.com/package/article-parser || wait this one is op....
    }, [domain, title, url, date]); 

    url = "https://www.nbcnews.com/news/amp/ncna1236249";
    const onClick = event => {

        var parsedDomain = ParseDomain(url);
        if (parsedDomain !== "Empty url provided") { 
            domain = parsedDomain;
        }
        console.log("parsedDomain: " + parsedDomain);
        console.log("domain: " + domain);
        
        var parsedTitle = ParseTitle(url);
        if (parsedTitle !== "Empty url provided") {
            title = parsedTitle; 
        }
        //why the fuck do you not EXIST REEEEEEEEEEEEEEEEE
        //; -; ill cry
        console.log("parsedTitle: "+ parsedTitle);
        console.log("title: " + title);

        console.log("reanalyze: " + reanalyze);
        var route = '/articles/stonks';

        if (reanalyze) {         
            // reanalyze == true, set back to false
            // call model no matter what
            console.log("setting reanalyze = false")
            setReanalyze(false);
            /*axios.post(route, {
                risk_level
            })*/
        
        } else {
            // try to get article from db
            axios.get(route, {
                cancelToken: source.token
            }).catch(err => {
                    // User wishes to cancel
                    if (axios.isCancel(err)) {
                        console.log('Request canceled', err.message);
                    }
                    // error uncaught by the article router
                    if(err.response) {
                        console.log(err.response);        // body of error
                        console.log(err.response.status); // error number
                    }
                })
                .then(res => {
                    // check for error returned by article router
                    //console.log(res.data);
                    if(res.data.error === null) {
                        // no error; article successfully found
                        console.log("article: " + res.data.article);
                        setArticle(res.data.article); // dictionary
                        //notFound = false;

                    } else if (res.data.error.status === 404) {
                        // article not found in db, make new article
                        console.log(404);
                        //notFound = true;
                        // hard-coded for now, in future use results from model
                        rating = "90%";
                        riskLevel = "green";
                        timestamp = date.toUTCString();

                        axios.post('/articles', {
                            url: url,
                            domain: domain,
                            title: title,
                            rating: rating,
                            risk_level: riskLevel,
                            timestamp: timestamp
                        }, {
                            cancelToken: source.token
                        }).catch(err => {
                            // User wishes to cancel
                            if (axios.isCancel(err)) {
                                console.log('Request canceled', err.message);
                            }
                        }).then(res => {
                            setArticle(res.data);
                            console.log(res.data);
                        });
                    }
                });
        }
    }

    // on click function to cancel the request for analysis
    const handleCancel = event => {
        source.cancel('Operation canceled by user.');
        setModal(false);
    }

    const handleClick = event => setModal('show');
    const handleClose = event => setModal(false);

    // onClick={e => console.log(window.getCurrentUrl()) for get url button
    return (
        <div>
            <h2 className='Header'>Getting your results now!</h2>
            <h4>Your URL is: {url}</h4>
            <button className='CancelButton' onClick={handleClick}>Cancel</button>
            
            <Link to='/results'>
                <button className='ResultsButton'>Proceed to results</button>
            </Link>

            <hr />
            <button onClick={onClick}>Parse</button>

            <Modal show={modal === 'show'} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Cancellation</Modal.Title>  
                </Modal.Header>

                <Modal.Body>
                    <p>URL: {url}</p>
                    <p>Are you sure you want to cancel the analysis?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='outline-secondary' onClick={handleClose}>Close</Button>
                    <Link to='/'>
                        <Button variant='danger' onClick={handleCancel}>Cancel</Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProcessResults