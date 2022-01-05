import ApiService from '@/services/api.service';
import JwtService from '@/services/jwt.service';

const state = {
  errors: null,
  error_status: false,
  user: {},
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
  },
};

const actions = {
  UserLogin(context, credentials) {
    return new Promise(resolve => {
      ApiService.post('signin', credentials)
        .then(({ data }) => {
          resolve(data);
          context.commit('authenticateUser', data);
        })
        .catch(({ response }) => {
          context.commit('setError', response);
        });
    });
  },
  UserSignUp(context, credentials) {
    return new Promise(resolve => {
      ApiService.post('signup', credentials)
        .then(({ data }) => {
          context.commit('authenticateUser', data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit('setError', response.data.errors);
        });
    });
  },
  googleAuth(context, credentials) {
    return new Promise(resolve => {
      ApiService.post('googleAuth', credentials)
        .then(({ data }) => {
          resolve(data);
          context.commit('authenticateUser', data);
        })
        .catch(({ response }) => {
          context.commit('setError', response.data);
        });
    });
  },
  logOut(context) {
    context.commit('logOutUser');
  },
  forgotPassword(context, email) {
    console.log(email)
    return new Promise(resolve => {
      ApiService.post('requestResetPassword', email)
        .then(({ data }) => {
          resolve(data)
        }).catch(({ response }) => {
          context.commit('setError', response.data.errors);
        });
    })
  },
  checkAccessToken(context, param) {
    if (JwtService.getToken()) {
      return new Promise(resolve => {
        ApiService.post('checkAuth', param)
          .then(({ data }) => {
            resolve(data)
            context.commit('authenticateUser', data);
          }).catch(({ response }) => {
            context.commit('setError', response.data.errors);
          });
      })
      
    }
    
  }
};

const mutations = {
  authenticateUser(state, data) {
    state.isAuthenticated = true;
    state.user = data.user;
    state.errors = {};
    state.error_status = false
    JwtService.saveToken(data.token);
    ApiService.setHeader();
  },
  setError(state, error) {
    console.log(error)
    state.errors = error;
  },
  logOutUser(state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    state.error_status = false
    JwtService.destroyToken();
  }
};
export default {
  actions,
  state,
  getters,
  mutations
};
