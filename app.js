'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules/bootstrap/dist/'));

/*
 * Routes
 */
app.get('/', (req, res, next) => {
    res.send('index.html');
});

/*
 * Api Endpoints
 */

const session = require('./api_handlers/session');

app.post('/getToken', session.createToken);


/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
