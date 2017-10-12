<template>
    <div class="index" >
        <div class="page-header navbar navbar-fixed-top">
        <!-- BEGIN HEADER INNER -->
        <div class="page-header-inner ">
            <!-- BEGIN LOGO -->
            <div class="page-logo">
                <router-link  to="/guanli">
                    <img v-if="this.logoUrlB != 'null'" :src="logoUrlB"  class="logo-default" />
                    <img v-else style="width:140px" src="../plugin/layouts/layout4/img/logo-wx.png"  class="logo-default" />
                </router-link>

                <div class="menu-toggler sidebar-toggler" v-if="$store.state.isshowIndex">
                    <!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
                </div>
            </div>
            <!-- END LOGO -->
            <!-- BEGIN RESPONSIVE MENU TOGGLER -->
            <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
            <!-- END PAGE ACTIONS -->
            <!-- BEGIN PAGE TOP -->
            <div class="page-top" v-if="$store.state.isshowIndex">
                <!-- BEGIN HEADER SEARCH BOX -->
                <!-- DOC: Apply "search-form-expanded" right after the "search-form" class to have half expanded search box -->
                <!-- <form class="search-form" action="page_general_search_2.html" method="GET">
                    <div class="input-group">
                        <input type="text" class="form-control input-sm" placeholder="Search..." name="query">
                        <span class="input-group-btn">
                            <a href="javascript:;" class="btn submit">
                                <i class="icon-magnifier"></i>
                            </a>
                        </span>
                    </div>
                </form> -->
                <!-- END HEADER SEARCH BOX -->
                <!-- BEGIN TOP NAVIGATION MENU -->
                <div class="top-menu">
                    <ul class="nav navbar-nav pull-right">
                        <li class="separator hide"> </li>
                        <!-- BEGIN NOTIFICATION DROPDOWN -->
                        <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                        <li class="dropdown dropdown-extended dropdown-notification" id="header_notification_bar">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                <i class="icon-bell"></i>
                                <span class="badge badge-success"> {{msgResponse.total || 0}} </span>
                            </a>
                            <ul class="dropdown-menu" >
                                <li class="external">
                                    <h3>
                                        <span class="bold">{{msgResponse.total}} 个</span> 未读通知</h3>
                                    <!-- <a href="page_user_profile_1.html">查看全部</a> -->
                                </li>
                                <li>
                                    <ul class="dropdown-menu-list scroller" style="height: 250px;" data-handle-color="#637283">
                                        <li v-for="msg in msgResponse.messages">
                                            <router-link to="/change">
                                                <a>
                                                    <span class="time">{{msgTime(msg)}}前</span>
                                                    <span class="details">
                                                        <span class="label label-sm label-icon" :class="msgLevel[msg.level]">
                                                        <!--  -->
                                                            <i class="fa fa-bolt"></i>
                                                        </span> {{msg.title}}</span>
                                                </a>
                                            </router-link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <!-- END NOTIFICATION DROPDOWN -->
                        <li class="separator hide"> </li>
                        <!-- BEGIN INBOX DROPDOWN -->
                        <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                        <li class="dropdown dropdown-extended dropdown-inbox" id="header_inbox_bar">
                            <!-- <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                <i class="icon-envelope-open"></i> -->
                                <!-- <span class="badge badge-danger"> 4 </span> -->
                            <!-- </a> -->
                            <!-- <ul class="dropdown-menu">
                                <li class="external">
                                    <h3>
                                        <span class="bold">7条</span> 新消息</h3>
                                    <a href="app_inbox.html">查看全部</a>
                                </li>
                                <li>
                                    <ul class="dropdown-menu-list scroller" style="height: 275px;" data-handle-color="#637283">
                                        <li>
                                            <a href="#">
                                                <span class="photo">
                                                    <img src="../plugin/layouts/layout4/img/avatar2.jpg" class="img-circle" alt=""> </span>
                                                <span class="subject">
                                                    <span class="from"> Lisa Wong </span>
                                                    <span class="time">Just Now </span>
                                                </span>
                                                <span class="message"> Vivamus sed auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul> -->
                        </li>
                        <!-- END INBOX DROPDOWN -->
                        <li class="separator hide"> </li>
                        <!-- BEGIN TODO DROPDOWN -->
                        <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                        <li class="dropdown dropdown-extended dropdown-tasks" id="header_task_bar">
                        <!--     <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                <i class="icon-calendar"></i> -->
                                <!-- <span class="badge badge-primary"> 3 </span> -->
                            <!-- </a> -->
                            <!-- <ul class="dropdown-menu extended tasks">
                                <li class="external">
                                    <h3>You have
                                        <span class="bold">12 pending</span> tasks</h3>
                                    <a href="?p=page_todo_2">view all</a>
                                </li>
                                <li>
                                    <ul class="dropdown-menu-list scroller" style="height: 275px;" data-handle-color="#637283">
                                        <li>
                                            <a href="javascript:;">
                                                <span class="task">
                                                    <span class="desc">New release v1.2 </span>
                                                    <span class="percent">30%</span>
                                                </span>
                                                <span class="progress">
                                                    <span style="width: 40%;" class="progress-bar progress-bar-success" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                                        <span class="sr-only">40% Complete</span>
                                                    </span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="task">
                                                    <span class="desc">Application deployment</span>
                                                    <span class="percent">65%</span>
                                                </span>
                                                <span class="progress">
                                                    <span style="width: 65%;" class="progress-bar progress-bar-danger" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
                                                        <span class="sr-only">65% Complete</span>
                                                    </span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="task">
                                                    <span class="desc">Database migration</span>
                                                    <span class="percent">10%</span>
                                                </span>
                                                <span class="progress">
                                                    <span style="width: 10%;" class="progress-bar progress-bar-warning" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                                                        <span class="sr-only">10% Complete</span>
                                                    </span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="task">
                                                    <span class="desc">Web server upgrade</span>
                                                    <span class="percent">58%</span>
                                                </span>
                                                <span class="progress">
                                                    <span style="width: 58%;" class="progress-bar progress-bar-info" aria-valuenow="58" aria-valuemin="0" aria-valuemax="100">
                                                        <span class="sr-only">58% Complete</span>
                                                    </span>
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;">
                                                <span class="task">
                                                    <span class="desc">New UI release</span>
                                                    <span class="percent">38%</span>
                                                </span>
                                                <span class="progress progress-striped">
                                                    <span style="width: 38%;" class="progress-bar progress-bar-important" aria-valuenow="18" aria-valuemin="0" aria-valuemax="100">
                                                        <span class="sr-only">38% Complete</span>
                                                    </span>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul> -->
                        </li>
                        <!-- END TODO DROPDOWN -->
                        <!-- BEGIN USER LOGIN DROPDOWN -->
                        <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                        <li class="dropdown dropdown-user">
                            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                <span class="username username-hide-on-mobile"> {{username}}，您好 </span>
                                <!-- DOC: Do not remove below empty space(&nbsp;) as its purposely used -->
                                <img alt="" class="img-circle" src="../plugin/layouts/layout4/img/avatar9.jpg" /> </a>
                            <ul class="dropdown-menu dropdown-menu-default">
                                <!-- <li>
                                    <a href="page_user_profile_1.html">
                                        <i class="icon-user"></i> My Profile </a>
                                </li>
                                <li>
                                    <a href="app_calendar.html">
                                        <i class="icon-calendar"></i> My Calendar </a>
                                </li>
                                <li>
                                    <a href="app_inbox.html">
                                        <i class="icon-envelope-open"></i> My Inbox
                                        <span class="badge badge-danger"> 3 </span>
                                    </a>
                                </li>
                                <li>
                                    <a href="app_todo_2.html">
                                        <i class="icon-rocket"></i> My Tasks
                                        <span class="badge badge-success"> 7 </span>
                                    </a>
                                </li>
                                <li class="divider"> </li>
                                <li>
                                    <a href="page_user_lock_1.html">
                                        <i class="icon-lock"></i> Lock Screen </a>
                                </li> -->
                                <li @click="tuiChu">
                                    <span class="tttui">
                                        <i class="icon-key"></i> 安全退出
                                    </span>
                                </li>
                                <!-- 历史查询,MK -->
                                <!-- <li class="tttui" @click="history" :class="{active:mylink('/demand')}">
                                    <router-link to="/demand" tag='span'>
                                        <i class="icon-clock"></i>历史查询
                                    </router-link>
                                </li> -->
                            </ul>
                        </li>
                        <!-- END USER LOGIN DROPDOWN -->
                        <!-- BEGIN QUICK SIDEBAR TOGGLER -->
                        <li class="dropdown dropdown-extended quick-sidebar-toggler">
                            <span class="sr-only">Toggle Quick Sidebar</span>
                           <!--  <i class="icon-logout"></i> -->
                        </li>
                        <!-- END QUICK SIDEBAR TOGGLER -->
                    </ul>
                </div>
                <!-- END TOP NAVIGATION MENU -->
            </div>
            <!-- END PAGE TOP -->
        </div>
        <!-- END HEADER INNER -->
    </div>
    <div class="clearfix"> </div>
    <div class="page-container">
        <!-- BEGIN SIDEBAR -->
        <div class="page-sidebar-wrapper" v-if="$store.state.isshowIndex">
            <!-- BEGIN SIDEBAR -->
            <div class="page-sidebar navbar-collapse collapse">
                <!-- BEGIN SIDEBAR MENU -->
                <ul class="page-sidebar-menu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
                     <li class="nav-item start" @click="jiluAllLi('管理驾驶舱')" :class="{active:mylink('/guanli')}">
                        <router-link to="/guanli" class="nav-link nav-toggle  zhuListlefT">
                            <i class="fa fa-dashboard"></i>
                            <span class="title">管理驾驶舱</span>
                        </router-link>
                        <ul class="sub-menu" style="height: 0;margin:0;"></ul>
                    </li>
                    <li class="nav-item start" @click="jiluAllLi('管理驾驶舱2')" :class="{active:mylink('/guanli2')}">
                        <router-link to="/guanli2" class="nav-link nav-toggle  zhuListlefT">
                            <i class="fa fa-dashboard"></i>
                            <span class="title">管理驾驶舱2</span>
                        </router-link>
                        <ul class="sub-menu" style="height: 0;margin:0;"></ul>
                    </li>
                    <li class="nav-item start" @click="jiluAllLi('企业视图')" :class="{active:mylink('/entry')}">
                        <router-link to="/entry" class="nav-link nav-toggle  zhuListlefT">
                            <i class="fa fa-institution"></i>
                            <span class="title">企业视图</span>
                        </router-link>
                        <ul class="sub-menu" style="height: 0;margin:0;"></ul>
                    </li>
                    <li class="nav-item start" @click="jiluAllLi('高管探查')" :class="{active:mylink('/person')}">
                        <router-link to="/person" class="nav-link nav-toggle  zhuListlefT">
                            <i class="fa fa-users"></i>
                            <span class="title">高管探查</span>
                        </router-link>
                        <ul class="sub-menu" style="height: 0;margin:0;"></ul>
                    </li>
                    <li class="nav-item start" :class="{active:mylink('guanlian')}">
                        <a href="javascript:;" class="nav-link nav-toggle  zhuListlefT">
                            <i class="fa fa-object-group"></i>
                            <span class="title">关联洞察</span>
                            <span class="selected"></span>
                            <span class="arrow open"></span>
                        </a>
                        <ul class="sub-menu">
                            <li class="nav-item start jiluAllLi" @click="jiluAllLi('全貌查询')" :class="{active:mylink('/overview')}">

                                <router-link to="/overview" class="jiluAllLiA">
                                <span class="nav-link ">
                                    <span class="title">全貌族谱</span>
                                    <span class="selected"></span>
                                </span>
                                </router-link>
                            </li>

                            <li class="nav-item start jiluAllLi" @click="jiluAllLi('多节点查询')" :class="{active:mylink('/multiquery')}">
                                <router-link to="/multiquery">
                                <span class="nav-link ">
                                    <span class="title">多节点关联</span>
                                    <span class="badge badge-success"></span>
                                </span>
                                </router-link>
                            </li>

                            <li class="nav-item start jiluAllLi" @click="jiluAllLi('实质关联查询')" :class="{active:mylink('/essenceQuery')}">
                                <router-link to="/essenceQuery">
                                <span class="nav-link ">
                                    <span class="title">实质关联</span>
                                    <span class="badge badge-success"></span>
                                </span>
                                </router-link>
                            </li>
                            <li class="nav-item start jiluAllLi" @click="jiluAllLi('控制路径查询')" :class="{active:mylink('/contrlQuery')}">
                                <router-link to="/contrlQuery">
                                <span class="nav-link ">
                                    <span class="title">控制路径</span>
                                    <span class="badge badge-success"></span>
                                </span>
                                </router-link>
                            </li>
                            <!-- <li class="nav-item start ">
                                <router-link to="">
                                <span class="nav-link ">
                                    <span class="title">风险视图</span>
                                    <span class="badge badge-success"></span>
                                </span>
                                </router-link>
                            </li>

                            <li class="nav-item start ">
                                <router-link to="">
                                <span class="nav-link ">
                                    <span class="title">全局关联</span>
                                    <span class="badge badge-success"></span>
                                </span>
                                </router-link>
                            </li> -->
                        </ul>
                    </li>
                    <li class="nav-item start" :class="{active:mylink('fengling')}">
                        <a href="javascript:;" class="nav-link nav-toggle  zhuListlefT">
                            <i class="fa fa-bell-o"></i>
                            <span class="title">风铃</span>
                            <span class="selected"></span>
                            <span class="arrow open"></span>
                        </a>
                        <ul class="sub-menu">
                            <li class="nav-item start jiluAllLi" @click="jiluAllLi('变更动态')" :class="{active:mylink('/change')}">
                                <router-link to="/change">
                                    <span class="nav-link ">
                                        <span class="title">变更动态</span>
                                        <span class="selected"></span>
                                    </span>
                                </router-link>
                            </li>
                            <li class="nav-item start jiluAllLi" @click="jiluAllLi('监控管理')" :class="{active:mylink('/monitor')}">

                                <router-link to="/monitor" class="jiluAllLiA">
                                    <span class="nav-link ">
                                        <span class="title">监控管理</span>
                                        <span class="badge badge-success"></span>
                                    </span>
                                </router-link>
                            </li>
                            <li class="nav-item start jiluAllLi" @click="jiluAllLi('策略分组')" :class="{active:mylink('/policyGroup')}">
                                <router-link to="/policyGroup">
                                    <span class="nav-link ">
                                        <span class="title">策略分组</span>
                                        <span class="badge badge-success"></span>
                                    </span>
                                </router-link>
                            </li>
                           <!--  <li class="nav-item start jiluAllLi" @click="jiluAllLi('关联监控')" :class="{active:mylink('/relation')}">
                                <router-link to="/relation">
                                    <span class="nav-link ">
                                        <span class="title">关联监控</span>
                                        <span class="badge badge-success"></span>
                                    </span>
                                </router-link>
                            </li> -->
                           <!--  <li class="nav-item start jiluAllLi" @click="jiluAllLi('风险事件')">

                                <router-link to="/change">
                                    <span class="nav-link ">
                                        <span class="title">风险事件</span>
                                        <span class="badge badge-success"></span>
                                    </span>
                                </router-link>
                            </li> -->

                        </ul>
                    </li>
                    <li class="nav-item start">
                        <a href="javascript:;" class="nav-link nav-toggle  zhuListlefT">
                            <i class="fa fa-flag"></i>
                            <span class="title">专题库</span>
                            <span class="selected"></span>
                            <span class="arrow open"></span>
                        </a>
                        <ul class="sub-menu">
                           <!--  <li class="nav-item start jiluAllLi" @click="jiluAllLi('变更动态')" :class="{active:mylink('/alter')}">
                                <router-link to="/alter">
                                    <span class="nav-link ">
                                        <span class="title">变更状态</span>
                                        <span class="selected"></span>
                                    </span>
                                </router-link>
                            </li> -->
                            <li class="nav-item start jiluAllLi" @click="jiluAllLi('商标')" :class="{active:mylink('/trademark')}">
                                <router-link to="/trademark">
                                <span class="nav-link ">
                                    <span class="title">商标</span>
                                    <span class="selected"></span>
                                </span>
                                </router-link>
                            </li>
                            <li class="nav-item start jiluAllLi" @click="jiluAllLi('著作权')" :class="{active:mylink('/copyright')}">
                                <router-link to="/copyright">
                                <span class="nav-link ">
                                    <span class="title">著作权</span>
                                    <span class="badge badge-success"></span>
                                </span>
                                </router-link>
                            </li>
                            <!--暂时屏蔽未开发功能,勿删-->
                             <!--<li class="nav-item start jiluAllLi" @click="jiluAllLi('专利')" :class="{active:mylink('/patent')}">-->
                                <!--<router-link to="/patent">-->
                                <!--<span class="nav-link ">-->
                                    <!--<span class="title">专利</span>-->
                                    <!--<span class="badge badge-success"></span>-->
                                <!--</span>-->
                                <!--</router-link>-->
                            <!--</li>-->
                             <!--<li class="nav-item start jiluAllLi" @click="jiluAllLi('招聘')" :class="{active:mylink('/job')}">-->
                                <!--<router-link to="/job">-->
                                <!--<span class="nav-link ">-->
                                    <!--<span class="title">招聘</span>-->
                                    <!--<span class="badge badge-success"></span>-->
                                <!--</span>-->
                                <!--</router-link>-->
                            <!--</li>-->
                             <!--<li class="nav-item start jiluAllLi" @click="jiluAllLi('招投标')" :class="{active:mylink('/bid')}">-->
                                <!--<router-link to="/bid">-->
                                <!--<span class="nav-link ">-->
                                    <!--<span class="title">招投标</span>-->
                                    <!--<span class="badge badge-success"></span>-->
                                <!--</span>-->
                                <!--</router-link>-->
                            <!--</li>-->
                             <!--<li class="nav-item start jiluAllLi" @click="jiluAllLi('上市')" :class="{active:mylink('/list')}">-->
                                <!--<router-link to="/list">-->
                                <!--<span class="nav-link ">-->
                                    <!--<span class="title">上市</span>-->
                                    <!--<span class="badge badge-success"></span>-->
                                <!--</span>-->
                                <!--</router-link>-->
                            <!--</li>-->
                             <!--<li class="nav-item start jiluAllLi" @click="jiluAllLi('ICP')" :class="{active:mylink('/icp')}">-->
                                <!--<router-link to="/icp">-->
                                <!--<span class="nav-link ">-->
                                    <!--<span class="title">ICP</span>-->
                                    <!--<span class="badge badge-success"></span>-->
                                <!--</span>-->
                                <!--</router-link>-->
                            <!--</li>-->
                            <!--./暂时屏蔽未开发功能-->
                        </ul>

                    </li>
                     <li class="nav-item start ">
                        <a href="javascript:;" class="nav-link nav-toggle zhuListlefT">
                            <i class="fa fa-file-archive-o"></i>
                            <span class="title">批处理</span>
                            <span class="selected"></span>
                            <span class="arrow open"></span>
                        </a>
                        <ul class="sub-menu">
                            <li class="nav-item start jiluAllLi" @click="jiluAllLi('企业查询')" :class="{active:mylink('/companyQuery')}">
                                <router-link to="/companyQuery">
                                <span class="nav-link ">
                                    <span class="title">企业查询</span>
                                    <span class="badge badge-success"></span>
                                </span>
                                </router-link>
                            </li>
                            <li class="nav-item start jiluAllLi" @click="jiluAllLi('人员查询')" :class="{active:mylink('/personQuery')}">
                                <router-link to="/personQuery">
                                    <span class="nav-link ">
                                        <span class="title">人员查询</span>
                                        <span class="badge badge-success"></span>
                                    </span>
                                </router-link>
                            </li>
                            <li class="nav-item start jiluAllLi" @click="jiluAllLi('批量监控')" :class="{active:mylink('/batchMonitor')}">
                                <router-link to="/batchMonitor">
                                    <span class="nav-link ">
                                        <span class="title">批量监控</span>
                                        <span class="badge badge-success"></span>
                                    </span>
                                </router-link>
                            </li>
                        </ul>
                        </li>
                </ul>
                <!-- END SIDEBAR MENU -->
            </div>
            <!-- END SIDEBAR -->
        </div>
        <!-- END SIDEBAR -->
        <!-- BEGIN CONTENT -->
        <div class="page-content-wrapper">
            <!-- BEGIN CONTENT BODY -->
            <div class="page-content">
                <div class="mianbao clearfix">
                    <!-- 面包屑 -->
                    <div class="mianbaoBox">
                        <ul class="app-levelbar clearfix" >
                           <li v-for="(item,index)  in levelList" style="">
                                <router-link  :to="{name:item.name}">{{item.name}}</router-link>

                                <span style="padding-left: 2px;"></span>
                           </li>
                        </ul>
                    </div>
                    <!-- 浏览航迹 -->
                    <div class="liulanBox">
                            <img class="liulanBoxL" src="../assets/left.png"  />
                            <div class="liulanBoxC">
                                  <ul class="liulan clearfix">
                                    <li class="jilustyle" :class="{backFFF:item.name == newIndex}" v-for="(item,index) in jiluTab" @click="routerJilu(item.pathHref,item.name,index)">
                                        {{item.name}}
                                        <span @click.stop="removeJilu(jiluTab[index])">
                                            <!-- <img src="../assets/close_icon.png" alt="" /> -->
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <img class="liulanBoxR" src="../assets/right.png"  />
                    </div>
                </div>

                <!-- BEGIN PAGE HEAD-->
                <router-view></router-view>
                <!-- END PAGE HEAD-->
            </div>
            <!-- END CONTENT BODY -->
        </div>
        <!-- END CONTENT -->
        <!-- BEGIN QUICK SIDEBAR -->
        <a href="javascript:;" class="page-quick-sidebar-toggler">
            <i class="icon-login"></i>
        </a>
    </div>
    <div class="page-footer" v-if="$store.state.isshowIndex">
        <div class="page-footer-inner"> 2017 &copy; 北京中数智汇科技股份有限公司
        </div>
        <div class="scroll-to-top">
            <i class="icon-arrow-up"></i>
        </div>
    </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {

    components:{

    },

    data () {
      return {
        flys:'',
       levelList: null,
       jiluTab:[],
       duibiName:'',     //点击左边获得的name
       jsonBackF:{
            backFFF:false
       },
       username:'',
       qiteDetailPathHref:'', //企业详情页缓存
       newIndex:'',
       widths:0,
       arrNum:[],
       logoUrlB:'',
       tokenF:'',
       msgResponse:{},
       msgLevel:{
            "WARNING" : "label-warning",
            "INFO" : "label-info",
            "CRITICAL" : "label-danger"
        },
      }
    },

    created() {
      this.getBreadcrumb()
      this.tabEntclick();
    },

    watch:{
      $route() {
        this.getBreadcrumb();
        this.tabEntclick();
        this.zquery();
      }
    },
    mounted(){
        var _this = this;
        this.$nextTick(()=>{
            this.zquery();
        });
        this.username = localStorage.getItem('username')
        _this.$getData(_this.api.fl_Messages,{
            "hasRead" : false,
            "orderBy" : "created_at desc"
        },function(result){
            _this.msgResponse = result;
        });
        setInterval(function(){
            _this.$getData(_this.api.fl_Messages,{
                "hasRead" : false,
                "orderBy" : "created_at desc"
            },function(result){
                _this.msgResponse = result;
            })
        },1000*60*20);

        $("body").click(function(){

            if(!$("#header_notification_bar").length){
                return;
            }
            var className = $("#header_notification_bar").get(0).className;
            if( className.indexOf("open") != -1 && _this.msgResponse.total){
                _this.$put(_this.api.fl_MessagesReadAll,{},function(result){
                    if(result.success){
                        _this.msgResponse.messages = [];
                        _this.msgResponse.total = 0;
                    }
                })
            }

        });

        // fl_MessagesReadAll
        // dropdown-menu

    },
    methods: {
        msgTime: function(msg) {
            var now = new Date().getTime();
            var createTime = msg.createdAt;
            var duration = now - createTime;

            if(duration < 1000) {
                return "1秒";
            } else if (duration < 60 * 60 * 1000) {
                return parseInt((duration / 1000 / 60)) + "分钟";
            } else if (duration < 24 * 60 * 60 * 1000) {
                return parseInt((duration / 1000 / 60 / 60)) + "小时";
            } else {
                return parseInt((duration / 1000 / 60 / 60 / 24)) + "天"
            }
        },
        readAll:function(){
            _this.$put(_this.api.fl_MessagesReadAll,function(result){
                _this.msgResponse = result;
            })
        },
        mylink(path){
            var route_link = this.$route.path;
            if(route_link == '/addMonitor'){
                route_link = "/monitor";
            }
            if(route_link.substring(1,13) == "changeDetail"){
                route_link = "/change";
            }
            if(route_link == '/policyEdit'){
                route_link = "/policyGroup";
            }

            if(route_link == '/relationContent'){
                route_link = "/relation";
            }

            if(route_link == '/relationChange'){
                route_link = "/relation";
            }

            if(path == route_link){
                return true
            }
            if(path == 'guanlian'){
                if(route_link == '/overview'||route_link == '/multiquery'||route_link == '/essenceQuery'||route_link == '/contrlQuery'){
                    return true
                }
            }
            if(path == 'fengling'){
                if(route_link == '/change'||route_link == '/monitor'||route_link == '/addMonitor'||route_link == '/policyGroup' || route_link == '/relation'){
                    return true
                }
            }
        },
         //tab详情添加
      tabEntclick(){
         var tabEntjilutab = this.jiluTab
        var jsonEnName={};
        jsonEnName.name = window.sessionStorage.getItem('tabEnTname');
        jsonEnName.pathHref = this.$route.path.substring(0);


           if(window.sessionStorage.getItem('flays') != 1){
                var qucunArTab=[];
                for(var i =0 ; i<tabEntjilutab.length; i++){
                    for(var ite in tabEntjilutab[i]){
                        qucunArTab.push(tabEntjilutab[i][ite])
                    }
                }
                if(qucunArTab.indexOf(jsonEnName.name) == -1){
                        // this.jiluTab.push(jsonEnName);
                        // this.newIndex = jsonEnName.name;
                        // $('.liulan').css({"width":"auto"});
                        // if($('.liulan').width()>=$('.liulanBoxC').width()){
                        //     $('.liulanBoxR').show();
                        //     $('.liulanBoxL').show();
                        //   }else{
                        //     $('.liulanBoxR').hide();
                        //     $('.liulanBoxL').hide();
                        //   }
                }

            }
      },

        //面包屑
      getBreadcrumb() {

        let matched = this.$route.matched.filter(item => item.name);
        const first = matched[0];
        // if (first && (first.name !== '首页' || first.path !== '')) {
        //   matched = [{ name: '首页', path: '/' }].concat(matched)
        // }
        // console.log(first.path)
        if (first.path == '') {
          first.path = first.redirect
        }
        this.levelList = matched;

        this.$nextTick(function(){
             $('.app-levelbar li span').html('>')
            $('.app-levelbar li:last-child span').html('')
        })
      },
      //左边tab点击添加
      jiluAllLi(name){
        // this.tokenF = localStorage.getItem('tokenF')
        // console.log(this.tokenF)
        sessionStorage.setItem('flays',1)
        this.widths=0;
        this.newIndex = name;
        var jiluArr = this.jiluTab;
        var jiluJson = {};

        var locataionH= window.location.href;
        var n= locataionH.indexOf('#/');
        var pathHref= locataionH.substring(n);

        jiluJson.name = name,
        jiluJson.pathHref = pathHref;

        var qucunAr=[];
        for(var i =0 ; i<jiluArr.length; i++){
            for(var ite in jiluArr[i]){
                qucunAr.push(jiluArr[i][ite])
            }
        }
        if(qucunAr.indexOf(name) == -1){

              jiluArr.push(jiluJson);
              this.jiluTab = jiluArr;
            //左右点击
             this.$nextTick(()=>{
                // var w = $('.jilustyle').eq(jiluArr.length-1).outerWidth(true);
                // this.arrNum.push(w);
                // console.log(this.arrNum)
                // for(var i=0; i<this.arrNum.length; i++){
                //     this.widths += parseInt(this.arrNum[i])
                // }
                // console.log(this.widths)
                // $('.liulan').width(this.widths)
                if($('.liulan').width()>=$('.liulanBoxC').width()){
                    $('.liulanBoxR').show();
                    $('.liulanBoxL').show();
                  }else{
                    $('.liulanBoxR').hide();
                    $('.liulanBoxL').hide();
                  }
            })

            var n=10;
            $('.liulanBoxL').click(()=>{
//                console.log($('.liulanBoxC').outerWidth())
//                console.log($('.liulan').outerWidth())
//                console.log($('.liulanBoxC').outerWidth()-$('.liulan').outerWidth())
                n++
               $('.liulan').css({"left":($('.liulan').position().left-n)+'px'})
               if($('.liulan').position().left<=($('.liulanBoxC').outerWidth()-$('.liulan').outerWidth())){
                    $('.liulan').css({"left":($('.liulanBoxC').outerWidth()-$('.liulan').outerWidth())})
               }
            })
            $('.liulanBoxR').click(()=>{
                n--
               $('.liulan').css({"left":($('.liulan').position().left+n)+'px'})
               if($('.liulan').position().left>=0){
                    $('.liulan').css({"left":0})
               }
            })
             // console.log(this.jiluTab)
        }
      },
      //上tab点击删除
      removeJilu(index){
        var removeArr = this.jiluTab;
        // console.log(removeArr.length)
        // console.log(removeArr)
        // console.log(index)
        if($('.liulan').width()<$('.liulanBoxC').width()){
             $('.liulan').css({"left":0})
            $('.liulanBoxR').hide();
            $('.liulanBoxL').hide();
          }
          if(removeArr.length==1){
             this.$router.push("/guanli")
             removeArr.splice(0)
          }
        for(var i=0; i<removeArr.length; i++){
            if(removeArr[i]==index){
                //判断显示前后tab
                  var locataionHRem= window.location.href;
                  var nRem= locataionHRem.indexOf('#/');
                  var pathHrefRem= locataionHRem.substring(nRem+1);
//                console.log(removeArr[i].pathHref.substring(1))
//                console.log(pathHrefRem)
                if(((removeArr.indexOf(removeArr[i])+1) < removeArr.length) && (removeArr[i].pathHref.substring(1) == pathHrefRem )){
                    //console.log(removeArr[i+1].pathHref.substring(1))
                    this.$router.push(removeArr[i+1].pathHref.substring(1))
                    this.newIndex = removeArr[i+1].name
                }else if((removeArr.indexOf(removeArr[i])+1) == removeArr.length){
                    //console.log(removeArr[i-1].pathHref.substring(1))
                    this.$router.push(removeArr[i-1].pathHref.substring(1))
                    this.newIndex = removeArr[i-1].name
                }else if(removeArr[i].pathHref.substring(1) != pathHrefRem ){
                    this.$router.push(pathHrefRem)
                }

                removeArr.splice(removeArr.indexOf(removeArr[i]),1)

                //从新获取宽度
                var arrNewWid=[];
                    $('.liulan').css({"width":"auto"});
            }
        }
      },
      //上tab路由路径
      // pa为当前点击的路径name 为当前点击的名字
      routerJilu(pa,name,index){
       //动态切换class为true和false解决当前状态。
         //动态切换class为true和false解决当前状态。
        this.newIndex = name;
        //console.log(name);
        $(".jiluAllLi").css({"background":""});
        //点击上Tab判断显示当前最新浏览状态
        var ah= '';
         if (window.sessionStorage.getItem('qiteDetailPathHref') && (name == '企业视图')){
           ah=window.sessionStorage.getItem('qiteDetailPathHref').substring(1)
         }else if(window.sessionStorage.getItem('addMonitor') && (name == '监控管理')){
            ah=window.sessionStorage.getItem('addMonitor').substring(1)
         } else if(window.sessionStorage.getItem('policyEdit') && (name == '策略分组')){
            ah=window.sessionStorage.getItem('policyEdit').substring(1)
         } else{
            ah=pa.substring(1)
         }

         //console.log(ah);
        this.$router.push(ah);

      },
      //退出
      tuiChu(){
        this.axios.post(this.api.entBase+"/logout").then((res)=>{
            console.log(res)
            this.$router.push({name:'登录'})
            localStorage.removeItem('token');
            localStorage.removeItem('tokenF');
            localStorage.removeItem('username');
        }).catch(err => {
             console.log(err)
        })


      },
      // 历史查询
      history(){
        //console.log("这里是查询按钮")
        this.jiluAllLi("历史查询")
      },
      zquery(){
        //logo判断
        var logoUrlB=localStorage.getItem('logoUrlB');
        this.logoUrlB=logoUrlB;
        //详情添加TAB
        sessionStorage.setItem('flays',1)
        //判断token
         this.axios.get(this.api.entBase+'/list?key='+encodeURIComponent('北京中数智汇科技股份有限公司')).then((res) => {
            //console.log(res)
             if(res.data.code == 400){
                window.swal({
                  title: "确认",
                  text: '请重新登录',
                  type: "info",
                  showCancelButton: false,
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: "确认",
                  cancelButtonText: "取消",
                  closeOnConfirm: false,
                  closeOnCancel: true
                });

                this.$router.push({path:"/"});
            }
          }).catch(err => {
            //console.log(err);


          })

      },

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jiluAllLiA.active{
    background:#f2f6f9 !important;
}
.jiluAllLiA.router-link-active{
    background:#f2f6f9 !important;
}
.backFFF{
    background: #37CAD2 !important;
    color: #ffffff !important;

}
.backFFF span{
    background-image: url("../assets/close_icon_ac.png") !important;
       background-repeat: no-repeat !important;
    background-position: 10px 8px !important;
    background-size: 16px 16px !important;
}
.tttui{
        padding: 8px 16px;
    color: #6e6e6e;
    text-decoration: none;
    display: block;
    clear: both;
    font-weight: 300;
    line-height: 18px;
    white-space: nowrap;
}
a{
    color: #5E7386
}
a:hover{
    color: #337ab7
}
 .app-levelbar.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
  }
   .no-redirect {
      color: #97a8be;
      cursor: text;
    }
    .app-levelbar li{
        float: left;
        margin-left: 10px;
    height: 24px;
    line-height: 56px;
    }
    .tabs-view-container {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;

  }
   .tabs-view {
      margin-left: 10px;

    }
.mianbao{
        display: flex;
        margin-top: -10px;
        background: #ffffff;
        margin-bottom: 20px;
}
.mianbao div{
}
.mianbaoBox{
        width: 210px;
}
.liulanBox{
        width: 100%;
    white-space: nowrap;
    height: 60px;
    position: relative;
    margin-top: -7px
}
.liulanBoxC{
        margin-left: 25px;
    width: 97%;
    margin-top: 19px;
    height: 40px;
    position: relative;
    overflow: hidden;
}
.liulanBoxL{

    position: absolute;
    left: 0;
    top:28px;
    cursor: pointer;
    display: none;
}
.liulanBoxR{
        position: absolute;
    right: 0;
    top:28px;
    cursor: pointer;
    display: none;
}
.liulan{
    position: absolute;
    left: 0px;
    top: -20px;;
}
.liulan li{
    float: left;
        border: 1px solid #DCDCDC;
            margin-left: -1px;
            margin-top: 20px;
}
.liulan li:first-child{
    margin-left: 0
}

/*.liulanBox::-webkit-scrollbar{ width:5px; height:5px;}
.liulanBox::-webkit-scrollbar-thumb{ -webkit-border-radius:4px; background-color:#ccc; height:10px; }*/
.jilustyle{
    background: #F2F6F9;
    padding: 0 10px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: #5E7386;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
}
.jilustyle:hover{
    background: #DCDCDC ;
}

.jilustyle span{
    width: 30px;
    background-image: url("../assets/close_icon.png");
    background-repeat: no-repeat;
    background-position: 10px 8px;
    background-size: 16px 16px;
}
.jilustyle span:hover{
    background-image: url("../assets/close_icon_hover.png");
}
.jilustyle span img{
    margin-top: 14px;
    width: 16px;
}
a:hover{
    text-decoration: none !important;
}
</style>
