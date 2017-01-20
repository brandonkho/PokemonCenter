var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
    // _sender : { type: String, ref: 'User' },
    // _recipient: { type: String, ref: 'User' },
    _conversation: { type: String, ref: 'conversation' },
    _username: String, 
    msg: String, 
    created_at: {type: Date, default: Date.now}
});

var Message = module.exports = mongoose.model('message', messageSchema);