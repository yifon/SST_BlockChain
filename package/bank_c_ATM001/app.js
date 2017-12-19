

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
//import session to store the transaction info 
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

app.use(cookieParser('sessiontest'));
app.use(session({secret: 'sessiontest',//与cookieParser中的一致
	 resave: true,
	 saveUninitialized:true
}));

// all environments
app.set('port', process.env.PORT || 6100);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/users', user.list);

//app.get('/', routes.index);

app.get('/cwd', routes.cwdtxn);
app.get('/inq', routes.inqtxn);
app.get('/tfr', routes.tfrtxn);
app.get('/cdp', routes.cdptxn);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

