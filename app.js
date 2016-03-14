'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/web'));

/*
 * Routes
 */

app.get('/', function(req, res, next) {
    res.render('index.html');
});

app.get('*', function(req, res, next) {
    res.redirect('/');
});

/*
 * Api Endpoints
 */


/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);
