<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <!-- 로고 또는 사이트 이름 -->
        <a class="navbar-brand"><router-link to="/" class="nav-link">Amigo</router-link></a>
        <!-- 햄버거 아이콘 -->
        <BaseButton className="navbar-toggler" type="button" :clickHandler="() => toggleNavbar()">
          <span class="navbar-toggler-icon"></span>
        </BaseButton>
        <!-- 메뉴 목록 -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link" href="#" role="button" id="moduleDropdown" data-bs-toggle="dropdown"
                aria-expanded="false">Module</a>
              <!-- 서브메뉴 -->
              <ul class="dropdown-menu" aria-labelledby="moduleDropdown">
                <li><router-link to="/module1" class="dropdown-item">Chart</router-link></li>
                <li><router-link to="/module2" class="dropdown-item">Role</router-link></li>
                <!-- 다른 모듈 추가 -->
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="$goToPage('Board')">Q&A</a>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link">Career</router-link>
            </li>
            <!-- 기타 메뉴 항목 추가 -->
          </ul>
          <!-- 사용자 관련 메뉴 -->
          <div v-if="user" class="d-flex align-items-center">
            <span class="text-light me-3">{{ user.name + '님' }}</span>
            <!-- 마이페이지 드롭다운 -->
            <div class="dropdown">
              <BaseButton className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                data-bs-toggle="dropdown" aria-expanded="false">마이페이지</BaseButton>
              <!-- 드롭다운 메뉴 -->
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" @click="$goToPage('EditProfile')">회원정보</a></li>
                <li><a class="dropdown-item" @click="deleteUser()">탈퇴</a></li>
                <!-- 다른 메뉴 아이템 추가 -->
              </ul>
            </div>
            <!-- 로그아웃 버튼 -->
            <BaseButton className="btn btn-outline-danger ms-3" type="button" :clickHandler="() => logout()">Logout
            </BaseButton>
          </div>
          <!-- 로그인 및 회원가입 버튼 -->
          <div v-else>
            <BaseButton className="btn btn-outline-light" type="button" :clickHandler="() => $goToPage('Login')">
              Login</BaseButton>
            <BaseButton className="btn btn-outline-light" type="button" :clickHandler="() => $goToPage('JoinMember')">
              Join</BaseButton>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import BaseButton from '@/components/base/BaseButton';

export default {
  name: 'Header',
  components: {
    BaseButton // Button.vue 컴포넌트를 등록합니다.
  },
  data() {
    return {
    };
  },
  computed: {
    user() { return this.$store.getters.user; }, // computed 속성이므로 user 값은 상태(store) 또는 다른 연관된 속성이 변경될 때 자동으로 업데이트됩니다.
  },
  methods: {
    toggleNavbar() {
      const navbar = document.getElementById('navbarNav');
      if (navbar) {
        const expanded = navbar.getAttribute('aria-expanded') === 'true';
        navbar.setAttribute('aria-expanded', !expanded); // aria-expanded 토글
        navbar.classList.toggle('show'); // 네비게이션 바 토글
      }
    },
    logout() {
      // 서버에 로그아웃 요청 보내기
      console.log('호출됐냐');
      this.$axios.post("api/auth/logout")
        .then((res) => {
          if (res.data.success) {
            // 로그아웃 성공 시 로컬 상태 초기화하고 로그인 페이지로 이동
            this.$store.commit("setUser", null);
            this.$goToPage('Login');
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
            this.$goToPage('Login');
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

.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu {
  display: none;
}

.dropdown-menu:hover {
  display: block;
}
</style>