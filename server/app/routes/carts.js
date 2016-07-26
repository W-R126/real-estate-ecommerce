var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Cart = db.Cart;

router.get('/:id', function(req, res, next){
  Cart.findById(req.params.id)
  .then(cart=> res.send(cart))
  .catch(function(err){console.error(err); res.status(500).end(); });
})

// router.get('/', function(req, res, next){
//   Building.findAll({where:req.query})
//   .then(buildings=>res.send(buildings))
//   .catch(err=>console.error);
// })



module.exports = router;
