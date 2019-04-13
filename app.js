var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');
var ideaRouter = require('./routes/idea');
var commentRouter = require('./routes/comment');
var users_listRouter = require('./routes/view_list/users_list');
var article_listRouter = require('./routes/view_list/article_list');
var photo_listRouter = require('./routes/view_list/photo_list');
var music_listRouter = require('./routes/view_list/music_list');
var video_listRouter = require('./routes/view_list/video_list');
var idea_examineRouter = require('./routes/view_list/idea_examine');
var recommend_listRouter = require('./routes/view_list/recommend_list');
var swipe_listRouter = require('./routes/view_list/swipe_list');
var historyRouter = require('./routes/history');
var report_listRouter = require('./routes/view_list/report_list');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);
app.use('/idea', ideaRouter);
app.use('/comment', commentRouter);
app.use('/users_list', users_listRouter);
app.use('/article_list', article_listRouter);
app.use('/photo_list', photo_listRouter);
app.use('/music_list', music_listRouter);
app.use('/video_list', video_listRouter);
app.use('/idea_examine', idea_examineRouter);
app.use('/recommend_list', recommend_listRouter);
app.use('/swipe_list', swipe_listRouter);
app.use('/history', historyRouter);
app.use('/report_list', report_listRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
