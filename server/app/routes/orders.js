var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Order = db.Order;

router.get('/:id', function(req, res, next){
  Order.findById(req.params.id)
  .then(order=> res.send(order))
  .catch(function(err){console.error(err); res.status(500).end(); });
})



module.exports = router;
