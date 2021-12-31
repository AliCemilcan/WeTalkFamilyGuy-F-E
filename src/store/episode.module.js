import ApiService from '@/services/api.service';
import JwtService from '@/services/jwt.service';

const state = {
  errors: null,
  user: {},
  error_status:false,
  isAuthenticated: !!JwtService.getToken()
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  getErrors(state) {
    return state.errors;
  },
  getErrorStatus(state) {
    return state.error_status;
  }
};

const actions = {
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
  
};

const mutations = {
  authenticateUser(state, data) {
    state.isAuthenticated = true;
    state.user = data.user;
    state.errors = false;
    state.error_status = false;
    JwtService.saveToken(data.token);
    ApiService.setHeader();
  },
  setError(state, error) {
    console.log(error)
    state.errors = error;
    state.error_status = true;
  },
  logOutUser(state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
};
export default {
  actions,
  state,
  getters,
  mutations
};
