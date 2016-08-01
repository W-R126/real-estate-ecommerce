var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('building', {

    // maybe address gets it own table??
    streetAddress: {
        type: Sequelize.STRING,
        allowNull: false
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
        type: Sequelize.STRING(5)
    },
    price: {
        type: Sequelize.INTEGER //in cents
    },
    propertyType: {
        type: Sequelize.ENUM('Commercial', 'Residential', 'Mixed')
    },
    lotSize: {
        type: Sequelize.STRING
    },
    stories: {
        type: Sequelize.INTEGER
    },
    squareFootage: {
        type: Sequelize.INTEGER
    },
    numberOfUnits: {
        type: Sequelize.INTEGER
    },
    architecturalStyle: {
        type: Sequelize.STRING
    },
    buildingAge: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.TEXT
    },
    photoURL: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
    }


});
