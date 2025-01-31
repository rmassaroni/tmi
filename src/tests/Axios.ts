import axios from 'axios';
import React, {useState} from 'react';
const TestAxios = () => {
    const [data, setData] = useState({
        ip: "Fetching...",
        isp: "Fetching...",
        location: "Fetching...",
        vpnStatus: "Unknown",
    });

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

    return {
        ip: data.ip,
        isp: data.isp,
        location: data.location,
        vpnStatus: data.vpnStatus
    };
}

export default TestAxios;
