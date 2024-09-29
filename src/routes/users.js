const router = require('express').Router();
const { showUsers } = require('../controllers/users');

router.get('/show-all', showUsers);

module.exports = router;