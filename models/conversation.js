var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var conversationSchema = new Schema({
    person1: String,
    person2: String,

});

var Conversation = module.exports = mongoose.model('conversation', conversationSchema);

