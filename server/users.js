const models = require('../models');
const User = models.User;

exports.save = function(content,callback){
  let user = new User(content);
  user.save(callback);
}

exports.find = function(condition,callback){
  User.find(condition,callback);
}

exports.findById = function(condition,callback){
  User.findById(condition,callback);
}

exports.remove = function(condition,callback){
  User.remove(condition,callback);
}

exports.update = function(condition,update,callback){
  User.update(condition,update,callback);
}