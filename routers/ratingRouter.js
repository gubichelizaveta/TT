const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.get('/all', ratingController.getRating);
router.get('/add',ratingController.getPlayerWithoutRating);
router.post('/playerAdd', ratingController.playerAdd);

module.exports = router;