const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },last_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },mobile_no: {
        type: String,
        min:10,
        max:12
    },
    email: {
        type: String,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date:{
        type: Date,
        default: Date.now
    },
      match_post:[{type:mongoose.Schema.Types.ObjectId, ref:'post'}]
});

module.exports = mongoose.model('User',userSchema);
