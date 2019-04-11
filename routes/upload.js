var express = require('express');
var router = express.Router();
var multer  = require('multer');
var process = require("process");

let User = require('../server/users');
let Idea = require('../server/idea');

let uploadPath = process.cwd() + "/public/images/upload";
console.log("uploadPath", uploadPath);
var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
     destination: function (req, file, cb) {
         cb(null, uploadPath)
    }, 
  //给上传文件重命名，获取添加后缀名
   filename: function (req, file, cb) {
       var fileFormat = (file.originalname).split(".");
       cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
   
      }
});  
//添加配置文件到muler对象。
var upload = multer({
       storage: storage
 });

//上传
router.post('/upload', upload.any(), function(req, res, next) {
  console.log(req.files);
  res.send( req.files)
});
 
//上传用户头像，并向数据库中更新查找数据
router.post('/uploadHeadImg', upload.any(), function(req, res, next) {
  let _id = req.body._id
  let headImg = "http://192.168.43.202:8080/images/upload/" + req.files[0].filename;
  let json = { headImg }
  User.update({
    _id: _id
  }, json, function(err){
    if(err){
      console.log("err" + err)
      res.send({ 
        success: false,
        message: '更新失败'
      })
    }else{
      User.findById({
        _id: _id
      }, function(err, response){
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
    }
  })
})

//上传个人主页背景，并向数据库中更新查找数据
router.post('/uploadCoverImg', upload.any(), function(req, res, next) {
  let _id = req.body._id
  let coverImg = "http://192.168.43.202:8080/images/upload/" + req.files[0].filename
  let json = { coverImg }
  User.update({
    _id: _id
  }, json, function(err){
    if(err){
      console.log("err" + err)
      res.send({ 
        success: false,
        message: '更新失败'
      })
    }else{
      User.findById({
        _id: _id
      }, function(err, response){
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
    }
  })
})

//编辑上传作品(图片除外)，向数据库中添加作品数据
router.post('/uploadIdea', upload.any(), function(req,res,next){
  let type = req.body.type
  let author_id = req.body.author_id
  let author_phone = req.body.author_phone
  let author = req.body.author
  let author_img = req.body.author_img
  let idea_title = req.body.idea_title
  let idea_content = req.body.idea_content
  let idea_img = "http://192.168.43.202:8080/images/upload/" + req.files[0].filename
  let idea_images = req.body.idea_images
  let idea_file = req.body.idea_file
  let idea_time = req.body.idea_time
  let like_num = 0
  let read_num = 0
  let pass = req.body.pass
  let recommend = false

  let json = {
    type,
    author_id,
    author_phone,
    author,
    author_img,
    idea_title,
    idea_content,
    idea_img,
    idea_images,
    idea_file,
    idea_time,
    like_num,
    read_num,
    pass,
    recommend,
  }

  Idea.save(json,function(err, response) {
    if(err) {
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
});

//编辑上传图片，向数据库中添加图片数据
router.post('/uploadIdea/photo', function(req,res,next){
  let type = req.body.type
  let author_id = req.body.author_id
  let author_phone = req.body.author_phone
  let author = req.body.author
  let author_img = req.body.author_img
  let idea_title = req.body.idea_title
  let idea_content = req.body.idea_content
  let idea_images = req.body.idea_images
  let idea_time = req.body.idea_time
  let like_num = 0
  let read_num = 0
  let pass = req.body.pass
  let recommend = false

  let json = {
    type,
    author_id,
    author_phone,
    author,
    author_img,
    idea_title,
    idea_content,
    idea_images,
    idea_time,
    like_num,
    read_num,
    pass,
    recommend,
  }

  Idea.save(json,function(err, response) {
    if(err) {
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
});

module.exports = router;