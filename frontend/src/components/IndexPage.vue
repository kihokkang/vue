<template>
    <div v-if="user">
        <h1>Current User</h1>
        <p>ID: {{ user.id }}</p>
        <p>Password: {{ user.password }}</p>
        <p>Name: {{ user.name }}</p>
        <!-- 로그아웃 버튼 -->
        <button @click="logout">로그아웃</button>
    </div>
</template>
<script>
export default {
    methods: {
        logout() {
            // 서버에 로그아웃 요청 보내기
            this.$axios.post("api/auth/logout")
                .then((res) => {
                    if (res.data.success) {
                        // 로그아웃 성공 시 로컬 상태 초기화하고 로그인 페이지로 이동
                        this.$store.commit("setUser", null);
                        this.$router.push({ name: "LoginPage" });
                    } else {
                        alert("로그아웃에 실패했습니다.");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    },
    created() {
        console.log('user :: ', this.$store.getters.user);
        if (this.$store.getters.user == null) {
            this.$axios.get('/api/auth/login')
                .then((res) => {
                    const user = res.data.user;
                    if (user) {
                        this.$store.commit("setUser", user); //  setUser 뮤테이션은 user라는 값을 인자로 받아 Vuex 상태(store)의 user 값을 업데이트합니다.
                    } else {
                        this.$router.push({ name: "LoginPage" }); // name 속성이 "LoginPage"인 페이지로 이동하도록 지정됩니다. 즉, LoginPage라는 이름을 가진 페이지로 이동합니다.
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    },
    computed: {
        user() { return this.$store.getters.user; } // computed 속성이므로 user 값은 상태(store) 또는 다른 연관된 속성이 변경될 때 자동으로 업데이트됩니다.
    }
}
</script>