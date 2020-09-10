// eslint-disable-next-line
import React, {useState, useEffect} from "react";
import {Form, Button, Modal} from "react-bootstrap";
import {Link} from 'react-router-dom'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/Report.css";
import styled from "styled-components";

function Report({url}) {
    const [validated, setValidated] = useState(false);
    const [modal, setModal] = useState("hide");

    // used to disable submit button after success
    const [disabled, setDisabled] = useState(false);

    // eslint-disable-next-line
    const [report, setReport] = useState(null);

    // used to save user input from the form
    const [tagInput, setTag] = useState("");
    const [commentInput, setComment] = useState("");


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setModal("failure");
            //event.preventDefault();
            //event.stopPropagation();
        } else {
            // all fields filled out properly, submit to backend
            setModal("submitted");
            console.log("user id: " + localStorage.getItem("user_id"));

            axios.post('https://sdsc-fake-news-backend.herokuapp.com/reports', {
                user_id: localStorage.getItem("user_id"),
                url: url,
                tag: tagInput.value,
                comment: commentInput.value
            })
            .catch((err) => {
                console.log(err)
                setModal("failure");
            })
            .then((res) => {
                console.log(res.data)
                setReport(res.data.report);
            })

            setDisabled(true);
        }

        event.preventDefault();
        setValidated(true);
        console.log(modal)
    };

    const handleClose = () => setModal(false);

    return (
        <ReportForm>
            <h1 className="ReportHeader">Report an Error</h1>
            <h3 className="ReportHeader">Disagree with your results? Let us know what you think!</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId='reportForm.Url'>
                    <Form.Label className="FormLabel">URL of Article</Form.Label>
                    <Form.Control type='text' placeholder={url} readOnly rows='1' />
                </Form.Group>
                
                <Form.Group controlId='reportForm.Tag'>
                    <Form.Label className="FormLabel">Select which of the following applies:</Form.Label>
                    <Form.Control ref={(elem) => setTag(elem)} required as='select'>
                        <option>I think this article is actually mostly true</option>
                        <option>I think this article is actually mostly false</option>
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        Please select one of the options.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='reportForm.Comment'>
                    <Form.Label className="FormLabel">Feedback</Form.Label>
                    <Form.Control
                        ref={(elem) => setComment(elem)}
                        as='textarea'
                        rows='3'
                        placeholder='Enter any comments here'
                        required 
                    />
                </Form.Group>

                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <Link to='/results'>
                        <Button
                            style={{backgroundColor: "gray"}}
                            variant='dark'
                            active
                        >
                            Back to Results    
                        </Button>
                    </Link>

                    <Button
                        style={{backgroundColor: "blue"}}
                        variant='dark'
                        type='submit'
                        disabled={disabled}
                    >
                        Submit Report
                    </Button>
                </div>
            </Form>

            <Modal show={modal === "submitted"} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Submitted Successfully!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Your report has been submitted. Thank you for your feedback!</p>
                </Modal.Body>

                <Modal.Footer>
                    <Link to='/results'>
                        <Button onClick={handleClose}>Go back to my results</Button>
                    </Link>
                </Modal.Footer>
            </Modal>

            <Modal show={modal === "failure"} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Failure</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Please make sure all of the necessary fields are filled in.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </ReportForm>
    );
}

export default Report;

const ReportForm = styled.div`
    text-align: left;
`;
