
const playerService = require('../services/playerService');



module.exports = {

    getPlayerId: async (req, res) => {
      const { UserId } = req.params;
      try {
        const playerId = await playerService.getPlayerId(UserId);
        res.status(200).json(playerId);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    },
    getPlayersRating: async(req,res) => {
      const { player1, player2 } = req.params;
      try {
        const ratings = await playerService.getPlayersRating(player1, player2);
        res.status(200).json(ratings);
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    },
    UpdateRating: async(req,res) => {
      const { playerId } = req.params;
      const { rating } = req.body;
      try {
        await playerService.UpdateRating(playerId, rating);
        res.status(200).json({ message: 'Обновлен рейтинг' });
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    },
};

