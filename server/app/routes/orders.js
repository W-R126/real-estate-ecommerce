var express = require('express');
var router = new express.Router();
var fs = require('fs');

var secretMG= JSON.parse(fs.readFileSync('/home/barry/secretMG.txt','utf8'));
var message = {
  from: 'sandbox@mailgun.org',
  to: 'bjw2119@gmail.com',
  text: "Your order from Betty's Building Bros has been received!"
}

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
var Order = db.Order;
var PurchasedBuilding = db.PurchasedBuilding;
var Building = db.Building;

router.get('/:id', function(req, res, next) {
  var returnObj = {};
  Order.findById(req.params.id, {
    include: [
      {
        model: PurchasedBuilding,
        include: [
          Building
        ]
      }]
  })
  .then(order => {
    res.send(order);
  })
  .catch(next);
});

router.get('/', function(req, res, next){
  console.log('hit this routeafa');
  Order.findAll({
    where: {
      userId: req.session.passport.user
    }
  })
  .then(orders => res.send(orders))
  .catch(next)
});

router.post('/', function(req, res, next){
  console.log("Testing conf email...user: "+ secretMG.user+"pass "+secretMG.pass);
  transporter.sendMail(message, function(error, info){
    if (error) console.log("Confirmation Mail Error: ",error);
    else console.log('Sent: '+ info.response);
  });
  res.sendStatus(200)
})

module.exports = router;
