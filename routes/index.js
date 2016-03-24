var express = require('express');
var router = express.Router();
var router_config = require("../app/params/interface.json");

/* GET home page. */
router.get(router_config.index, function(req, res, next) {
  res.json({ title:"欢迎来到 移动商城-飞街（FiNa）" });
  next()
});

module.exports = router;
