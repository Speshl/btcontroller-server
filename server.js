const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sequelize = require('sequelize');
const getData = require('./routes/data');
const config = require('./config/config.json');
const port = 3001;
const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

global.SeqConn = new sequelize(config.dbName, config.dbUser, config.dbPassword,{
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'mysql',
    logging: console.log
});

global.Models = {
    commandLists: require('./models/commandLists')(SeqConn, sequelize)
}

app.get('/healthcheck', getData.healthCheck);
app.get('/getCommandLists', getData.getCommandLists);

app.post('/addCommandList', getData.addCommandList);

app.listen(port);
console.log("Server started on port "+port);

module.exports = app;