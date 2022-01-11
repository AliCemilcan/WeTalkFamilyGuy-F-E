// import ApiService from '@/services/api.service';
// import JwtService from '@/services/jwt.service';
import 
episodeService
  from '../services/api.service.js';

const state = {
  currentEpisode:{}
};

const getters = {

  getCurrentEpisode(state) {
    return state.currentEpisode;
  }
};

const actions = {
  // createEpisode(context, episode) {
  //   return new Promise(resolve => {
  //     ApiService.post('episodes', episode)
  //       .then(({ data }) => {
  //         context.commit('authenticateUser', data);
  //         resolve(data);
  //       })
  //       .catch(({ response }) => {
  //         context.commit('setError', response.data.errors);
  //       });
  //   });
  // },
  getEpisode (dispatch, params) {
    return new Promise(resolve => {
      episodeService.get('episodes/episode-detail', params)
        .then(({ data }) => {
		      resolve(data)
          dispatch.commit('setCurrentEpisode', data.episodes[0])
        })
        .catch(error => {
          throw new Error(error);
        });
    });
  }
  
};

const mutations = {
  setCurrentEpisode(state, episode) {
    state.currentEpisode = episode
  }
};
export default {
  actions,
  state,
  getters,
  mutations
};
