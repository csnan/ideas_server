var express = require('express');
var router = express.Router();

let Idea = require('../server/idea');

//添加评论
router.post('/addComment', function(req, res, next) {
  let  idea_id = req.body.idea_id
  let  comment_name = req.body.comment_name
  let  comment_headImg = req.body.comment_headImg
  let  comment_time = req.body.comment_time
  let  comment_content = req.body.comment_content
  let  comment_like = 0
  Idea.update({_id: idea_id},{'$push': {
    comments: [{
      comment_name: comment_name,
      comment_headImg: comment_headImg,
      comment_time: comment_time,
      comment_content: comment_content,
      comment_like: comment_like,  
    }]
  }},function(err, response){
    if(err){
      console.log("err"+err)
      res.send({ 
        success: false,
        message: '更新失败'
      })
    } else {
      console.log(response)
      res.send({
        success: true,
        message: '更新成功',
        resultList: response
      })
    }
  })
})

module.exports = router;