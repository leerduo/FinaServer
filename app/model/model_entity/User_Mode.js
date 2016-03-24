/**
 * Created by S.King on 2016/3/8.
 */
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: {type:String,unique: true},
    sex:{type:Boolean},
    phone:String,
    password:String,
    picture:String,
    type:{type:String,default:"normal"},
    integral:{type:Number,default:0},//积分
    loc: [],//地理位置
    create_date:{type:Date,default:Date.now},
    update_date:{type:Date}
})

global.UserModel = mongoose.model("UserModel",UserSchema);