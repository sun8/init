// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import $ from 'jquery'
import routes from './routes'
import router from './routes'
import VueRouter from 'vue-router'
import axios from './http'
import store from "./store/index.js"
import ElementUI from 'element-ui'
import MyPlugin from  './plugin/MyPlugin.js'
import modalPlugin from  './plugin/Modal.js';
import fenglingPlugin from  './plugin/fenglingPlugin.js';
import 'element-ui/lib/theme-default/index.css'
import './plugin/global/plugins/font-awesome/css/font-awesome.min.css'  
import './plugin/global/plugins/simple-line-icons/simple-line-icons.min.css'      
import 'bootstrap/dist/css/bootstrap.min.css'      
import './plugin/global/css/components.css'      
import './plugin/layouts/layout4/css/layout.css'  
import './plugin/layouts/layout4/css/themes/light.min.css' 
import './plugin/layouts/layout4/css/custom.css'
import './plugin/layouts/layout4/css/fenglinPublic.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './plugin/global/plugins/bootstrap-daterangepicker/daterangepicker.css'
import './plugin/global/plugins/bootstrap-daterangepicker/daterangepicker.js'
// import moment from './plugin/global/plugins/bootstrap-daterangepicker/moment.js'
var moment = require('./plugin/global/plugins/bootstrap-daterangepicker/moment.js').moment;
import './plugin/global/plugins/jquery.page.js' 
import './plugin/global/plugins/jquery-form.js' 
import mySelect from './plugin/global/plugins/select.js' 
import './plugin/global/plugins/sweetalert/sweet-alert.css' 
import './plugin/global/plugins/sweetalert/sweet-alert.js' 
import './plugin/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js' 
import './plugin/global/scripts/app.js'
import './plugin/scroll/jquery.mousewheel.js'
import './plugin/scroll/perfect-scrollbar.js'
import './plugin/scroll/perfect-scrollbar.css'
             
Vue.prototype.axios = axios;
Vue.prototype.moment = moment; // 月份插件
Vue.prototype.mySelect = mySelect;// 下拉插件
Vue.prototype.settings = {
  pagerOptions: [10,15,20,30,50,100]
};
// Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ElementUI);
//ajax插件
Vue.use(MyPlugin);
// 模态框插件
Vue.use(modalPlugin);
// 风铃封装
Vue.use(fenglingPlugin);

// 日期插件配置项
var riskbell_datepicker_options = {
  "showDropdowns": true,
  "autoApply": false,
  "locale": {
      "format": "YYYY-MM-DD",
      "separator": "~",
      "applyLabel": "确认",
      "cancelLabel": "取消",
      "fromLabel": "从",
      "toLabel": "到",
      "customRangeLabel": "手动选择",
      "daysOfWeek": [
          "日",
          "一",
          "二",
          "三",
          "四",
          "五",
          "六"
      ],
      "monthNames": [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
      ],
      "firstDay": 1,
      "opens": "right"
  },
  "ranges": {
      '今天': [moment(), moment()],
      '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      '最近一周': [moment().subtract(6, 'days'), moment()],
      '本月': [moment().startOf('month'), moment().endOf('month')],
      '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  },
  "autoUpdateInput": false
};
var riskbell_datepicker_options_date = $.extend({}, riskbell_datepicker_options, {
    singleDatePicker: true
});

// 全局注册组件
Vue.component("item-list",Vue.extend(require("./components/ItemList.vue")));
Vue.directive('dateTime', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {

    $(el).daterangepicker(riskbell_datepicker_options_date);

    $(el).on("apply.daterangepicker", function(ev, picker) {
        $(el).val(picker.startDate.format('YYYY-MM-DD'));
    });
  }
})


/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')

