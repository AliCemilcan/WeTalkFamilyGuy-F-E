import ApiService from '@/services/api.service';
// import JwtService from '@/services/jwt.service';
// import 
// episodeService
//   from '../services/api.service.js';

const state = {
};

const getters = {
};

const actions = {
  createPost(context, param) {
    return new Promise(resolve => {
      ApiService.post('posts', param)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit('setError', response.data.errors);
        });
    });
  }
  
};

const mutations = {

};
export default {
  actions,
  state,
  getters,
  mutations
};
