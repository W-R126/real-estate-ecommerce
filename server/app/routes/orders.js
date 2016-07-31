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

//Things this route needs to do:
//for each building in cart, create purchased building with price and setBuilding id
//empty cart
//email user
router.post('/', function (req, res, next) {
  console.log('whyyyyyyy posting twice');
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
/*          .then(purchasedBuilding => {
            purchasedBuilding.setPurchasedBuildings([1,2]);
        });*/
    });

    return Promise.all(copyBuildings);
  })
  .then(function (response) {
    console.log(response);
    res.send('yes');
  })
  .catch(next)
})

module.exports = router;
