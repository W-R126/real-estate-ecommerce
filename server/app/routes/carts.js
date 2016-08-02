var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Cart = db.Cart;
var Building = db.Building;


router.get('/', function(req, res, next){
  Cart.findById(req.session.cartId, {include:[Building]})
  .then(cart => res.send(cart))
  .catch(next);
})


router.put('/:id', function (req, res, next) {
  if (!req.session.cartId) {
    Cart.create(req.body)
    .tap(cart => cart.addBuilding(req.params.id))
    .then(cart => {
      req.session.cartId = cart.id;
      res.send(cart);
    })
    .catch(next);
  }
  else {
    Cart.findById(req.session.cartId)
    .then(cart => cart.addBuilding(req.params.id))
    .then(cart => res.send(cart))
    .catch(next);
  }
})

router.delete('/:id', function (req, res, next) {
  Cart.findById(req.session.cartId)
  .then(cart => cart.removeBuilding(req.params.id))
  .then(() => res.sendStatus(204))
  .catch(next);
})

module.exports = router;
