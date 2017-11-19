var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoCt = mongodb.MongoClient;


/* GET home page. */
router.post('/', function (req, res, next) {
  console.log('req.body.password:',req.body.password);//前端传递过来的输入框值
  var address = 'mongodb://127.0.0.1:27017/test';//链接数据库地址
  mongoCt.connect(address, (err, db) => {
    var register = db.collection('register')//链接表格
    register.find({'username': req.body.username}, {_id: 0}).toArray((err, result) => {//拿着前端传递过来的username去数据库查询
      console.log( '2查数据库对应row-result:',result);
      if (err) {
        throw new Error();
      } else {//库查询成功
        console.log('result[0].password：',result[0].password);
        if (!result.length) {//如果没有数据
          res.send({"error": 1, "msg": "您输入的用户不存在"})
        } else {//如果有数据
          if (result[0].password== req.body.password) {
            res.send({error: 0, msg: '登录成功'})
          } else {
            res.send({error: 1, msg: '用户名或者密码有误'});
          }
        }
      }
    })
  })

});

module.exports = router;


