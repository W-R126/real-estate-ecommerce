var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('purchasedBuilding', {
    purchasePrice: {
        type: Sequelize.INTEGER
    }
});
