<template>
  <div class="container">
    <h3 class="text-center my-4">글쓰기</h3>
    <p class="text-muted text-start">
      <span v-if="$store.getters.user">{{ this.$store.getters.user.name }} 님! </br></span>
      지식의 나눔은 함께 하는 즐거움의 시작입니다. Amigo에서 새로운 사람들을 만나고,</br>
       다양한 생각과 경험을 공유해보세요. 지식을 공유함으로써 서로가 발전하고 성장하는 순간을 함께하실 수 있습니다.</p>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <input v-model="title" type="text" class="form-control" id="title" placeholder="제목을 입력하세요" required>
      </div>
      <div class="mb-3">
        <Editor ref="toastEditor" :initialEditType="'markdown'" :initialValue="content" height="500px" :options="editorOptions" @change="handleChange"/>
      </div>
      <div class="d-flex justify-content-between mb-3">
        <button type="button" class="btn btn-danger" @click="$goToPage('Board')">취소</button>
        <button type="submit" class="btn btn-primary">저장</button>
      </div>
    </form>
  </div>
</template>

<script>
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';

export default {
  components: {
    Editor
  },
  data() {
    return {
      title: '',
      content: null, // TOAST UI Editor의 초기 내용을 저장할 데이터
      editorOptions: {
        // TO-DO
        // hideModeSwitch: false
      }
    };
  },
  methods: {
    // 에디터 내용이 변경될 때 호출되는 메소드
    handleChange() {
      this.content = this.$refs.toastEditor.invoke('getMarkdown');
      console.log('내용:', this.content);
    },
    
    submitForm() {
      var data = {
        title : this.title,
        content : this.content,
        userId : this.$store.getters.user.id,
        category : 1
      }
      console.log('내용:', this.$refs.toastEditor.invoke('getMarkdown'));
      this.$axios.post('/api/board/writeBoard', data)
        .then(response => {
          console.log(response);
          this.$commonUtil.showToast('게시글이 등록되었습니다.');
          this.$goToPage('Board');
        })
        .catch(error => {
          alert(error.response.data.message);
          console.error('Error getting list:', error); // 오류 처리
        });
    }
  }
}
</script>

<style scoped>
</style>