const express = require('express');
const { login, getListMarkDetail, getSummaryMark } = require('../controllers/student.controller');
const { leaderBoard } = require('../controllers/superset.controller');
const router = express.Router();

// student
router.post('/login', login);
router.get('/student/getListMarkDetail', getListMarkDetail);
router.get('/student/getSummaryMark', getSummaryMark);

// superset
router.get('/superset/leaderBoard', leaderBoard);

module.exports = router;
