/**
 * Created by S.King on 2016/3/14.
 *
 * 业务逻辑:
 * 0.购买
 *      创建订单
 *
 * 1.待付款
 *      付款
 *      取消订单 从mongoose 中删除
 * 2.未收货
 *      货物状态：未发货\发货
 *      确认收货
 *      查询物流:由客户端完成 物流查询
 *
 * 3.我的订单
 *      订单列表
 *
 * "creTransactGood":"/transact/cre/:token"
 *
 *"calTransact":"/pay/yet/:token/:id" 取消订单
 * "yetTransactGood":"/transact/pay/yet/:token/:page"    //is_pay:false
 * "payTransactGood":"/transact/pay/to_pay/:token/:id"  //跳转支付界面，付款，回调操作
 *
 * "getTransactGood":"/transact/all/:token",            //is_pay:true, is_received:false
 * "senTransactGood":"/transact/sen/:token/:id/:is_sen",//确认收货
 *
 * "gotTransactGood":"/transact/got/:token/:page",// is_pay:true,is_received:true,is_send:true
 *
 */
var msg_unit = require("../../tools/message_unit.js");
var moment = require('moment');
require('moment/locale/cs');
var TransactGood = global.TransactGoodsModel;

exports.creTransactGood = function (req, res) {
    var user_token = req.params.token;
    var data = req.body;
    global.cach_server.get(user_token, function (err, result) {
        if (err) {
            msg_unit.failMessage(res, "请先登录");
        }
        var transact = new TransactGood(data);

        transact.save(function (err, result) {
            if (err) {
                msg_unit.failMessage(res, err);
            }
            else {
                msg_unit.successMessage(res, {transact: result._id});
            }
        });
    });

}

/***
 * 待付款
 * @param req
 * @param res
 */
exports.yetTransactGood = function (req, res) {
    var user_token = req.params.token;
    var page = req.params.page;
    global.cach_server.get(user_token, function (err, result) {
        if (err) {
            msg_unit.failMessage(res, "请先登录");
        }

        TransactGood.find({is_pay: false}, "good  count sum_price update_date ")
            .populate("good", "name picture ")
            .limit(10)
            .sort({update_date: -1})
            .skip((page - 1) * global.page_count)
            .exec(function (err, result) {
                if (err) {
                    msg_unit.failMessage(res, err);
                }
                else {
                    msg_unit.successMessage(res, result);
                }
            });
    });
}

/***
 * 取消订单
 * @param req
 * @param res
 */
exports.calTransactGood = function (req, res) {

    var user_token = req.params.token;
    var id = req.params.id;
    global.cach_server.get(user_token, function (err, result) {
        if (err) {
            msg_unit.failMessage(res, "请先登录");
        }
        TransactGood.remove({_id:id})
            .exec(function (err, result) {
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
 * 付款
 * @param req
 * @param res
 */
exports.payTransactGood = function (req, res) {
    var user_token = req.params.token;
    var id = req.params.id;
    global.cach_server.get(user_token, function (err, result) {
        if (err) {
            msg_unit.failMessage(res, "请先登录");
        }

        TransactGood.findByIdAndUpdate(id, {$set: {is_pay: true}}).populate("good", "name picture ")
            .exec(function (err, result) {
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
 * 未收货
 */
exports.getTransactGood = function (req, res) {
    TransactGood.find({
            is_pay: true,
            is_received: false,
            buyer: req.params.token
        }, "good  count sum_price update_date ")
        .sort({update_date: -1}).populate("good", "name picture ").exec(function (err, result) {
        if (err) {
            msg_unit.failMessage(res, err);
        }
        else {
            msg_unit.successMessage(res, result);
        }
    });
}

/***
 * 确认收货
 */
exports.senTransactGood = function (req, res) {
    var user_token = req.params.token;
    global.cach_server.get(user_token, function (err, result) {
        if (err) {
            msg_unit.failMessage(res, "请先登录");
        }

        /***
         * 判断是否 1.付款 2.发货
         */
        TransactGood.findOne({id: req.params.id, is_pay: true, is_send: true}, "id").exec(function (err, result) {
            if (err) {
                msg_unit.failMessage(res, err);
            }
            TransactGood.findByIdAndUpdate(req.params.id, {$set: {is_received: true}}).exec(function (err, result) {
                if (err) {
                    msg_unit.failMessage(res, err);
                }
                else {
                    msg_unit.successMessage(res, "successful");
                }
            })
        })

    });
}

/***
 * 历史订单 ok
 * @param req
 * @param res
 */
exports.gotTransactGood = function (req, res) {
    var user_token = req.params.token;
    global.cach_server.get(user_token, function (err, result) {
        if (err) {
            msg_unit.failMessage(res, "请先登录");
        }

        TransactGood.find({
            buyer: req.params.token,
            is_pay: true,
            is_received: true,
            is_send: true
        }, "good  count sum_price update_date ").populate("good", "name picture ").exec(function (err, result) {
            if (err) {
                msg_unit.failMessage(res, err);
            }
            else {
                msg_unit.successMessage(res, result);
            }
        })
    });
}
