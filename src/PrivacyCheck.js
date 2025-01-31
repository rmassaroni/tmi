import React, { useState, useEffect } from "react";
import axios from "axios";

const PrivacyCheck = () => {
  const [data, setData] = useState({
    ip: "Fetching...",
    isp: "Fetching...",
    location: "Fetching...",
    browser: navigator.userAgent,
    os: `${navigator.platform} (${navigator.userAgent})`,
    screen: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    battery: "Fetching...",
    cpuCores: navigator.hardwareConcurrency || "Unknown",
    gpu: "Fetching...",
    vpnStatus: "Unknown",
    webRTC: "Fetching...",
    privateMode: "Unknown",
    adBlocker: "Checking...",
  });

  useEffect(() => {
    axios.get("https://ipapi.co/json/")
      .then(response => {
        const { ip, org, country_name, city, region } = response.data;
        setData(prev => ({
          ...prev,
          ip,
          isp: org || "Unknown ISP",
          location: `${city}, ${region}, ${country_name}`,
          vpnStatus: org?.toLowerCase().includes("vpn") ? "✅ Protected (VPN Detected)" : "Exposed",
        }));
      })
      .catch(() => setData(prev => ({ ...prev, ip: "❌ Blocked", isp: "❌ Blocked", location: "❌ Blocked" })));

    const rtc = new RTCPeerConnection({ iceServers: [] });
    rtc.createDataChannel("");
    rtc.createOffer().then(o => rtc.setLocalDescription(o));
    rtc.onicecandidate = event => {
      if (event && event.candidate && event.candidate.candidate.includes("typ host")) {
        setData(prev => ({ ...prev, webRTC: "❌ Local IP Leak" }));
      } else {
        setData(prev => ({ ...prev, webRTC: "✅ Safe" }));
      }
    };

    if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
        setData(prev => ({ ...prev, battery: `${Math.round(battery.level * 100)}%` }));
      });
    } else {
      setData(prev => ({ ...prev, battery: "Unavailable" }));
    }

    const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
    if (fs) {
      fs(window.TEMPORARY, 100, () => setData(prev => ({ ...prev, privateMode: "No" })), () => setData(prev => ({ ...prev, privateMode: "✅ Yes (Incognito Mode)" })));
    }

    const ad = document.createElement("div");
    ad.innerHTML = "&nbsp;";
    ad.className = "adsbox";
    document.body.appendChild(ad);
    setTimeout(() => {
      if (ad.offsetHeight === 0) {
        setData(prev => ({ ...prev, adBlocker: "✅ Enabled" }));
      } else {
        setData(prev => ({ ...prev, adBlocker: "Disabled" }));
      }
      document.body.removeChild(ad);
    }, 100);

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      setData(prev => ({
        ...prev,
        gpu: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Unknown GPU",
      }));
    }
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>🔍 Privacy Check</h2>
      <ul style={{ listStyleType: "none", padding: 0, textAlign: "left" }}>
        <li><strong>Public IP:</strong> {data.ip}</li>
        <li><strong>ISP:</strong> {data.isp}</li>
        <li><strong>Location:</strong> {data.location}</li>
        <li><strong>VPN Detected:</strong> {data.vpnStatus}</li>
        <li><strong>WebRTC Leak:</strong> {data.webRTC}</li>
        <li><strong>Browser:</strong> {data.browser}</li>
        <li><strong>Operating System:</strong> {data.os}</li>
        <li><strong>Screen Resolution:</strong> {data.screen}</li>
        <li><strong>Time Zone:</strong> {data.timezone}</li>
        <li><strong>Battery Level:</strong> {data.battery}</li>
        <li><strong>CPU Cores:</strong> {data.cpuCores}</li>
        <li><strong>GPU:</strong> {data.gpu}</li>
        <li><strong>Private/Incognito Mode:</strong> {data.privateMode}</li>
        <li><strong>Ad Blocker:</strong> {data.adBlocker}</li>
      </ul>
    </div>
  );
};

export default PrivacyCheck;

