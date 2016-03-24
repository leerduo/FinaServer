/**
 * Created by S.King on 2016/2/23.
 */
var UserService = require("../model/model_service/usermodel_service.js");
var msg_unit = require("../tools/message_unit.js");
var point_config = require("../params/point_config.json");
exports.Register = function Register(req, res) {
    UserService.Register(req,res);
}

exports.LogIn = function LogIn(req,res){
    UserService.LogIn(req,res);
}

exports.LogOut=function LogOut(req,res){
    UserService.LogOut(req,res);
}

exports.GetUser = function GetUser(req,res){
    UserService.GetUser(req,res);
}

/***
 * 签到
 * @param req
 * @param res
 * @constructor
 */
exports.CheckUser = function OpPoint(req,res){
    UserService.OpInteger(req.params.token,1,point_config.add_point_for_transact_check,"登录",null,function(err,result)
    {
        if(err){
           msg_unit.failMessage(res,"积分操作失败");
        }else
        {
            console.log(result);
            msg_unit.successMessage(res,"successful");
        }
    })
}