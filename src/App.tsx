import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrivacyCheck from "./PrivacyCheck";
import Data from "./data/Data";
import IP from "./data/IP";
// import TestNavigator from "./tests/Navigator";
// import "./tests/Navigator";
import data, { fetchData } from "./tests/Navigator";

const App: React.FC = () => {
    // const ip = IP();
    // const nav = TestNavigator();
    // console.log("App Loaded. Navigator Data:", navigatorData);
    const [navigatorData, setNavigatorData] = useState(data);

    // Function to handle fetching new data and updating state
    const handleFetchData = () => {
        fetchData(); // Re-run the script to fetch the data again
        setNavigatorData({ ...navigatorData }); // Force state update to reflect changes
    };
    return (
        <div className="App">
            <div className="Header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>TMI</h1>
            </div>
             <header>
                <p>Run Count: {window.testNavigatorRunCount}</p>
                <button onClick={handleFetchData}>Run Again</button>
             </header>

        </div>
    );
}

export default App;
