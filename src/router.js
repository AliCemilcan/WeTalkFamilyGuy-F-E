import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

export const router =  new Router({
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
      name: 'settings',
      path:'/settings',
      component: () => import('@/views/Profile/profileView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/',
      component: () => import('./components/Home.vue'),
      children: [
        {
          path: 'season-:id',
          name: 'season',
          
          component: () => import('./components/Home.vue'),
          // children: [{
          //   path: 'episode-:episode_id',
          //   name: 'episode_detail',
          //   component: () => import('@/views/Episode/episodeDetail.vue')
          // }
          // ]
        }
      ]
    },
    {
      path: '/season-:season_id/episode-:episode_id',
      name: 'episode_detail',
      component: () => import('@/views/Episode/episodeDetail.vue')
      
    }

  
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { 
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login'
      })
    } else {
      store.dispatch('checkAccessToken').then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
        this.$store.dispatch('logOut').then(() => {
          this.$router.push({ name: 'login' });
        });
      });
    }
  }
  next();

})