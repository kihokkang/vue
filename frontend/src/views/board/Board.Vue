<template>
    <div>
        <section class="notice" style="width: 200vw;">
            <div class="container">
                <h3 class="text-center mb-4">게시판</h3>
                <!-- board search area -->
                <div id="board-search" class="mb-4">
                    <div class="row">
                        <!-- 카테고리 선택을 왼쪽 끝에 정렬 -->
                        <div class="col-md-3 d-flex align-items-center">
                            <select v-model="selectedCategory" class="form-select me-2 w-100">
                                <option v-for="(item, index) in selectList" :key="index" :value="item.value">
                                    {{ item.name }}
                                </option>
                            </select>
                        </div>

                        <!-- 검색어 입력란과 검색 버튼을 오른쪽 끝에 정렬 -->
                        <div class="col-md-9 d-flex justify-content-end align-items-center">
                            <form @submit.prevent="search" class="d-flex w-100 justify-content-end">
                                <input v-model="searchKeyword" id="search" type="search" name=""
                                    class="form-control me-2 w-25" placeholder="검색어를 입력해주세요.">
                                <button class="btn btn-dark align-self-center d-inline-flex">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- board list area -->
                <BoardList :notices="displayedNotices" :currentPage="currentPage" :totalPages="totalPages"
                    @changePage="changePage" />
                <!-- 글쓰기 버튼 -->
                <div class="text-end">
                    <button type="button" class="btn btn-primary" @click="$goToPage('BoardWrite')">
                        <i class="fas fa-pen"></i> 작성하기
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import BoardList from './BoardList.vue'

export default {
    components: {
        BoardList
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
            searchKeyword: '',
            notices: [],
            currentPage: 1,
            itemsPerPage: 10, // 한 페이지 당 아이템 수
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.notices.length / this.itemsPerPage);
        },
        displayedNotices() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.notices.slice(start, end);
        },
    },
    methods: {
        search() {
            // 검색 기능 구현
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
        },
        generateNotices() {
            this.$axios.get('/api/board/getBoardList')
                .then(response => {
                    console.log(response);
                    this.notices = response.data;
                })
                .catch(error => {
                    alert(error.response.data.message);
                    console.error('Error getting list:', error); // 오류 처리
                });


            // 테스트 데이터
            // for (let i = 1; i <= 20; i++) {
            //     this.notices.push({
            //         number: i,
            //         id: String(i),
            //         title: `게시물 제목 ${i}`,
            //         link: `#notice-${i}`,
            //         user: `User${i}`,
            //         date: '2024-04-12',
            //         count: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
            //         thumbnail: 'https://png.pngtree.com/png-vector/20200222/ourmid/pngtree-kawaii-cute-orange-illustration-character-png-image_2151427.jpg'
            //     });
            // }
        },
    },
    mounted() {
        this.generateNotices();
    },
};
</script>

<style scoped>
#board-search .form-select {
    max-width: 150px;
    /* 선택 박스의 최대 너비 설정 */
}
</style>