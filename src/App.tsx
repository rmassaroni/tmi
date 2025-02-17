import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrivacyCheck from "./PrivacyCheck";
import Data from "./data/Data";
import IP from "./data/IP";
import data, { fetchData } from "./tests/Navigator";
import { globalDataTable } from "./globalDataTable";

const App: React.FC = () => {
    // const [navigatorData, setNavigatorData] = useState(globalDataTable);
    //
    // const handleFetchData = () => {
    //     fetchData();
    //     setNavigatorData({ ...navigatorData });
    //
    // };

    const [tableData, setTableData] = useState(globalDataTable);
    // useEffect(() => {
    //     TestNavigator(); // Run the test script to populate the global data table
    // }, []);
    //
    //    const handleRunTestAgain = () => {
    //     TestNavigator(); // Run the test again to update the global data table
    //     setTableData({ ...globalDataTable }); // Update the state to trigger re-render
    // };
    const handleFetchData = () => {
        fetchData();
        setTableData({ ...globalDataTable });

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
                <table>
                    <thead>
                        <tr>
                            <th>Data Name</th>
                            <th>Data Value</th>
                            <th>Time Retrieved</th>
                            <th>Found</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(tableData).map((key) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{tableData[key].dataValue}</td>
                                <td>{tableData[key].timeRetrieved}</td>
                                <td>{tableData[key].found ? "✅" : "❌"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </header>

        </div>
    );
}

export default App;
