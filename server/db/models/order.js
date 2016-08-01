var Sequelize = require('sequelize');

var Hashids = require('hashids');
var hashids = new Hashids();


var db = require('../_db');

module.exports = db.define('order', {
  orderStatus: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    defaultValue: 'Created'
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    get: function() {
      return this.getDataValue('date').toString().substring(0, 15);
    }
  }
}, {
  getterMethods: {
    convertId: function() {
      return "ORDER" + hashids.encode(this.id);
    }
  }
})
