/**
 * Created by S.King on 2016/3/12.
 */
var mongoose = require('mongoose');

var TransactGoodsSchema = mongoose.Schema({
    good: {type: mongoose.Schema.Types.ObjectId, ref: "GoodModel"},
    seller: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    address: {type: mongoose.Schema.Types.ObjectId, ref: "UserAddressModel"},
    count: Number,
    sum_price: Number,
    logistics: String,//物流编号
    company: String,//物流公司
    is_valid:{type:Boolean,default:true},
    is_pay: {type: Boolean, default: false}, //用于在支付界面的回调操作
    is_received: {type: Boolean, default: false},
    is_send: {type: Boolean, default: false},
    integral: {type: Number, default: 10, index: true},//积分
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now}
})

global.TransactGoodsModel = mongoose.model("TransactGoodsModel", TransactGoodsSchema);