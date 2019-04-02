var express = require('express');
var router = express.Router();

let Idea = require('../../server/idea');

//渲染所有通过审核的图片
router.get("/", function(req, res, next) {
  Idea.find({
    type: 'music',
    pass: true
  },function(err, music){
    res.render('music_list',{music});
  })
})

module.exports = router;