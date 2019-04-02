const models = require('../models');
const Idea = models.Idea;

exports.save = function(content,callback){
    let idea = new Idea(content);
    idea.save(callback);
}

exports.find = function(condition,callback){
    Idea.find(condition,callback);
}

exports.findById = function(condition,callback){
    Idea.findById(condition,callback);
}

exports.remove = function(condition,callback){
    Idea.remove(condition,callback);
}

exports.update = function(condition,update,callback){
    Idea.update(condition,update,callback);
}
