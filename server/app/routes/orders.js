var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Order = db.Order;
var PurchasedBuilding = db.PurchasedBuilding;
var Building = db.Building;
var Cart = db.Cart;

router.get('/:id', function(req, res, next) {
  var returnObj = {};
  Order.findById(req.params.id, {
    include: [
      {
        model: PurchasedBuilding,
        include: [
          Building
        ]
      }]
  })
  .then(order => {
    res.send(order);
  })
  .catch(next);
});

router.get('/', function(req, res, next){
  Order.findAll({
    where: {
      userId: req.session.passport.user
    }
  })
  .then(orders => res.send(orders))
  .catch(next)
});

//STILL NEEDS TO EMAIL USER!!
router.post('/', function (req, res, next) {
  var purchasedBuildingIds = [];
  Order.create(req.body)
  .then(function (order) {
    return order.setUser(req.session.passport.user)
  })
  .then(function () {
    return Cart.findById(req.session.cartId)
  })
  .then(function (cart) {
    return cart.getBuildings()
  })
  .then(function (buildings) {
    var copyBuildings = buildings.map(function (building) {
       return PurchasedBuilding.create({
        buildingId: building.id,
        purchasePrice: building.price
        })
        .then(function (purchasedBuilding) {
            purchasedBuildingIds.push(purchasedBuilding.id);
        });
    });

    return Promise.all(copyBuildings);
  })
  .then(function (purchasedBuildings) {
    return Order.findOne({where: req.body})
  })
  .then(function (order) {
    return order.setPurchasedBuildings(purchasedBuildingIds);
  })
  .then(function () {
    return Cart.findById(req.session.cartId)
  })
  .then(function (cart) {
    cart.setBuildings(null);
  })
  .then(function () {
    res.sendStatus(200);
  })
  .catch(next)
})

module.exports = router;
