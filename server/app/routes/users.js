
var express = require('express');
var router = new express.Router();

var db = require('../../db');
var User = db.User;
var Cart = db.Cart;

router.get('/:id', function(req, res, next){
  User.findById(req.params.id)
  .then(user=>{
    req.session.userId = user.id;
    res.send(user)})
  .catch(next);
})

router.get('/', function(req, res, next) {
  User.findAll()
  .then(user => res.send(user))
  .catch(next);
})

router.post('/', function(req, res, next){
  var userObj;
  User.create(req.body)
  .then(function(user){
    userObj = user;
    return Cart.create({userId:user.id})
  })
  .then(function(cart){
    req.session.cartId = cart.id;
    res.status(201).json(userObj) } )
  .catch(next)
})

router.put('/changeAdmin/:id', function(req, res, next) {
  User.update(req.body,
    { where: { id: req.params.id},
    returning: true
  })
  .then(user => res.send(user[1][0]))
  .catch(next)
});

router.put('/changePass/:id', function(req, res, next) {
  User.update(req.body,
    { where: { id: req.params.id},
    returning: true
  })
  .then(user => res.send(user[1][0]))
  .catch(next)
});

router.put

router.delete('/:id', function (req, res, next) {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.sendStatus(204))
  .catch(next);
})

module.exports = router;

