var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Review = db.Review;

router.get('/:id', function(req, res, next){

  Review.findById(req.params.id)
  .then(review=> res.send(review))
  .catch(function(err){console.error(err); res.status(500).end(); });
})

router.get('/', function(req, res, next){
  Review.findAll({where:req.query})
  .then(reviews=>res.send(reviews))
  .catch(err=>console.error);
})


module.exports = router;
