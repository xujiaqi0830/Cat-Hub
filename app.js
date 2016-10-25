var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var csurf = require('csurf');
// var ip = require('./routes/route-ip');
var routes = require('./routes/route-index');
var board = require('./routes/route-board');
var blog = require('./routes/route-blog');
// var cat = require('./routes/cat');
var jsonp = require('./routes/route-jsonp');
var ajax = require('./routes/route-ajax');
var about = require('./routes/route-about');
var users = require('./routes/route-users');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
// csrf设置
// app.use(csurf());
// app.use(function(req, res, next){
//     res.locals._csrfToken = req.csrfToken();
// });
// app.use('*', ip);
app.use('/', routes);
app.use('/index', routes);
app.use('/board', board);
app.use('/blog', blog);
// app.use('/cat', cat);
app.use('/jsonp', jsonp);
app.use('/ajax', ajax);
app.use('/users', users);
app.use('/about', about);
app.use('/static', express.static(__dirname + '/public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.render('err404', {
        layout: 'index/layout-index',
        js: [{
            js_name: 'index.js'
        }]
    });
    // var err = new Error('Not Found');
    // err.status = 404;
    // next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
