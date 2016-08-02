
var express = require('express');
var router = new express.Router();

var db = require('../../db');
var User = db.User;
var Cart = db.Cart;

router.get('/:id', function(req, res, next){
  User.findById(req.params.id)
  .then(user => {
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
  var userId;

  if (!req.session.cartId) {
    Cart.create()
    .then(function (cart) {
      req.session.cartId = cart.id;
    })
  }

  User.create(req.body)
  .then(function(user) {
    userId = user.id
    return Cart.findById(req.session.cartId)
  })
  .then(cart => cart.setUser(userId))
  .then(() => {res.sendStatus(201); })
  .catch(next)
})

router.post('/changeAdmin/:id', function(req, res, next) {
  User.update(req.body,
    { where: { id: req.params.id},
    returning: true
  })
  .then(user => res.send(user[1][0]))
  .catch(next)
});

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

