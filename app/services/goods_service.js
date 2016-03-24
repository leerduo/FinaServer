/**
 * Created by S.King on 2016/2/23.
 * 负责构造一个完整的消息结构，并实现业务逻辑
 */

var GoodService = require("../model/model_service/goodmodel_service.js").GoodModel_service;

exports.getAllGood = function getAllGood(req, res) {
    GoodService.getAllGood(req.params.page,res);
}

exports.getKeyGood = function getKeyGood(req, res) {
    GoodService.getKeyGood(req.params.key,req.params.page, res)
}


exports.getTypeGood = function getTypeGood(req, res) {
    GoodService.getTypeGood(req.params.type,req.params.page, res)
}