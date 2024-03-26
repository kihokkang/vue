// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './service/axios'
import { store } from './store';
import * as Sentry from "@sentry/vue" // 프론트 에러 추적을 위한 Sentry 라이브러리 도입

// Vue.js 애플리케이션 전체에서 this.$axios 사용하여 axios 라이브러리의 HTTP 요청 기능을 호출할 수 있습니다. (Vue 객체에 axios 주입)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// Sentry 기본 설정 구간
Sentry.init({
  Vue, // Vue.js 앱과의 통합을 설정합니다. 이를 통해 Vue 컴포넌트에서 발생한 오류를 Sentry에 자동으로 보낼 수 있습니다.
  dsn: "https://897569faa08a284adcfc71b0c7347c0e@o4506936174379008.ingest.us.sentry.io/4506936174510080", // 발급받은 DSN키 입력
  integrations: [ // Sentry에서 제공하는 특정 통합 기능을 활성화합니다. 이 예제에서는 브라우저 추적 및 재생 통합을 활성화하고 있습니다.
    Sentry.browserTracingIntegration({ router }),
    Sentry.replayIntegration()
  ],
  tracesSampleRate: 1.0, // 트레이스 데이터를 샘플링하는 비율을 설정합니다. 이 값을 높이면 더 많은 트레이스 데이터가 수집되지만, 성능에 부하를 줄 수 있습니다.
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/], // 트레이스 전파 대상을 설정합니다. 이것은 특정 호스트 또는 도메인에 대한 트레이스 전파를 활성화할 때 사용됩니다.
  replaysSessionSampleRate: 0.1, // 세션 재생 샘플링 비율을 설정합니다. 이것은 세션 재생에 대한 샘플링 비율을 결정합니다.
  replaysOnErrorSampleRate: 1.0, // 오류 재생 샘플링 비율을 설정합니다. 이것은 오류가 발생할 때 세션 재생을 수행할 확률을 결정합니다.
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // vue 인스턴스에 생성한 store 추가
  components: { App },
  template: '<App/>'
})
