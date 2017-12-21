const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression())

app.use(express.static(path.join(__dirname, 'src')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = app;

