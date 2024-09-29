const router = require('express').Router();
const { getMetrics } = require('../controllers/dashboard');

router.get('/metrics', getMetrics);

module.exports = router;