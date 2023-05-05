// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

// Vue.js 애플리케이션 전체에서 this.$axios 사용하여 axios 라이브러리의 HTTP 요청 기능을 호출할 수 있습니다. (Vue 객체에 axios 주입)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
