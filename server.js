const express = require('express');
const morgan = require('morgan');
const sequelize = require('sequelize');
const getData = require('./routes/data');
const config = require('./config/config.json');
const port = 3001;
const app = express();

app.use(morgan('tiny'));
app.use(express.json());

SeqConn = new sequelize(config.dbName, config.dbUser, config.dbPassword,{
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'mysql',
    logging: console.log,
    operatorsAliases: false
});

app.get('/healthcheck', getData.healthCheck);

app.listen(port);
console.log("Server started on port "+port);

module.exports = app;