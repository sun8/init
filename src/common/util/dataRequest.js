
// import axios from '../../http.js';
import axios from 'axios';

import shouldRequest from './dataCache.js';
const req = axios.create({
	baseURL: 'http://fl.bidata.com.cn:8088/',
	timeout: 10000,
	headers: {
		'X-Token': localStorage.getItem('tokenF')
	}
});

const reqByCross = axios.create({
	baseURL: 'https://api.bidata.com.cn/dashboard',
	timeout: 10000,
	headers: {
		// 'Content-Type' : 'application/x-www-form-urlencoded'
	}
});

function request(url, cb, keyName) {
	if( shouldRequest(keyName) ){
		req.get( url )
			.then(rut=>{
				// console.log(rut);
				if(!rut.data.success) return;
				localStorage.setItem(keyName, JSON.stringify(rut.data));
				cb && cb(rut.data);

			})
			.catch(err=>{
				console.log(err);
			})
	}else{
		setTimeout(f=>{ cb( JSON.parse(localStorage.getItem(keyName))) })
		// return cb && cb( JSON.parse(localStorage.getItem(keyName)) );
	}
}

// data传数据， config配置，(create)属性名一样会覆盖
function requestPost(url, cb,  keyName, data={}, config={}) {

	if( shouldRequest(keyName) ){

		reqByCross.post( url, data, config )
			.then(rut=>{
				if(rut.data.code!==200) return;
				localStorage.setItem(keyName, JSON.stringify(rut.data));
				cb && cb(rut.data);
			})
			.catch(err=>{
				console.log(err);
			})

	}else{
		setTimeout(f=>{cb( JSON.parse(localStorage.getItem(keyName)))})
		// return cb && cb( JSON.parse(localStorage.getItem(keyName)) , 'post');
	}
}


//企业注册资本
export function getEnterpriseCapitalRegistration(cb) {
	requestPost('/getRegCap', cb, 'getRegCap' );
}


//企业数量
export function getEnterpriseQquantity(cb) {
	requestPost('/getIndustryphy', cb ,'getIndustryphy');
}

//企业注册时间查询总量
export function getEnterpriseRegistrationTime(cb) {
	requestPost('/getEsDate', cb ,'getEsDate');
}

//在营企业总数
export function getTotaInUKEnterprises(cb) {
	requestPost('/getNum', cb ,'getNum');
}



// 最新状态请求
export function getLatestChangeStat(cb) {
	request('/front/stats/latestChangeStat', cb,'latestChangeStat');
}

// 雷达图请求
export function getRadarMap(cb) {
	request('/front/stats/radarMap', cb,'radarMap');
}

// 监控密度
export function getMonitorDensity(cb) {
	request('/front/stats/monitorByArea', cb,'monitorByArea');
}
// 变更密度
export function getChangeDensity(cb) {
	request('/front/stats/changeByArea', cb,'changeByArea');
}
// 风险密度
export function getRiskDensity(cb) {
	request('/front/stats/riskByArea', cb,'riskByArea');
}
