'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/buildings', require('./buildings'));
router.use('/carts', require('./carts'));
router.use('/orders', require('./orders'));
router.use('/reviews', require('./reviews'));
router.use('/users', require('./users'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
