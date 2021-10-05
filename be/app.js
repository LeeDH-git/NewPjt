var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var express = require('express');
var path = require('path');

// 라우터 추가
var indexRouter = require('./routes/api/index');
var usersRouter = require('./routes/users');
var setRouter = require('./routes/set');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 스태틱 라우터 : 정적리소스를 담을 수 있게 한것 
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/api',require('./routes/api'))
app.use(express.static(path.join(__dirname, 'fe','dist')));

// 라우터 사용
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/set', setRouter);

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
