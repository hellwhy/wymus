import Vue from "vue";
import App from "./App.vue";
import md5 from "js-md5";
import Vant from "vant";
import "vant/lib/index.css";
import "./assets/reset.css";
import api from "./api/index";
import { Notify } from "vant";
import { Toast } from "vant";

Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;
Vue.prototype.$notify = Notify;
Vue.prototype.$api = api;
Vue.prototype.$toast = Toast;
Vue.use(Vant);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
