var express = require('express');
var router = express.Router();

let User = require('../server/users');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//用户注册，向数据库中添加用户数据
router.post('/register', function (req, res, next) {
  let userId = req.body.userId
  let password = req.body.password
  let username = userId
  let headImg = "http://192.168.43.202:8080/images/upload/default/defaultImg.jpg"
  let coverImg = "http://192.168.43.202:8080/images/upload/default/defaultImg.jpg"
  let sex = "male"
  let introduction = "一个有想法的人"
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
        res.send({
          success: true,
          status: 0,
          message: '用户名已存在'
        });
      } else {
        //向数据库中添加用户数据
        User.save(json, function (err, response) {
          if (err) {
            console.log("err" + err)
            res.send({ success: false })
          } else {
            console.log(response)
            res.send({
              success: true,
              status: 1,
              message: '注册成功'
            })
          }
        })
      }
    }
  })
})

//用户登录，向数据库中查询用户数据
router.post('/login', function (req, res, next) {
  let userId = req.body.userId
  let password = req.body.password

  User.find({
    userId: userId,
    password: password
  }, function (err, response) {
    if (err) {
      console.log("err" + err)
      res.send({ 
        success: false,
        message: '查询失败'
      })
    }
    else {
      console.log(response)
      res.send({
        success: true,
        message: '查询成功',
        resultList: response
      })
    }
  })
})

//用户修改密码
router.post('/updatePassword',function(req, res, next){
  let userId = req.body.userId
  let password = req.body.password
  let json = { password }

  User.update({
    userId: userId
  }, json, function(err) {
    if(err){
      console.log("err"+err)
      res.send({ 
        success: false,
        message: '更新失败'
      })
    } else {
      User.find({
        userId: userId
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
    }
  })
})

//查找用户资料，查找数据库用户数据
router.post('/findUserInfo',function(req, res, next){
  let _id = req.body._id
  User.findById({
    _id: _id
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

//更新用户资料，更新数据库用户数据
router.post('/updateUserInfo',function(req, res, next){
  let _id = req.body._id
  let username = req.body.username
  let sex = req.body.sex
  let introduction = req.body.introduction
  let json = { username, sex, introduction }

  User.update({
    _id: _id
  }, json, function(err) {
    if(err){
      console.log("err"+err)
      res.send({ 
        success: false,
        message: '更新失败'
      })
    } else {
      User.findById({
        _id: _id
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
    }
  })
})

//添加关注
router.post('/addFocus', function(req, res, next) {
  let _id = req.body._id
  let focus_id = req.body.focus_id

  User.update({_id: _id},{'$push': {
    focus_id: focus_id
  }},function(err, response){
    if(err){
      console.log("err"+err)
      res.send({ 
        success: false,
        message: '更新失败'
      })
    } else {
      User.findById({
        _id: _id
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
    }
  })
})

//取消关注
router.post('/delFocus', function(req, res, next) {
  let _id = req.body._id
  let focus_id = req.body.focus_id

  User.update({_id: _id},{'$pull': {
    focus_id: focus_id
  }},function(err, response){
    if(err){
      console.log("err"+err)
      res.send({ 
        success: false,
        message: '更新失败'
      })
    } else {
      User.findById({
        _id: _id
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
    }
  })
})


//查询多个用户信息
router.post('/findArrayIdUser', function(req, res, next) {
  let _ids = req.body._ids

  User.find({
    _id: { $in: _ids}
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

//添加收藏
router.post('/addCollection', function(req, res, next) {
  let user_id = req.body.user_id
  let collection_id = req.body.collection_id

  User.update({_id: user_id},{'$push': {
    collection_id: collection_id
  }},function(err, response){
    if(err){
      console.log("err"+err)
      res.send({ 
        success: false,
        message: '更新失败'
      })
    } else {
      User.findById({
        _id: user_id
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
    }
  })
})

//删除收藏
router.post('/delCollection', function(req, res, next) {
  let user_id = req.body.user_id
  let collection_id = req.body.collection_id

  User.update({_id: user_id},{'$pull': {
    collection_id: collection_id
  }},function(err, response){
    if(err){
      console.log("err"+err)
      res.send({ 
        success: false,
        message: '更新失败'
      })
    } else {
      User.findById({
        _id: user_id
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
    }
  })
})

module.exports = router;
