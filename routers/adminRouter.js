const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.dashboard);
router.get('/shedule', adminController.shedule);
router.get('/application',adminController.application);
router.get('/ratingAll',adminController.ratingAll);
router.get('/ratingAdd',adminController.ratingAdd);
router.get('/statistics', adminController.statistics);
router.get('/matches', adminController.matches);
router.get('/news', adminController.news);
router.get('/result',adminController.result);

module.exports = router;