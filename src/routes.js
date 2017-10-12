import VueRouter from 'vue-router'
import Vue from 'vue'
import Index from './views/Index';
import Entry from './views/entwiki/entry'
import Detail from './views/entwiki/detail'
import Person from './views/person/person'
import Guanli from './views/guanli/guanli'
import Guanli2 from './views/guanli2/guanli2'
import Login from './views/login'
import Overview from './views/relations/Overview'
import FenglingMonitor from './views/fengling/monitor'
import FenglingAddMonitor from './views/fengling/addMonitor'
import FenglingBatchMonitor from './views/fengling/batchMonitor'
import FenglingChange from './views/fengling/change'
import FenglingChangeDetail from './views/fengling/changedetail'
import FenglingPolicyGroup from './views/fengling/policyGroup'
import FenglingPolicyEdit from './views/fengling/policyEdit'
import FenglingRelation from './views/fengling/relation'
import FenglingRelationContent from './views/fengling/relationContent'
import FenglingRelationChange from './views/fengling/relationChange'
import EntRelation from './views/relations/EntRelation'
import Multiquery from './views/relations/MultiQuery'
import ContrlQuery from './views/relations/contrlQuery'
import EssenceQuery from './views/relations/essenceQuery'
import Alter from './views/dissertation/alter'
import Trademark from './views/dissertation/trademark'
import TrademarkDetail from './views/dissertation/trademarkDetail'
import Copyright from './views/dissertation/copyright'
import Patent from './views/dissertation/patent'
import Job from './views/dissertation/job'
import Bid from './views/dissertation/bid'
import List from './views/dissertation/list'
import Icp from './views/dissertation/icp'
import CompanyQuery from './views/batch/companyQuery'
import PersonQuery from './views/batch/personQuery'
import demand from './views/demand'

let routes = [
 {
  	path:'/',
  	component: Login,
  	name: '登录'
  },
  {
  	path: '/home',
  	component:Index,
  	name: '管理驾驶舱',
  	redirect: '/guanli',
  	children:[
  		{
  			path:'/guanli',
  			component: Guanli,
  			// name: '高管探查'
  		}
  	]
  },
  {
    path: '/',
    component:Index,
    name: '管理驾驶舱2',
    redirect: '/guanli2',
    children:[
      {
        path:'/guanli2',
        component: Guanli2,
        // name: '高管探查'
      }
    ]
  },
  {
    path: '/home',
    component: Index,
    name: '企业视图',
    redirect: '/entry',
    children:[
		{
			path:'/entry',
			component: Entry,
			// name: '企业视图'
		},
		{
			path: '/entry/page/:page',
			component: Entry,
			name: 'pageRoute',
		},
		{
			path: '/detail/:entid',
			component: Detail,
			name: '详情'
		},
	]
  },


  {
  	path: '/home',
  	component:Index,
  	name: '高管探查',
  	redirect: '/person',
  	children:[
  		{
  			path:'/person',
  			component: Person,
  			// name: '高管探查'
  		}
  	]
  },

  {
    path: '/home',
    component: Index,
    name: '风铃',
    redirect: '/change',
    children:[
		{
		  	path: '/change',
		    component: FenglingChange,
		    name: '变更动态',
		 },
		 {
		  	path: '/monitor',
		    component: FenglingMonitor,
		    name: '监控管理',
		 },
		 {
		  	path: '/addMonitor',
		    component: FenglingAddMonitor,
		    name: '添加监控',
		 },
     {
        path: '/policyGroup',
        component: FenglingPolicyGroup,
        name: '策略分组',
     },
     {
        path: '/policyEdit',
        component: FenglingPolicyEdit,
        name: '策略详情',
     },
		 {
		  	path: '/relation',
		    component: FenglingRelation,
		    name: '关联监控',
		 },
     {
        path: '/relationContent',
        component: FenglingRelationContent,
        name: '关联监控内容',
     },
     {
        path: '/relationChange',
        component: FenglingRelationChange,
        name: '关联监控变更',
     },
     {
        path: '/batchMonitor',
        component: FenglingBatchMonitor,
        name: '批量监控',
     },
		 {
		  	path: '/changeDetail',
		    component: FenglingChangeDetail,
		    name: '变更详情',
		 }
		]
  },
  {
    path: '/home',
    component: Index,
    name: '关联洞察',
    redirect: '/overview',
    children:[
		{
		  	path: '/overview',
		    component: Overview,
		    name: '全貌查询',
		},
		{
		  	path: '/multiquery',
		    component: Multiquery,
		    name: '多节点查询',
		},
    {
        path: '/contrlQuery',
        component: ContrlQuery,
        name: '控制路径查询',
    },
		{
		  	path: '/essenceQuery',
		    component: EssenceQuery,
		    name: '实质关联查询',
		},
		{
		  	path: '/entRelation',
		    component: EntRelation,
		    name: '全貌族谱',
		},

	]
  },
    {
        path: '/home',
        component: Index,
        name: '专题库',
        redirect: '/alter',
        children:[
            {
                path: '/alter',
                component: Alter,
                name: '变更状态',
            },
            {
                path: '/trademark',
                component: Trademark,
                name: '商标',
            },
            {
                path: '/trademarkDetail/:code',
                component: TrademarkDetail,
                name: '商标详情',
            },
            {
                path: '/copyright',
                component: Copyright,
                name: '著作权',
            },
            {
                path: '/patent',
                component: Patent,
                name: '专利',
            },
            {
                path: '/job',
                component: Job,
                name: '招聘',
            },
            {
                path: '/bid',
                component: Bid,
                name: '招投标',
            },
            {
                path: '/list',
                component: List,
                name: '上市',
            },
            {
                path: '/icp',
                component: Icp,
                name: '专题icp',
            },

        ]
    },
    {
        path: '/home',
        component: Index,
        name: '批处理',
        redirect: '/companyQuery',
        children:[
            {
                path: '/companyQuery',
                component: CompanyQuery,
                name: '企业查询',
            },
            {
                path: '/personQuery',
                component: PersonQuery,
                name: '人员查询',
            },

        ]
    },{
        path: '/home',
        component: Index,
        name: '历史查询',
        children:[
            {
                path: '/demand',
                component: demand,
                name: 'demand',
            }
        ]
    },
  {
	        path : "/*" ,
	        // 重定向
	        // redirect : "/Login"
	        component: Login,
	    }


];

const router = new VueRouter({
  routes
})

export default router;
