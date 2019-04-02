const models = require('../models');
const History = models.History;

exports.save = function(content,callback){
    let history = new History(content);
    history.save(callback);
}

exports.find = function(condition,callback){
    History.find(condition,callback);
}

exports.findById = function(condition,callback){
    History.findById(condition,callback);
}

exports.remove = function(condition,callback){
    History.remove(condition,callback);
}

exports.update = function(condition,update,callback){
    History.update(condition,update,callback);
}
