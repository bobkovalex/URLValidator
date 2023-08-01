var utils = require('./../utils');

module.exports.spider = async function(req, res) {
    res.render('spider');
}

module.exports.spiderCrawl = async function(req, res) {
    let data = [];
    const url = req.body.url;
    const spiderMode = JSON.parse(req.body.spiderMode);
    await utils.getResponse(url, data, spiderMode);
    res.status(200).send(data);
}