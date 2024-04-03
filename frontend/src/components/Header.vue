<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <!-- 로고 또는 사이트 이름 -->
        <a class="navbar-brand" href="#">Amigo</a>
        <!-- 햄버거 아이콘 -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- 메뉴 목록 -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
            <!-- 기타 메뉴 항목 추가 -->
          </ul>
          <div v-if="user" class="d-flex align-items-center">
            <span class="text-light me-3">{{ user.name + '님' }}</span>

            <!-- 드롭다운 토글 버튼 -->
            <div class="dropdown">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                data-bs-toggle="dropdown" aria-expanded="false">
                마이페이지
              </button>
              <!-- 드롭다운 메뉴 -->
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" @click="$goToPage('EditProfile')">회원정보</a></li>
                <li><a class="dropdown-item" @click="deleteUser()">탈퇴</a></li>
                <!-- 다른 메뉴 아이템 추가 가능 -->
              </ul>
            </div>

            <!-- 로그아웃 버튼 -->
            <button class="btn btn-outline-danger ms-3" type="button" @click="logout">Logout</button>
          </div>
          <div v-else>
            <BaseButton className="btn btn-outline-light" type="button"
              :clickHandler="() => $goToPage('LoginPage')">Login</BaseButton>
            <BaseButton className="btn btn-outline-light" type="button"
              :clickHandler="() => $goToPage('JoinMember')">Join</BaseButton>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import BaseButton from '@/components/BaseButton';

export default {
  name: 'Header',
  components: {
    BaseButton // Button.vue 컴포넌트를 등록합니다.
  },
  computed: {
    user() { return this.$store.getters.user; }, // computed 속성이므로 user 값은 상태(store) 또는 다른 연관된 속성이 변경될 때 자동으로 업데이트됩니다.
  },
  methods: {
    logout() {
      // 서버에 로그아웃 요청 보내기
      this.$axios.post("api/auth/logout")
        .then((res) => {
          if (res.data.success) {
            // 로그아웃 성공 시 로컬 상태 초기화하고 로그인 페이지로 이동
            this.$store.commit("setUser", null);
            this.$goToPage('LoginPage');
          } else {
            alert("로그아웃에 실패했습니다.");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    deleteUser() {
      const userId = this.$store.getters.user.id
      const confirmDelete = window.confirm('정말로 사용자를 삭제하시겠습니까?');

      // 사용자가 확인을 누르면 삭제 요청을 보냅니다.
      if (confirmDelete) {
        this.$axios.delete(`/api/user/${userId}`)
          .then(response => {
            console.log('사용자 삭제 성공:', response.data);
            alert("성공적으로 사용자가 삭제되었습니다.");
            this.$store.commit("setUser", null);
            this.$goToPage('LoginPage');
          })
          .catch(error => {
            console.error('사용자 삭제 실패:', error.response.data);
            // 사용자 삭제에 실패했습니다.
          });
      }
    }
  },
}
</script>

<style scoped>
/* 헤더에만 적용되는 스타일 */
/* 헤더 스타일 */
header {
  position: fixed;
  /* 헤더를 화면 위쪽에 고정 */
  top: 0;
  /* 화면 상단에 위치 */
  width: 100%;
  /* 가로폭 전체 너비를 차지 */
  background-color: #222;
  /* 약간의 검은색 배경색 */
  color: white;
  /* 글자색 지정 */
  padding: 10px;
  /* 여백 추가 */
  z-index: 2;
  /* 헤더를 컨텐츠 위로 올림 */
}
</style>