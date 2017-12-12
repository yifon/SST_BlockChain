
/**
 * 
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
app.set('port', process.env.PORT || 3000);
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

app.get('/select_terminal', routes.selectTerminalDone);
app.get('/inert_card', routes.insertCardDone);
app.get('/enter_pin', routes.enterPinDone);
app.get('/select_transaction', routes.transactionSelectDone);

app.get('/enter_amount', routes.enterAmountDone);
app.get('/insert_cash', routes.insertCashDone);
app.get('/inq_result', routes.inqResult);
app.get('/cwd_result', routes.cwdResult);
app.get('/cdp_result', routes.cdpResult);
app.get('/tfr_result', routes.tfrResult);
app.get('/enter_account', routes.enterAccounDone);
app.get('/enter_amount_tfr', routes.enterTFRAmountDone);
//app.get('/take_cash_done', routes.takeCashDone);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

