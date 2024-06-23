const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentController');

router.get('/formats', tournamentController.getAllFormats);
router.get('/types', tournamentController.getAllTypes);
router.get('/levels', tournamentController.getAllLevels);
router.get('/all',tournamentController.getAllTournaments);
router.get('/single',tournamentController.getSingleTournaments);
router.get('/command', tournamentController.getCommandTournaments);
router.post('/create',tournamentController.createTournament);
router.delete('/delete/:tournament_id', tournamentController.deleteTournament);
router.get('/date/:tournament_id', tournamentController.getDate);

module.exports = router;
