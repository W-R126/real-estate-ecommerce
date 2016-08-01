var Sequelize = require('sequelize');

var Hashids = require('hashids');
var hashids = new Hashids();


var db = require('../_db');

module.exports = db.define('order', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        isEmail: true
    }
  },
  creditCard: { //not sure what should be in this field
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipCode: {
    type: Sequelize.STRING(5),
    allowNull: false
  },
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
