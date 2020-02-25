const express = require("express");
const Post = express.Router();
const cors = require("cors");
const con_Post = require("../controllers/post");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename:function(req, file, cb){
        cb(null, Date.now()+'_' + file.originalname);
    }
}); 

const fileFilter  = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null,false);
    }
}

const upload = multer({storage: storage, limits:{
    fileSize: 1024*1024*5 //5MB file size
},fileFilter:fileFilter
}); 


Post.use(cors());

Post.post('/newpost',upload.single('postAttachment'),con_Post.newpost);
Post.post('/load',con_Post.loadPosts);
module.exports = Post ;