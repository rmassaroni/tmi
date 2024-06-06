const express = require('express');
const { join } = require('node:path');
const server = require('http');
const { Server } = require('socket.io');
const requestIp = require('request-ip');

const app = express();
app.use(express.static(join(__dirname, 'build')));

app.use(requestIp.mw());

app.get('/get-ip', (req, res) => {
    const clientIp = req.clientIp;
    res.json({ ip: clientIp });
});
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'build', 'index.html'));
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

