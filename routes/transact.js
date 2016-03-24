/**
 * Created by S.King on 2016/3/15.
 */
var express = require('express');
var router = express.Router();
var TransactGoodService = require("../app/services/transactgood_service.js");
var router_config = require("../app/params/interface.json");

/***
 * 创建订单 ok
 */
router.post(router_config.creTransact, function (req, res) {
    TransactGoodService.creTransactGood(req, res);
});

/***
 * 未付款 ok
 */
router.get(router_config.yetTransact, function (req, res) {
    TransactGoodService.yetTransactGood(req, res);
});

/***
 * 付款回调 ok
 */
router.get(router_config.payTransact, function (req, res) {
    TransactGoodService.payTransactGood(req, res);
});

/***
 * 未收货 ok
 */
router.get(router_config.getTransact, function (req, res) {
    console.log("未收货");
    TransactGoodService.getTransactGood(req, res);
});


/***
 * 确认收货 ok
 */
router.get(router_config.senTransact, function (req, res) {
    TransactGoodService.senTransactGood(req, res);
});

router.get(router_config.gotTransact, function (req, res) {
    TransactGoodService.gotTransactGood(req, res);
});

module.exports = router;