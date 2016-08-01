var express = require('express');
var router = new express.Router();
var fs = require('fs');

var secretMG= JSON.parse(fs.readFileSync(__dirname+'/../../../../secretMG.txt','utf8'));


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

router.get('/test', function(req, res, next){
  console.log('Current path: '+__dirname);
  console.log(secretMG);
  res.sendStatus(200);
})

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
  Order.findAll({
    where: {
      userId: req.session.passport.user
    }
  })
  .then(orders => res.send(orders))
  .catch(next)
});

router.put('/shipped', function(req, res, next){
  //Update from field with domain once pushed to production server!
  var message = {
    from: 'sandbox@mailgun.org',
    to: req.body.email,
    text: "Your order #" + order.id+" from Betty's Building Bros has been shipped!"
  }

  transporter.sendMail(message, function(error, info){
    if (error) console.log("Confirmation Mail Error: ",error);
    else console.log('Sent: '+ info.response);
  });
  res.sendStatus(200)
})

router.put('/delivered', function(req, res, next){
  //Update from field with domain once pushed to production server!
  var message = {
    from: 'sandbox@mailgun.org',
    to: req.body.email,
    text: "Your order #" + order.id+" from Betty's Building Bros has been shipped!"
  }

  transporter.sendMail(message, function(error, info){
    if (error) console.log("Confirmation Mail Error: ",error);
    else console.log('Sent: '+ info.response);
  });
  res.sendStatus(200)
})

router.post('/', function(req, res, next){
  Order.create(req.body)
  .then(function(order){
    //Update from field with domain once pushed to production server!
    var message = {
      from: 'sandbox@mailgun.org',
      to: req.body.email,
      text: "Dear "+ order.name+", \n Your order #" + order.id+" from Betty's Building Bros has been received!"
    }

    transporter.sendMail(message, function(error, info){
      if (error) console.log("Confirmation Mail Error: ",error);
      else console.log('Sent: '+ info.response);
      });
    res.sendStatus(200)})
  .catch(next);

})

module.exports = router;
