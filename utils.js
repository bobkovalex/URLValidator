const axios = require('axios');
const https = require('https');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

/**
 * Parse html document and extract all urls from href attributes
 * @param {*} url 
 * @returns urls array
 */
module.exports.extractUrls = async function(url){
    const response = await getResponse(url);
    return await parseURLs(url, response.data);
}

/**
 * Get page status (200, 301, 404, 502, etc)
 * @param {*} url 
 * @returns pair url/code status
 */
module.exports.getPageStatus = async function(url){
    const response = await getResponse(url);
    const codeStatus = response.status;
    return {url: url, codeStatus: codeStatus};
}

/**
 * Get document response from provided url
 * @param {*} url 
 * @returns 
 */
async function getResponse(url){
    try{
        const agent = new https.Agent({  
            rejectUnauthorized: false
        });
        const response = await axios.get(url, { httpsAgent: agent });
        return response;
    }catch (error) {
        if(error.response){
            return error.response;
        }else{
            console.log(`${url} -> ${error.code}`);
            return {
                status: 301
            }
        }
    }
}

/*
* Parse HTML and return array of all urls found in HTML body container
*/
async function parseURLs(originUrl, html) {
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