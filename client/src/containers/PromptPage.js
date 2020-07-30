import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import '../styles/PromptPage.css';

// neutral screen, button for user to decide if they want to analyze article

function PromptPage() {
    const [url, setURL] = useState('');
    const [modal, setModal] = useState(false);


    // function to handle getting url; placeholder til we can send to backend
    const handleClick = event => {
        setURL(window.location.href);
        setModal('show');
    }

    const handleClose = () => setModal(false);

    return (
        <div className='App'>
            <h1 className='Header'>Prompt Page: S T O N K S</h1>
            <h2 className='Subheader'>Fake News Detector</h2>
            <h4 className='Prompt'>
                Want to know what percentage of your content is likely to be false?
            </h4>
            <div className='vertical'>
                <Link to='/results'>
                    <button className='analyzeButton'>Analyze Article</button>
                </Link>
                <button className='analyzeButton' onClick={handleClick}>Get URL</button>
            </div>

            <Modal show={modal === 'show'} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>URL</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{url}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}


export default PromptPage;
/*
    i have no idea where this goes tbh im just typing shit out
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
    
    
});
can also set currentwindow to true

*/