var express = require('express');
var router = new express.Router();

var fs = require('fs');
var secretMG = JSON.parse(fs.readFileSync(__dirname+'/../../../../secretMG.txt','utf8'));

var nodemailer = require('nodemailer');
var transport = {
  service:'Mailgun',
  auth: {
    user: secretMG.user,
    pass: secretMG.pass
  }
}

var transporter = nodemailer.createTransport(transport);

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

router.get('/', assertIsAdmin, function(req, res, next) {
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

  User.update(req.body, {
    where: {email: req.body.email},
    returning: true
  })
  .then(user => {
    res.send(user[1][0]);
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

