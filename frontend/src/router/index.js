import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/login/Login'
import JoinMember from '@/views/login/JoinMember'
import EditProfile from '@/views/EditProfile'
import Board from '@/views/board/Board'
import BoardList from '@/views/board/BoardList'
import BoardWrite from '@/views/board/BoardWrite'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'JoinMember',
      component: JoinMember
    },
    {
      path: '/EditProfile',
      name: 'EditProfile',
      component: EditProfile
    },
    {
      path: '/Board',
      name: 'Board',
      component: Board
    },
    {
      path: '/BoardList',
      name: 'BoardList',
      component: BoardList
    },
    {
      path: '/BoardWrite',
      name: 'BoardWrite',
      component: BoardWrite
    }
  ]
})
