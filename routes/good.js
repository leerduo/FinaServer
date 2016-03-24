/**
 * Created by S.King on 2016/3/9.
 */
var express = require('express');
var router = express.Router();
var GoodService = require("../app/services/goods_service.js");
var router_config = require("../app/params/interface.json");
/* GET home page. */
router.get(router_config.getGoods, function(req, res) {
    GoodService.getAllGood(req,res);
});

router.get(router_config.getGoodsByKey, function(req, res) {
    GoodService.getKeyGood(req,res);
});


router.get(router_config.getGoodsByType, function(req, res) {
    GoodService.getTypeGood(req,res);
});

module.exports = router;