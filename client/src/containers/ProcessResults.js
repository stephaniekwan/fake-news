import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
// eslint-disable-next-line
import axios from 'axios';
import psl from 'psl';
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

function ProcessResults() {
    const [article, setArticle] = useState(null);

    // this is some random ass article i found
    // eslint-disable-next-line
    const [url, setUrl] = useState("https://news.cornellcollege.edu/2020/08/cornell-college-included-new-york-times-article/");
    const [modal, setModal] = useState('hide');
    
    // used to save other values needed for POST request to db
    // eslint-disable-next-line
    const [domain, setDomain] = useState("");
    // eslint-disable-next-line
    const [title, setTitle] = useState("");
    
    /* hard code these for now
    const [rating, setRating] = useState("");   // i think this was percent
    const [riskLevel, setRiskLevel] = useState(0);
    const [timestamp, setTimestamp] = useState(null); // datetime?
    */

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
        // parse article, hard coded with article url
        /*
        setArticle(getArticle(url));
        setDomain(article['source']);
        setTitle(article['title']);

        console.log(url);
        console.log(domain);
        console.log(title);
        */
        //setUrl('www.google.com');
        setDomain(psl.get('https://news.cornellcollege.edu/2020/08/cornell-college-included-new-york-times-article/'));
        console.log(psl.get('https://news.cornellcollege.edu/2020/08/cornell-college-included-new-york-times-article/'));
        setTitle('test');

        //window.getCurrentTabUrl(url => {
        //    console.log(url);
        //})
        //console.log(getCurrentUrl())
        //setURL(window.getCurrentUrl());
        //console.log(window.getCurrentUrl());

        
        // model called here
        /*
        // send to db
        axios.post('/articles', {
            url: url,
            domain: domain,
            title: title,
            rating: 420,
            risk_level: 'yes',
            timestamp: datetime
        });*/
        
        // https://www.npmjs.com/package/article-title  || dunno if this will work for title
        // https://www.npmjs.com/package/article-parser || wait this one is op....
    }, [setUrl, setDomain, setTitle, article, url, domain, title]); 

    const onClick = event => {
        //setUrl('www.google.com');   // hard code for now
        //console.log(url);

        // get domain from url
        //setDomain(psl.get("www.google.com")); // might have to do url.value
        //console.log(psl.get("www.google.com"));

        // WTF WHY DOESNT THIS WORKKK
        //getTitleAtUrl("www.google.com", res => {
        //    console.log(res);
        //});

        //setTitle('Google');
        
        axios.post('/articles', {
            url: url,
            domain: domain,
            title: title,
            rating: 420,
            risk_level: 'yes',
            timestamp: 'datetime'
        }).then(res => {
            setArticle(res.data);
            console.log(res.data);
        });
    }

    const handleClick = event => setModal('show');
    const handleClose = event => setModal(false);

    // onClick={e => console.log(window.getCurrentUrl()) for get url button
    return (
        <div>
            <h1 className='Header'>Getting your results now!</h1>
            <button onClick={onClick}>get url</button>
            <button className='CancelButton' onClick={handleClick}>Cancel</button>
            
            <Link to='/results'>
                <button className='delete later when redirect set up'>Proceed to results</button>
            </Link>

            <Modal show={modal === 'show'} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Cancellation</Modal.Title>  
                </Modal.Header>

                <Modal.Body>
                    <p>URL: {url}</p>
                    <p>Are you sure you want to cancel the analysis?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='outline-primary' onClick={handleClose}>No, continue</Button>
                    <Link to='/'>
                        <Button variant='danger' onClick={handleClose}>Yes, cancel</Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProcessResults