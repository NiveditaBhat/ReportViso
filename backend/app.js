const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path');
app.use("/", express.static(path.join(__dirname, "angular")));
//app.use('/images', express.static(path.join('images')));

const mongooose = require('mongoose');

const userRoutes =  require('./router/user');
const reportRoutes =  require('./router/report');

mongooose.connect('mongodb+srv://niv:'+'76eTi2YVOfjx9B1E'+'@meanstack-czs7x.mongodb.net/db2').then(() => {console.log('connected to database')}).catch(
  (error) => {
    console.log('Error in connection to DB:'+error);
  }
);

app.use((req,res,next) => {
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type, Accept, Authorization');
res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH,PUT, DELETE, OPTIONS');
next();
});

//app.use(postRoutes);
app.use(userRoutes);
app.use(reportRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});
module.exports = app;
// 76eTi2YVOfjx9B1E
