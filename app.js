// creat the instance of express. 
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// create the instance of app from express.
const app = express();


// connect mongo db using mongoose
mongoose.connect("mongodb://localhost:27017/myProduct");

mongoose.connection.on('connected', () => {
    console.log('Connected to database ');
  }); 
  mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
  });
  
  
  


// Get product router product.js file here.
const productRouter = require('./api/routes/products');
const userRouter = require('./api/routes/users');

// set uploads public
app.use(express.static('uploads'))
// logger for our application.
app.use(morgan('dev'));

// body parser to accept plain json request.
app.use(bodyParser.urlencoded({extended :  false}));
app.use(bodyParser.json());

// before go to actually routes we need to check cors and respond accordingly.
app.use((req, res, next) => {
    res.header("Allow-Control-Allow-Orgin","*");
    res.header("Access-Control-Allow-Headers",
    "Orgind, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === "OPTIONS"){
     res.header("Access-Control-Allow-Methods","PUT, POST, DELETE,UPDATE");
     return res.status(200).json({});
    }

    next();
})

// use middle ware & pass filter if endpoint is '/product' , pass handler which handle the request in our case it is productRouter.
app.use('/product', productRouter);

// user routes & handlers
app.use("/user", userRouter);

// If any error request happens then this route works, after that next filter run
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
})

// this middle ware for error handling, if found.
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message : error.message
    })
})

// exports the app, so that we can access throught out the project. we try to access in server.js file.
module.exports = app;