
var express = require('express');
var router = new express.Router();

var db = require('../../db');
var User = db.User;

router.get('/:id', function(req, res, next){
  User.findById(req.params.id)
  .then(user=> res.send(user))
  .catch(next);
})

router.post('/', function(req, res, next){
  User.create(req.body)
  .then(function(user){console.log(user)})
  .then(user => res.status(201).json(user))
  .catch(next)
})

module.exports = router;
