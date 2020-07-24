import React from 'react';
import {Tab, Tabs} from 'react-bootstrap'
import Report from '../components/Report'
import App from '../components/App'

function NavBar() {
    const [key, setKey] = React.useState('App');

    return (
        <Tabs id="NavNar" activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey="app" title="Main">
                <App />
            </Tab>
            <Tab eventKey="report" title="Make a report">
                <Report />
            </Tab>
        </Tabs>
    );
}

export default NavBar;