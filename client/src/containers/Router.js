import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from './NavBar';

import PromptPage from './PromptPage';
import FAQPage from './FAQPage';
import Results from '../components/Results';
import Report from '../components/Report';
// TODO: Report page
// TODO: transition screen?

const Router = () => {
    return (
        <BrowserRouter>
            <div className='App' id='main-component'>
                <NavBar />
                <Switch>
                    <Route path='/' exact component={PromptPage} />
                    <Route path='/faq' exact component={FAQPage} />
                    <Route path='/results' exact component={Results} />
                    <Route path='/report' exact component={Report} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default Router;