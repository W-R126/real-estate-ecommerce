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
var Order = db.Order;
var PurchasedBuilding = db.PurchasedBuilding;
var Building = db.Building;
var Cart = db.Cart;


router.get('/admin', function(req, res, next) {
  Order.findAll({where:req.query})
  .then(orders => res.send(orders))
  .catch(next);
})

router.put('/admin/status/:orderId', function(req, res, next) {
  Order.update(req.body,
    {where: {id: req.params.orderId},
    returning: true
  })
  .then(orderUpdated => res.send(orderUpdated[1][0]))
  .catch(next);
})

router.get('/test', function(req, res, next){
  console.log('Current path: '+__dirname);
  console.log(secretMG);
  res.sendStatus(200);
})

router.get('/:id', function(req, res, next) {
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
    },
    order: '"id" DESC'
  })
  .then(orders => res.send(orders))
  .catch(next)
});


router.post('/', function (req, res, next) {
  var savedOrder;
  var purchasedBuildingIds = [];

  Order.create(req.body)
  .then(function (order) {
    savedOrder = order;
    return order.setUser(req.session.passport.user)
  })
  .then(function () {
    return Cart.findById(req.session.cartId)
  })
  .then(function (cart) {
    return cart.getBuildings()
  })
  .then(function (buildings) {
    var copyBuildings = buildings.map(function (building) {
       return PurchasedBuilding.create({
        buildingId: building.id,
        purchasePrice: building.price
        })
        .then(function (purchasedBuilding) {
            purchasedBuildingIds.push(purchasedBuilding.id);
        });
    });

    return Promise.all(copyBuildings);
  })
  .then(function (purchasedBuildings) {
    return Order.findOne({where: req.body})
  })
  .then(function (order) {
    return order.setPurchasedBuildings(purchasedBuildingIds);
  })
  .then(function () {
    return Cart.findById(req.session.cartId)
  })
  .then(function (cart) {
    return cart.setBuildings(null);
  })
  .then(function () {
    //Update from field with domain once pushed to production server!

    var message = {
      from: 'sandbox@mailgun.org',
      to: savedOrder.email,
      subject: "Your order #" + savedORder.convertId +" has been received",
      text: "Dear "+ savedOrder.name+", \n Your order #" + savedOrder.convertId +" from Betty's Building Bros has been received!"
    }

    transporter.sendMail(message, function(error, info){
      if (error) console.log("Confirmation Mail Error: ",error);
      else console.log('Sent: '+ info.response);
      });

    res.send(savedOrder.id.toString());
  })
  .catch(next)
})

/*router.put('/shipped', function(req, res, next){
  //Update from field with domain once pushed to production server!
  var message = {
    from: 'sandbox@mailgun.org',
    to: savedOrder.email,
    text: "Dear "+ savedOrder.name+", \n Your order #" + savedOrder.convertId +" from Betty's Building Bros has been received!"
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
    to: savedOrder.email,
    text: "Dear "+ savedOrder.name+", \n Your order #" + savedOrder.convertId +" from Betty's Building Bros has been received!"
  }

  transporter.sendMail(message, function(error, info) {
    if (error) console.log("Confirmation Mail Error: ",error);
    else console.log('Sent: '+ info.response);
  });

  res.sendStatus(200);
})
*/
module.exports = router;
