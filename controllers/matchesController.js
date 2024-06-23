
const matchesService = require('../services/matchesService');


module.exports = {
    getTournamentsMatches: async (req, res) => {
        try {
            const { tournamentId } = req.params;
            const matches = await matchesService.getTournamentsMatches(tournamentId);
            res.json(matches);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    GenerateMatches: async (req, res) => {
        try {
            const { tournamentId } = req.params;
            const matches = await matchesService.GenerateMatches(tournamentId);
            res.json(matches);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    GenerateTeamMatches: async (req, res) => {
        try {
            const { tournamentId } = req.params;
            const matches = await matchesService.GenerateTeamMatches(tournamentId);
            res.json(matches);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    SetResult: async (req, res) => {
        try {
            const { matchId, winnerId, score } = req.body;
            const result = await matchesService.SetResult(matchId, winnerId, score);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    SetTeamResult: async (req, res) => {
        try {
            const { matchId, winnerId, score } = req.body;
            const result = await matchesService.SetTeamResult(matchId, winnerId, score);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
    getAll: async (req, res) => {
        try {
            const { tournamentId } = req.params;
            const matches = await matchesService.getAll(tournamentId);
            res.json(matches);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    },
/*     getParticipants: async (req, res, next) => {
        try {
            const { tournamentId } = req.params;
            const participants = await matchesService.getParticipants(tournamentId);
            res.json(participants);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }, */
    getTournamentResults : async (req, res) => {
        const { tournamentId } = req.params;
        try {
            const results = await matchesService.getTournamentResult(tournamentId);
            res.status(200).json(results);
        } catch (error) {
            console.error('Error fetching tournament results:', error);
            res.status(500).json({ error: 'An error occurred while fetching tournament results' });
        }
    },
    getTeamResults : async (req, res) => {
        const { tournamentId } = req.params;
        try {
            const results = await matchesService.getTeamResults(tournamentId);
            res.status(200).json(results);
        } catch (error) {
            console.error('Error fetching tournament results:', error);
            res.status(500).json({ error: 'An error occurred while fetching tournament results' });
        }
    },
    checkAllMatchesPlayed : async (req, res) => {
        const { tournamentId } = req.params;
        try {
            const allMatchesPlayed = await matchesService.areAllMatchesPlayed(tournamentId);
            res.status(200).json({ allMatchesPlayed });
        } catch (error) {
            console.error('Error checking match status:', error);
            res.status(500).json({ error: 'An error occurred while checking match status' });
        }
    },
    checkAllTeamMatchesPlayed : async (req, res) => {
        const { tournamentId } = req.params;
        try {
            const allTeamMatchesPlayed = await matchesService.areAllTeamMatchesPlayed(tournamentId);
            res.status(200).json({ allTeamMatchesPlayed });
        } catch (error) {
            console.error('Error checking match status:', error);
            res.status(500).json({ error: 'An error occurred while checking match status' });
        }
    },
    getParticipants: async(req,res) => {
        const { tournamentId } = req.params;
        try {
            const part = await matchesService.getParticipants(tournamentId);
            res.status(200).json(part);
        } catch (error) {
            console.error('Error ', error);
            res.status(500).json({ error: ' error' });
        }
    },
    getParticipantsTeam: async(req,res) => {
        const { tournamentId } = req.params;
        try {
            const part = await matchesService.getParticipants(tournamentId);
            res.status(200).json(part);
        } catch (error) {
            console.error('Error', error);
            res.status(500).json({ error: 'error ' });
        }
    },
    deleteParticipant: async (req,res) => {
        const { tournamentId,playerId } = req.params;
        try {
            const result = await matchesService.deleteParticipant(tournamentId,playerId);
            res.status(200).json({ success: true, message: 'Participant deleted successfully' });
        } catch (error) {
            console.error('Error deleting participant:', error);
            res.status(500).json({ success: false, message: 'Failed to delete participant' });
        }
    }
};