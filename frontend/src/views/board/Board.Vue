<template>
    <div>
        <section class="notice" style="width: 200vw;">
            <div class="container">
                <h3 class="text-center mb-4">게시판</h3>
                <!-- board search area -->
                <div id="board-search" class="mb-4">
                    <div class="row justify-content-end">
                        <div class="col-md-4">
                            <form @submit.prevent="search" class="d-flex">
                                <input v-model="searchKeyword" id="search" type="search" name=""
                                    class="form-control me-2" placeholder="검색어를 입력해주세요.">
                                <button type="submit"
                                    class="btn btn-dark align-self-center d-inline-flex">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- board list area -->
                <BoardList :notices="displayedNotices" :currentPage="currentPage" :totalPages="totalPages"
                    @changePage="changePage" />
                <!-- 글쓰기 버튼 -->
                <div class="text-end">
                    <button type="button" class="btn btn-primary" @click="$goToPage('BoardWrite')"><i class="fas fa-pen"></i> 작성하기</button>
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
            // 테스트 데이터
            for (let i = 1; i <= 20; i++) {
                this.notices.push({
                    number: i,
                    id: String(i),
                    title: `게시물 제목 ${i}`,
                    link: `#notice-${i}`,
                    user: `User${i}`,
                    date: '2024-04-12',
                    count: Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
                    thumbnail: 'https://png.pngtree.com/png-vector/20200222/ourmid/pngtree-kawaii-cute-orange-illustration-character-png-image_2151427.jpg'
                });
            }
        },
    },
    created() {
        this.generateNotices();
    },
};
</script>
<style scoped></style>