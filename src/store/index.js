import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import {mutations} from "./mutations.js";
import {actions} from "./actions.js";

//创建一个vuex的store对象
export default new Vuex.Store({
    //全局共享状态
    state: {
        // 登录用户名
        userName :"",
        //是否有提示框
        tipshow : false,
        // 是否登录
        isLogin : false,
        // 模糊查询下拉框是否显示
        showlist: false,
        // 阻止模糊查询
        preventMohu:true,
        // 模糊查询的数据
        item : [],
        // 模糊信号量
        mohuIndex: 0,
        // 是否已经点击过校验节点
        multicheck_isclick : false,
        // 多节点查询按钮的颜色
        queryCur:false,
        // 多节点刚上来的页面
        multi_startShow : true,
        // 多节点cover的是否显示
        multi_coverShow :true,
        // 是否显示未识别
        multi_checkShow:false,
        multi_notCheck:false,
        multi_yesCheck:true,
        // 是否显示左边公共组件
        isshowIndex:true,
        entrelation:{
            sidebarStatus:false
        }
    },
    getters : {

    },
    mutations,
    actions
});