/**
 * Created by S.King on 2016/3/8.
 */
var mongoose = require('mongoose');

var GoodSchema = mongoose.Schema({
    seller: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    description:String,
    store_count:{type:Number,default:0},
    price:Number,
    picture:Array,
    html:Buffer,
    type:String,
    create_date:{type:Date,default:Date.now},
    update_date:{type:Date,default:Date.now}
})

global.GoodModel = mongoose.model("GoodModel",GoodSchema);
