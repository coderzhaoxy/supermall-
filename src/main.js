import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from "./components/common/toast";
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false
Vue.use(toast)
//解决移动端300毫秒的延迟
FastClick.attach(document.body)

//懒加载插件
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/loding.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
  toast

}).$mount('#app')
