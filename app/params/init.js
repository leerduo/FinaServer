/**
 * Created by S.King on 2016/2/23.
 */
var params = require("./params.js");
var mysql = require("mysql");
var mongoose = require('mongoose');
var redis = require("redis");
var qiniu = require("node-qiniu");
//global.mysql_db = mysql.createConnection(params.mysql_option);
//var connection = global.mysql_db;
//connection.connect(function (err) {
//    if (err) {
//        console.error('error connecting: ' + err.stack);
//        return;
//    }
//
//    console.log('connected as id ' + connection.threadId);
//});


mongoose.connect(params.mongodb_url, params.mongodb_option, function (res) {
    console.log(res);
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});
db.once('open', function () {
    console.log("successful")
});

global.mongo_db = db;

var cach_server = redis.createClient(params.redis_url);

cach_server.auth(params.redis_pwd, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log("redis auth success");
    }
});


global.cach_server = cach_server;

qiniu.config.ACCESS_KEY = params.qiniu_conf.ACCESS_KEY;
qiniu.config.SECRET_KEY = params.qiniu_conf.SECRET_KEY;

global.qiniu_bucket = params.qiniu_bucket;
global.qiniu_url = params.qiniu_url;

//初始化数据模型
require("../model/model_entity/Good_Mode.js");
require("../model/model_entity/User_Mode.js");
require("../model/model_entity/TransactGoods_Mode.js");
require("../model/model_entity/UserAddress_Mode.js");
require("../model/model_entity/UserShop_Mode.js");
require("../model/model_entity/PointCard_Mode.js");