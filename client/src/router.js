import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/SignIn.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/SignUp.vue')
    },
    {
      path: '/create',
      name: 'createArticle',
      component: () => import('./views/CreateArticle.vue')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('./views/Article.vue'),
      children: [
        {
          path: ':id',
          name: 'detail',
        }
      ]
    },
    {
      path: '/my-article',
      name: 'myArticle',
      component: () => import('./views/MyArticle.vue')
    },
    {
      path: '/edit-article/:id',
      name: 'edit',
      component: () => import('./views/EditArticle.vue')
    }
  ]
})
