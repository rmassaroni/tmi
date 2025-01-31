import React, {useState} from 'react';
import Bowser from "bowser";
const browser = Bowser.getParser(navigator.userAgent);

const TestNavigator = () => {
    const [data, setData] = useState({
        // ip: "Fetching...",
        // isp: "Fetching...",
        // location: "Fetching...",
        // browser: navigator.userAgent,
        // os: `${navigator.platform} (${navigator.userAgent})`,
        // screen: `${window.screen.width}x${window.screen.height}`,
        // timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        // battery: "Fetching...",
        // cpuCores: navigator.hardwareConcurrency || "Unknown",
        // gpu: "Fetching...",
        // vpnStatus: "Unknown",
        // webRTC: "Fetching...",
        // privateMode: "Unknown",
        // adBlocker: "Checking...",
        platform: "Fetching...",
        architecture: "Fetching...",
        model: "Fetching...",
        uaFullVersion: "Fetching..."
    });
    // navigator.userAgentData.getHighEntropyValues(["platform", "architecture", "model"])
    //     .then(data => setData(data);
    //must find out how to use navigator in ts

    return {
        platform: data.platform,
        architecture: data.architecture,
        model: data.model,
        uaFullVersion: data.uaFullVersion
    };
};
