var express = require('express')
    , fs = require('fs')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
//    , MongoStore = require("connect-mongodb")
    ,MongoStore = require('connect-mongo')(express)
    , settings = require("./settings");
var flash = require('connect-flash');


var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(flash());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: settings.cookieSecret,
        store: new MongoStore({
            db: settings.db
        })
    }))
    app.use(app.router);//保留原来的
    //app.use(express.router(routes));//node.js开发指南上面的（注释掉）
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

routes(app);//这个是新加的

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
