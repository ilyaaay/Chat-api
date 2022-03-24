const path = require('path');

const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');

const routerApi = require('./routes/Api');
const routerRender = require('./routes/render');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routerApi);

app.use('/render', routerRender);

app.use((req, res, next) => {
	res.status(404).render('index', {
		title: '404',
		message: "Can't find that!",
	});
});

app.use((err, req, res, next) => {

	console.log(err.stack);
	// console.log(err.code)
	// console.log(err.message)
	// console.log(err)
	// console.log(err.status)
	res.status(500).render('index', {
		title: '500',
		message: 'Something broke!',
	});
});

module.exports = app;
