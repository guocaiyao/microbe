// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

//以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

//axios http（接口请求）
import axios from 'axios'
import {login,post,deleteTo,fetch,patch,put,uploadFile} from './components/service/http-service.js'
//定义全局变量
Vue.prototype.$login=login;
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$delete=deleteTo;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

//上传图片
import {upload} from './components/service/upload-file.js'
Vue.prototype.$upload=upload;

//中英文切換
import i18n from './i18n'

//表单验证
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

//彈窗
import VueAlertify from 'vue-alertify';
Vue.use(VueAlertify);

//vuex
import store from '@/vuex/store'

//引入自定义js
import './assets/js/common.js'
import './assets/css/common.scss'

import '../static/datetimepicker/js/bootstrap-datetimepicker.min.js'
import '../static/datetimepicker/css/bootstrap-datetimepicker.min.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n: i18n,
  components: { App },
  template: '<App/>'
})
