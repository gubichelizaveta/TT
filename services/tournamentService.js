const Tournament = require('../context').Tournament;

module.exports = {
    createTournament: async (tournament_name, start_date, end_date,number_participants,location, format, type, level) => {
        const tournament = await Tournament.create({
            tournament_name,
            start_date,
            end_date,
            number_participants,
            location,
            format,
            type,
            level
        });
        await tournament.save();
        return tournament;
    }
};
