var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
const database = require('./db.js');
const { swaggerUi, specs } = require("./swagger/swagger");

// require('./passport') 구문은 현재 파일에서 상대 경로 ./passport에 있는 모듈을 가져오는 것을 의미합니다. 
// config 함수는 passport 객체를 인자로 받아, 필요한 설정을 수행합니다.
require('./passport').config(passport);
// dotenv의 config()가 호출되면 '.env'파일의 설정값들이 process.env에 저장 됩니다.
// 이후 process.env.COOKIE_SECRET 처럼 설정값들을 사용할 수 있습니다.
require('dotenv').config();

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var userRouter = require('./routes/user');
var boardRouter = require('./routes/board');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
database(); // 데이터 베이스 실행

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))
// COOKIE_SECRET 환경 변수의 값으로 쿠키를 암호화하는 데 사용되는 미들웨어입니다.
app.use(cookieParser(process.env.COOKIE_SECRET)); 
app.use(session({
  resave: false, //  세션이 수정되지 않았을 경우에도 세션을 강제로 저장하지 않습니다.
  saveUninitialized: false, //  초기화되지 않은 세션도 저장하지 않습니다.
  secret: process.env.COOKIE_SECRET, //  환경 변수의 값을 세션 암호화에 사용됩니다.
  cookie: {
    httpOnly: true, // 클라이언트에서 세션 쿠키에 접근할 수 없도록 만드는 옵션입니다. 
    secure: false, // HTTPS 연결을 사용하는 경우에만 세션 쿠키를 전송하도록 설정하는 옵션입니다.
  }
}));
app.use(passport.initialize()); // Passport.js 미들웨어를 초기화합니다. 이 함수는 Express 애플리케이션의 req 객체에 Passport.js의 인증 관련 메서드를 추가합니다.
app.use(passport.session()); // 세션을 사용할 때에는 passport.session() 미들웨어를 사용합니다. 이 미들웨어는 req.session 객체를 사용하여 사용자 세션을 관리합니다. (passport.session()은 passport.initialize() 이후에 등록되어야 합니다)
app.use(express.static(path.join(__dirname, 'public')));

/**
 * 라우터 등록 리스트
 */
app.use('/', indexRouter);
app.use('/api/auth', loginRouter);
app.use('/api/user', userRouter);
app.use('/api/board', boardRouter);


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
