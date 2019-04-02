var express = require('express');
var router = express.Router();

let Swipe = require('../../server/swipe');

//渲染所有轮播图
router.get("/", function(req, res, next) {
  Swipe.find(function(err, swipe){
    res.render('swipe_list',{swipe});
  })
})

//查找所有轮播图
router.post('/findAllSwipe',function(req,res,next){
  Swipe.find(function(err, response){
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

//添加轮播图
router.post('/addSwipe', function(req, res, next) {
  let  swipe_image = req.body.swipe_image
  let json = { swipe_image }
  Swipe.save(json,function(err, response){
    if(err){
      //console.log("err"+err)
      res.send({ 
        success: false,
        message: '上传失败'
      })
    } else {
      Swipe.find(function(err, response) {
        if(err){
          //console.log("err"+err)
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
    }
  })
})

//根据id从数据库删除对应的轮播图
router.post('/delSwipe',function(req,res,next){
  let swipe_id = req.body.swipe_id
  Swipe.remove({_id: swipe_id },function(err){
    let response = {};
     if(err){
       response['status'] = 'error';
       console.log(err);
       throw err;
     }else{
      response['status'] = 'ok';
      res.send(response);
     }
  });
});


module.exports = router;