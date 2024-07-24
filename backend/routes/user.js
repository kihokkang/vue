const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // 메모리 스토리지 사용

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

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: 사용자 정보 가져오기
 *     description: ID에 해당하는 사용자의 정보를 검색합니다.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: OK. 사용자 정보 반환
 *       404:
 *         description: 찾을 수 없음. 해당 ID의 사용자를 찾을 수 없음.
 *       500:
 *         description: 내부 서버 오류. 서버에서 오류가 발생했습니다.
 */
router.get('/:id', UserController.getUserById);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: 사용자 정보 전체 업데이트
 *     description: 사용자의 정보를 전체적으로 업데이트합니다.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 사용자 ID
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: 업데이트할 사용자 정보
 *         schema:
 *           type: object
 *           properties:
*             password:
 *               type: string
 *             name:
 *               type: string
 *             age:
 *               type: string
 *             phone:
 *               type: string
 *     responses:
 *       '200':
 *         description: 업데이트된 사용자 정보 반환
 *       '404':
 *         description: 해당 아이디의 사용자를 찾을 수 없음
 *       '500':
 *         description: 서버 오류
 */
router.put('/:id', UserController.updateUserById);

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: 사용자 정보 부분 업데이트
 *     description: 사용자의 정보 일부를 업데이트합니다.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 사용자 ID
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: 업데이트할 사용자 정보
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *             name:
 *               type: string
 *             age:
 *               type: string
 *             phone:
 *               type: string
 *     responses:
 *       '200':
 *         description: 업데이트된 사용자 정보 반환
 *       '404':
 *         description: 해당 아이디의 사용자를 찾을 수 없음
 *       '500':
 *         description: 서버 오류
 */
router.patch('/:id', upload.single('profileImageBlob'), UserController.updateUserById);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: 사용자 정보 삭제하기
 *     description: ID에 해당하는 사용자의 정보를 삭제합니다.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: OK. 사용자 정보 삭제 성공
 *       404:
 *         description: 찾을 수 없음. 해당 ID의 사용자를 찾을 수 없음.
 *       500:
 *         description: 내부 서버 오류. 서버에서 오류가 발생했습니다.
 */
router.delete('/:id', UserController.deleteUserById);

module.exports = router;