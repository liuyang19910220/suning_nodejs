var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//1引用路由(定义路由器名)
var index = require('./routes/index');
var guess = require('./routes/guess');
var list = require('./routes/list');
var detail = require('./routes/detail');
var cart = require('./routes/cart');
var register = require('./routes/register');
var login = require('./routes/login');

var app = express();//引入服务器---app是主服

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//2路由响应服务接口USE（接口，子路由器名字）
app.use('/', index);
app.use('/guess', guess);
app.use('/list', list);//接口要和public中ajax中的接口保持一致
app.use('/detail', detail);
app.use('/cart', cart);
app.use('/register', register);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
