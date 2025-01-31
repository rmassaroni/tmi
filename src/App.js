import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrivacyCheck from "./PrivacyCheck";

function App() {
    // const [ip, setIp] = useState('');
    // useEffect(() => {
    //     axios.get('https://api64.ipify.org?format=json')
    //         .then(response => {
    //             setIp(response.data.ip);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching IP:', error);
    //         });
    // }, []);
    // return (
    //     <div className="App">
    //         <header className="App-header">
    //             <img src={logo} className="App-logo" alt="logo" />
    //             <p>IP: {ip}</p>
    //         </header>
    //     </div>
    // );
    return (
        <div className="App">
            <div className="Header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>TMI</h1>
            </div>
             <header>
                 <PrivacyCheck />
             </header>
        </div>
    );
}

export default App;
