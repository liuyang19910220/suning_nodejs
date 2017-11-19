//此路由响应首页的‘猜你喜欢’
var express = require('express');
var router = express.Router();//创建子服务
var mongodb=require('mongodb');
var mongoCt=mongodb.MongoClient;


/* GET home page. */  //子路由响应“/”，意思是主服务下面的‘/’
router.get('/', function(req, res, next) {
  // console.log(req.query);
  var address='mongodb://127.0.0.1:27017/test';
  mongoCt.connect(address,(err,db)=>{
    var guess=db.collection('guess')
    guess.find({},{_id:0}).toArray((err,result)=>{
      // console.log(err);
      // console.log(result);
      res.send(result);
    })
  })

});

module.exports = router;
