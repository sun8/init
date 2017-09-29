// import axios from "axios";
// api配置模块
import api from "../common/api.js";
import router from "../routes";

var  MyPlugin = {};

MyPlugin.install = function(Vue, options) {

	Vue.prototype.rsa= function(data){
		return data*data ;
	};

	// 获取个十百千万的数字
	Vue.prototype.$getDigit = function(digit,data){
    var divisor = Math.pow(10,digit);
    return parseInt(data % divisor / (divisor/10));
  };
  // 获取个十百千万的数字
	Vue.prototype.$repeat = function(str,arr){
    for (var j = 0; j < arr.length; j++) {
        if(arr[j] == str){
          return true;
        }
    }
    return false;
  };
	// 去重
  Vue.prototype.repeat=function(linksAfterMerge,link){
    for (var j = 0; j < linksAfterMerge.length; j++) {
      if(linksAfterMerge[j].from==link.from && linksAfterMerge[j].to==link.to){
        if(String(linksAfterMerge[j].type).indexOf(link.type+"") != -1){
          if(link.properties.position){
            if(linksAfterMerge[j].properties.position){
              linksAfterMerge[j].properties.position += "，"+link.properties.position;
              linksAfterMerge[j].properties.position_desc += "，"+link.properties.position_desc;
            }else{
              linksAfterMerge[j].properties.position = link.properties.position;
              linksAfterMerge[j].properties.position_desc = link.properties.position_desc;
            }
          }else{
            if(link.properties.legal){
              linksAfterMerge[j].properties.legal =link.properties.legal;
            }
          }
        }else{
          linksAfterMerge[j].type += "，"+link.type;
          linksAfterMerge[j].properties = $.extend( true, linksAfterMerge[j].properties, link.properties );
        }
      return true;
      }
    }
    return false;
  }
	// Vue.prototype.$ajax = axios;
	// 注入接口
	Vue.prototype.api = api;

  var deepC = (function deepClone(obj){
      var result,oClass=isClass(obj);
          //确定result的类型
      if(oClass==="Object"){
          result={};
      }else if(oClass==="Array"){
          result=[];
      }else{
          return obj;
      }
      for(var key in obj){
          var copy=obj[key];
          if(isClass(copy)=="Object"){
              result[key]=deepClone(copy);//递归调用
          }else if(isClass(copy)=="Array"){
              result[key]=deepClone(copy);
          }else{
              result[key]=obj[key];
          }
      }
      return result;
  })
  //返回传递给他的任意对象的类
  function isClass(o){
      if(o===null) return "Null";
      if(o===undefined) return "Undefined";
      return Object.prototype.toString.call(o).slice(8,-1);
  }
  Vue.prototype.deepC1= deepC;
	// 提供全局ajax方法
	Vue.prototype.$ajax = function(opt){
   var _token = window.localStorage.getItem('tokenF');
    if(!_token){
      // alert("请登陆");
      router.push({ path: '/login'})
      return;
    }
		return $.ajax({
			url:opt.url,
			data:opt.data,
			type:opt.type,
			// // 指定服务器返回的数据类型
			// dataType:opt.dataType,
			// 发给服务器的内容类型
			contentType : opt.contentType,
			// 设置请求超时时间
			timeout:10*1000,
			headers:{"X-Token":_token},
			success : opt.success,
			error:opt.error
		})
	}

  $.ajaxSetup({
    type : 'POST',
    complete:function(XMLHttpRequest,status){
      // debugger;
			if(!XMLHttpRequest.responseText) return;
      var res = JSON.parse(XMLHttpRequest.responseText);
      if(res.code == 401 || res.CODE == 401){
        router.push('/login');
      }else if(res.code != 200){
        if(res.code == 500 || res.code == 503){
          // alert("服务器内部异常,请联系管理员");
          alert("网络连接异常，请重试");
        }else if(res.CODE == 403||res.code == 403){
          alert("无权限,请联系管理员");
        }
        // else{
        //   if(res.msg&&res.code != 404){
        //     alert(res.msg);
        //   }else if(res.code != 404){
        //     alert("服务器内部异常,请联系管理员");
        //   }
        // }
        return;
      }
    }
  });


	// 提供全局Get请求方法
    Vue.prototype.$get = function(url,callback1,callback2){
       	return Vue.prototype.$ajax({
           url:url,
           type:"get",
           contentType: "application/json",
           success:callback1,
           error:callback2
        });
    }
    Vue.prototype.$getData = function(url,data,callback1,callback2){
        return Vue.prototype.$ajax({
           url:url,
           type:"get",
           data:data,
           contentType: "application/json",
           success:callback1,
           error:callback2
        });
    }
    Vue.prototype.$put = function(url,data,callback1,callback2){
        return Vue.prototype.$ajax({
           url:url,
           type:"PUT",
           data:data,
           contentType: "application/json",
           success:callback1,
           error:callback2
        });
    }

    // 提供全局Post请求方法
    Vue.prototype.$post = function(url,data,callback1,callback2){
    	  return Vue.prototype.$ajax({
            url:url,
            data:data,
            type:"post",
            contentType: "application/json",
            success:callback1,
           	error:callback2
        });
    }



}
export default MyPlugin
