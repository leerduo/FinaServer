/**
 * Created by S.King on 2016/3/12.
 */
var mongoose = require('mongoose');

var PointCardSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    transact: {type: mongoose.Schema.Types.ObjectId, ref: "TransactGoodsModel"},
    integral: {type: Number, default: 10},
    description: {type: String}, // 添加积分原因,如登录\注册\等，会加积分
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now}
});

global.PointCardModel = mongoose.model("PointCardModel", PointCardSchema);