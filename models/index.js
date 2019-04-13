const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ideas',function(err){
    if(err){
          console.log("连接失败");
    }else{
          console.log("连接成功");
    }
});

exports.User = require('./users');
exports.Idea = require('./idea');
exports.Swipe = require('./swipe');
exports.History = require('./history');
exports.Report = require('./report');