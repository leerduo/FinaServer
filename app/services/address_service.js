/**
 * Created by S.King on 2016/3/16.
 */

var AddressService = require("../model/model_service/useraddressmodel_service.js");

exports.addAddress = function addAddress(req, res) {
    AddressService.addAddress(req,res);
}

exports.delAddress = function delAddress(req, res) {
    AddressService.delAddress(req, res)
}


exports.upAddress = function upAddress(req, res) {
    AddressService.upAddress(req, res)
}

exports.getAddress = function getAddress(req, res) {
    AddressService.getAddress(req, res)
}