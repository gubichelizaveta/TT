
const ratingService = require('../services/ratingService');


module.exports = {
    getRating: async (req, res) => {
        try {
            const rating = await ratingService.getRating();
            res.json(rating);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    getPlayerWithoutRating: async (req, res) => {
        try {
            const players = await ratingService.getPlayerWithoutRating();
            res.json(players);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    playerAdd: async (req, res, next) => {
        try {
            const { playerId, description } = req.body;
            const addedPlayer = await ratingService.playerAdd(playerId,description);
            res.json(addedPlayer);
        } catch (error) {
            next(error);
        }
      }
};