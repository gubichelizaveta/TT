
const Player = require('../context').Player;
const Rating = require('../context').Rating;


module.exports = {
  

    getPlayerId: async (UserId) => {
      const id = parseInt(UserId);
      const player = await Player.findOne({ where: { user_id: id } });
      if (!player) {
          throw new Error('User not found');
      }
      return player.player_id;
    },
    getPlayersRating: async(player1,player2) => {
      const pl1 = await Rating.findOne({ where: { player: player1 } });
      const pl2 = await Rating.findOne({ where: { player: player2 } });
      if (!pl1 || !pl2) {
        throw new Error('User not found');
    }
      return { player1: pl1.rating, player2: pl2.rating };
    },
    UpdateRating: async(playerId, rating) => {
      try {
          const ratUp = await Rating.findOne({ where: { player: playerId } });
          if (!ratUp) {
              return { error: 'рейтинг игрока не найден' };
          }
  
          ratUp.rating = rating;
          await ratUp.save();
          return { message: 'Рейтинг обновлен успешно' };
      } catch (error) {
          console.error('Error updating player rating:', error);
          return { error: 'Internal server error' };
      }
  }  
};