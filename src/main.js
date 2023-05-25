import Vue from 'vue'
import ElementUI  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
// 引入icon
import './assets/icon/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  data: {
    Bus: new Vue()
  },
  render: h => h(App),
}).$mount('#app')
