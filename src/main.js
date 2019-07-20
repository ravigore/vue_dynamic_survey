import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Bootstrap from "bootstrap/dist/css/bootstrap.css";
import Veevalidate from "vee-validate";

Vue.use(Bootstrap);
Vue.use(Veevalidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
