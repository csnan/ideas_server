const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
  user_id: String,  //用户id
  history_content: String  //历史记录
});

const History = mongoose.model('History', historySchema, "history");

module.exports = History;