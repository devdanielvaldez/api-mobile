const router = require('express').Router();
const listings = require('./listings');
const users = require('./users');
const transactions = require('./transactions');
const metrics = require('./dashboard');

router.use('/listings', listings);
router.use('/users', users);
router.use('/transactions', transactions);
router.use('/dashboard', metrics);

module.exports = router;