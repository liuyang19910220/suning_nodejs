var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
var mongoCt=mongodb.MongoClient;


/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.query);//前端请求携带data数据
  var address='mongodb://127.0.0.1:27017/test';//链接数据库地址
  mongoCt.connect(address,(err,db)=>{
    var cart=db.collection('list')//链接表格
    cart.find({}).toArray((err,result)=>{//数据处理
      // console.log(err);
      // console.log(result);
      res.send(result);//前端接收数组
    })
  })

});

module.exports = router;
