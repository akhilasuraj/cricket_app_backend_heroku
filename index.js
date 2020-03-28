const express = require('express') ;
var cors = require("cors");
var bodyParser = require("body-parser");
const app = express(); 
const dotenv = require('dotenv');
const mongoose = require('mongoose');

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({ extended: false })
)
app.use('/uploads',express.static('uploads'));

//connect to db
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },() =>{
    console.log('connected to DB')
});
//middleware


//Import routes
const authRoute = require('./routes/auth');
const Post = require('./routes/post')


//ROute middleware
app.use('/api/user', authRoute);
app.use('/api/post', Post);

app.listen(3000, () => console.log('Server Up and Running'));