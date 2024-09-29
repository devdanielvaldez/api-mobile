const router = require('express').Router();
const { showListings } = require('../controllers/listings');

router.get('/show-all', showListings);

module.exports = router;