var express = require('express');
var router = express.Router();

let Idea = require('../../server/idea');

//渲染所有通过审核的图片
router.get("/", function(req, res, next) {
  Idea.find({
    type: 'photo',
    pass: true
  },function(err, photo){
    res.render('photo_list',{photo});
  })
})

module.exports = router;