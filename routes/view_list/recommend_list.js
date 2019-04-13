var express = require('express');
var router = express.Router();

let Idea = require('../../server/idea');

//渲染推荐的作品到后台界面
router.get("/", function(req, res, next) {
  Idea.find({recommend: true},function(err,idea){
    res.render('recommend_list',{idea});
  });
})

//查找所有推荐作品
router.post("/findAllRecommend", function(req, res, next) {
  Idea.find({recommend: true}, function(err, response) {
    if(err){
      console.log("err"+err)
      res.send({ 
        success: false,
        message: '查询失败'
      })
    }
    else{
      console.log(response)
      res.send({
        success: true,
        message: '查询成功',
        resultList: response
      })
    }
  });
})

//送上推荐
router.post('/recommend',function(req,res,next){
  let idea_id = req.body.idea_id
  let type = req.body.type
  let recommend = true
  let json = {recommend}
  //json,回调
  Idea.update({_id: idea_id}, json, function(err){
    let response = {};
     if(err){
       response['status'] = 'error';
       console.log(err);
       throw err;
     }else{
       if(type == 'article') {
        Idea.find({
          type: 'article',
          pass: true
        },function(err, articles){
          res.render('article_list',{articles})
        })
       } else if(type == 'photo') {
        Idea.find({
          type: 'photo',
          pass: true
        },function(err, photo){
          res.render('photo_list',{photo});
        })
       } else if(type == 'music') {
        Idea.find({
          type: 'music',
          pass: true
        },function(err, music){
          res.render('music_list',{music});
        })
       } else {
        Idea.find({
          type: 'video',
          pass: true
        },function(err, video){
          res.render('video_list',{video});
        })
       }
     }
  })
})

//删除推荐
router.post('/delRecommend',function(req,res,next){
  let idea_id = req.body.idea_id
  let recommend = false
  let json = {recommend}
  //json,回调
  Idea.update({_id: idea_id}, json, function(err){
    let response = {};
     if(err){
       response['status'] = 'error';
       console.log(err);
       throw err;
     }else{
      response['status'] = 'ok';
      res.send(response);
      Idea.find({recommend: true},function(err,idea){
        res.render('recommend_list',{idea});
      });
     }
  })
})

module.exports = router;