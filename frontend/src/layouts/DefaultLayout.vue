<template>
  <div class="default-layout">
    <!-- 헤더 -->
    <Header />

    <!-- 페이지 컨텐츠 -->
    <div class="content">
      <slot></slot>
    </div>

    <!-- 푸터 -->
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
.default-layout {
  position: relative; /* 컨테이너 요소의 position을 relative로 설정 */
  min-height: 100vh; /* 화면 전체 높이를 커버하기 위해 최소 높이를 100vh로 설정 */
}
.content {
  margin-top: 60px; /* 헤더의 높이만큼 컨텐츠 아래로 밀어줌 */
  margin-bottom: 60px; /* 푸터의 높이만큼 컨텐츠 위로 밀어줌 */
  display: flex; /* Flexbox 사용 */
  justify-content: center; /* 가로 방향 가운데 정렬 */
  align-items: center; /* 세로 방향 가운데 정렬 */
  position: relative; /* 컨텐츠의 position을 relative로 설정 */
  z-index: 1; /* 헤더와 겹치는 부분을 뒤로 보냄 */
  height: calc(100vh - 120px); /* 화면 전체 높이에서 헤더와 푸터의 높이를 뺀 값으로 설정 */
  overflow-y: auto; /* 컨텐츠가 높이를 초과할 경우 세로 스크롤 표시 */
  overflow-x: hidden; /* 컨텐츠가 너비를 초과할 경우 가로 스크롤 숨김 */
}
</style>