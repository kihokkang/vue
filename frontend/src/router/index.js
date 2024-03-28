import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage'
import LoginPage from '@/components/LoginPage'
import JoinMember from '@/views/JoinMember'
import EditProfile from '@/views/EditProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/Login',
      name: 'LoginPage',
      component: LoginPage
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
    }
  ]
})
