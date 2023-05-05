const express = require('express');
const router = express.Router();

const users = require('../data/users.json');

/**
 * '/' 경로에 대한 GET 요청을 처리하며, 해당 경로에 요청이 들어오면 'users.json' 파일에서 첫 번째 유저를 JSON 형식으로 반환 합니다.
 * 이렇게 반환된 JSON 데이터는 클라이언트에게 응답으로 전송됩니다
 */
router.get('/', function(req, res, next) {
    res.json({ user: users[0]});
});

// 'module.exports'는 Node.js에서 모듈을 내보내기 위한 전역 개체입니다. 이 코드에서는 'router' 변수를 'module.exports'에 할당하여 외부에서 사용할 수 있도록 합니다.
module.exports = router;