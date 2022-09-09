const axios = require('axios');
const { response } = require('express');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

/*
* Get HTTPS response from passed urls array 
*/
module.exports.getResponse = async function(urls, responseArray, recursiveCrawl){
    await getResponse(urls, responseArray, recursiveCrawl);
}

async function getResponse(urls, responseArray, recursiveCrawl){
    for(url of urls){
        await httpResponse(url, true, responseArray, recursiveCrawl);
    }
}

async function httpResponse(url, rootUrl, responseArray, recursiveCrawl) {
    try {
        // Get response from URL
        const response = await axios.get(url);
        // Set response code status
        let codeStatus = response.status
        // Create pair url/response code
        let pair = {url: url, codeStatus: codeStatus};
        responseArray.push(pair);
        console.log(codeStatus, ' - ', url);
        // get child urls if url is root & recursiveCrawl == recursiveCrawl
        if(recursiveCrawl && rootUrl && codeStatus === 200){
            let childUrls = await getInnerUrls(response.data);
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
async function getInnerUrls(html) {
    let urls = [];
    const dom = new JSDOM(html);
    for(selector of dom.window.document.querySelectorAll('a')){
        let url = selector.getAttribute('href');
        if(url != null && url.includes('http')){
            urls.push(url);
        }
    }
    return urls;
}