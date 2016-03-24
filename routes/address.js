/**
 * Created by S.King on 2016/3/16.
 */

var express = require('express');
var router = express.Router();
var AddressService = require("../app/services/address_service.js");
var router_config = require("../app/params/interface.json");
/* GET home page. */
router.post(router_config.addAddress, function(req, res) {
    AddressService.addAddress(req,res);
});

router.get(router_config.delAddress, function(req, res) {
    AddressService.delAddress(req,res);
});


router.post(router_config.upAddress, function(req, res) {
    AddressService.upAddress(req,res);
});

router.get(router_config.getAddress, function(req, res) {
    AddressService.getAddress(req,res);
});
module.exports = router;