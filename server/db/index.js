'use strict';
var db = require('./_db');
module.exports = db;

db.User  = require('./models/user');
db.Building = require('./models/building');
db.Cart = require('./models/cart');
db.Order = require('./models/order');
db.Review = require('./models/review');
db.PurchasedBuilding = require ('./models/purchasedBuilding');

db.Order.belongsTo(db.User);
db.Order.belongsTo(db.Cart);
db.Order.belongsToMany(db.PurchasedBuilding, {through:'orderToPurchased'});
db.PurchasedBuilding.belongsTo(db.Building);
db.Cart.belongsTo(db.User);
db.Cart.belongsToMany(db.Building, {through:'cartToBuilding'})
db.Review.belongsTo(db.Building);
db.Review.belongsTo(db.User);
