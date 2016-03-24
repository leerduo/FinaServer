/**
 * Created by S.King on 2016/2/23.
 */

var mysql_params;
var mongodb_url;
var mongodb_option;
var redis_url;
var redis_pwd;


if(process.env.NODE_ENV === "dev")
{
    mongodb_url = "mongodb://localhost/fina02";
    mongodb_option = {mongos: true};
    mysql_params = {
        host: 'localhost',
        user: 'root',
        password: '20162016',
        database: 'finadb'
    };

    redis_pwd="fina_redis";
    redis_url = "redis://127.0.0.1:6379";
}else
{
    mongodb_url = "mongodb://192.168.1.49/85902a297b9e4";
    mongodb_option = {mongos: true,user:"24fd7858bafb4",pass:"433e16a1152b4",port:49032};
    mysql_params = {
        port:3306,
        host: "192.168.1.11",
        user: "d289770a-2ce6",
        password: "d289770a-2ce6",
        database: "d3d7cd45b175e4fe8abea5a1762755f8e"
    };

    redis_pwd= "7357faf470694";
    redis_url = "redis://192.168.1.51:49033";
}


var qiniu_conf = {};
qiniu_conf.ACCESS_KEY = "2J30jw23qaavWB2t6DyfYKTt3gFbdDHkrhOSuCm_";
qiniu_conf.SECRET_KEY = "B_Tvg-ojRH0ENjpljT82wCJQzl_5DdhHGrT5Q8wp";

//要上传的空间
var qiniu_bucket = "res-fina";

//要上传的图片域名
var qiniu_url = "http://7xprps.com1.z0.glb.clouddn.com";

//分页数，每页10条记录
global.page_count = 10;

exports.mysql_option = mysql_params;
exports.mongodb_url = mongodb_url;
exports.mongodb_option = mongodb_option;
exports.redis_url = redis_url;
exports.redis_pwd = redis_pwd;

exports.qiniu_conf  = qiniu_conf;
exports.qiniu_bucket = qiniu_bucket;
exports.qiniu_url = qiniu_url;
