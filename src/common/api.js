import apiRoot from '../../config/api'
// Vue.prototype.$apiRoot = api.api;
// 接口配置(计费)
if(window.location.protocol == "http:"){
	var pre = apiRoot.api;
}else if(window.location.protocol == "https:"){
	var pre = apiRoot.apis;
}
var base = apiRoot.api_Money;
//企业查询
var entBase = apiRoot.api_entChaxun;
console.log(entBase)
var fenglingBase = apiRoot.api_FengLing;
var fenglingEcharts = apiRoot.api_FengLingEcharts;
var entEcharts = apiRoot.api_EntEcharts;
// 除了提交、查询请求接口(免费)
// var pre = apiRoot.api;
var api = {
	// 登录
	login : pre+"/login",
	// login : "http://10.20.20.88:8037/portal-api/v1/login",
	// login : "http://adminapi.dockcloud.cn/admin/v3/sys/login",
	// 模糊查询
	blurredQuery : pre + "/relation/portal/search/ent?mks=",
	// 下载txt
	download_txt :pre + '/relation/portal/download/template',
	// 全貌的二次过滤
	second_filter_overview:pre+"/relation/genealogy/ids",
	// 风险的二次过滤
	second_filter_risk:pre+"/relation/risk_graph_show/ids",
	// 节点验证
	multi_check : pre + "/relation/portal/check/mks",
	// 保存图谱
	save_relation: pre + "/relation/storage/save",
	// 我的图谱
	my_relation: pre + "/relation/storage/list",
	// 删除我的图谱
	delete_relation: pre + "/relation/storage/delete",
	// 查看我的图谱
	look_my_relation: pre + "/relation/storage/get",
	// 实质关联
	essence_relation: base + "/relation/real_relation",
	// 控制路径
	contrl_relation: base + "/relation/control_path",
	// 导出全景图
	export_img : pre + "/relation/portal/download/bigimg",
	export_img_l : pre + "/relation/portal/download/bigimg_get",
	// 退出登录
	download_exl: pre + "/relation/storage/exportexcel",
	download_exl_ess: pre + "/relation/storage/exportexcel_real",
	out_login:pre+"/logout",

	fl_change_list: fenglingBase+"/changes",// 获取变更列表
	fl_policy_name_list: fenglingBase+"/policy/search", // 获取策略列表
	fl_policy_is_has: fenglingBase+"/policy/ifDelete?policyId=", // 判断策略是否正在使用
	fl_policy_delete: fenglingBase+"/policy/deletePolicy?id=", //删除策略
	fl_policy_edit: fenglingBase+"/policy",// 编辑策略
	fl_policy_create: fenglingBase+"/policy/create",// 创建策略
	fl_policy_name_is_has: fenglingBase+"/policy/isExistPoliceName",// 判断策略是否重名
	fl_policy_save: fenglingBase+"/policy/savePolicy",// 保存策略
	
	fl_change_column_list: fenglingBase+"/changes/allMonitorItem",// 获取变更事项
	fl_monitor_list: fenglingBase + "/order/monitor_list",// 获取监控列表
	fl_monitor_orderOperate: fenglingBase + "/order",// 监控订单操作 后面延伸了几个接口
	fl_queryEnterprisesByRegNo: fenglingBase + "/searchByRegNo",//通过注册号模糊搜索
	fl_queryEnterprises: fenglingBase + "/search",//名称模糊搜索
	fl_isMonitorEnter: fenglingBase + "/orders/hasMonitor",// 添加监控时判断企业是否已监控
	fl_queryEnterprisesGT: fenglingBase + "/searchGT", // 个体模糊搜索
	fl_isMonitorEnter: fenglingBase + "/orders/hasMonitor", // // 添加监控时判断企业是否已监控
	fl_putToMonitorListSingle: fenglingBase + "/orders", // // 向后台单个添加监控
	fl_putToMonitorList: fenglingBase + "/orders/batch", // // 向后台批量添加监控
	fl_batchmonitor_history: fenglingBase + "/batch/monitor/history", // 批量上传历史
	fl_batchmonitor_templete: fenglingBase + "/batch/monitor/template", // 下载模版
	fl_batchmonitor_preview: fenglingBase + "/batch/monitor/preview", // 模版案例
	fl_batchmonitor_download: fenglingBase + "/batch/monitor/downloadFile", // 下载上传文件
	fl_batchmonitor_upload: fenglingBase + "/batch/monitor/upload", // 上传文件

	fl_Messages: fenglingBase + "/messages", // 消息列表
	fl_MessagesReadAll: fenglingBase + "/message/readAll", // 未读消息标记为已读

	fl_contact: fenglingBase + "/orderMonitorRelations", // 关联监控列表
	fl_contact_batchTime: fenglingBase + "/orderMonitorRelations/batchDate", // 关联监控列表批次时间筛选
	fl_contact_enterprise: fenglingBase + "/orderMonitorRelations/map", // 请求关联监控子体详情
	fl_contact_isExist: fenglingBase + "/orderMonitorRelations/isExist", // 判断主体是否已经添加监控
	fl_contact_child: fenglingBase + "/orderMonitorRelations/relationOrders", // 查找关联子体
	fl_contact_childOrdered: fenglingBase + "/orderMonitorRelations/relationOrdered", // 已经添加的企业进入详情
	fl_contact_mapBefore: fenglingBase + "/orderMonitorRelations/mapBefore", // 已经添加的企业进入详情map
	fl_contact_relationOther: fenglingBase + "/relations/other", // 请求自定义关系
	fl_contact_entDetail: fenglingBase + "/searchByPripid", // 关联监控内容
	fl_contact_monitor: fenglingBase + "/orderMonitorRelations/relationOrders", // 添加关联监控
	fl_contact_monitorEdit: fenglingBase + "/orderMonitorRelations/relation", // 添加企业关系，后期维护关系
	fl_contact_batchTerminate: fenglingBase + "/orderMonitorRelations/batch/terminate", // 取消主体企业下的监控企业
	fl_contact_addRelation: fenglingBase + "/relations", // 添加新的自定义关系名称
	fl_contact_changeMap: fenglingBase + "/changeRelations/map", // 获取关联监控map变更图数据
	fl_contact_change: fenglingBase + "/changeRelations", // 获取关联监控变更列表
	fl_contact_changeItem: fenglingBase + "/changeRelations/allMonitorItem", // 获取关联监控下变更事项
	fl_contact_historyDate: fenglingBase + "/changeRelations/historyDate", // 获取关联监控下变更详情时间轴
	fl_contact_changeDetail: fenglingBase + "/changeRelations/detail", // 获取关联监控下变更详情

	//企业查询
	// li_list:entBase + "/list?key=",
	// 查询历史
	common_history:entBase + "/history",
	// 通过token获取信息
	getInfo:pre+"/token/",
	pre:pre,
	base:base,
	entBase:entBase,
	fenglingBase:fenglingBase,
	demand_history: "/ent/vientiane/v3/history",
	fenglingEcharts:fenglingEcharts,
	entEcharts:entEcharts	
}

export default api