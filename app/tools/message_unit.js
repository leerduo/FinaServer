/**
 * Created by S.King on 2016/3/8.
 */

//一个完整的消息
//var message = {
//    status:0,//0 success,1 error
//    error:null,
//    data:{},
//};

var successMsg = function successMessage(res, data) {
    var message = {};
    message.status = 0;
    message.data = data;
    res.json(message);
}

var failMsg = function failMessage(res, fail) {
    var message = {};
    message.status = 1;
    message.error = fail;
    res.json(message);
}

exports.successMessage = successMsg;
exports.failMessage = failMsg;