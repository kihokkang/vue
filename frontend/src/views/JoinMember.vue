<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow p-3 mb-5 bg-body rounded">
                    <div class="card-body">
                        <h5 class="card-title mb-4">회원가입</h5>
                        <form @submit.prevent="registerUser">
                            <div class="mb-3">
                                <label for="id" class="form-label">아이디</label>
                                <input type="text" class="form-control" id="id" v-model="userData.id"
                                    required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">비밀번호</label>
                                <input type="password" class="form-control" id="password" v-model="userData.password"
                                    @blur="validateInput('password')" required>
                            </div>
                            <div class="mb-3">
                                <label for="name" class="form-label">이름</label>
                                <input type="text" class="form-control" id="name" v-model="userData.name" required>
                            </div>
                            <div class="mb-3">
                                <label for="age" class="form-label">나이</label>
                                <input type="number" maxlength="3" class="form-control" id="age" v-model="userData.age"
                                    required>
                            </div>
                            <div class="mb-3">
                                <label for="phone" class="form-label">전화번호</label>
                                <input type="text" maxlength="11" class="form-control" id="phone"
                                    v-model="userData.phone" @keypress="validateInput('phone')" required>
                            </div>
                            <button type="submit" class="btn btn-primary">가입하기</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import commonUtil from '../common/commonUtil';

export default {
    data() {
        return {
            userData: {
                name: '',
                id: '',
                password: '',
                age: '',
                phone: ''
            }
        };
    },
    methods: {
        registerUser() {
            // 이 부분에서 회원가입 로직을 작성합니다.
            console.log('가입한 사용자 정보:', this.userData);

            // Axios를 사용하여 POST 요청 보내기
            this.$axios.post('/api/user/create', this.userData)
                .then(response => {
                    console.log(response.data.message);
                    alert('회원가입을 축하드립니다!');
                    this.$router.push({ name: "IndexPage" });
                })
                .catch(error => {
                    alert(error.response.data.message);
                    console.error('Error creating user:', error); // 오류 처리
                });
        },
        validateInput(type) {
            if (type == 'password') {
                const passYn = commonUtil.stringUtil.validatePassword(this.userData.password);
                if (!passYn) alert('비밀번호는 최소 8자 이상이어야 하며 영문, 숫자, 특수문자를 포함해야 합니다.');
            } else if (type == 'phone') {
                const keyCode = event.keyCode;
                // 입력된 키가 숫자가 아니면 입력을 막음
                if (!(keyCode >= 48 && keyCode <= 57)) {
                    event.preventDefault();
                }
            }
        },
    }
};
</script>

<style>
/* 배경색 설정 */
body {
    background-color: #f2f2f2;
    /* 연한 회색 */
}

/* 카드 스타일 설정 */
.card {
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 입력란 스타일 설정 */
.form-control {
    border-radius: 15px;
    /* 둥근 테두리 */
}

/* 가입하기 버튼 스타일 설정 */
.btn-primary {
    border-radius: 15px;
    /* 둥근 테두리 */
}
</style>