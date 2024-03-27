<template>
    <footer>
      <p>&copy; 2024 Giho Kim Website</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
  <style scoped>
/* 푸터 스타일 */
footer {
  position: fixed; /* 푸터를 화면 아래쪽에 고정 */
  bottom: 0; /* 화면 하단에 위치 */
  width: 100%; /* 가로폭 전체 너비를 차지 */
  background-color: #222; /* 약간의 검은색 배경색 */
  color: white; /* 글자색 지정 */
  padding: 10px; /* 여백 추가 */
  z-index: 2; /* 푸터를 컨텐츠 위로 올림 */
}
  </style>