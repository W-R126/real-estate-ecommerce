var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Cart = db.Cart;
var Building = db.Building;

router.get('/', function(req, res, next){
  Cart.findById(req.session.cartId, {include:[Building]})
  .then(cart=> res.send(cart))
  .catch(next);
})



router.put('/:buildingId', function (req, res, next) {
  console.log("Session******************", req.session);
  var foundBuilding;
  if(!req.session.cartId){
  Building.findById(req.params.buildingId)
  .then(function(building){
    foundBuilding=building;
    console.log(req.body);
    return Cart.create(req.body)
  })
  .then(function(cart){
    req.session.cartId = cart.id;
    return cart.addBuilding(foundBuilding); })
  .then(crap => Cart.findById(req.session.cartId, {include:[Building]}))
  .then(cart=>res.send(cart))
  .catch(next);
  }

  else{
    Building.findById(req.params.buildingId)
    .then(function(building){
      console.log(req.body);
      foundBuilding=building;
      return Cart.findById(req.session.cartId); })
    .then(cart=>cart.addBuilding(foundBuilding))
    .then(crap=>Cart.findById(req.session.cartId, {include:[Building]}))
    .then(cart=>res.send(cart))
    .catch(next);

    }
})

module.exports = router;
