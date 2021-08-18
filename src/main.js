import Vue from 'vue';
import App from './App';
import vuetify from "./plugins/vuetify";
import store from './store/store'
import router from './router/routes'

new Vue({
  el: '#app',
  vuetify,
  store,
  router,
  render: h => h(App),
});
