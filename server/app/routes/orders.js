var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Order = db.Order;
var PurchasedBuilding = db.PurchasedBuilding;
var Building = db.Building;

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

router.get('/admin', function(req, res, next) {
  Order.findAll({where: req.query})
  .then(orders => res.send(orders))
  .catch(next);
})

router.get('/', function(req, res, next){
  Order.findAll({
    where: {
      userId: req.session.passport.user
    }
  })
  .then(orders => res.send(orders))
  .catch(next)
});


module.exports = router;
