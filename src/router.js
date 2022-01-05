import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

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
      name: 'settings',
      path:'/settings',
      component: () => import('@/views/Profile/profileView.vue')
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
      component: () => import('@/views/Episode/episodeDetail.vue'),
      beforeEnter: (to, from, next ) => {
      //admin routes //organizations //providers //smes //categories //courses //configs
        var current_user = JSON.parse(JSON.stringify(store.getters.currentUser))
        console.log(current_user, current_user == {})
        if (Object.keys(current_user).length === 0) {
          store.dispatch('checkAccessToken').then(res => {
            console.log(res)
          })
        }
        next();
        // if (store.getters.getRole == 0) {
        //   store
        //     .dispatch('checkAccessToken')
        //     .then(res => {
        //     // check for csm also for agency view
        //       if (
        //         store.getters.getRole == 'admin' ||
        //       store.getters.getRole == 'csm'
        //       ) {
        //         next();
        //       } else {
        //         window.location.href = '/'.store.getters.getRole.charAt(0);
        //       }
        //     })
        //     .catch(error => {
        //       window.location.href = '/';
        //     });
        // } 
      }
      
    }

  
  ]
});