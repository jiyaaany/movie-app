import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './scss/index.scss'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')


//KOBIS_BOX_OFFICE_URI = '//www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';