import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {LastLocationProvider} from "react-router-last-location";

//import axios from 'axios';

import NavBar from "./NavBar";

import PromptPage from "./PromptPage";
import FAQPage from "./FAQPage";
import ProcessResults from "./ProcessResults.js";
import MyReport from "./MyReport";
import MyArticle from "./MyArticle";
import Results from "../components/Results";
import Report from "../components/Report";

const Router = () => {
    var defaultUrl = "https://www.nbcnews.com/news/amp/ncna1236249";

    // parent states
    const [url, setUrl] = useState(defaultUrl);
    const [reanalyze, setReanalyze] = useState(false);
    const [article, setArticle] = useState(null);
    const [lastAnalyzed, setLastAnalyzed] = useState(null);
    const [fromDB, setFromDB] = useState(false);
    const [risky, setRisky] = useState("risky");

    /*
    useEffect(() => {
        // set up default values for article and lastAnalyzed
        axios.get('/articles/article', {
            params: {
                url: url
            }
        }).then(res => {
            console.log(res.data)
            setArticle(res.data.article)
            setLastAnalyzed(res.data.last_analyzed)
        })
    })*/

    return (
        <BrowserRouter>
            <LastLocationProvider>
                <div className='App' id='main-component'>
                    <NavBar />
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={(props) => <PromptPage {...props} onUrlChange={setUrl} />}
                        />

                        <Route path='/faq' exact component={FAQPage} />

                        <Route
                            exact
                            path='/processing'
                            render={(props) => (
                                <ProcessResults
                                    {...props}
                                    url={url}
                                    reanalyze={reanalyze}
                                    setReanalyze={setReanalyze}
                                    setArticle={setArticle}
                                    setLastAnalyzed={setLastAnalyzed}
                                    setFromDB={setFromDB}
                                    setRisky={setRisky}
                                />
                            )}
                        />
                        <Route exact path='/myreport' render={(props) => <MyReport {...props} />} />

                        <Route exact path='/myarticle' render={(props) => <MyArticle {...props} />} />

                        <Route
                            exact
                            path='/results'
                            render={(props) => (
                                <Results
                                    {...props}
                                    setReanalyze={setReanalyze}
                                    article={article}
                                    lastAnalyzed={lastAnalyzed}
                                    fromDB={fromDB}
                                    risky={risky}
                                />
                            )}
                        />

                        <Route
                            exact
                            path='/report'
                            render={(props) => <Report {...props} url={url} />}
                        />
                    </Switch>
                </div>
            </LastLocationProvider>
        </BrowserRouter>
    );
};

export default Router;
