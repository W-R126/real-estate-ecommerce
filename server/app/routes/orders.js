var express = require('express');
var router = new express.Router();
var fs = require('fs');

var secretMG= fs.readSync('../../../../secretMG.txt',   'utf8');
var message = {
  from:
  to: '',
  text: "Your order from Betty's Building Bros has been received!",
  html:'<b> Text Contents</b>'
}

var nodemailer = require('nodemailer');
var transport = {
  host:
}
var transporter = nodemailer.createTransport()

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
  transporter.sendMail(message, function(error, info){
    if (error) console.log("Confirmation Mail Error: ",error);
    else console.log('Sent: '+ info.response);
  })
})

module.exports = router;
