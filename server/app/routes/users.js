
var express = require('express');
var router = new express.Router();

var db = require('../../db');
var User = db.User;

router.get('/:id', function(req, res, next){
  User.findById(req.params.id)
  .then(user=> res.send(user))
  .catch(function(err){console.error(err); res.status(500).end(); });
})



module.exports = router;
