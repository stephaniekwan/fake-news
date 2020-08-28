// eslint-disable-next-line
import React, {useState, useEffect, useRef} from "react";
import {Form, Button, Modal} from "react-bootstrap";
//import { Link, userHistory } from 'react-router-dom'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/Report.css";
import styled from "styled-components";

function Report({url}) {
    const [validated, setValidated] = useState(false);
    const [modal, setModal] = useState("hide");
    // eslint-disable-next-line
    const [report, setReport] = useState(null);
    // eslint-disable-next-line
    const [requestBody, setRequestBody] = useState({
        /*
        url: '',
        user_id: '',
        tag: '',
        comment: ''
        */
    });

    // used to save user input from the form
    //const [urlInput, setURL] = useState("");
    //const [userIDInput, setUserID] = useState("");
    const [tagInput, setTag] = useState("");
    const [commentInput, setComment] = useState("");

    useEffect(() => {
        if (modal === "submitted") {
            setModal("done");
            axios
                .post("/reports", {
                    user_id: localStorage.getItem("user_id"),
                    url: url,
                    tag: tagInput.value,
                    comment: commentInput.value,
                })
                .then((res) => {
                    setReport(res.data);
                });
        }
        setModal("done");
    }, [modal, url, tagInput.value, commentInput.value]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setModal("failure");
            //event.preventDefault();
            //event.stopPropagation();
        } else {
            setModal("submitted");
        }
        event.preventDefault();
        setValidated(true);
    };

    const handleClose = () => setModal(false);

    // TODO: after submitting report, automatically return to results
    // const handleReturn = () => setKey("app")

    return (
        <ReportForm>
            <h1>Report an error</h1>
            <h3>Disagree with your results? Let us know what you think!</h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId='reportForm.Url'>
                    <Form.Label>URL of Article</Form.Label>
                    <Form.Control type='text' placeholder={url} readOnly rows='1' />
                </Form.Group>
                {
                    // To do(Dennis): submit the user id by retrieving the user id from local storage without the user knowledge
                }
                <Form.Group controlId='reportForm.Tag'>
                    <Form.Label>Select which of the following applies:</Form.Label>
                    <Form.Control ref={(elem) => setTag(elem)} required as='select'>
                        <option>I think this article is actually mostly true</option>
                        <option>I think this article is actually mostly false</option>
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        Please select one of the options.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='reportForm.Comment'>
                    <Form.Label>Feedback</Form.Label>
                    <Form.Control
                        ref={(elem) => setComment(elem)}
                        as='textarea'
                        rows='3'
                        placeholder='Enter any comments here'
                    />
                </Form.Group>

                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <Button
                        style={{backgroundColor: "blue"}}
                        variant='dark'
                        type='submit'
                        onClick={(e) => setModal("submit")}
                        active
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
                    <Button onClick={handleClose}>Go back to my results</Button>
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
