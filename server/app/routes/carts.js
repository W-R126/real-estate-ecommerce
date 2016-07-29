var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Cart = db.Cart;
var Building = db.Building;

router.get('/:id', function(req, res, next){
  Cart.findById(req.params.id)
  .then(cart=> res.send(true))
  .catch(next);
})

router.put('/:id', function (req, res, next) {
  if(!req.session.cartId){
    Cart.create(req.body)
    .then(function(cart){
      req.session.cartId = cart.id;
      res.send(cart)
    })
  } else {
  Cart.findById(req.session.cartId)
  .then(cart=>cart.addBuilding(req.params.id))
  .then(cart=>res.send(true))
  .catch(next);
}})

module.exports = router;
