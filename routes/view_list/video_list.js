var express = require('express');
var router = express.Router();

let Idea = require('../../server/idea');

//渲染所有通过审核的图片
router.get("/", function(req, res, next) {
  Idea.find({
    type: 'video',
    pass: true
  },function(err, video){
    res.render('video_list',{video});
  })
})

module.exports = router;