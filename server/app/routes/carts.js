var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Cart = db.Cart;
var Building = db.Building;

router.get('/:id', function(req, res, next){
  Cart.findById(req.params.id)
  .then(cart=> res.send(cart))
  .catch(next);
})

router.put('/:id', function (req, res, next) {
  var foundBuilding;
  if(!req.session.cartId){
  Cart.create(req.body)
  .then(cart=>cart.addBuilding(req.params.id))
  .then(cart=>res.send(cart))
  .catch(next);
  }

  else{
    Cart.findById(req.session.cartId)
    .then(cart=>cart.addBuilding(req.params.id))
    .then(cart=>res.send(cart))
    .catch(next);
    }
})

module.exports = router;
