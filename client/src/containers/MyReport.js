import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import styled from 'styled-components'

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
    const [reports, setReports] = useState([]);

    useEffect(() => {

        let user_id = '2'
        if (typeof window !== "undefined" && user_id) {
            axios(`reports/${user_id}/user`).then((response) => {
                console.log(response);
                setReports(response.data.report);
            });
        }
    }, []);

    return (
        <div className='App'>
            <h1 className='Header'>My Reports:</h1>
                    <Link to='/'>
                        <button>
                            Home
                        </button>
                    </Link>
           <RenderReports reports={reports} isOrdered />

        </div>
    );
}

export default PromptPage;
