var express = require('express');
var router = express.Router();


var Conversation = require('../models/conversation');


router.get('/conversations', function(req, res, next){
    Conversation.find(function (err, conversations) {
        if(err){
            res.send(err);
        }else{
            console.log(conversations);
            res.json(conversations); 
        }
    });

    
});


router.get('/conversations/:id/messages', function(req, res, next){
    Conversation.findOne({_id: req.params.id}, function(err, conversation){
        if(err){
            res.send(err);
        }
        res.json(conversation);
    });
});



module.exports = router;