var utils = require('./../utils');

module.exports.spider = async function(req, res) {
    res.render('spider');
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