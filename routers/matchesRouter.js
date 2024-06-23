const express = require('express');
const router = express.Router();
const matchesController = require('../controllers/matchesController');

router.get('/:tournamentId', matchesController.getTournamentsMatches);
router.get('/all/:tournamentId', matchesController.getAll); 
router.post('/generate/:tournamentId', matchesController.GenerateMatches); 
router.post('/generate/team/:tournamentId', matchesController.GenerateTeamMatches);
router.put('/result', matchesController.SetResult);
router.put('/team/result', matchesController.SetTeamResult);
router.get('/tResult/:tournamentId', matchesController.getTournamentResults);
router.get('/teamTResult/:tournamentId', matchesController.getTeamResults);
router.get('/areAllPlayed/:tournamentId', matchesController.checkAllMatchesPlayed);
router.get('/areAllTeamPlayed/:tournamentId', matchesController.checkAllTeamMatchesPlayed);
router.get('/participants/:tournamentId', matchesController.getParticipants);
router.get('/participantsTeam/:tournamentId', matchesController.getParticipantsTeam);
router.delete('/participants/:tournamentId/:playerId', matchesController.deleteParticipant);
//router.get('/participants/:tournamentId', matchesController.getParticipants);
module.exports = router;