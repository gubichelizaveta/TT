const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

router.get('/all', statisticsController.getStatistics);
router.get('/mobile/:UserId', statisticsController.getStatisticsMobile);

module.exports = router;