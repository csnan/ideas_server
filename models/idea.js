const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ideaSchema = new Schema({
  type: String,  //作品类型
  author_id: String,  //作者id（数据库id）
  author: String,  //作者昵称
  author_img: String,  //作者头像
  idea_title: String,  //作品标题
  idea_content: String,  //作品内容或简介
  idea_img: String,  //作品封面
  idea_images: Array,  //作品图片集
  idea_file: String,  //作品文件
  idea_time: String,  //作品时间
  like_num: Number,  //点赞数
  like_user: Array, //点赞用户
  read_num: Number,  //访问量
  pass: Boolean,  //审核通过
  recommend: Boolean,  //文章推荐
  comments:[  //评论
    {
      comment_id: String,  //评论id
      comment_name: String,  //评论用户昵称
      comment_headImg: String,  //评论用户头像
      comment_time: String,  //评论时间
      comment_like: Number,  //点赞数
      comment_content: String,  //评论内容
    }
  ],
});

const Idea = mongoose.model('Idea', ideaSchema, "idea");

module.exports = Idea;
