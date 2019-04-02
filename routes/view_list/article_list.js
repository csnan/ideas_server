var express = require('express');
var router = express.Router();

let Idea = require('../../server/idea');

//渲染所有通过审核的文章
router.get("/", function(req, res, next) {
  Idea.find({
    type: 'article',
    pass: true
  },function(err, articles){
    res.render('article_list',{articles})
  })
})

module.exports = router;