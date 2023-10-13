const knex = require('knex');
require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();
const knexConfig = require('./knexfile');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

app.use(cors({ origin: '*' }));
app.use('/users', usersRouter);
app.use('/auth', authRouter);


const environment = 'development';
// console log .env 
console.log(process.env.HOST, process.env.USER, process.env.PASSWORD, process.env.DATABASE)
const config = knexConfig[environment];
console.log(config)
const db = knex(config);

const port = 3009;
const ip = '0.0.0.0';
app.listen(port, ip, function () {
	console.log(`Example app listening on port ${port}`)
})