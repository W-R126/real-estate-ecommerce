var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Cart = db.Cart;

router.get('/:id', function(req, res, next){
  Cart.findById(req.params.id)
  .then(cart=> res.send(cart))
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
  Cart.upsert(req.body, {where: {id: req.session.cartId}})
  .then(cart=>res.send(cart))
  .catch(next);
})

module.exports = router;
