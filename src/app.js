const express = require('express');
const logger = require('morgan');
const session = require('cookie-session');
const cookieParser = require('cookie-parser');
const redis = require('redis');
const handlers = require('./handlers');
const Database = require('./database');

const app = express();
const redisClient = redis.createClient();
const db = new Database(redisClient);
app.locals.db = db;

app.use(express.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(handlers.attachDetails);
app.use(express.static('public', {index: false}));
app.use(express.urlencoded({extended: true}));

app.set('sessionMiddleware', session({secret: 'key'}));
app.use((...args) => app.get('sessionMiddleware')(...args));

app.get('/', handlers.serveIndexPage);
app.post('/signup', handlers.signup);
app.post('/validateLogin', handlers.validateLogin);
app.post('/logOut', handlers.logOut);

module.exports = {app};
