<template>
    <swiper slidesPerView="auto" :scrollbar="{ draggable: true }" mousewheel autoplay freeMode navigation>
        <swiper-slide v-for="(slide, index) in slides" :key="index">
            <Slide :image="slide.imageUrl" :title="slide.title" :description="slide.description" :moveUrl="slide.moveUrl" />
        </swiper-slide>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
</template>

<script>
import Slide from "./Slide";
import { Scrollbar, Mousewheel, Navigation, Autoplay } from "swiper";
import { SwiperCore, Swiper, SwiperSlide } from "swiper-vue2";
import "swiper/swiper-bundle.css";
SwiperCore.use([Scrollbar, Mousewheel, Navigation, Autoplay]);
export default {
    components: {
        Slide,
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            swiperOptions: {
                slidesPerView: "auto",
                spaceBetween: 1,
                freeMode: true,
                scrollbar: true,
                mousewheel: true,
                loop: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                autoplay: {
                    delay: 1000,
                    disableOnInteraction: false
                }
            },
            // 테스트 데이터
            slides: [
                { imageUrl: 'https://t1.daumcdn.net/cfile/tistory/99BD17405EA0462733', title: 'Title1', description: 'this is a description of 1', moveUrl:"JoinMember"},
                { imageUrl: 'https://blog.kakaocdn.net/dn/yHDu1/btquP3n1QgV/bOxdEq0zhnR81ALpxG1lb0/img.jpg', title: 'Title2', description: 'this is a description of 2', moveUrl:""},
                { imageUrl: 'https://cphoto.asiae.co.kr/listimglink/6/2019083014532639900_1567144407.png', title: 'Title3', description: 'this is a description of 3', moveUrl:""},
                { imageUrl: 'https://m.fashionbiz.co.kr:6001/images/TN/AR/mon.PNG', title: 'Title4', description: 'this is a description of 4', moveUrl:""},
                { imageUrl: 'https://i.pinimg.com/originals/6e/06/11/6e0611e722ab556158b06b74f0b288c7.jpg', title: 'Title5', description: 'this is a description of 5', moveUrl:""},
                { imageUrl: 'https://richgraph.net/wp-content/uploads/2023/08/2-5-1024x579.png', title: 'Title6', description: 'this is a description of 6', moveUrl:""},
                { imageUrl: 'https://img.newspim.com/news/2017/08/01/1708011309247280.jpg', title: 'Title7', description: 'this is a description of 7', moveUrl:""},
                { imageUrl: 'https://m.vintageace.co.kr/web/upload/NNEditor/20201222/mobile/b2ded487329d46701d6a29ef3421e971_1608568092.jpg', title: 'Title8', description: 'this is a description of 8', moveUrl:""},
                { imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3GVkt3_Pq-0Til9AE1yhsFJvYYgbgsY2R7A&usqp=CAU', title: 'Title9', description: 'this is a description of 9', moveUrl:""},
                { imageUrl: 'https://i0.wp.com/ohoplace.com/wp-content/uploads/2023/10/dior.jpg?resize=532%2C319&ssl=1', title: 'Title10', description: 'this is a description of 10', moveUrl:""},
                { imageUrl: 'https://w7.pngwing.com/pngs/518/393/png-transparent-prada-hd-logo.png', title: 'Title11', description: 'this is a description of 11', moveUrl:""}
            ]
        };
    },
    mounted() {
        // TO-DO : 이미지 정보 DB연동하여 가져오기
        // this.$axios.post("")
        //     .then((res) => {
        //         if (res.data.success) {
        //             // this.slides = [];
        //         } else {
        //             alert("이미지 로딩에 실패했습니다.");
        //         }
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.swiper-slide {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 400px;
}

.swiper-container {
    height: 450px;
    /* swiper 컨테이너의 높이 설정 */
    width: 100%;
    /* swiper 컨테이너의 너비를 100%로 설정하여 body의 너비에 맞춤 */
    max-width: 100%;
    /* 너비가 100% 이상으로 커지지 않도록 최대 너비 설정 */
    margin: 0 auto;
    /* 가운데 정렬을 위해 좌우 마진을 auto로 설정 */
    position: absolute;
    /* swiper 컨테이너를 절대 위치로 설정합니다. */
    top: 0;
    /* swiper 컨테이너를 화면의 맨 위에 배치합니다. */
    left: 0;
    /* swiper 컨테이너를 화면의 좌측에 배치합니다. */
}
</style>