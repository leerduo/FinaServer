/**
 * Created by S.King on 2016/3/11.
 */
var msg_unit = require("../../tools/message_unit.js");
var moment = require('moment');

var crypto = require("crypto");
var md5 = crypto.createHash("md5");

require('moment/locale/cs');
var User = global.UserModel;
var PointCard = global.PointCardModel;
var LogIn = function (req, res) {
    var data = req.body;
    var update = moment().format();
    User.findOne(data, 'name integral type').exec(function (err, result) {
        if (err) {
            msg_unit.failMessage(res, "用户名或密码错误");
        } else {
            if (result) {
                var id = result._id;
                var user = result;
                global.cach_server.get(id, function (err, obj) {
                    console.log(obj);
                    if (err) {
                        msg_unit.failMessage(res, err);
                    }
                    if (!obj) {
                        User.findByIdAndUpdate(id, {update_date: new Date(update)}).exec(function (err, result) {
                            if (err) {
                                msg_unit.failMessage(res, err);
                            } else {
                                user.update_date = update;

                                global.cach_server.set(id, JSON.stringify(user));
                                msg_unit.successMessage(res, {token: id});
                            }
                        });
                    } else {
                        msg_unit.failMessage(res, "该帐号已登录");
                    }
                })
            } else {
                msg_unit.failMessage(res, "该用户不存在");
            }

        }
    });
}

//注销
var LogOut = function (req, res) {
    global.cach_server.multi([
        ["del", req.params.token],
    ]).exec(function (err, replies) {
        console.log(err, replies);
    });
    msg_unit.successMessage(res, "注销完成");
}

//注册
var Register = function (req, res) {
    var data = req.body;
    console.log(data);
    var user = new User(data);

    md5.update(user.password);
    user.password = md5.digest("base64");

    User.count({name: user.name}).exec(function (err, result) {
        if (err) {
            msg_unit.failMessage(res, err);
        }
        else if (result <= 0) {
            user.save(function (err) {
                if (err) {
                    console.log(err)
                    msg_unit.failMessage(res, err);
                } else {
                    msg_unit.successMessage(res, null);
                }
            });
        } else {
            msg_unit.failMessage(res, "已存此用户");
        }
    })

}

var GetUser = function (req, res) {
    global.cach_server.get(req.params.token, function (err, obj) {
        console.log(obj);
        if (err) {
            msg_unit.failMessage(res, err);
        }
        if (obj) {
            var user = JSON.parse(obj);
            var time = user.update_date;
            //delete user.update_date;
            user.update_date = moment(time).format();
            msg_unit.successMessage(res, user);
        } else {
            msg_unit.failMessage(res, "未登录");
        }
    })
}

/***
 * 操作 积分
 * 1. 增加积分
 * 2. 减少积分
 *      先从数据库读取,再从保存数据库，接着再更新数据库记录
 */

var OpInteger = function (token, type, point, reason, transact, callback) {
    var op_type = type;
    var op_point = point;
    global.cach_server.get(token, function (err, obj) {
        if (err) {
            callback(err);
        }
        if (obj) {

            var user = JSON.parse(obj);
            var time = user.update_date;
            user.integral += op_point * op_type;
            user.update_date = moment(time).format();
            // 更缓存系统 用户信息内容
            global.cach_server.multi([
                ["set", token, JSON.stringify(user)],
            ]).exec(function (err, replies) {
                User.findByIdAndUpdate(token, {$set: {integral: user.integral}}).exec(function (err, result) {
                    //PointCard({});
                    if (err) {
                        callback(err);
                    }
                    else {
                        var data = {
                            user: token,
                            integral: point * type,
                            description: reason,
                        }
                        if (transact) {
                            data.transact = transact;
                        }
                        var pointCard = new PointCard(data);
                        pointCard.save(callback(err, result));
                    }
                });
            });
        } else {
            callback("未登录");
        }
    })
}


exports.LogIn = LogIn;
exports.LogOut = LogOut;
exports.Register = Register;
exports.GetUser = GetUser;
exports.OpInteger = OpInteger;