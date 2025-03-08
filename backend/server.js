require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const App = express()
const valuatorRoute = require('./Routes/valuatorRoute');
const studentDetailRoute = require('./Routes/studentDetailRoute');
const classDetailRoute = require('./Routes/classDetailRoute');
const resultRoute = require('./Routes/resultRoute');
const sequelizeAssociations = require('./sequelizeAssociations')();

// Middleware to parse JSON and URL-encoded data
App.use(express.json());
App.use(express.urlencoded({ extended: true }));


App.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

App.use(valuatorRoute);
App.use(studentDetailRoute);
App.use(classDetailRoute);
App.use(resultRoute);

App.listen(process.env.PORT,()=>{
    console.log('Server is running on port ' + process.env.PORT)
})