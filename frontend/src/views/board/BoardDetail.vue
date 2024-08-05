<template>
    <div class="container">
        <div class="page_tits">
            <h3>게시글 상세</h3>
        </div>
        <section>
            <table class="table">
                <tbody>
                    <tr class="table-row">
                        <th scope="row" class="bg-light table-cell-15">글 유형</th>
                        <td colspan="2" class="table-cell table-cell-45">
                            <div v-if="editMode" class="d-flex justify-content-center align-items-center">
                                <select v-model="selectedCategory" class="form-select me-2 select-max-width">
                                    <option v-for="(item, index) in selectList" :key="index" :value="item.value">
                                        {{ item.name }}
                                    </option>
                                </select>
                            </div>
                            <div v-else>
                                {{ post.type }}
                            </div>
                        </td>
                        <th scope="row" class="bg-light table-cell-15">등록일</th>
                        <td class="table-cell table-cell-25">{{ post.createdDate }}</td>
                    </tr>
                    <tr class="table-row">
                        <th scope="row" class="bg-light table-cell-15">제목</th>
                        <td colspan="2" class="table-cell table-cell-45">
                            <div v-if="editMode">
                                <input type="text" v-model="post.title" class="form-control" />
                            </div>
                            <div v-else>
                                {{ post.title }}
                            </div>
                        </td>
                        <th scope="row" class="bg-light table-cell-15">조회수</th>
                        <td class="table-cell table-cell-25">{{ post.viewCnt }}</td>
                    </tr>
                    <tr class="table-row">
                        <th scope="row" class="bg-light table-cell-15">이름</th>
                        <td colspan="2" class="table-cell table-cell-45">{{ post.userName }}</td>
                        <th scope="row" class="bg-light table-cell-15"></th>
                        <td class="table-cell table-cell-25"></td>
                    </tr>
                    <tr class="table-row">
                        <th scope="row" class="bg-light table-cell-15">내용</th>
                        <td colspan="5" class="table-cell table-cell-45">
                            <div v-if="editMode">
                                <Editor :initialEditType="'markdown'" :initialValue="post.content" height="500px"
                                    :options="editorOptions" @change="handleChange" />
                            </div>
                            <div v-else class="post-content">
                                {{ post.content }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-between btn_set">
                <div>
                    <button @click="$goToPage('Board')" class="btn btn-primary">목록</button>
                </div>
                <div>
                    <!-- <button v-if="!editMode" @click="editPost" class="btn btn-secondary">수정</button>
                    <button v-else @click="editPost" class="btn btn-secondary">취소</button>
                    <button type="submit" class="btn btn-primary">저장</button>
                    <button @click="deletePost" class="btn btn-danger">삭제</button> -->
                    <!-- editMode가 false일 때 수정과 삭제 버튼 노출 -->
                    <div v-if="!editMode">
                        <button @click="editPost" class="btn btn-secondary">수정</button>
                        <button @click="deletePost" class="btn btn-danger">삭제</button>
                    </div>

                    <!-- editMode가 true일 때 취소와 저장 버튼 노출 -->
                    <div v-else>
                        <button @click="editPost" class="btn btn-secondary">취소</button>
                        <button @click="savePost" class="btn btn-primary">저장</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { Editor } from '@toast-ui/vue-editor';

export default {
    components: {
        Editor
    },
    props: {
        boardNumber: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            selectedCategory: '',
            selectList: [
                { name: "전체", value: "" },
                { name: "일반", value: "general" },
                { name: "지식", value: "knowledge" },
                { name: "질문", value: "qna" },
            ],
            post: {}, // 게시글 데이터를 저장할 객체
            editMode: false, // 게시글 수정 상태 여부값,
            editorOptions: {
                // TO-DO
                // hideModeSwitch: false
            }
        };
    },
    created() {
        // 게시글 데이터를 불러오는 메소드 호출
        this.fetchPostData();
    },
    methods: {
        // 게시글 데이터를 불러오는 메소드
        fetchPostData() {
            // 게시글의 ID를 라우터 파라미터에서 가져옵니다.
            const boardNumber = this.$route.params.boardNumber;
            console.log('boardNumber :: ', boardNumber)
            this.$axios.get(`/api/board/${boardNumber}`)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    alert(error.response.data.message);
                    console.error('Error getting list:', error);
                });
            this.post = {
                id: boardNumber,
                type: '일반',
                title: '수영은 재밋다',
                userName: '김소영',
                createdDate: '2024-04-16',
                viewCnt: 321,
                content: '게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용',
            };
        },
        deletePost() {
            const confirmDelete = window.confirm('정말로 게시글을 삭제하시겠습니까?');

            if (confirmDelete) {
                alert('글 삭제완료!');
                this.$goToPage('Board');
            }
        },
        editPost() {
            this.editMode = !this.editMode;
        },
        handleChange(content) {
            // 에디터 내용이 변경될 때 호출되는 메소드
            this.post.content = content;
        },
    },
};
</script>

<style scoped>
.page_tits {
    margin-bottom: 20px;
}

.path {
    font-size: 14px;
}

.btn_set {
    margin-top: 20px;
}

.table-cell-15 {
    width: 15%;
}

.table-cell-25 {
    width: 25%;
}

.table-cell-45 {
    width: 45%;
}

.table-cell.post-content {
    padding-top: 20px;
    height: 300px;
    /* 기본 높이 설정 */
    min-height: 200px;
    /* 최소 높이 설정 */
    word-wrap: break-word;
    /* 단어가 셀 밖으로 넘칠 때 자동으로 줄바꿈 처리 */
    overflow-y: auto;
    /* 내용이 넘치면 스크롤 표시 */
}

.select-max-width {
    max-width: 300px;
    width: auto;
}
</style>
