const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  userId: String,  //手机号
  password: String,  //密码
  username: String,  //昵称
  headImg: String,  //头像
  coverImg: String,  //个人主页背景
  sex: String,  //性别
  introduction: String,  //个人简介
  register_time: String,  //注册时间
  focus_id: Array,  //关注
  collection_id: Array,  //收藏
  footprint_id: Array  //足迹
});

const User = mongoose.model('User', usersSchema, "user");

module.exports = User;