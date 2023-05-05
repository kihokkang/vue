var express = require('express');
var router = express.Router();
/**
 * path 모듈은 파일 경로와 관련된 유틸리티 함수들을 제공하는 모듈로, 
 * 파일 경로를 다루는 작업에서 매우 유용합니다. path 모듈을 사용하면 파일 경로를 구성하는 디렉토리명, 
 * 파일명, 확장자 등을 추출하거나 조작할 수 있습니다.
 */
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Express 서버에서 요청이 오면 현재 파일(__dirname)의 상위 디렉토리(../)에 있는 public 폴더 아래에 있는 index.html 파일을 응답으로 보내는 코드입니다.
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;
