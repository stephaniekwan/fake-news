import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// neutral screen, button for user to decide if they want to analyze article

const RenderReports = ({isOrdered, reports}) => {
    if (!reports) return null;

    const list = reports.map((report, i) => (
        <Card key={`${i}_${report.user_id}`}>
            <CardRow>
                <p>comment</p>
                <span>{report.comment}</span>
                <p>tag</p>
                <span>{report.tag}</span>

                <p>url</p>
                <span>{report.url}</span>
            </CardRow>
        </Card>
    ));
    return isOrdered ? <ol>{list}</ol> : <ul>{list}</ul>;
};

function PromptPage({onUrlChange}) {
    // eslint-disable-next-line
    const [reports, setReports] = useState([]);

    useEffect(() => {
        let user_id = "2";
        if (typeof window !== "undefined" && user_id) {
            axios(`reports/${user_id}/user`).then((response) => {
                console.log(response);
                setReports(response.data.report);
            });
        }
    }, []);

    return (
        <div className='App'>
            <Header className='Header'>Previous Reports:</Header>
            <HomeButtonWrapper>
                <Link to='/'>
                    <HomeButton
                        type='image'
                        src='./assets/home-button.svg'
                        alt='./assets/home-button.svg'
                    />
                </Link>
            </HomeButtonWrapper>

            <RenderReports reports={reports} isOrdered />
        </div>
    );
}

const Card = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
`;

const CardRow = styled.div`
    width: 320px;
    padding: 20px;
    border: 1px solid #c9c9c9;
    -webkit-box-shadow: 0 10px 6px -6px #777;
    -moz-box-shadow: 0 10px 6px -6px #777;
    box-shadow: 0 10px 6px -6px #777;
    border: none;
    border-left: 2rem solid black;

    &:hover {
        transform: translate3D(0, -1px, 0) scale(1.009);
    }
    p {
        font-size: 1.7rem;
        font-weight: 200;
        margin-bottom: 0rem;
    }
`;

const Header = styled.h1`
    font-size: 2.5rem;
`;

const HomeButtonWrapper = styled.div`
    margin-bottom: 2rem;
`;
const HomeButton = styled.input`
    width: 3rem;
`;

export default PromptPage;
