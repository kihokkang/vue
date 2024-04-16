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
                        <td colspan="2" class="table-cell table-cell-45">일반</td>
                        <th scope="row" class="bg-light table-cell-15">등록일</th>
                        <td class="table-cell table-cell-25">{{ post.createdDate }}</td>
                    </tr>
                    <tr class="table-row">
                        <th scope="row" class="bg-light table-cell-15">제목</th>
                        <td colspan="2" class="table-cell table-cell-45">{{ post.title }}</td>
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
                        <td colspan="5" class="table-cell table-cell-45 post-content">{{ post.content }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex justify-content-between btn_set">
                <div>
                    <button @click="$goToPage('Board')" class="btn btn-primary">목록</button>
                </div>
                <div>
                    <button @click="editPost" class="btn btn-secondary">수정</button>
                    <button @click="deletePost" class="btn btn-danger">삭제</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        postId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            post: {}, // 게시글 데이터를 저장할 객체
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
            const postId = this.$route.params.id;
            console.log('postId :: ', this.postId)

            // 게시글 데이터를 불러오는 API 호출 (예: axios 또는 fetch 사용)
            // 예시: axios.get(`/api/posts/${postId}`)
            //     .then(response => {
            //        this.post = response.data;
            //     })
            //     .catch(error => {
            //        console.error('Error fetching post data:', error);
            //     });

            // 위의 주석처럼 실제 API 호출을 사용하여 데이터를 가져와야 합니다.
            // 여기서는 임시로 하드코딩된 예시 데이터를 사용합니다.
            this.post = {
                id: postId,
                title: '수영은 재밋다',
                userName: '김소영',
                createdDate: '2024-04-16',
                viewCnt: 321,
                content: '게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용',
            };
        },
        deletePost(){
            const confirmDelete = window.confirm('정말로 게시글을 삭제하시겠습니까?');

            if(confirmDelete){
                alert('글 삭제완료!');
                this.$goToPage('Board');
            }
        },
        editPost(){

        }
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
</style>
