import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [ip, setIp] = useState('');
    useEffect(() => {
        axios.get('/get-ip')
            .then(response => {
                setIp(response.data.ip);
            })
            .catch(error => {
                console.error('Error fetching IP:', error);
            });
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p1>ip: {ip}</p1>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
