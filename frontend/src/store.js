import Vue from 'vue';
import Vuex from 'vuex';

/**
 * Vuex : 무수히 많은 컴포넌트의 데이터를 관리하기 위한 상태 관리 패턴이자 라이브러리
 * Vuex 유저 정보를 저장할 저장소를 생성 (Flux 패턴)
 */
Vue.use(Vuex);

export const store = new Vuex.Store({
    // Vue 관점에서는 state - data
    state: {
        user: null
    },
    // Getters - computed
    getters: {
        user: (state) => { return state.user; }
    },
    // mutations - methods
    mutations: {
        setUser(state, user) {
            state.user = user;
            // 로컬 스토리지에 사용자 정보 저장
            localStorage.setItem('user', JSON.stringify(user));
        },
        clearUser(state) {
            state.user = null;
            // 로컬 스토리지의 사용자 정보 제거
            localStorage.removeItem('user');
        }
    },
    // actions - 비동기 methods
    actions: {
        initializeUser({ commit }) {
            // 로컬 스토리지에서 사용자 정보 불러오기
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                commit('setUser', user);
            }
        }
    }
});