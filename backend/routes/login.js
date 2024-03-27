const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * req.isAuthenticated() 메소드를 사용하여 현재 요청이 인증된 요청인지 확인합니다.
 * 인증이 되어 있으면서, 로그인한 사용자가 존재하는 경우, 'req.user' 객체를 JSON으로 반환합니다.
 * 인증되지 않은 요청이거나 로그인한 사용자가 없는 경우, 'user: null'을 JSON으로 반환합니다.
 * get 요청시, 로그인중이라면(passport의 deserializeUser()에서 저장한) req.user의 유저 정보를 보낸다
 */
/**
 * @swagger
 * /auth/login:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: 로그인된 사용자 정보를 가져옵니다.
 *     description: 로그인된 사용자의 정보를 가져오는 엔드포인트입니다. 사용자가 로그인되어 있고 인증된 경우에만 사용 가능합니다.
 *     responses:
 *       '200':
 *         description: 로그인된 사용자 정보를 성공적으로 가져온 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: 로그인된 사용자의 정보
 *       '401':
 *         description: 사용자가 인증되지 않은 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: null
 *                   description: 사용자가 인증되지 않았음을 나타내는 값
 */
router.get('/login', function(req, res, next) {
    if(req.isAuthenticated() && req.user) {
        return res.json({ user: req.user });
    }
    return res.json({ user: null });
});

/**
 * post 요청시, local 전략으로 로그인을 시도한다. 이때 사용되는 username과 password는 LocalStrategy에서 설정한 대로
 * req.body.id와 req.body.password가 된다. 로그인 성공시 user 정보를 보내주고, 로그인 실패시 그 이유를 알기 위해 info 값을 보내준다.
 * passport.authenticate()가 반환하는 값은 미들웨어 이므로 반드시 뒤에 (req,res,next)를 붙여서 호출 해주어야 한다.
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: 사용자 로그인을 시도합니다.
 *     description: 사용자의 로그인을 시도하는 엔드포인트입니다. 인증이 성공하면 사용자 정보를 반환하고, 실패하면 에러 메시지를 반환합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: 사용자 아이디
 *               password:
 *                 type: string
 *                 format: password
 *                 description: 사용자 비밀번호
 *     responses:
 *       '200':
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: './models/User.js'
 *       '401':
 *         description: 로그인 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 에러 메시지
 *     security: []
 */
router.post('/login', function(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.json(info);
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.json({ user });
        });
    })(req, res, next); // 미들웨어 호출
});

// 로그아웃 api
router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.json({ success: true });
    });
});

// 'module.exports'는 Node.js에서 모듈을 내보내기 위한 전역 개체입니다. 이 코드에서는 'router' 변수를 'module.exports'에 할당하여 외부에서 사용할 수 있도록 합니다.
module.exports = router;