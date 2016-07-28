
var express = require('express');
var router = new express.Router();

var db = require('../../db');
var User = db.User;
var Cart = db.Cart;

router.get('/:id', function(req, res, next){
  User.findById(req.params.id)
  .then(user=> res.send(user))
  .catch(function(err){console.error(err); res.status(500).end(); });
})

router.post('/', function(req, res, next){
  var userObj;
  User.create(req.body)
  .then(function(user){
    userObj = user;
    return Cart.create({userId:user.id})
  })
  .then(function(cart){
    req.session.cartId = cart.id;
    console.log('**********************', req.session);
    res.status(201).json(userObj) } )
  .catch(function(err){console.error(err); res.status(500).end(); })
})

module.exports = router;

