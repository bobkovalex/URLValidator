const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const handlers = require('./handlers');

router.get('/', async function(req, res){
    await handlers.index(req, res);
});

router.get('/url/spider', async function(req, res){
    await handlers.urlSpider(req, res);
});

router.get('/url/validator', async function(req, res){
    await handlers.urlValidator(req, res);
});

// API
const urlEncodedParser = bodyParser.urlencoded({ extended: false, limit: '50mb' });
router.post('/spider/extract', urlEncodedParser, async function (req, res) {
    await handlers.extractUrls(req, res);
});

router.post('/spider/validate', urlEncodedParser, async function (req, res) {
    await handlers.getPageStatus(req, res);
});

module.exports = router;