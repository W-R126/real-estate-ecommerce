var express = require('express');
var router = new express.Router();

var fs = require('fs');
var secretMG = require('../../env');

var nodemailer = require('nodemailer');
var transport = {
  service:'Mailgun',
  auth: {
    user: secretMG.POSTMAN.user,
    pass: secretMG.POSTMAN.pass
  }
}

var transporter = nodemailer.createTransport(transport);

var db = require('../../db');
var User = db.User;
var Cart = db.Cart;

function assertIsAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) next();
  else res.sendStatus(401);
}

router.get('/:id', function(req, res, next){
  User.findById(req.params.id)
  .then(user => {
    req.session.userId = user.id;
    res.send(user)})
  .catch(next);
})

router.get('/', assertIsAdmin, function(req, res, next) {
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

router.put('/changeAdmin/:id', assertIsAdmin, function(req, res, next) {
  User.update(req.body,
    { where: { id: req.params.id},
    returning: true
  })
  .then(user => {
    res.send(user[1][0]);
  })
  .catch(next);
});

router.put('/changePass/:id', assertIsAdmin, function(req, res, next) {

  User.findById(req.params.id)
  .then(user => {

    var message = {
      from: 'sandbox@mailgun.org',
      to: user.email,
      subject: "Please reset your password",
      text: "Here is the link to reset your password: " + 'http://localhost:1337/reset-password/' + user.id
    }

    transporter.sendMail(message, function(error, info){
      if (error) console.log("Mail Error: ", error);
      else console.log('Sent: '+ info.response);
      });

    res.sendStatus(200);

  })
  .catch(next);

});

router.put('/resetPass', function(req, res, next) {

  User.findOne({
    where: {email: req.body.email},
  })
  .then(user => {
    return user.update(req.body);
  })
  .then(user => {
    res.send(user);
  })
  .catch(next);

});

router.delete('/:id', assertIsAdmin, function (req, res, next) {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.sendStatus(204))
  .catch(next);
})

module.exports = router;

