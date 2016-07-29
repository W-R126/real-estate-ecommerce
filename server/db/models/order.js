var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('order', {
//getter method for total price



}, {
  getterMethods: {
    id: function(){

    }
  }
})
