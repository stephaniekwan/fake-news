import React, {useState, useCallback} from "react";
import {Link, Redirect} from "react-router-dom";
import {Modal, Button, Form} from "react-bootstrap";
import styled from "styled-components";
import "../styles/PromptPage.css";

// neutral screen, button for user to decide if they want to analyze article

function PromptPage({onUrlChange}) {
    // eslint-disable-next-line
    const [urlInput, setUrlInput] = useState("");
    const [modal, setModal] = useState(false);
    const [goToProcess, setGoToProcess] = useState(false);
    const [urlError, setUrlError] = useState(false);
    /*
    // function to handle getting url; placeholder til we can send to backend
    const handleClick = (event) => {
        //setURL(window.location.toString());
        //console.log(window.getCurrentUrl());
        //var url = window.prompt("Enter your url: ");
        setModal("show");
    };*/

    const handleChange = (event) => {
        var url = event.target.value;
        url = url.trim()
        setUrlInput(url);
    };

    const handleClick = useCallback(
        (event) => {
            var r = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);

            if (r.test(urlInput)) {
                setGoToProcess(true);
            }
            setUrlError(true);
            //console.log(urlInput);
            onUrlChange(urlInput);
        },
        [onUrlChange, urlInput]
    );

    const handleClose = () => setModal(false);
    const handleSubmit = () => {
        window.alert("placeholder, fix later");
    };

    //console.log(reports)

    return (
        <div className='App'>
            {goToProcess ? <Redirect to='/processing' /> : null}
            <h2 className='Header'>Fake News Detector</h2>
            <h4 className='Prompt'>
                Want to know what percentage of your content is likely to be false?
            </h4>

            <div>
                <PromptForm controlId='urlInput'>
                    <Form.Label className='formLabel'>Enter the URL of your article:</Form.Label>
                    <UrlInput type='textarea' onChange={handleChange} rows='2' />
                </PromptForm>
                {urlError ? <InvalidURLText>URL is not a valid URL</InvalidURLText> : null}
                <div className='vertical'>
                    <button className='analyzeButton' onClick={handleClick}>
                        Analyze Article
                    </button>
                </div>
            </div>
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
`;
const UrlInput = styled(Form.Control)`
    padding: 10px;
    border: 0;
    box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
`;

const InvalidURLText = styled.span`
    color: red;
`;

export default PromptPage;
