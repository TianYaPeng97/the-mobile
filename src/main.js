import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.css'
import './utils/request'
import router from './router'
import store from './store'
import veeValidate,{ Validator } from 'vee-validate'
// 导入vee-validate的中文包  校验 
import zhCN from 'vee-validate/dist/locale/zh_CN'
// 处理时间
import { fmtDate } from './utils/dayjs'
Vue.filter('fmtDate',fmtDate)


Vue.config.productionTip = false
Vue.use(Vant)
// 配置插件VeeValidate
Vue.use(veeValidate,{
  events:''
})
// 配置中文
Validator.localize('zhCN',zhCN)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
