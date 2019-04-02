var express = require('express');
var router = express.Router();

let Idea = require('../server/idea');

//从数据库中查找全部作品数据
router.post('/findAllIdea',function(req,res,next){
  Idea.find({pass: true}, function(err, response){
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

//根据type从数据库中找出审核通过的相对应的作品类型
router.post('/findIdeaType',function(req,res,next){
  let type = req.body.type
  Idea.find({
    type: type,
    pass: true
  }, function(err, response) {
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
});

//根据type从数据库中找出审核通过并送上推荐的相对应的作品类型
router.post('/findRecommendType',function(req,res,next){
  let type = req.body.type
  Idea.find({
    type: type,
    pass: true,
    recommend: true
  }, function(err, response) {
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
});

//根据id找出相对应的作品详情页
router.post('/findOneIdea',function(req,res,next){
  let _id = req.body._id
  Idea.findById({
    _id: _id
  },function(err, response){
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

//根据id从数据库中找出该用户的作品
router.post('/findAuthorIdea',function(req,res,next){
  let author_id = req.body.author_id
  Idea.find({
    author_id: author_id,
    pass: true
  }, function(err, response) {
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
});

//根据id从数据库删除对应的作品
router.post('/delIdea',function(req,res,next){
  let idea_id = req.body.idea_id
  Idea.remove({_id: idea_id },function(err){
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


//模糊搜索
router.post('/findIdeaName',function(req,res,next){
  let idea_title = req.body.idea_title
  let reg = new RegExp(idea_title,'i')
  Idea.find({
    idea_title: {$regex : reg},
    pass: true
  }, function(err, response) {
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
});

//查询所有关注的用户作品
router.post('/findFocusIdea', function(req, res, next) {
  let _ids = req.body._ids

  Idea.find({
    author_id: { $in: _ids}
  }, function(err, response) {
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

module.exports = router;