
const statisticsService = require('../services/statisticsService');


module.exports = {
    getStatistics: async (req, res) => {
        try {
            const statistics = await statisticsService.getStatistics();
            res.json(statistics);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    getStatisticsMobile: async (req, res) => {
        try {
            const { UserId } = req.params;
            const statistics = await statisticsService.getStatisticsMobile(UserId);
            res.json(statistics);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }
};