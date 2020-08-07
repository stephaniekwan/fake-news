import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
// eslint-disable-next-line
import axios from 'axios';
import ParseDomain from './ParseDomain';
import ParseTitle from './ParseTitle';
import psl from 'psl';
import '../styles/ProcessResults.css';
// eslint-disable-next-line
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

function ProcessResults( {url} ) {
    const [article, setArticle] = useState(null);
    const [modal, setModal] = useState('hide');
    
    // used to save other values needed for POST request to db
    // eslint-disable-next-line
    const [domain, setDomain] = useState("");
    // eslint-disable-next-line
    const [title, setTitle] = useState("");
    
    const [rating, setRating] = useState("");   // i think this was percent
    const [riskLevel, setRiskLevel] = useState(0);
    const [timestamp, setTimestamp] = useState(null);

    var date = new Date();

    /*
    const getArticle = async (url) => {
        try {
            const article = await extract(url);
            return article;
        } catch (err) {
            console.trace(err);
        }
    };*/

    useEffect(() => {
        // parse article for required fields
        //setDomain(psl.get(url));

        /*
        // send to db, maybe move this to onclick idk
        axios.post('/articles', {
            url: url,
            domain: domain,
            title: title,
            rating: rating,
            risk_level: risk_level,
            timestamp: timestamp
        });*/
        
        // https://www.npmjs.com/package/article-title  || dunno if this will work for title
        // https://www.npmjs.com/package/article-parser || wait this one is op....
    }, [setDomain, setTitle, article, url, domain, title, date]); 

    const onClick = event => {

        var parsedDomain = ParseDomain({url});
        if (parsedDomain !== "Empty url provided") { 
            setDomain(parsedDomain); // change?
        }
        console.log("parsedDomain: " + parsedDomain);
        console.log("parsedDomain['host]: " + parsedDomain['host']);
        console.log("domain: " + domain);
        
        var parsedTitle = ParseTitle(url);
        if (parsedTitle !== "Empty url provided") {
            setTitle(parsedTitle); 
        }
        console.log("parsedTitle: "+ parsedTitle);
        console.log("title" + title);

        // model called here using url

        // set rating and risk_level using model results
        setRating("90%");
        setRiskLevel("green");
        setTimestamp(date.toUTCString());

        /*
        axios.post('/articles', {
            url: url,
            domain: domain,
            title: title,
            rating: rating,
            risk_level: risk_level,
            timestamp: timestamp
        }).then(res => {
            setArticle(res.data);
            console.log(res.data);
        });*/
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
                        <Button variant='danger' onClick={handleClose}>Cancel</Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProcessResults