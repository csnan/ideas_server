var express = require('express');
var router = express.Router();

let Report = require('../../server/report');

//渲染所有的举报信息到后台界面
router.get("/", function(req, res, next) {
  Report.find(function(err,report){
    res.render('report_list',{report});
  });
})

//添加举报
router.post('/addReport', function(req, res, next) {
  let user_phone = req.body.user_phone
  let idea_id = req.body.idea_id
  let idea_title = req.body.idea_title
  let report_type = req.body.report_type
  let report_content = req.body.report_content
  let report_time = req.body.report_time
  let json = { user_phone, idea_id, idea_title, report_type, report_content, report_time }
  Report.save(json,function(err, response){
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

//根据id从数据库删除对应的举报
router.post('/delReport',function(req,res,next){
  let report_id = req.body.report_id
  Report.remove({_id: report_id },function(err, response){
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