const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  user_phone: String,  //举报者手机号码（用户名）
  idea_id: String,  //被举报作品id
  idea_title: String,  //被举报作品标题
  report_type :String, //举报类别
  report_content: String,  //举报原因
  report_time: String  //举报时间
});

const Report = mongoose.model('Report', reportSchema, "report");

module.exports = Report;