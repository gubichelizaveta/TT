const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/all', newsController.getAll);
router.get('/lastNews', newsController.getLastNews);
router.get('/:newsId', newsController.getOneNew);
router.post('/create', newsController.createNew);
module.exports = router;