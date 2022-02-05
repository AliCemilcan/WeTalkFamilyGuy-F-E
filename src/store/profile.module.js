import ApiService from '@/services/api.service';

const state = {
  user_messages: []
};

const getters = {

  
};

const actions = {
  updateCredentials (dispatch, params) {
    return new Promise(resolve => {
      ApiService.post('updateCredentials', params)
        .then(({ data }) => {
		    resolve(data)
        })
        .catch(error => {
          throw new Error(error);
        });
    });
  }
  
};

const mutations = {
  setUserMessages(state, message) {
    state.user_messages = message
  }
};
export default {
  actions,
  state,
  getters,
  mutations
};
