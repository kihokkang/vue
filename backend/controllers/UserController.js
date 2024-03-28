const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const { id, password, name, age, phone } = req.body;
    
    // ID 중복 확인
    const existingUser = await User.findOne({ id });
    console.log("existingUser ::", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: '이미 사용 중인 ID입니다. 다른 ID를 선택해주세요.' });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 사용자 생성
    const newUser = new User({ id, password: hashedPassword, name, age, phone });
    await newUser.save();
    
    // 회원가입 성공 메시지 전송
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};