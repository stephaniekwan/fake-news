import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

// neutral screen, button for user to decide if they want to analyze article

const RenderArticles = ({isOrdered, articles}) => {
    if (!articles) return null;

    const list = articles.map((article, i) => (
        <Card key={i}>
            <CardRow>
                <p>Domain</p>
                <span>{article.domain}</span>
                <p>Rating</p>
                <span>{article.rating}</span>

                <p>Url</p>
                <span>{article.url}</span>

                <p>Risk Level</p>
                <span>{article.riskLevel}</span>

                <p>Date</p>
                <span>{article.date}</span>
            </CardRow>
        </Card>
    ));
    return isOrdered ? <ol>{list}</ol> : <ul>{list}</ul>;
};

function PromptPage({onUrlChange}) {
    // eslint-disable-next-line
    const [articles, setArticles] = useState([]);

    useEffect(() => {

        if (typeof window !== "undefined") {
            let storedArticles = localStorage.getObj("articles")|| [];
            setArticles(storedArticles);
        }
    }, []);

    return (
        <div className='App'>
            <Header className='Header'>Previous articles:</Header>
            <Link to='/'>
                <button>Home</button>
            </Link>
            <RenderArticles articles={articles} isOrdered />
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
        transform: translate3D(0,-1px,0) scale(1.009);
      }
    p {
        font-size: 1.7rem;
        font-weight: 200;
        margin-bottom: 0rem;
    }
`;

const Header = styled.h1`
    font-size: 2.5rem;
`

export default PromptPage;
