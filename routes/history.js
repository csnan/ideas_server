var express = require('express');
var router = express.Router();

let History = require('../server/history');


//查找所有历史纪录
router.post('/findAllHistory',function(req,res,next){
  History.find(function(err, response){
    if(err){
      console.log("err"+err)
      res.send({ 
        success: false,
        message: '查询失败'
      })
    } else {
      console.log(response)
      res.send({
        success: true,
        message: '查询成功',
        resultList: response
      })
    }
  })
})

//添加历史记录
router.post('/addHistory', function(req, res, next) {
  let  history_content = req.body.history_content
  let json = { history_content }
  History.save(json,function(err, response){
    if(err){
      console.log("err"+err)
      res.send({ 
        success: false,
        message: '添加失败'
      })
    } else {
      console.log(response)
      res.send({
        success: true,
        message: '添加成功',
        resultList: response
      })
    }
  })
})

//根据id从数据库删除对应的历史纪录
router.post('/delHistory',function(req,res,next){
  let history_id = req.body.history_id
  History.remove({_id: history_id },function(err, response){
     if(err){
      console.log("err"+err)
      res.send({ 
        success: false,
        message: '删除失败'
      })
     }else{
      console.log(response)
      res.send({
        success: true,
        message: '删除成功',
        resultList: response
      })
     }
  });
});


module.exports = router;