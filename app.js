const express = require('express');
var bodyParser = require('body-parser');
var tools = require('./tools');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();
app.use(express.static('public'));

// Index Page
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
});

/* 
** API
** URL Check
*/
app.post('/url_checker', urlencodedParser, function (req, res) {
    (async () => {
        let data = [];
        var urls = JSON.parse(req.body.urls);
        await tools.getResponse(urls, data);
        console.log(data);
        res.status(200).send(data);
    })();
});

// Init server
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port;
    console.log("Server started at http://%s:%s", (host === '::')?'localhost':host, port);
});