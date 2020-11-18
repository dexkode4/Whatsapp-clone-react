"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var pusher_1 = require("./pusher");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var mongoose_1 = __importDefault(require("mongoose"));
var index_1 = __importDefault(require("./routes/index"));
var message_1 = __importDefault(require("./routes/message"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
var app = express_1.default();
var db = mongoose_1.default.connection;
db.once('open', function () {
    console.log("DB connected");
    var msgCollection = db.collection("messagecontents");
    var changeStream = msgCollection.watch();
    changeStream.on('change', function (change) {
        console.log(change);
        if (change.operationType === 'insert') {
            var messageDetails = change.fullDocument;
            pusher_1.pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                recieved: messageDetails.recieved
            });
        }
        else {
            console.log('Error triggering Pusher');
        }
    });
});
// connect to database
mongoose_1.default.connect(process.env.CONNECTION_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () { return console.log("connected to mongodb"); })
    .catch(function (error) { return console.log(error); });
// middlewares
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use('/', index_1.default);
app.use('/message', message_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
