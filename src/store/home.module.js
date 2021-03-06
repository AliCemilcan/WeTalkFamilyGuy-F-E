
// import { resolve } from 'core-js/fn/promise';
import ApiService from '@/services/api.service';
import 
episodeService
  from '../services/api.service.js';

const state = {
  errors: null,
  user: {},
  current_season_episodes: '',
  currentEpisode: {},
  current_season_posts: '',
  page_loading: false
};
  
const getters = {
  get_current_season(state){
    return state.current_season_episodes
  },
  get_current_season_posts(state){
    return state.current_season_posts
  },
  get_current_episode(state){
    return state.currentEpisode
  },
  get_page_loading(state){
    return state.page_loading
  }
};
// const setters = {

// };
const mutations = {
  set_current_season(state, show) {
    state.current_season_episodes = show
  },
  set_current_season_posts(state, posts) {
    state.current_season_posts = posts
    state.page_loading = false
  },
  set_page_loading(state, status) {
    state.page_loading = status
  },
  openEpisode(state, e) {
    state.currentEpisode = e
  },

};
export const actions = {
  createEpisode(context, episode) {
    return new Promise(resolve => {
      ApiService.post('episodes', episode)
        .then(({ data }) => {
          context.commit('authenticateUser', data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit('setError', response.data.errors);
        });
    });
  },
  getSeason (dispatch, params) {
    return new Promise(resolve => {
      episodeService.get('episodes/'+ params.filters.seasonNumber, params)
        .then(({ data }) => {
		      resolve(data)
          dispatch.commit('set_current_season', data.episodes)
          dispatch.commit('set_current_season_posts', data.hot_topics)
          // dispatch.commit('set_page_loading', false)
        })
        .catch(error => {
          throw new Error(error);
        });
    });
  }

}
  
export default {
  state,
  actions,
  mutations,
  getters
};