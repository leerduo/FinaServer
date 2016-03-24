/**
 * Created by S.King on 2016/3/16.
 */
var express = require('express');
var router = express.Router();
var router_config = require("../app/params/interface.json");
var Shop = require("../app/services/shop_service.js");
/* GET home page. */
router.post(router_config.addShop, function(req, res) {
    Shop.addShop(req,res);
});

router.get(router_config.delShop, function(req, res) {
    Shop.delShop(req,res);
});

router.get(router_config.getShop, function(req, res) {
    Shop.getShop(req,res);
});

router.get(router_config.upShop, function(req, res) {
    console.log("更新购物车");
    Shop.upShop(req,res);
});
module.exports = router;