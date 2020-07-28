import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/PromptPage.css';

// neutral screen, button for user to decide if they want to analyze article

function PromptPage() {
    //const { }

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
            </div>
        </div>
    )

}

/*
Psuedocode for getting current url
<script> window.location.href </script>
*/

export default PromptPage;