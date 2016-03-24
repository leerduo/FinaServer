/**
 * Created by S.King on 2016/3/8.
 */

var qiniu = require("qiniu");

//构建上传策略函数
function qiniu_uptoken(key) {
    var putPolicy = new qiniu.rs.PutPolicy(global.qiniu_bucket+":"+key);
    return putPolicy.token();
}

//构造上传函数
function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
            // 上传成功， 处理返回值
            console.log(ret.hash, ret.key, ret.persistentId);
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
        }
    });
}
