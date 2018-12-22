var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const getVipCourses = require('./middleware/get-vip-courses');
const helpers = require('./helpers/index');
const databases = require('./databases/index');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var openCourseRouter = require('./routes/course/open-course');
var vipCourseRouter = require('./routes/course/vip-course');
var adminRouter = require('./routes/admin');
var codeRouter = require('./routes/api/code.js');
var userRouter = require('./routes/api/user.js');
var searchRouter = require('./routes/api/search.js');
var session = require('express-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('its a secret'));
const Store = require('express-mysql-session')(session);
const {pool} = require('./databases/db.js');
const store = new Store(null, pool);
app.use(session({
    store, // 设置session存储为mysql，注意当前数据库用户需要表创建权限
    secret: 'its a secret',//秘钥
    resave: false,
    saveUninitialized: false
    // maxAge: 7*24*3600*1000
}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', getVipCourses.initLocal);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/open-courses', openCourseRouter);
app.use('/vip-course', vipCourseRouter);
app.use('/admin', adminRouter);
app.use('/api/code', codeRouter);
app.use('/api/user', userRouter);
app.use('/api/search', searchRouter);

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
