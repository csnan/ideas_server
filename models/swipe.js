const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const swipeSchema = new Schema({
  //轮播图
  swipe_image: String
});

const Swipe = mongoose.model('Swipe', swipeSchema, "swipe");

module.exports = Swipe;