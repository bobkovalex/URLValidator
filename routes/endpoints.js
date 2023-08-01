const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const handlers = require('./handlers');

router.get('/', async function(req, res){
    await handlers.spider(req, res);
});

// Create application/x-www-form-urlencoded parser
const urlEncodedParser = bodyParser.urlencoded({ extended: false, limit: '50mb' });
router.post('/spider/crawl', urlEncodedParser, async function (req, res) {
    await handlers.spiderCrawl(req, res);
});

module.exports = router;