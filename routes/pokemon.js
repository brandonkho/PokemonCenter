var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pokemonSchema = new Schema({
    _owner : { type: String, ref: 'User' },
    name: String, 
    level: Number, 
    isShiny: Boolean,
}, {collection: 'pokemon'});

var Pokemon = mongoose.model('pokemon', pokemonSchema);


router.get('/pokemon', function(req, res, next){
    Pokemon.find(function(err, pokemon){
        if(err){
            res.send(err);
        }else{
            
            if(req.query['name']){
                res.json(pokemon.filter(search(req.query)));
            }else{
                res.json(pokemon); 
            }
            
        }
    });
});

function search(query) {
  return function(item) {
    for(var i in query) {
    
    
         //console.log(query);
        if( item['name'].toLowerCase().indexOf(query[i].toLowerCase())>-1){
             
            return true;
        }
    }            
    return false;
  }
}

router.get('/pokemon/:id', function(req, res, next){
    Pokemon.findOne({_id: req.params.id}, function(err, pokemon){
        if(err){
            res.send(err);
        }
        res.json(pokemon);
    });
});

//Save pokemon
router.post('/pokemon', function(req, res, next){
    var pokemon = req.body;
    pokemon._owner = req.user._id;
    if(!pokemon.name){
        res.status(400);
        res.json({
            "error": "Bad Poop"
        });
    } else {
        var newPokemon = Pokemon(pokemon);
        newPokemon.save(pokemon, function(err, pokemon){
            if(err){
                res.send(err);
            }
            Pokemon.findOne({name: pokemon.name})
            .populate('_owner')
            .exec(function (err, pokemon) {
              if (err) return handleError(err);
              console.log(pokemon);
              console.log('The creator is %s', pokemon._owner.username);
              // prints "The creator is Aaron"
              res.json(pokemon);
            });
            
        });
        // db.pokemon.save(pokemon, function(err, pokemon){
        //     if(err){
        //         res.send(err);
        //     }
        //     res.json(pokemon);
        // });
        
        
    }
});

// Delete pokemon
// router.delete('/pokemon/:id', function(req, res, next){
//     db.pokemon.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, pokemon){
//         if(err){
//             res.send(err);
//         }
//         res.json(pokemon);
//     });
// });

// // Update pokemon
// router.put('/pokemon/:id', function(req, res, next){
//     var pokemon = req.body;
//     var updpokemon = {};
    
//     if(pokemon.isDone){
//         updpokemon.isDone = pokemon.isDone;
//     }
    
//     if(pokemon.title){
//         updpokemon.title = pokemon.title;
//     }
    
//     if(!updpokemon){
//         res.status(400);
//         res.json({
//             "error":"Bad Data"
//         });
//     } else {
//         db.pokemon.update({_id: mongojs.ObjectId(req.params.id)},updpokemon, {}, function(err, pokemon){
//         if(err){
//             res.send(err);
//         }
//         res.json(pokemon);
//     });
//     }
// });

// Get Single pokemon
// router.get('/pokemon/:id', function(req, res, next){
//     db.pokemon.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, pokemon){
//         if(err){
//             res.send(err);
//         }
//         res.json(pokemon);
//     });
// });

// //Save pokemon
// router.post('/pokemon', function(req, res, next){
//     var pokemon = req.body;
//     if(!pokemon.title || !(pokemon.isDone + '')){
//         res.status(400);
//         res.json({
//             "error": "Bad Data"
//         });
//     } else {
//         db.pokemon.save(pokemon, function(err, pokemon){
//             if(err){
//                 res.send(err);
//             }
//             res.json(pokemon);
//         });
//     }
// });

// // Delete pokemon
// router.delete('/pokemon/:id', function(req, res, next){
//     db.pokemon.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, pokemon){
//         if(err){
//             res.send(err);
//         }
//         res.json(pokemon);
//     });
// });

// // Update pokemon
// router.put('/pokemon/:id', function(req, res, next){
//     var pokemon = req.body;
//     var updpokemon = {};
    
//     if(pokemon.isDone){
//         updpokemon.isDone = pokemon.isDone;
//     }
    
//     if(pokemon.title){
//         updpokemon.title = pokemon.title;
//     }
    
//     if(!updpokemon){
//         res.status(400);
//         res.json({
//             "error":"Bad Data"
//         });
//     } else {
//         db.pokemon.update({_id: mongojs.ObjectId(req.params.id)},updpokemon, {}, function(err, pokemon){
//         if(err){
//             res.send(err);
//         }
//         res.json(pokemon);
//     });
//     }
// });

module.exports = router;