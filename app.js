const express = require('express');
const port = process.env.PORT || 8000;
var bodyParser = require('body-parser');

const Arena = require('bull-arena');
// Mandatory import of queue library.
const Bee = require('bee-queue');
const Queue = require('bee-queue');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();
app.use(express.static('public'));


const arenaConfig = Arena({
    // All queue libraries used must be explicitly imported and included.
    Bee,

    // Provide a `Bull` option when using bull, similar to the `Bee` option above.
    queues: [
        {
            // Required for each queue definition.
            name: 'queue',

            // User-readable display name for the host. Required.
            hostId: 'Queue Server 1',

            // Queue type (Bull or Bee - default Bull).
            type: 'bee',

            // Queue key prefix. Defaults to "bq" for Bee and "bull" for Bull.
            prefix: 'foo',
        },
    ],
 
},
    {
        // Make the arena dashboard become available at {my-site.com}/arena.
        basePath: '/arena',

        // Let express handle the listening.
        disableListen: true,
    });

// Make arena's resources (js/css deps) available at the base app route
app.use('/', arenaConfig);

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
app.listen(port, () => {
    console.log('Server is running on port %s', port);
});