const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');


router.get('/:UserId', playerController.getPlayerId);
router.get('/rating/:player1/:player2', playerController.getPlayersRating);
router.put('/:playerId/rating', playerController.UpdateRating);
module.exports = router;