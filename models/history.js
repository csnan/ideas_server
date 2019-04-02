const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
  history_content: String
});

const History = mongoose.model('History', historySchema, "history");

module.exports = History;