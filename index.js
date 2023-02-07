const AES = require("crypto-js/aes");
const http = require('http');
const fs = require('fs');

const server = http.createServer(async (req,res) => {
    var url = new URL(`http://websi.te${req.url}`);
    if(url.pathname == '/api/verify') {
        u
    }
});