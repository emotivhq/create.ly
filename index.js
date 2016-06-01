// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var gzippo = require('gzippo');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var serveStatic = require('serve-static');

// configuration =================


app.use(serveStatic(__dirname + '/app'));                       // Express based router middleware (rewrites)
app.use(morgan('dev'));                                         //app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/app"));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
//app.use(express.static(__dirname + '/app'));                  // set the static files location /public/img will be /img for users


// application =========================


/* this is used to force SSL - required for security 
app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https') {
        res.redirect('https://' + req.headers.host + req.path);
    }
    else {
        return next();
    }
});
*/

/* ****************************************************
 * Express based router middleware (rewrites) for 
 * html5Mode angular apps - Fedora style 
 * ****************************************************
*/

app.get('/*', function(req, res, next) {
    res.sendFile('app.html', { root: __dirname + "/app"});
});

// listen (start app with node server.js) ======================================
var port = process.env.PORT || 8080;
	app.listen(port, null, function() {
		console.log('Server started: http://localhost:' + port);
	});