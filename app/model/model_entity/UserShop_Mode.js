/**
 * Created by S.King on 2016/3/12.
 */
var mongoose = require('mongoose');

var UserShopSchema = mongoose.Schema({
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    goods: {type: mongoose.Schema.Types.ObjectId, ref: "GoodModel"},
    count: {type: Number},
    is_payed: {type: Boolean, default: false},
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now}
})

global.UserShopModel = mongoose.model("UserShopModel", UserShopSchema);