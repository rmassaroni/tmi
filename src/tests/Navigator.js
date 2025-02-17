// import React, {useState, useEffect, memo } from 'react';
import axios from "axios";
import Bowser from "bowser";

const browser = Bowser.getParser(navigator.userAgent);

// globalThis.testNavigatorRunCount = (globalThis.testNavigatorRunCount || 0) + 1; //ts
// window.testNavigatorRunCount = (window.testNavigatorRunCount || 0) + 1;

// const TestNavigator = () => {
//     console.log("TestNavigator", window.testNavigatorRunCount);
//     // const [data, setData] = useState({
//     const data = {
//         ip: "Fetching...",
//         // isp: "Fetching...",
//         // location: "Fetching...",
//         browser: navigator.userAgent,
//         // os: `${navigator.platform} (${navigator.userAgent})`,
//         // screen: `${window.screen.width}x${window.screen.height}`,
//         // timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//         // battery: "Fetching...",
//         // cpuCores: navigator.hardwareConcurrency || "Unknown",
//         // gpu: "Fetching...",
//         // vpnStatus: "Unknown",
//         // webRTC: "Fetching...",
//         // privateMode: "Unknown",
//         // adBlocker: "Checking...",
//         platform: "Fetching...",
//         architecture: "Fetching...",
//         model: "Fetching...",
//         uaFullVersion: "Fetching..."
//     };
//     // navigator.userAgentData.getHighEntropyValues(["platform", "architecture", "model"])
//         // .then(data => setData(data);
//     // must find out how to use navigator in ts
//
//     // useEffect(() => {
//         navigator.userAgentData.getHighEntropyValues(["platform", "architecture", "model", "uaFullVersion"])
//             .then(info => console.log(data));
//
//         axios.get("https://ipapi.co/json/")
//             .then(response => {
//                 const { ip, org, country_name, city, region } = response.data;
//                 // setData(prev => ({
//                     // ...prev,
//             console.log({
//                     ip,
//                     isp: org || "Unknown ISP",
//                     location: `${city}, ${region}, ${country_name}`,
//                     vpnStatus: org?.toLowerCase().includes("vpn") ? "✅ Protected (VPN Detected)" : "Exposed",
//                 // }));
//             });
//             })
//             // .catch(() => setData(prev => ({ ...prev, ip: "❌ Blocked", isp: "❌ Blocked", location: "❌ Blocked" })));
//             .catch(() => console.log("IP Fetch Failed"));
//     // }, []);
//
//     console.log(data.platform);
//     console.log(data.architecture);
//     console.log(data.ip);
//     console.log(data.browser);
//     // console.log(data);
//     // return {
//     //     platform: data.platform,
//     //     architecture: data.architecture,
//     //     model: data.model,
//     //     uaFullVersion: data.uaFullVersion
//     // };
//     return data;
// };
//
// const nav = TestNavigator();
//
// export default nav;

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
    })
    .catch(() => console.log("IP Fetch Failed"));
};

fetchData();
export default data;
