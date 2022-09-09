const express = require('express');
const port = process.env.PORT || 8000;
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
        var innerHTML = JSON.parse(req.body.innerHTML);
        await tools.getResponse(urls, data, innerHTML);
        res.status(200).send(data);
    })();
});

// Init server
app.listen(port, () => {
    console.log('Server is running on port %s', port);
});