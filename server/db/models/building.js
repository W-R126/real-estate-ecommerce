var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('building', {
    location: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    price: {
        type: Sequelize.STRING,
        validate:{
          isDecimal: true
        }
    },
    PropertyType: {
        type: Sequelize.ENUM('Commercial','Residential','Mixed')
    },
    lotSize:{
        type: Sequelize.STRING
    },
    stories:{
        type: Sequelize.INTEGER
    },
    numberOfUnits: {
        type: Sequelize.INTEGER
    },
    architecturalStyle:{
        type: Sequelize.STRING
    },
    buildingAge: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.TEXT
    },
    daysOnMarket: {
        type: Sequelize.INTEGER
    },
    photoURL: {
        type: Sequelize.STRING
    }

});
