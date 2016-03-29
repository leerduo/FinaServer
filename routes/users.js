var express = require('express');
var router = express.Router();
var UserService = require("../app/services/user_service.js");
var router_config = require("../app/params/interface.json");
/* GET users listing. */
router.post(router_config.registerUser, function(req, res) {
    UserService.Register(req,res);
});

router.post(router_config.signInUser,function(req,res){
    UserService.LogIn(req,res);
})

router.get(router_config.signOutUser,function(req,res){
    UserService.LogOut(req,res);
})

router.get(router_config.getUser,function(req,res){
    UserService.GetUser(req,res);
})

router.get(router_config.checkPoint,function(req,res){
    UserService.CheckUser(req,res);
});

router.get(router_config.addRelPoint,function(req,res){
    UserService.addRelPoint(req,res);
});

module.exports = router;

