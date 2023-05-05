<template>
    <div v-if="user">
        <h1>Current User</h1>
        <p>ID: {{user.id}}</p>
        <p>password: {{user.password}}</p>
        <p>Name: {{user.name}}</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                user: null,
            };
        },
        created() {
            this.$axios.get('/api/login')
            .then((res) => {
                const user = res.data.user;
                if(user) this.user = user;
            })
            .catch((err) => {
                console.error(err);
            });
        }
    }
</script>