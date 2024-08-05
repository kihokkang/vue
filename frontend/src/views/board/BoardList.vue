<template>
    <div id="board-list" class="mt-4">
        <table class="table">
            <thead class="table-dark">
                <tr>
                    <th scope="col" class="text-center" style="width: 5%;">번호</th>
                    <th scope="col" style="width: 35%;">제목</th>
                    <th scope="col" style="width: 20%;">작성자</th>
                    <th scope="col" class="text-center" style="width: 15%;">작성일</th>
                    <th scope="col" style="width: 10%;">조회수</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(notice, index) in notices" :key="index">
                    <td class="text-center">{{ index }}</td>
                    <td>
                        <a href="#" @click.prevent="goToDetailPage(notice.boardNumber)">
                            <i class="fas fa-external-link-alt"></i> {{ notice.title }}
                        </a>
                    </td>
                    <td class="text-center">
                        <img :src="notice.thumbnail" class="rounded-circle" style="width: 30px; height: 30px;"
                            alt="User Thumbnail">{{ notice.userId }}
                    </td>
                    <td class="text-center"><i class="far fa-calendar-alt"></i> {{ notice.updatedAt }}</td>
                    <td class="text-center"><i class="fas fa-eye"></i> {{ notice.views }}</td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
                    :class="{ 'active': pageNumber === currentPage }">
                    <a class="page-link" href="#" @click.prevent="$emit('changePage', pageNumber)">{{ pageNumber }}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: {
        notices: Array,
        currentPage: Number,
        totalPages: Number
    },
    computed:{
    },
    methods: {
        goToDetailPage(boardNumber) {
            // 게시글의 ID를 이용하여 동적 라우팅을 수행합니다.
            this.$router.push({ name: 'BoardDetail', params: { boardNumber: boardNumber } });
        }
    }
};
</script>

<style scoped>
/* 마우스 오버시 배경색이 바뀌는 효과 */
#board-list tbody tr:hover {
    background-color: #f5f5f5;
    /* 변경할 배경색 */
}
</style>