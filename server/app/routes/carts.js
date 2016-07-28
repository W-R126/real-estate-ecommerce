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
  Cart.upsert(req.body, {where: {id: req.params.id}})
  .then(cart=>res.send(cart))
  .catch(next);
})

module.exports = router;
