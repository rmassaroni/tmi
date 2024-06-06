const express = require('express');
const { join } = require('node:path');
const server = require('http');
const { Server } = require('socket.io');
const requestIp = require('request-ip');

const app = express();
app.use(express.static(join(__dirname, 'build')));

app.use(requestIp.mw());

app.get('/get-ip', (req, res) => {
    // const clientIp = req.clientIp;
    // console.log(clientIp);
    // let clientIPv4 = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // clientIPv4 = clientIPv4.split(',')[0];
    // console.log(clientIPv4);
    // res.json({ ip: clientIp });


    
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            console.log("IPv4:", data.ip);
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

