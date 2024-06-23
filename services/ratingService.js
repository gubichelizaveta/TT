
const Player = require('../context').Player;
const Rating = require('../context').Rating;
const SportsRang = require('../context').SportsRang;
const Sequelize = require('sequelize');


module.exports = {
    getRating: async () => {
        try {
            const rating = await Rating.findAll({
                include: [
                    { model: Player }
                ]
            });
            return rating;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },
    getPlayerWithoutRating: async () => {
        try {
            const playersWithoutRating = await Player.findAll({
                where: {
                    player_id: {
                        [Sequelize.Op.notIn]: Sequelize.literal(
                            '(SELECT "player" FROM public."Ratings")'
                        )
                    }
                },
                include: [
                    {model: SportsRang}
                ]
            });          
            return playersWithoutRating;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }  
    },
    playerAdd: async (playerId, description) => {
        try {
            const ratings = await Rating.create({
                player: playerId,
                rating: description,
                rating_date: new Date()
            });
            await ratings.save();
            return { success: true };
        } catch (error) {
            console.error(error);
            throw new Error('Внутренняя ошибка сервера');
        }
    },
};
