const player = require('../models/player');

const Player = require('../context').Player;
const Statistics = require('../context').StatisticsPl;

module.exports = {
    getStatistics: async () => {
        try {
            const statistics = await Statistics.findAll({
                include: [
                    { 
                        model: Player ,
                        attributes: ['LastName', 'Name', 'MiddleName']
                    }
                ]
            });
            return statistics;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },
    getStatisticsMobile: async (UserId) => {
        try {
            const statistics = await Statistics.findAll({ where: { player: UserId } });
            return statistics;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
};
