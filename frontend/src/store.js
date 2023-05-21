import Vue from 'vue';
import Vuex from 'vuex';

/**
 * Vuex 유저 정보를 저장할 저장소를 생성
 */
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: null
    },
    getters: {
        user: (state) => { return state.user; }
    },
    mutations: {
        setUser(state, user) { state.user = user; }
    },
});