'use strict';

require('dotenv/config');

// config
const CONFIG = require('./config/auth.json');

// modules
const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const morgan = require('morgan');

// application
const _application = express();

// middlewares
const _maintenanceMode = require('./middlewares/maintenance');
const { authorize } = require('./middlewares/authentication/jwt');

// application setters
_application.set('APPLICATION_PORT', process.env.APPLICATION_PORT);

// aplication utils
_application.use(body_parser.json({ limit: '15mb' }));
_application.use(body_parser.urlencoded({ extended: false }));
_application.use(body_parser.raw({ inflate: true, limit: '100kb', type: 'text/xml' }));

_application.use(cors());
_application.use(morgan('dev'));
_application.use(_maintenanceMode(false)); // ele é global


// routes
const sigin = require('./routes/sign-in');

_application.use('/signin', sigin);

_application.use('/', (req, res, next) => {
	console.log(res.header("x-auth-token", 'hkjh').send({
    _id: 123123,
    name: 'u123123',
    email: 123123123
  }));
	console.log(req.headers['authorization'])
	
	res.redirect('/signin');
});


module.exports = _application;
