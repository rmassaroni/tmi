import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrivacyCheck from "./PrivacyCheck";

// function App() {
const App: React.FC = () => {
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
