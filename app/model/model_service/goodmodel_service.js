/**
 * Created by S.King on 2016/3/9.
 */

var GoodModel_service = {};
var msg_unit = require("../../tools/message_unit.js");
var getAll = function getAllGood(page, res) {
    global.GoodModel.find({}).limit(10).skip(global.page_count * page).exec(function (err, result) {
        if (err)
            msg_unit.failMessage(res, err);
        else
            msg_unit.successMessage(res, result);
    });
}

/***
 * 新增分页
 * @param key
 * @param page
 * @param res
 */
var getKeyGood = function getKeyGood(key,page, res) {
    var page  = page;
    global.GoodModel.find({name: new RegExp(key)}).skip(global.count*page).exec(function (err, result) {
        if (err)
            msg_unit.failMessage(res, err);
        else
            msg_unit.successMessage(res, result);
    })
}

/***
 *  新增分页
 * @param Type
 * @param page
 * @param res
 */
var getTypeGood = function getTypeGood(Type,page, res) {

    var page  = page;
    global.GoodModel.find({type: new RegExp(Type)}).skip(global.count*page).exec(function (err, result) {
        if (err)
            msg_unit.failMessage(res, err);
        else
            msg_unit.successMessage(res, result);
    })
}

GoodModel_service.getAllGood = getAll;
GoodModel_service.getKeyGood = getKeyGood;
GoodModel_service.getTypeGood = getTypeGood;

exports.GoodModel_service = GoodModel_service;

