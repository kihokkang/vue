<template>
  <div class="container">
    <h3 class="text-center my-4">글쓰기</h3>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input v-model="title" type="text" class="form-control" id="title" placeholder="제목을 입력하세요" required>
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea v-model="content" class="form-control" id="content" rows="5" placeholder="내용을 입력하세요" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">글쓰기</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: ''
    };
  },
  methods: {
    submitForm() {
      // 글쓰기 기능 구현
      console.log('제목:', this.title);
      console.log('내용:', this.content);
      // 글쓰기 로직을 이곳에 추가하세요
    }
  }
}
</script>