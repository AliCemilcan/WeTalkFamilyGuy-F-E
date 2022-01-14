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
  },
  createComment(context, param) {
    return new Promise(resolve => {
      ApiService.post('comment', param)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit('setError', response.data.errors);
        });
    });
  },
  upVoteComment(context, param) {
    return new Promise(resolve => {
      ApiService.post('posts/vote-up', param)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit('setError', response.data.errors);
        });
    });
  },
  savePost(context, param) {
    return new Promise(resolve => {
      ApiService.post('posts/save-post', param)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit('setError', response.data.errors);
        });
    });
  },
  removePost(context, param) {
    return new Promise(resolve => {
      ApiService.post('posts/remove-post', param)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit('setError', response.data.errors);
        });
    });
  },
  getPostsByID(context, param) {
    return new Promise(resolve => {
      ApiService.post('posts/user-saved-posts', param)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit('setError', response.data.errors);
        });
    });
  },
  
  
};

const mutations = {

};
export default {
  actions,
  state,
  getters,
  mutations
};
