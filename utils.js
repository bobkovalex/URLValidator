const axios = require('axios');
const https = require('https');
const { response } = require('express');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

/*
* Get HTTPS response from passed urls array 
*/
module.exports.getResponse = async function(url, responseArray, spiderMode){
    await httpResponse(url, true, responseArray, spiderMode);
}

async function httpResponse(url, isRootUrl, responseArray, spiderMode) {
    try {
        const agent = new https.Agent({  
            rejectUnauthorized: false
          });

        // Get response from URL
        const response = await axios.get(url, { httpsAgent: agent });
        // Set response code status
        let codeStatus = response.status
        // Create pair url/response code
        let pair = {url: url, codeStatus: codeStatus};
        responseArray.push(pair);
        // console.log(codeStatus, ' - ', url);
        // get child urls if url is root & spiderMode == true
        if(spiderMode && isRootUrl && codeStatus === 200){
            let childUrls = await extractUrls(url, response.data);
            for(childUrl of childUrls){
                await httpResponse(childUrl, false, responseArray);
            }
        }
    } catch (error) {
        if (error.response) {
            // Set response code status
            let codeStatus = error.response.status
            // Create pair url/response code
            let pair = {url: url, codeStatus: codeStatus};
            responseArray.push(pair);
            console.log(codeStatus, ' - ', url);
            // console.log(error.message);
            // console.log(error.response.headers);
            // console.log(error.response.data);
        }
    }
}

/*
* Parse HTML and return array of all urls found in HTML body container
*/
async function extractUrls(originUrl, html) {
    let urls = [];
    const dom = new JSDOM(html);
    for(selector of dom.window.document.querySelectorAll('a')){
        let link = selector.getAttribute('href');
        if(link != null){
            if(link.includes('http')){
                urls.push(link);
            }else if(link.startsWith('/')){
                const url = new URL(originUrl);
                const baseUrl = `${url.protocol}//${url.hostname}`;
                urls.push(baseUrl + link);
            }
        }
    }
    return urls;
}