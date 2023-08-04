var utils = require('./../utils');

module.exports.index = async function(req, res) {
    res.render('index');
}

module.exports.urlSpider = async function(req, res) {
    res.render('url-spider');
}

module.exports.urlValidator = async function(req, res) {
    res.render('url-validator');
}

module.exports.extractUrls = async function(req, res) {
    const url = req.body.url;
    const response = await utils.extractUrls(url);
    res.status(200).send(response);
}

module.exports.getPageStatus = async function(req, res) {
    const url = req.body.url;
    const response = await utils.getPageStatus(url);
    res.status(200).send(response);
}