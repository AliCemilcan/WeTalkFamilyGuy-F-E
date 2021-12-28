
// import { resolve } from 'core-js/fn/promise';
import ApiService from '@/services/api.service';
import 
episodeService
  from '../services/api.service.js';

const state = {
  errors: null,
  user: {},
  current_season_episodes:''
};
  
const getters = {
  get_current_season(state){
    return state.current_season_episodes
  }
};
// const setters = {

// };
const mutations = {
  set_current_season(state, show) {
    state.current_season_episodes = show
  }

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
      episodeService.get('episodes', params.seasonNumber)
        .then(({ data }) => {
		      resolve(data)
          dispatch.commit('set_current_season', data.episodes)
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