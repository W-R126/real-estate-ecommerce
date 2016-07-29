var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Order = db.Order;

router.get('/:id', function(req, res, next) {

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



module.exports = router;
