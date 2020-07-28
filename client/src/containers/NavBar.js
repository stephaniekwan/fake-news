import React from 'react';
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'
//import Report from '../components/Report'
//import App from '../components/App'

/*
 * Define the bar at the top of each screen
 */
function NavBar() {
    //const [key, setKey] = React.useState('App');

    const height = '100px'

    
    return (
        <div id='navbar-div' style={{ height, backgroundColor: 'rgb(31, 70, 129)'}}>
            <Navbar className='navbar'>
                
                {
                <>
                    <div className='centered'>
                        <Link to='/'>
                            <h1 className='Title'>S T O N K S</h1>
                        </Link>
                    </div>
                    <div className='right'>
                        <Link to='/faq'>
                            <input className='Info' type='image' 
                            src='./assets/infobutton.png' alt='./assets/infobutton2.png' />
                        </Link>
                    </div>
                </> 
                }
            </Navbar>
        </div>
    )

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

export default NavBar;