<template>
    <div>
        <form @submit.prevent="login">
            <p>아이디</p>
            <input type="text" name="id" v-model="id">
            <p>비밀번호</p>
            <input type="password" name="password" v-model="password">
            <p></p>
            <button>로그인</button>
        </form>
    </div>
</template>
<script>
    import commonUtil from "../common/commonUtil"

    export default {
        data(){
            return{
                id:'',
                password:''
            }
        },
        methods:{
            login(){
                // throw new Error('Sentry Error'); // Sentry 에러 테스트용
                const id = this.id;
                const password = this.password;

                if(commonUtil.isEmpty(id) || commonUtil.isEmpty(password)){
                    alert('ID나 Password를 입력해주세요');
                    return;
                }

                this.$axios.post("api/auth/login", {id,password}, {"Content-Type" : "application-json"})
                .then((res) => {
                    if(res.data.user) {
                        this.$store.commit("setUser", res.data.user);
                        this.$router.push({name:"IndexPage"});
                    }else if(res.data.message){
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
            },
        },
        created() {
        },
        computed: {
        }
    }
</script> 