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