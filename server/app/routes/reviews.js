var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Review = db.Review;

router.get('/:id', function(req, res, next){
  Review.findById(req.params.id)
  .then(review=> res.send(review))
  .catch(next);
})

router.get('/', function(req, res, next){
  Review.findAll({where:req.query})
  .then(reviews=>res.send(reviews))
  .catch(next);
})

router.post('/', function(req, res, next){
  Review.create(req.body)
  .then(review=>res.send(review))
  .catch(next);
})

module.exports = router;
