const models = require('../models');
const Report = models.Report;

exports.save = function(content,callback){
    let report = new Report(content);
    report.save(callback);
}

exports.find = function(condition,callback){
    Report.find(condition,callback);
}

exports.findById = function(condition,callback){
    Report.findById(condition,callback);
}

exports.remove = function(condition,callback){
    Report.remove(condition,callback);
}

exports.update = function(condition,update,callback){
    Report.update(condition,update,callback);
}
