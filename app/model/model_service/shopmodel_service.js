/**
 * Created by S.King on 2016/3/14.
 * @descript:购物
 */
var msg_unit = require("../../tools/message_unit.js");
var UserShop = global.UserShopModel;

/***
 * 添加到购物车
 * @param req
 * @param res
 */
exports.addShop = function (req, res) {
    var shop = req.body;
    var user_token = req.params.token;
    shop.buyer = user_token;
    var shop = new UserShop(shop);
    global.cach_server.get(user_token, function (err, result) {
        if (err||result == null) {
            msg_unit.failMessage(res, "请先登录");
        }
        shop.save(function (err, result) {
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
 * 编辑购物车
 * @descripiton:
 *  当用户编辑购物车后,返回一个标记，客户端需要 刷新后才能操作之后的数据
 * @param req
 * @param res
 */
exports.upShop = function (req, res) {
    var shop_id = req.params.id;
    var user_token = req.params.token;
    var shop_count = parseInt(req.params.count);
    global.cach_server.get(user_token, function (err, result) {
            if (err||result == null) {
                msg_unit.failMessage(res, "请先登录");
            }
            else {
                UserShop.findByIdAndUpdate(shop_id, {$set: {count: shop_count}}).exec(function (err, result) {
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
 * 从购物车中删除 ok
 * @description: 每当用户付款完毕后，均删除该用户的购物表，但所有交易不会删除
 * @param req
 * @param res
 */
exports.delShop = function (req, res) {
    var shop_id = req.params.id;
    var user_token = req.params.token;
    global.cach_server.get(user_token, function (err, result) {
            if (err||result == null) {
                msg_unit.failMessage(res, "请先登录");
            }
            else {
                UserShop.remove({_id: shop_id}).exec(function (err, result) {
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
 * 获取购物车列表 ok
 * @param req
 * @param res
 */
exports.getShop = function (req, res) {
    var user_token = req.params.token;
    var page = req.params.page;
    global.cach_server.get(user_token, function (err, result) {
            if (err||result == null) {
                msg_unit.failMessage(res, "请先登录");
            }
            else {
                UserShop.find({buyer: user_token}).skip(global.page_count*page).exec(function (err, result) {
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
