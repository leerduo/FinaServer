/**
 * Created by S.King on 2016/3/15.
 */
var msg_unit = require("../../tools/message_unit.js");
var UserAddress = global.UserAddressModel;

/***
 * 添加地址
 * @param req
 * @param res
 */
exports.addAddress = function (req, res) {
    var address = req.body;
    console.log(address);
    var user_token = req.params.token;
    address.user = user_token;
    var user_address = new UserAddress(address);
    global.cach_server.get(user_token, function (err) {
        if (err) {
            msg_unit.failMessage(res, "请先登录");
        }
        user_address.save(function (err) {
            if (err) {
                msg_unit.failMessage(res, err);
            }
            else {
                msg_unit.successMessage(res, "successful");
            }
        });
    });
}

/***
 * 编辑地址
 * @param req
 * @param res
 */
exports.upAddress = function (req, res) {
    var address_id = req.params.id;
    var user_token = req.params.token;
    var user_address = req.body;
    global.cach_server.get(user_token, function (err, result) {
            if (err) {
                msg_unit.failMessage(res, "请先登录");
            }
            else {
                UserAddress.findByIdAndUpdate(address_id, user_address).exec(function (err, result) {
                    if (err) {
                        msg_unit(res, err);
                    } else {
                        msg_unit.successMessage(res, "successful");
                    }
                })
            }
        }
    );
}

/***
 * 删除地址
 * @param req
 * @param res
 */
exports.delAddress = function (req, res) {
    var address_id = req.params.id;
    var user_token = req.params.token;
    global.cach_server.get(user_token, function (err, result) {
            if (err) {
                msg_unit.failMessage(res, "请先登录");
            }
            else {
                UserAddress.remove({_id: address_id}).exec(function (err, result) {
                    if (err) {
                        msg_unit(res, err);
                    } else {
                        msg_unit.successMessage(res, "successful");

                    }
                })
            }
        }
    );
}

/***
 * 获取地址列表 ok
 * @param req
 * @param res
 */
exports.getAddress = function (req, res) {
    var user_token = req.params.token;
    var page = req.params.page;
    if (page)
        page = 0;
    global.cach_server.get(user_token, function (err, result) {
            if (err) {
                msg_unit.failMessage(res, "请先登录");
            }
            else {
                UserAddress.find({user: user_token},"_id phone description country province city").skip(global.page_count * page).exec(function (err, result) {
                    if (err) {
                        msg_unit(res, err);
                    } else {
                        msg_unit.successMessage(res, result);
                    }
                })
            }
        }
    );
}