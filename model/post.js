const mongoose = require('mongoose');

const post = new mongoose.Schema({
    posters_id: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },match_date: {
        type: String,
        required: true,
    },start_time: {
        type: String,
    },
    organizer: {
        type: String,
    },
    ground_name: {
        type: String,
        required: true,
    },
    distric: {
        type: String,
    },lat:{
      type:Number
    },lng:{
        type:Number
    },
    location: {
        type: String,
        required: true,
    },
    contact_no: {
        type: String,
    },
    team_size: {
        type: String,
    },
    entrace_fee: {
        type: String,
        required: true,
    },
    other_rules: {
        type: String,
    },
    attachments: {
        type: String,
    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('post',post);