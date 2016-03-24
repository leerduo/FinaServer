/**
 * Created by S.King on 2016/3/17.
 * 一张用于描述 :用户积分添加原因的列表
 */

var msg_unit = require("../../tools/message_unit.js");
var PointCard = global.PointCardModel;

/***
 * 从 积分原因 添加
 * @param token
 * @param integer
 * @param description
 * @param callback
 */
exports.addPoint = function (token, integer, description, callback) {
    var Point = {
        user: token,
        integral: integer,
        description: description, // 添加积分原因,如登录\注册\等，会加积分
    };
    var pointCard = new PointCard(Point);
    pointCard.save(function (err, result) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, "successful")
            }
        }
    )
}

/***
 * 从 积分原因 中删除
 *
 * @param token
 * @param id
 * @param callback
 */
exports.delPoint = function (token, transact, callback) {
    PointCard.remove({user: token, transact: transact}).exec(function (err, result) {
        if (err) {
            callback(err, result);
        }
        else(
            callback(null, "successful")
        )
    });
}