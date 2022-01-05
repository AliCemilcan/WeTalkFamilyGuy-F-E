import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { API_URL } from './config';
import JwtService from '@/services/jwt.service';
import {vue_instance} from '../main';



//const apikey = 'k_y7s2rd5h';

const episodeService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
    Vue.axios.defaults.headers = { 'Access-Control-Allow-Origin': '*' };
    console.log(JwtService.getToken())
    Vue.axios.defaults.headers['Authorization'] = 'Bearer '+JwtService.getToken();
    // Vue.axios.defaults.baseURL =
    //   'https://imdb-api.com/en/API/SeasonEpisodes/' + apikey;
  },
  setHeader() {
    Vue.axios.defaults.headers.common[
      'Authorization'
    ] = `Token ${JwtService.getToken()}`;
  },
  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, params) {
    console.log(params)
    var str_params = this.formatURLParams(params.filters);
    console.log(str_params)

    return Vue.axios
      .get(`${resource}`+str_params)
      .catch(error => {
        throw new Error(`[RWV] ApiService ${error}`);
      });
  },
  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },
  formatURLParams (params){
    var str_params = '';
    if(params){
      str_params = '?';
      var parts = [];
      for(var i in params){
        parts.push(i + '=' + params[i]);
      }	

      str_params = '?'+parts.join('&');	
    }

    return str_params;
  }
};
axios.interceptors.response.use((res) => {
  // vue_instance.$store.commit('setPageLoading', false);
  if(res.data && res.data.message){
    vue_instance.$snotify.simple(res.data.message);
  }
  return res;
}, (error) => {
  var response = error.response;
  if(response.status >= 500){
    vue_instance.$snotify.error('There was a server error');
  }else{
    vue_instance.$snotify.warning(response.data.message);
  }
  // vue_instance.$store.commit('setPageLoading', false);
	
  return Promise.reject(error.response);
});


export default episodeService;
