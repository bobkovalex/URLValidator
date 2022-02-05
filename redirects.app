// Required
const nunjucks  = require('nunjucks');
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bodyParser = require("body-parser");
const got = require('got');
const { platform } = require('os');

// Init Express
const app = express();
app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use("/", router);

// Init variables
const platforms = ['products', 'library'];
var selectedPlatform;

var mapsDir;
var maps;
initMaps(platforms[0]);
var selectedMap;

var env = nunjucks.configure(['views/'], {
    autoescape: true, 
    express: app
});

// Init/fill maps array from requested directory
function initMaps(dir){
    mapsDir = path.join(__dirname, 'maps/', dir);
    maps = fs.readdirSync(mapsDir).filter( map => path.extname(map).toLowerCase() === '.map' );
    selectedPlatform = dir;
}

// GET Index
app.get('/', function(request, response){
    try{
        if(request.query.platform != null){
            initMaps(request.query.platform);
        }

        if(request.query.map != null){
            selectedMap = request.query.map;
        }else{
            selectedMap = maps[0];
        }

        // Read map
        var rows = fs.readFileSync(path.join(mapsDir, selectedMap)).toString().split('\n');
        //rows = rows.filter(item => item != '\n');
        
        // Render page
        response.render('index.html', {maps: maps, selectedMap: selectedMap, rows: rows, platforms: platforms, selectedPlatform: selectedPlatform});
    } catch (error){
        console.error(error);
    }
});

app.get('/search', function(request, response){
    try{
        var results = [];
        if(request.query.term){
            var term = request.query.term;
            for(var map of maps){
                // Read map
                var rows = fs.readFileSync(path.join(mapsDir, map)).toString().split(/;/);
                rows = rows.filter(item => item != '\n');
                for(var row of rows){
                    if(row.toUpperCase().includes(term.toUpperCase())){
                        results.push(row.split(/ /)[0]);
                        results.push(row.split(/ /)[1]);
                    }
                }
            }
        }
        response.render('search.html', {results: results, term: term, count: results.length/2});
    } catch (error){
        console.error(error);
    }
});

// POST Save
app.post('/save', function(request, response){
    try {
        var data = '';
        for(const [key, value] of Object.entries(request.body)){
            data += value.toString().trim();
            if(key.includes('old')){
                data += ' ';
            }else{
                data += ';\n';
            }
        }
        fs.writeFileSync(path.join(mapsDir, selectedMap), data);
        response.redirect('/?map=' + selectedMap);
      } catch (error) {
        console.error(error);
      }
});

// app.post('/check', function(request, response){  
//     (async () => {
//         for(const [key, value] of Object.entries(request.body)){
//             if(key.includes('new')){
//                 var dns = 'https://docs.groupdocs.com' + value.toString().trim();
//                 try {
//                     const response = await got(dns);
//                     console.log(dns + ' -> ' + response.statusCode);
//                 } catch (error) {
//                     console.log(dns + ' -> ' + response.statusCode);
//                 }
//             }
//         }
//     })();
//     response.redirect('/');
// });

// app.post('/refactor', function(request, response){
//     try {
//         var data = '';
//         for(const [key, value] of Object.entries(request.body)){
//             data += value.toString().trim() + ' ADD_NEW_URL;\n';
//         }
//         fs.writeFileSync(selectedMap, data);
//         response.redirect('/');
//       } catch (error) {
//         console.error(error);
//       }
// });

app.listen(3000, function() {
    console.log('Listening on port 3000...');
});

