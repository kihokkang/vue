<template>
    <router-link :to="{ name: moveUrl }" class="slide" v-bind:style="{ backgroundImage: 'url(' + image + ')' }">
        <div class="content">
            <h2 class="title">{{ title }}</h2>
            <p class="description">{{ description }}</p>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'slide',
    props: [
        'image',
        'title',
        'description',
        'moveUrl'
    ],
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: black;
}

.slide {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    text-align: left;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    background-repeat: no-repeat;
    background-blend-mode: overlay;
    background-size: contain;
    background-position: center;
}
.content {
    padding: 10px;
}
</style>