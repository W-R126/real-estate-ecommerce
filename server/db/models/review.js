var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('review', {

  review: {
    type: Sequelize.TEXT,
    min:50
  },
  headline:{
    type: Sequelize.TEXT
  },
  numOfStars:{
    type: Sequelize.INTEGER,
    min: 0,
    max: 5
  }

})
