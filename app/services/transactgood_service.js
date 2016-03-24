/**
 * Created by S.King on 2016/3/15.
 */

var Transact = require("../model/model_service/transactgoodmodel_service.js");

exports.creTransactGood = function getKeyGood(req, res) {
    Transact.creTransactGood(req, res)
}

exports.yetTransactGood = function getKeyGood(req, res) {
    Transact.yetTransactGood(req, res)
}


exports.payTransactGood = function getKeyGood(req, res) {
    Transact.payTransactGood(req, res)
}

exports.getTransactGood = function getKeyGood(req, res) {
    Transact.getTransactGood(req, res)
}

exports.senTransactGood = function getKeyGood(req, res) {
    Transact.senTransactGood(req, res)
}

exports.gotTransactGood = function getKeyGood(req, res) {
    Transact.gotTransactGood(req, res)
}