var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mysql = require('./app/params/init.js');

var router_config = require("./app/params/interface.json");
var index = require('./routes/index');
var users = require('./routes/users');
var goods = require("./routes/good.js");
var transact = require("./routes/transact.js");
var shop =  require("./routes/shop.js");
var address = require("./routes/address.js");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//添加中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//添加路由
app.use(router_config.transact,transact);
app.use(router_config.user, users);
app.use(router_config.good, goods);
app.use(router_config.index, index);
app.use(router_config.shop,shop);
app.use(router_config.address,address);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        try{
            res.status(err.status || 500);
            res.json({
                error: err.status || 500,
                status: 1
            });
        }
        catch(err){
            console.log(err);
        }

    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    try{
        res.status(err.status || 500);
        res.json({
            error: err.status || 500,
            status: 1
        });
    }
    catch(err){
        console.log(err)
    }
});


module.exports = app;
