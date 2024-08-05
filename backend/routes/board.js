const express = require('express');
const router = express.Router();
const BoardController = require('../controllers/BoardController');

router.get('/getBoardList', BoardController.getBoardList);

router.get('/:boardNumber', BoardController.getBoardDetail);

router.post('/writeBoard', BoardController.writeBoard);

module.exports = router;