const http = require('http');
const express = require('express');
const router = require('./routes/endpoints');

const HTTP_PORT = process.env.PORT || 8000;

var options = {
    maxAge: '7d',
    redirect: false
}

var app = express();
app.use(express.static('public', options));
app.use('/', router);
app.set('view engine', 'ejs');
app.disable('x-powered-by');

http.createServer(app).listen(HTTP_PORT, () => {
    console.log(`Server is running on port ${HTTP_PORT}`);
});

app.use(function(req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
      res.render('errors/404', { url: req.url });
      return;
    }
});