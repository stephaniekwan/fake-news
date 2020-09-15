import React from 'react';
import Collapsible from 'react-collapsible';
import '../styles/FAQPage.css';

function FAQPage() {
    return (
        <>
            <div className="FAQHeader">
              <h4>Frequently Asked Questions</h4>
            </div>
            <Collapsible trigger="What do my results mean?">
                <p> After analyzing your article, you will receive a percentage
                     range. Depending on the range, your article will be classified
                     as fact or fake. The higher the percentage, the more factual your
                     article is. A percentage greater ({'>'}) than 80% is mostly factual. 
                     A percentage below ({'<'}) 50% is mostly fake. In between these ranges 
                     varies. There is a risk that your article has both fake and 
                     factual news.
                </p>
            </Collapsible>
            <Collapsible trigger="How does it work?">
                <p> First, you copy paste the link of the article you want analyzed 
                    into the url box. After clicking Analyze Article, you will see 
                    your results of fake or fact in a form of a percentage range. 
                    You also have the option to report your results if you do not 
                    agree with the prediction given. You also can reanalyze the 
                    article if your article has been analyzed already.
                </p>
            </Collapsible>
            <Collapsible trigger="How can we trust the results?">
                <p> Fake and factual news are classified through a machine learning 
                    model. Keywords, context, and statistical analysis are used in a 
                    linear regression model to accurately predict fake and fact. Our 
                    model takes keywords and associates their context with fake and 
                    fact and gives a prediction. Through the use of statistical 
                    analysis and vectorizers, an article is broken down to its most 
                    important words and associated with fake or fact. The model has 
                    been trained over multiple datasets from 2016-2019 and has achieved 
                    over 95% accuracy. While our model has a high percentage accuracy, 
                    the result is still a prediction. It may not always be correct and 
                    should be taken with a grain of salt.
                </p>
            </Collapsible>
            <Collapsible trigger="Where can I learn more about the product and the team?">
                <p><a href={"https://sdsc-ucsd.atlassian.net/wiki/spaces/SRSI2/pages/940736638/Team+S+T+O+N+K+S"}>
                    Click here to visit our website!
                </a></p>
                <p>(You will need to open the link in a new tab. Mac users can use CMD+Click to do this.)</p>
                <p>If the link above does not work, please follow this one: https://sdsc-ucsd.atlassian.net/wiki/spaces/SRSI2/pages/940736638/Team+S+T+O+N+K+S</p>
            </Collapsible>
        </>
    )
}

export default FAQPage
