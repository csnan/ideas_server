var express = require('express');
var router = express.Router();

let User = require('../../server/users');
let Idea = require('../../server/idea');

//后台渲染所用用户
router.get("/", function(req, res, next) {
  User.find({},function(err,users){
    res.render('users_list',{users});
  });
})

//后台删除指定id用户并删除该用户的所有作品
router.post('/delUser',function(req,res,next){
  let user_id = req.body.user_id
  User.remove({_id: user_id },function(err){
    let response = {};
     if(err){
       response['status'] = 'error';
       console.log(err);
       throw err;
     }else{
      Idea.remove({author_id: user_id },function(err){
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
     }
  });
});

//查询指定id用户
router.post("/findOneUser", function(req, res, next) {
  let user_id = req.body.user_id
  User.findById({
    _id: user_id
  },function(err, response){
    if(err){
      console.log("err"+err)
      res.send({ 
        success: false,
        message: '查询失败'
      })
    }else{
      console.log(response)
      res.send({
        success: true,
        message: '查询成功',
        resultList: response
      })
    }
  })
})

//修改用户信息
router.post('/updateUser',function(req, res, next){
  let user_id = req.body.user_id
  let userId = req.body.userId
  let password = req.body.password
  let username = req.body.username
  let headImg = req.body.headImg
  let coverImg = req.body.coverImg
  let sex = req.body.sex
  let introduction = req.body.introduction
  let json = { userId, password, username, headImg, coverImg, sex, introduction }

  User.update({
    _id: user_id
  }, json, function(err) {
    if(err){
      console.log("err"+err)
      res.send({ 
        success: false,
        message: '更新失败'
      })
    } else {
      User.find({},function(err,users){
        res.render('users_list',{users});
      });
    }
  })
})

//添加用户
router.post('/addUser', function (req, res, next) {
  let userId = req.body.userId
  let password = req.body.password
  let username = req.body.username
  let headImg = req.body.headImg
  let coverImg = req.body.coverImg
  let sex = req.body.sex
  let introduction = req.body.introduction
  let register_time = req.body.register_time
  let json = { userId, password, username, headImg, coverImg, sex, introduction, register_time }

  //查询用户名是否存在
  User.find({
    userId: userId
  }, function (err, response) {
    if (err) {
      console.log("err" + err)
      res.send({ success: false })
    } else {
      if (response.length > 0) {
        console.log(response);
        User.find({},function(err,users){
          res.render('users_list',{users});
        });
      } else {
        //向数据库中添加用户数据
        User.save(json, function (err, response) {
          if (err) {
            console.log("err" + err)
            res.send({ success: false })
          } else {
            User.find({},function(err,users){
              res.render('users_list',{users});
            });
          }
        })
      }
    }
  })
})

module.exports = router;