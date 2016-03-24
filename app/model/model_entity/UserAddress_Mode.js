/**
 * Created by S.King on 2016/3/8.
 */
var mongoose = require('mongoose');

var UserAddressSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"},
    phone:String,
    description: String,
    country:String,
    province: String,
    city: String,
    create_date: {type: Date, default: Date.now},
    update_date: {type: Date, default: Date.now}
})

global.UserAddressModel = mongoose.model("UserAddressModel", UserAddressSchema);