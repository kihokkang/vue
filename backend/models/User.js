const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({    // 테이블의 구조
    id: String,
    password: String,
    name: String,
    age: String,
    phone: String,
    profileImageBase64 : String,
    profileImageBlob : Buffer // 이미지 데이터를 Buffer 타입으로 저장
});
module.exports = mongoose.model('User', userSchema); // User 라는 모델명으로 해당 스키마 사용등록