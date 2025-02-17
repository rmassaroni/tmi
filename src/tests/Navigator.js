// import React, {useState, useEffect, memo } from 'react';
import axios from "axios";
import Bowser from "bowser";
import {importTable, globalDataTable} from "../globalDataTable";
const browser = Bowser.getParser(navigator.userAgent);

// globalThis.testNavigatorRunCount = (globalThis.testNavigatorRunCount || 0) + 1; //ts
// window.testNavigatorRunCount = (window.testNavigatorRunCount || 0) + 1;

if (!window.testNavigatorRunCount) {
    window.testNavigatorRunCount = 0;
}

let data = {
    ip: "Fetching...",
    browser: navigator.userAgent,
    platform: "Fetching...",
    architecture: "Fetching...",
    model: "Fetching...",
    uaFullVersion: "Fetching..."
};

export const fetchData = () => {
    window.testNavigatorRunCount += 1;
    console.log("Running... Count:", window.testNavigatorRunCount);

    // Fetch high-entropy values
    navigator.userAgentData
        .getHighEntropyValues(["platform", "architecture", "model", "uaFullVersion"])
        .then(info => {
            Object.assign(data, info);
            console.log("Navigator Data:", data);
        });

    // Fetch IP details
    axios.get("https://ipapi.co/json/")
        .then(response => {
            const { ip, org, country_name, city, region } = response.data;
            Object.assign(data, {
                ip,
                isp: org || "Unknown ISP",
                location: `${city}, ${region}, ${country_name}`,
                vpnStatus: org?.toLowerCase().includes("vpn") ? "✅ Protected (VPN Detected)" : "Exposed",
            });
            console.log("Updated Navigator Data:", data);
             const dataEntries = Object.entries(data).map(([key, value]) => {
                // Assuming that 'found' will be true for all fetched data
                return `${key},${value},true`;
            });
            importTable(dataEntries)
        })
        .catch(() => console.log("IP Fetch Failed"));



    
};

fetchData();
importTable(data);
export default data;
