import Vue from 'vue'
import vuetify from './plugins/vuetify';
import VueNoty from './plugins/noty';
import App from './App.vue'
import "vuetify/dist/vuetify.min.css";
import router from "./router";

Vue.config.productionTip = false

new Vue({
  vuetify,
  VueNoty,
  router,
  render: h => h(App),
}).$mount('#app')
