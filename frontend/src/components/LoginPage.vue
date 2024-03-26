<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card bg-light">
                    <div class="card-body">
                        <h5 class="card-title mb-4">로그인</h5>
                        <form @submit.prevent="login">
                            <div class="mb-3">
                                <label for="id" class="form-label">아이디</label>
                                <input type="text" class="form-control" id="id" name="id" v-model="id" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">비밀번호</label>
                                <input type="password" class="form-control" id="password" name="password"
                                    v-model="password" required>
                            </div>
                            <button type="submit" class="btn btn-primary">로그인</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import commonUtil from "../common/commonUtil"

export default {
    data() {
        return {
            id: '',
            password: ''
        }
    },
    methods: {
        login() {
            // throw new Error('Sentry Error'); // Sentry 에러 테스트용
            const id = this.id;
            const password = this.password;

            if (commonUtil.isEmpty(id) || commonUtil.isEmpty(password)) {
                alert('ID나 Password를 입력해주세요');
                return;
            }

            this.$axios.post("api/auth/login", { id, password }, { "Content-Type": "application-json" })
                .then((res) => {
                    if (res.data.user) {
                        this.$store.commit("setUser", res.data.user);
                        this.$router.push({ name: "IndexPage" });
                    } else if (res.data.message) {
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
    created() {
    },
    computed: {
    }
}
</script>

<style>
/* 원하는 추가적인 스타일링을 할 수 있습니다. */
body {
  background-color: #f0f8ff; /* 파스텔 하늘색 */
  color: #333; /* 검은색 */
}

/* 카드 스타일링 */
.card {
  border: none;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 로그인 버튼 스타일링 */
.btn-primary {
  background-color: #87cefa; /* 파스텔 하늘색 */
  border: none;
}

/* 로그인 버튼 호버 효과 */
.btn-primary:hover {
  background-color: #5f9eea; /* 진한 파스텔 하늘색 */
}

/* 로그인 버튼 클릭 효과 */
.btn-primary:active {
  background-color: #4682b4; /* 더 진한 파스텔 하늘색 */
}
</style>