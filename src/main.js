import Vue from "vue";
import { appRouter } from "./router";
import VueRouter from "vue-router";
import axios from "axios";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;
Vue.use(axios);
Vue.use(VueRouter);
new Vue({
  el: "#app",
  render: h => h(App),
  router: appRouter()
});
