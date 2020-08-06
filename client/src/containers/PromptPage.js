import React, {useState, useEffect, useCallback} from "react";
import {Link} from "react-router-dom";
import {Modal, Button, Form} from "react-bootstrap";
import axios from "axios";
import "../styles/PromptPage.css";

// neutral screen, button for user to decide if they want to analyze article

const RenderReports = ({isOrdered, reports}) => {
    if (!reports) return null;

    const list = reports.map((report, i) => (
        <li key={`${i}_${report.user_id}`}>
            <p>user id: </p><span>{report.user_id}</span>
            <p>comment: </p><span>{report.comment}</span>
            <p>tag: </p><span>{report.tag}</span>
            <p>url: </p><span>{report.url}</span>
        </li>
    ));
    return isOrdered ? <ol>{list}</ol> : <ul>{list}</ul>;
}

function PromptPage( {onUrlChange} ) {
    // eslint-disable-next-line
    const [urlInput, setUrlInput] = useState("");
    const [modal, setModal] = useState(false);
    const [reports, setReports] = useState([]);
    /*
    // function to handle getting url; placeholder til we can send to backend
    const handleClick = (event) => {
        //setURL(window.location.toString());
        //console.log(window.getCurrentUrl());
        //var url = window.prompt("Enter your url: ");
        setModal("show");
    };*/

    useEffect(() => {
        // Dennis (uncomment this): to use the actual userId

        // Dennis (comment this): to use the actual userId
        // const user_id = window.localStorage.getItem("user_id");

        let user_id = '2'
        if (typeof window !== "undefined" && user_id) {
            axios(`reports/${user_id}/user`).then((response) => {
                console.log(response);
                setReports(response.data.report);
            });
        }
    }, []);

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
                <Form.Group controlId="urlInput">
                    <Form.Label>Enter the URL of your article.</Form.Label>
                    <Form.Control 
                        type="textarea"
                        onChange={handleChange}
                        rows="2" />
                </Form.Group>

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
           <RenderReports reports={reports} isOrdered />
        </div>
    );
}

export default PromptPage;
