import React, {useEffect, useState} from "react";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "../styles/NavBar.css";
import { DropdownButton,Dropdown } from 'react-bootstrap'
//import Report from '../components/Report'
//import App from '../components/App'

/*
 * Define the bar at the top of each screen
 */
export default () => {
    const [isLoggedIn, setLoggedIn] = useState(null);

    const height = "100px";

    // To do(Dennis): Investigate if we need to do somethings if users are in logged-in state
    useEffect(() => {
        setLoggedIn({
            isLoggedIn:
                typeof window !== "undefined" &&
                window.localStorage.getItem("user_id") !== null
        });

        if (
            typeof window !== "undefined" &&
            window.localStorage.getItem("user_id") == null
        ) {
            localStorage.setItem('user_id', uuidv4());
        }

    }, []);

    return (
        <div id='navbar-div' style={{height, backgroundColor: "rgb(31, 70, 129)"}}>
            <Navbar className='navbar'>
                {
                    <>
                        <div className='left'>
                            <Link to='/myreport'>
                                <input
                                    className='Info'
                                    type='image'
                                    src='./assets/list-24px.svg'
                                    art='report-list'
                                />
                            </Link>
                        </div>
                        <div>
                            <Link to='/myarticle'>
                                <input
                                    className='Info'
                                    type='image'
                                    src='./assets/article.png'
                                    art='article-list'
                                />
                            </Link>
                        </div>
                        <div>
                          <DropdownButton id="dropdown-item-button">
                            <Link to='/myreport'>
                                <Dropdown.Item as="button">My Reports</Dropdown.Item>
                            </Link>
                            <Link to='/myarticle'>
                                <Dropdown.Item as="button">My Articles</Dropdown.Item>
                            </Link>
                          </DropdownButton>
                        </div>
                        <div className='centered'>
                            <Link to='/'>
                                <h1 className='Title'>S T O N K S</h1>
                            </Link>
                        </div>
                        <div className='right'>
                            <Link to='/faq'>
                                <input
                                    className='Info'
                                    type='image'
                                    src='./assets/infobutton.png'
                                    alt='./assets/infobutton2.png'
                                />
                            </Link>
                        </div>


                    </>
                }
            </Navbar>
        </div>
    );

    /*
    <button><img src='./assets/infobutton.png'
                            alt='./assets/logo-small.png'
                            className='Info' onClick={onClick} /></button>

    return (
        <Tabs id="NavBar" activeKey={key} onSelect={(k) => setKey(k)} justify>
            <Tab eventKey="app" title="Main">
                <App />
            </Tab>
            <Tab eventKey="report" title="Make a report">
                <Report />
            </Tab>
        </Tabs>
    );
    */
}
