import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Modal, Button} from "react-bootstrap";
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
function PromptPage() {
    // eslint-disable-next-line
    const [url, setURL] = useState("");
    const [modal, setModal] = useState(false);
    const [reports, setReports] = useState([]);

    // function to handle getting url; placeholder til we can send to backend
    const handleClick = (event) => {
        //setURL(window.location.toString());
        //console.log(window.getCurrentUrl());
        setModal("show");
    };

    useEffect(() => {
        const user_id = window.localStorage.getItem("user_id");
        if (typeof window !== "undefined" && user_id) {
            axios(`reports/2/user`).then((response) => {
                console.log(response);
                setReports(response.data.report);
            });
        }
    }, []);

    const handleClose = () => setModal(false);

    return (
        <div className='App'>
            <h1 className='Header'>Prompt Page: S T O N K S</h1>
            <h2 className='Subheader'>Fake News Detector</h2>
            <h4 className='Prompt'>
                Want to know what percentage of your content is likely to be false?
            </h4>
            <div className='vertical'>
                <Link to='/processing'>
                    <button className='analyzeButton'>Analyze Article</button>
                </Link>
                <button className='analyzeButton' onClick={handleClick}>
                    Get URL
                </button>
            </div>

            <Modal show={modal === "show"} onHide={handleClose} centered>
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
           <RenderReports data={reports} isOrdered />
        </div>
    );
}

export default PromptPage;
/*

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;


});


*/
