import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
// fontawesome
import '@fortawesome/fontawesome-free/css/all.css';
Vue.config.productionTip = false;

// firebase performance
// eslint-disable-next-line no-unused-vars
import performance from 'firebase/compat/performance';

new Vue({
  router,
  store,
  components: { App },
  render: (h) => h(App)
}).$mount('#app');
