var Sequelize = require('sequelize');

var Hashids = require('hashids');
var hashids = new Hashids();


var db = require('../_db');

module.exports = db.define('order', {
  orderStatus: {
    type: Sequelize.ENUM('Created', 'Processing', 'Canceled', 'Completed'),
    defaultValue: 'Created'
  }
}, {
  getterMethods: {
    convertId: function() {
      return "ORDER" + hashids.encode(this.id);
    },
    convertDate: function() {
      return this.createdAt.toString().substring(0,15);
    }
  }
})
