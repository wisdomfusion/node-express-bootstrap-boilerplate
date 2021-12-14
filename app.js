require('dotenv').config();
const debug = require('debug')('myapp:app');

const createError  = require('http-errors');
const express      = require('express');
const path         = require('path');
const fs           = require('fs');
const compression  = require('compression');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const hbs          = require('express-handlebars');

const indexRouter   = require('./app_server/routes/index');
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const accessLogStream = fs.createWriteStream(
    path.resolve(__dirname, 'log', 'access.log'),
    { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const static_path = process.env.ASSETS_PATH || path.resolve(__dirname + '/public');
// console.log(static_path);
app.use(express.static(static_path));

app.use('/', indexRouter);

app.use(errorHandlers.errorUnauthorized);
app.use(errorHandlers.errorNotFound);
app.use(errorHandlers.errorInternalServerError);

module.exports = app;
