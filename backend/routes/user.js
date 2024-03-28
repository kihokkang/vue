const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

/**
 * @swagger
 *   /user/create:
 *   post:
 *     summary: 사용자 생성
 *     description: 제공된 정보로 새로운 사용자를 생성합니다.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               age:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: 사용자가 성공적으로 생성되었습니다.
 *       400:
 *         description: 잘못된 요청 본문
 *       500:
 *         description: 내부 서버 오류
 */
router.post('/create', UserController.createUser);

// 다른 유저 라우트들 추가 가능

module.exports = router;