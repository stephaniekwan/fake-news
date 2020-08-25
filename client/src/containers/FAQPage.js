import React from 'react';
import Collapsible from 'react-collapsible';
import '../styles/FAQPage.css';

function FAQPage() {
    return (
        <>
            <h3>Frequently Asked Questions</h3>
            <Collapsible trigger="What do my results mean?">
                <p> The percentage displayed... </p>
            </Collapsible>
            <Collapsible trigger="How does it work?">
                <p> Our machine learning model uses a neural network ... and is trained on data from ... </p>
            </Collapsible>
            <Collapsible trigger="How can we trust the results?">
                <p> You can always trust stonks guy (but never trust stinks guy)</p>
            </Collapsible>
            <Collapsible trigger="Whomstd is u?">
                <p> S T O N K S (when everyone only knows stonks guy but not surreal meme man pepehands)</p>
            </Collapsible>
            <Collapsible trigger="Where can I learn more about the product?">
                <p> S T O N K S link </p>
            </Collapsible>
        </>
    )
}

export default FAQPage
