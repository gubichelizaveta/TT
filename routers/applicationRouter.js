const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.get('/all', applicationController.getAllApplications);
router.get('/all/team', applicationController.getAllTeamApplications);
router.get('/checkPlayer', applicationController.checkPlayer);
router.get('/checkTeam', applicationController.checkTeam);
router.get('/checkLogin', applicationController.checkLogin);
router.post('/createPlayer', applicationController.createPlayer);
router.post('/createTeam', applicationController.createTeam);
router.post('/addPlayerInTeam', applicationController.addPlayerInTeam);
router.get('/getTeamsPlayer',applicationController.getTeamsPlayer);
router.put('/cancel/:applicationId', applicationController.cancelApplication);
router.put('/confirm', applicationController.confirmApplication);
router.post('/create', applicationController.create);
router.get('/usersRequest/:userId', applicationController.getUsersRequest);

module.exports = router;