const express = require('express');
const { login, getCurrentStudent, getListMarkDetail, getSummaryMark } = require('../controllers/student.controller');
const { readGoogleSheet } = require('../controllers/ggsheets.controller');
const { getDataSheet, leaderBoard } = require('../controllers/superset.controller');
const router = express.Router();

router.post('/login', login);
// router.get('/getCurrentStudent', getCurrentStudent);
// router.get('/getListMarkDetail', getListMarkDetail);
router.get('/student/getSummaryMark', getSummaryMark);

// router.get('/ggsheet/data', readGoogleSheet);

// router.get('/superset/data', getDataSheet);
router.get('/superset/leaderBoard', leaderBoard);

module.exports = router;
