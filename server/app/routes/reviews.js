var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Review = db.Review;
var User = db.User;

function assertIsLoggedIn(req, res, next) {
  if (req.user) next();
  else next(new Error('Is not Logged in'));
}

router.get('/:id', function(req, res, next){
  Review.findById(req.params.id)
  .then(review=> res.send(review))
  .catch(next);
});

router.get('/', function(req, res, next){
  Review.findAll({where:req.query,
    include:[User]})
  .then(reviews=>res.send(reviews))
  .catch(next);
});

router.post('/', assertIsLoggedIn, function(req, res, next){
  Review.create(req.body)
  .then(function(review){
    review.setUser(req.session.passport.user)
  })
  .then(review=>res.send(review))
  .catch(next);
});

module.exports = router;
