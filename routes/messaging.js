var express = require('express');
var router = express.Router();


var Conversation = require('../models/conversation');
var Message = require('../models/message');

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

router.get('/conversations/:user1/:user2', function(req, res, next){
    // Conversation.find({_id: req.params.id}, function (err, conversations) {
    //     if(err){
    //         res.send(err);
    //     }else{
    //         console.log(conversations);
    //         res.json(conversations); 
    //     }
    // });

    Conversation.findOne({
      $or : [
        {$and: [{person1: req.params.user1}, {person2: req.params.user2}]},
        {$and: [{person1: req.params.user2}, {person2: req.params.user1}]}
      ]
    }, function (err, conversations) {
        if(err){
            res.send(err);
        }else{
            console.log(conversations);
            res.json(conversations); 
        }
    });

    
});


router.get('/conversations/:user1/:user2/messages', function(req, res, next){
    // Conversation.findOne({_id: req.params.id}, function(err, conversation){
    //     if(err){
    //         res.send(err);
    //     }
    //     res.json(conversation);
    // });
    Conversation.findOne({
      $or : [
        {$and: [{person1: req.params.user1}, {person2: req.params.user2}]},
        {$and: [{person1: req.params.user2}, {person2: req.params.user1}]}
      ]
    }, function (err, conversation) {
        if(err){
            res.send(err);
        }else{
            //console.log(conversation);
            //res.json(conversation);
            Message.find({_conversation: conversation._id}, function(err, messages){
                if(err){
                    res.send(err);
                }
                res.json(messages);
            }); 
        }
    });


    // Message.find({_conversation: req.params.id}, function(err, messages){
    //     if(err){
    //         res.send(err);
    //     }
    //     res.json(messages);
    // });
});



module.exports = router;