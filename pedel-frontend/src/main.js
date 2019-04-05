import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import myApi from './API';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(myApi);
import Header from "./components/Header.vue";

Vue.component("Header", Header);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
