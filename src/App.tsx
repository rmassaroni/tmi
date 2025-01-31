import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrivacyCheck from "./PrivacyCheck";
import Data from "./data/Data";
import IP from "./data/IP";

const App: React.FC = () => {
    const ip = IP();
    return (
        <div className="App">
            <div className="Header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>TMI</h1>
            </div>
             <header>
                 <PrivacyCheck />
             </header>
            <p>{ip.name}</p>
            <p>{ip.value}</p>
        </div>
    );
}

export default App;
