// const fs = require('fs');
// const { add } = require("./math");

// fs.writeFile('./test.txt', 'Hello World', () => { });

// console.log({ __filename, __dirname, module, exports, require });
// console.log(add(2, 5));

// const http = require("http");

// const server = http.createServer(function (req, res) {
//     console.log(`Incoming request`);
//     console.log(req.method);
//     console.log(req.url);
//     res.end("Take this as a response");
// });

// server.listen(8000, function () {
//     console.log(`Server started`);
// });

const express = require('express');

const app = express();

app.use((req, res, next) => {
    next();
});

app.get('/', (req, res) => res.end('Homepage'));
app.get('/contact-us', (req, res) => res.end('Contact Us Page'));
app.get('/about-us', (req, res) => res.end('About Us Page'));

app.listen(8000, function () {
    console.log(`Server Started`);
});