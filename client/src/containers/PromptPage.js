import React, {useState, useCallback} from "react";
import {Link} from "react-router-dom";
import {Modal, Button, Form} from "react-bootstrap";
import styled from 'styled-components'
import "../styles/PromptPage.css";

// neutral screen, button for user to decide if they want to analyze article


function PromptPage( {onUrlChange} ) {
    // eslint-disable-next-line
    const [urlInput, setUrlInput] = useState("");
    const [modal, setModal] = useState(false);
    /*
    // function to handle getting url; placeholder til we can send to backend
    const handleClick = (event) => {
        //setURL(window.location.toString());
        //console.log(window.getCurrentUrl());
        //var url = window.prompt("Enter your url: ");
        setModal("show");
    };*/


    const handleChange = event => {
        setUrlInput(event.target.value)
    }

    const handleClick = useCallback(event => {
        //console.log(urlInput);
        onUrlChange(urlInput);
    }, [onUrlChange, urlInput])

    const handleClose = () => setModal(false);
    const handleSubmit = () => window.alert("placeholder, fix later");
    //console.log(reports)

    return (
        <div className='App'>
            <h1 className='Header'>Prompt Page: S T O N K S</h1>
            <h2 className='Subheader'>Fake News Detector</h2>
            <h4 className='Prompt'>
                Want to know what percentage of your content is likely to be false?
            </h4>

            <Form onSubmit={handleSubmit}>
                <PromptForm controlId="urlInput">
                    <Form.Label>Enter the URL of your article.</Form.Label>
                    <UrlInput
                        type="textarea"
                        onChange={handleChange}
                        rows="2" />
                </PromptForm>

                <div className='vertical'>
                    <Link to='/processing'>
                        <button className='analyzeButton' onClick={handleClick}>
                            Analyze Article
                        </button>
                    </Link>
                </div>
            </Form>


            <Modal show={modal === "show"} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>URL</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{"placeholder again"}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}


const PromptForm = styled(Form.Group)`
    text-align: center;
    margin-left: 4rem;
    margin-right: 4rem;
`
const UrlInput= styled(Form.Control)`
    padding:10px;
    border:0;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
`

export default PromptPage;
