var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoCt = mongodb.MongoClient;


/* GET home page. */
router.post('/', function (req, res, next) {
  var address = 'mongodb://127.0.0.1:27017/test';//链接数据库地址
  mongoCt.connect(address, (err, db) => {
    var register = db.collection('register')//链接表格
    register.find({'username': req.body.username}, {_id: 0}).toArray((err, result) => {//拿着前端传递过来的username去数据库查询

      if (err) {
        throw new Error();
      } else {
        console.log(result,111);
        if (result.length > 0) {//如果查到结果有数据
          res.send({"error": 1, "msg": "您输入的用户已经存在"})
        } else {//如果查到没结果，记录该数据
          register.insertOne({'username': req.body.username, 'password': req.body.password}, (err, data) => {
            if (err) {//记录数据失败
              throw new Error();
            } else {//记录成功
              res.send({"error": 0, "msg": "ok"})
            }
          })
        }
      }
    })
  })

});

module.exports = router;

