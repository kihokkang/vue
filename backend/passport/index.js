const LocalStrategy = require('passport-local').Strategy;
const users = require('../data/users.json');
const bcrypt = require('bcryptjs');


exports.config = (passport) => {
    // 로그인을 하면 user 정보를 세션에 저장하기 위해 호출
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // 매 요청시 호출되면서 세션에 저장된 정보(위 코드에서는 id)를 불러온다
    // 그 id에 해당하는 user를 찾아서 done에 넣어주면 req.user에 유저 정보가 저장된다
    passport.deserializeUser((id, done) => {
        const result = users.filter((user) => user.id === id);
        if(result.length > 0){
            done(null, result[0]);
        }
    });

    // usernameField, passwordField : 로그인시 설정된 이름으로 req.body에서 값을 읽어온다
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
    }, (id, password, done) => {
        const result = users.filter((user) => user.id === id);
        if(result.length > 0) {
            const user = result[0];
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
        } else {
            return done(null, false, { message: "회원 정보가 없습니다." });
        }
    }));
}