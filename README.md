# SEO Little Helper
## Links (url) validator and crawler
Forget about broken links forever

#### How-to Run

1. Install NodeJS
2. Navigate to project root directory
3. Run `npm install` command from terminal
4. Run `node app.js` command from terminal to start the server
5. Open `localhost:8000` in your browser

#### Features
Check your links from sitemap, etc to make sure that all links are responding with 200.  
Links validator will also crawl your page and search for links, to make sure that they are woking too.  
Filter checked links by response code, just by clicking on proper response code cunter. 

#### Live Demo
https://seo-little-helper.herokuapp.com

#### Known Issues
##### Problem with `npm install` on Windows machines
By running `npm install` dependencies are not installed on Windows OS.  
**Solution**: Just run `npm install <dependency>` for each dependency from package.json
