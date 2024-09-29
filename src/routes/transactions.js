const router = require('express').Router();
const { showTransactions } = require('../controllers/transactions');

router.get('/show-all', showTransactions);

module.exports = router;