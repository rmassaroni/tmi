const express = require('express');
const { join } = require('node:path');
const server = require('http');
const { Server } = require('socket.io');
const requestIp = require('request-ip');
const app = express();

let ip = "";
let ipv4 = "";
let ipv6 = "";


app.use(express.static(join(__dirname, 'build')));

app.use(requestIp.mw());

app.get('/get-ip', (req, res) => {
    // const clientIp = req.clientIp;
    // console.log(clientIp);
    // let clientIPv4 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // clientIPv4 = clientIPv4.split(',')[0];
    // console.log(clientIPv4);
    // res.json({ ip: clientIp });


   let ip = ""; 

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log("IPv4:", data.ip);
            ip = data.ip;
            res.json({ ip: data.ip })
        })
        .catch(error => {
            console.log('Error:', error);
        });
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log("IPv6:", data.ip);
            // res.json({ ip: data.ip })
        })
        .catch(error => {
            console.log('Error:', error);
        });
    fetch('http://ip-api.com/json/'+ip+'?fields=66846719').then(response => response.json()).then(data => { 
        console.log(data);
      Object.entries(data).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });


    }).catch(error => { console.log('Error:', error); });
});
// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, 'public', 'index.html'));
// });
// app.get('*', (req, res) => {
//     res.sendFile(join(__dirname, 'build', 'index.html'));
// });
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

