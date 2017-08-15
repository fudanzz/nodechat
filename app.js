var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var fs = require("fs");
var path = require("path");
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream})); 

app.set("views","public/views");
app.set("view engine","jade");

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var admin = require('./admin');

admin(app);

var apiRouter = require("./api");

app.use('/api',apiRouter);

app.listen(3000, () => {
    console.log('express listens on port 3000');
})