const models = require('../models');
const Swipe = models.Swipe;

exports.save = function(content,callback){
    let swipe = new Swipe(content);
    swipe.save(callback);
}

exports.find = function(condition,callback){
    Swipe.find(condition,callback);
}

exports.findById = function(condition,callback){
    Swipe.findById(condition,callback);
}

exports.remove = function(condition,callback){
    Swipe.remove(condition,callback);
}

exports.update = function(condition,update,callback){
    Swipe.update(condition,update,callback);
}
