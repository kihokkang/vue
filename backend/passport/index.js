const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

exports.config = (passport) => {
    // 로그인을 하면 user 정보를 세션에 저장하기 위해 호출
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    // 매 요청시 호출되면서 세션에 저장된 정보(위 코드에서는 id)를 불러온다
    // 그 id에 해당하는 user를 찾아서 done에 넣어주면 req.user에 유저 정보가 저장된다
    passport.deserializeUser(async (id, done) => {
        try {
            // MongoDB에서 사용자를 찾습니다.
            const user = await User.findOne({ id: id });
            if (user) {
                done(null, user); // 사용자를 찾았으면 done 콜백으로 사용자를 반환합니다.
            } else {
                done(new Error('User not found')); // 사용자를 찾지 못한 경우 에러를 전달합니다.
            }
        } catch (error) {
            done(error); // 오류가 발생한 경우 done 콜백으로 오류를 전달합니다.
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
    }, async (id, password, done) => {
        try {
            // MongoDB에서 사용자 조회
            const user = await User.findOne({ id: id });
            if (!user) {
                return done(null, false, { message: "회원 정보가 없습니다." });
            }
            // 비밀번호 일치 여부 확인
            bcrypt.compare(password, user.password, (err, isPasswordMatch) => {
                if (err) {
                    return done(err);
                }
                if (isPasswordMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "비밀번호가 틀립니다" });
                }
            });
        } catch (err) {
            return done(err);
        }
    }));
}