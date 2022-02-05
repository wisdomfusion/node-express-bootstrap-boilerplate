require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const expressPinoLogger = require('express-pino-logger');
const logger = require('./logger');

const compression = require('compression');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');

const indexRouter = require('./app_server/routes/index');
const errorHandlers = require('./app_server/lib/error_handlers');

const app = express();

// view engine setup
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    helpers: require('./app_server/lib/handlebars_helplers'),
}));
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const loggerMiddleware = expressPinoLogger({
    logger,
    autoLogging: true,
});
app.use(loggerMiddleware);

const static_path = process.env.ASSETS_PATH || path.resolve(__dirname + '/public');
// console.log(static_path);
app.use(express.static(static_path));

app.use('/', indexRouter);

app.use(errorHandlers.errorUnauthorized);
app.use(errorHandlers.errorNotFound);
app.use(errorHandlers.errorInternalServerError);

module.exports = app;
