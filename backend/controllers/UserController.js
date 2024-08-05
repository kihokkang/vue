const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const { id, password, name, age, phone } = req.body;
    
    // ID 중복 확인
    const existingUser = await User.findOne({ id });
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

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: '해당 아이디의 사용자를 찾을 수 없습니다.' });
    }

    // 프로필 이미지 Blob 데이터를 Base64로 변환
    let profileImageBase64 = '';
    if (user.profileImageBlob) {
      profileImageBase64 = user.profileImageBlob.toString('base64');
    }

    const userData = {
      id: user.id,
      name: user.name,
      age: user.age,
      phone: user.phone,
      profileImageBase64: `data:image/jpeg;base64,${profileImageBase64}`
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: '서버 오류' });
  }
};

exports.updateUserById = async (req, res) => {
  try {

    console.log('업데이트 ::: ', req.body);
    const userId = req.params.id;
    const { password, name, age, phone } = req.body;
    const profileImageBlob = req.file ? req.file.buffer : null; // 업로드된 이미지가 있으면 Buffer로 변환

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 업데이트할 사용자 정보 추출
    const userDataToUpdate = {};
    if (password) userDataToUpdate.password = hashedPassword;
    if (name) userDataToUpdate.name = name;
    if (age) userDataToUpdate.age = age;
    if (phone) userDataToUpdate.phone = phone;
    if (profileImageBlob) userDataToUpdate.profileImageBlob = profileImageBlob;

    // 사용자 정보 업데이트
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      userDataToUpdate,
      { new: true } // 업데이트된 문서 반환
    );

    if (!updatedUser) {
      return res.status(404).json({ message: '해당 아이디의 사용자를 찾을 수 없습니다.' });
    }

     // 프로필 이미지 Blob 데이터를 Base64로 변환
     if (updatedUser.profileImageBlob) {
        updatedUser.profileImageBase64 = `data:image/jpeg;base64,${updatedUser.profileImageBlob.toString('base64')}`;
     }

     delete updatedUser.profileImageBlob;

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: '서버 오류' });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    // 데이터베이스에서 해당 ID를 가진 사용자를 삭제합니다.
    const deletedUser = await User.findOneAndDelete({ id: userId });
    if (!deletedUser) {
      // 삭제된 사용자가 없을 경우 404 응답을 반환합니다.
      return res.status(404).json({ message: '해당 아이디의 사용자를 찾을 수 없습니다.' });
    }
    // 삭제된 사용자의 정보를 반환합니다.
    res.status(200).json({ message: '사용자가 성공적으로 삭제되었습니다.', deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    // 서버 오류가 발생한 경우 500 응답을 반환합니다.
    res.status(500).json({ message: '서버 오류' });
  }
};