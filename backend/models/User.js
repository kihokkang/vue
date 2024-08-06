const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({    // 테이블의 구조
    id: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: String, required: true },
    phone: { type: String, required: true },
    profileImageBase64 : { type: String }, // 화면 노출용
    profileImageBlob : { type: Buffer }    // DB 저장용 : 이미지 데이터를 Buffer 타입으로 저장
});
module.exports = mongoose.model('User', userSchema); // User 라는 모델명으로 해당 스키마 사용등록