import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name:'login',
      path:'/login',
      component: () => import('@/views/Login/loginView'),
    },
    {
      name:'register',
      path:'/register',
      component: () => import('@/views/Login/registerView')

    },
    {
      name:'forgot-password',
      path:'/forgot-password',
      component: () => import('@/views/Login/forgotPassword')
    },
    {
      path:'/',
      component: () => import('./components/Home.vue'),
      children: [
        {
          path: 'season-:id',
          name: 'season',
          component: () => import('./components/Home.vue'),
        }
      ]

    }
  ]
});