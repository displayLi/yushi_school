// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../node_modules/swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import Vue from "vue";
import App from "./App";
import router from "./router";
import store from './store/store'
import axios from './http'
import "mint-ui/lib/style.css";

// layui
import '../static/js/layim/css/layui.css'
import '../static/js/layim/layui.js'

import Tool from "./common/js/common";


// 使用fastclick组件解决移动端点击延时300毫秒的问题
import Fastclick from 'fastclick';
Fastclick.attach(document.body);

Vue.use(VueAwesomeSwiper)
Vue.prototype.axios = axios
Vue.prototype.tool = Tool;
Vue.config.productionTip = false;

require("./vue-filters");
require("./vue-mixin");

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
