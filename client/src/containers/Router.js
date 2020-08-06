import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from './NavBar';

import PromptPage from './PromptPage';
import FAQPage from './FAQPage';
import ProcessResults from './ProcessResults.js'
import Results from '../components/Results';
import Report from '../components/Report';

const Router = () => {

    // parent state
    const [url, setUrl] = useState("");

    /*
    // wrapper func for child
    const wrapperSetUrl = useCallback(val => {
        setUrl(val);
    }, [setUrl]);
    */
    return (
        <BrowserRouter>
            <div className='App' id='main-component'>
                <NavBar />
                <Switch>
                    <Route 
                        exact path='/' 
                        render={(props) => <PromptPage {...props} onUrlChange={setUrl} /> } />
                    <Route path='/faq' exact component={FAQPage} />
                    <Route 
                        exact path='/processing'
                        render={(props) => <ProcessResults {...props} url={url} /> } />
                    <Route path='/results' exact component={Results} />
                    <Route path='/report' exact component={Report} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default Router;
/*
<Route path='/' exact component={PromptPage} />
                    <Route path='/faq' exact component={FAQPage} />
                    <Route path='/processing' exact component={ProcessResults} />
                    <Route path='/results' exact component={Results} />
                    <Route path='/report' exact component={Report} />
                    */