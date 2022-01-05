import Vue from 'vue';
import Vuex from 'vuex';
import home from './home.module';
import auth from './auth.module';
import profile from './profile.module';
import episode from './episode.module';
import comment from './comment.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    auth,
    profile,
    episode,
    comment
  }
});