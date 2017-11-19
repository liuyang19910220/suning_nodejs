var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
var mongoCt=mongodb.MongoClient;


/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.query);//前端请求携带data数据
  var address='mongodb://127.0.0.1:27017/test';
  mongoCt.connect(address,(err,db)=>{
    var list=db.collection('list')
    list.find({}).toArray((err,result)=>{
      // console.log(err);
      // console.log(result);
      res.send(result);
    })
  })

});

module.exports = router;
