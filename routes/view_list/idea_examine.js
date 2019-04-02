var express = require('express');
var router = express.Router();

let Idea = require('../../server/idea');

//渲染全部需要审核的作品到后台界面
router.get("/", function(req, res, next) {
  Idea.find({pass: false},function(err,idea){
  res.render('idea_examine',{idea});
  });
})

//审核通过
router.post('/pass',function(req,res,next){
  let idea_id = req.body.idea_id
  let pass = true
  let json = {pass}
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
     }
  })
})

module.exports = router;