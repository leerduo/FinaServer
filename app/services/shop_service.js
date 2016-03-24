/**
 * Created by S.King on 2016/3/16.
 */

var Shop = require("../model/model_service/shopmodel_service.js");

exports.getShop = function getShop(req, res) {
    Shop.getShop(req, res);
}

exports.addShop = function addShop(req, res) {
    Shop.addShop(req, res);
}


exports.upShop = function upShop(req, res) {
    Shop.upShop(req, res);
}

exports.delShop = function delShop(req, res) {
    Shop.delShop(req, res);
}
