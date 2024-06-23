const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/all', userController.getAllUsers);
router.post('/add', userController.CreateUser);
router.get('/:UserName/:Password', userController.getUser);
router.get('/:UserName', userController.getIdByName);
router.get('/player/:UserId', userController.getPlayerId);


module.exports = router;